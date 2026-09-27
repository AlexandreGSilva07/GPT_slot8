#!/usr/bin/env python3
"""Coleta os 8 macrotemas das 13 candidaturas à Presidência no portal do TSE.

O script não usa uma lista local de candidatos como fonte. Ele descobre as 13
páginas na tabela oficial, coleta todos os tópicos dos oito painéis de cada
página e grava um único JSON consolidado. Qualquer lacuna interrompe a execução.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterator
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen


INDEX_URL = (
    "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/"
    "propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-"
    "eleicoes-2026/planos-de-governo-dos-candidatos-ao-cargo-de-presidente-da-"
    "republica-eleicoes-2026"
)
EXPECTED_CANDIDATES = 13
EXPECTED_MACROTHEMES = 8
USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/140.0 Safari/537.36"
)


@dataclass
class Node:
    tag: str
    attrs: dict[str, str] = field(default_factory=dict)
    children: list[Node | str] = field(default_factory=list)

    def classes(self) -> set[str]:
        return set(self.attrs.get("class", "").split())

    def text(self) -> str:
        parts: list[str] = []

        def walk(node: Node | str) -> None:
            if isinstance(node, str):
                parts.append(node)
                return
            for child in node.children:
                walk(child)

        walk(self)
        return clean_text(" ".join(parts))

    def descendants(self, tag: str | None = None) -> Iterator[Node]:
        for child in self.children:
            if not isinstance(child, Node):
                continue
            if tag is None or child.tag == tag:
                yield child
            yield from child.descendants(tag)

    def first(self, *, tag: str | None = None, id_: str | None = None,
              class_: str | None = None) -> Node | None:
        for node in self.descendants(tag):
            if id_ is not None and node.attrs.get("id") != id_:
                continue
            if class_ is not None and class_ not in node.classes():
                continue
            return node
        return None


class DOMParser(HTMLParser):
    VOID_TAGS = {
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr",
    }

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("document")
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = Node(tag, {key: value or "" for key, value in attrs})
        self.stack[-1].children.append(node)
        if tag not in self.VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if tag not in self.VOID_TAGS:
            self.stack.pop()

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        self.stack[-1].children.append(data)


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", unescape(value)).strip()


def fetch(url: str, retries: int = 4) -> str:
    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.7",
    }
    last_error: Exception | None = None
    for attempt in range(1, retries + 1):
        try:
            request = Request(url, headers=headers)
            with urlopen(request, timeout=45) as response:
                content_type = response.headers.get_content_type()
                if response.status != 200 or content_type != "text/html":
                    raise RuntimeError(
                        f"resposta inesperada: HTTP {response.status}, {content_type}"
                    )
                charset = response.headers.get_content_charset() or "utf-8"
                return response.read().decode(charset, errors="replace")
        except (HTTPError, URLError, TimeoutError, RuntimeError) as error:
            last_error = error
            if attempt < retries:
                time.sleep(attempt * 1.5)
    raise RuntimeError(f"falha ao baixar {url}: {last_error}")


def parse_html(source: str) -> Node:
    parser = DOMParser()
    parser.feed(source)
    parser.close()
    return parser.root


def direct_children(node: Node, tag: str) -> list[Node]:
    return [child for child in node.children if isinstance(child, Node) and child.tag == tag]


def candidate_slug(url: str) -> str:
    return urlparse(url).path.rstrip("/").rsplit("/", 1)[-1].removesuffix(
        "-propostas-de-governo"
    )


def discover_candidates(root: Node) -> list[dict[str, object]]:
    tbody = root.first(tag="tbody", id_="presidentes-1-turno")
    if tbody is None:
        raise ValueError("tabela oficial #presidentes-1-turno não encontrada")

    candidates: list[dict[str, object]] = []
    for row in direct_children(tbody, "tr"):
        cells = direct_children(row, "td")
        if len(cells) != 6:
            raise ValueError(f"linha da tabela com {len(cells)} colunas; eram esperadas 6")
        proposal_links = [
            anchor for anchor in cells[5].descendants("a")
            if clean_text(anchor.text()).casefold() == "visualizar propostas por assunto"
        ]
        pdf_links = [
            anchor for anchor in cells[5].descendants("a")
            if "baixar propostas" in clean_text(anchor.text()).casefold()
        ]
        if len(proposal_links) != 1 or len(pdf_links) != 1:
            raise ValueError(f"links oficiais não identificados para {cells[1].text()}")

        page_url = urljoin(INDEX_URL, proposal_links[0].attrs.get("href", ""))
        pdf_url = urljoin(INDEX_URL, pdf_links[0].attrs.get("href", ""))
        image = cells[0].first(tag="img")
        candidates.append({
            "slug": candidate_slug(page_url),
            "name": cells[1].text(),
            "number": int(cells[2].text()),
            "party": cells[3].text(),
            "partyOrCoalition": cells[4].text(),
            "pageUrl": page_url,
            "pdfUrl": pdf_url,
            "photoUrl": urljoin(INDEX_URL, image.attrs.get("src", "")) if image else None,
        })

    urls = [candidate["pageUrl"] for candidate in candidates]
    if len(candidates) != EXPECTED_CANDIDATES:
        raise ValueError(
            f"a tabela trouxe {len(candidates)} candidaturas; eram esperadas "
            f"{EXPECTED_CANDIDATES}"
        )
    if len(set(urls)) != EXPECTED_CANDIDATES:
        raise ValueError("os links das candidaturas não são 13 URLs únicas")
    return candidates


def parse_topic(item: Node, page_url: str) -> dict[str, object]:
    references: list[dict[str, object]] = []
    for anchor in item.descendants("a"):
        href = urljoin(page_url, anchor.attrs.get("href", ""))
        page_match = re.search(r"#page=(\d+)", href)
        references.append({
            "text": anchor.text(),
            "page": int(page_match.group(1)) if page_match else None,
            "url": href,
        })
    return {"text": item.text(), "references": references}


def scrape_macrothemes(root: Node, page_url: str) -> list[dict[str, object]]:
    macrothemes: list[dict[str, object]] = []
    panels = [node for node in root.descendants("div") if "panel-default" in node.classes()]
    for panel in panels:
        title_box = panel.first(tag="div", class_="panel-title")
        body = panel.first(tag="div", class_="panel-body")
        if title_box is None or body is None:
            continue
        title = title_box.text()
        match = re.match(r"^(\d+)\.\s*(.+)$", title)
        if not match:
            continue
        number = int(match.group(1))
        topics = [parse_topic(item, page_url) for item in body.descendants("li")]
        macrothemes.append({
            "number": number,
            "title": clean_text(match.group(2)),
            "topics": topics,
        })

    numbers = [macrotheme["number"] for macrotheme in macrothemes]
    expected = list(range(1, EXPECTED_MACROTHEMES + 1))
    if numbers != expected:
        raise ValueError(f"macrotemas encontrados {numbers}; eram esperados {expected}")
    empty = [macrotheme["number"] for macrotheme in macrothemes if not macrotheme["topics"]]
    if empty:
        raise ValueError(f"macrotemas sem tópicos: {empty}")
    return macrothemes


def collect() -> dict[str, object]:
    candidates = discover_candidates(parse_html(fetch(INDEX_URL)))
    topic_count = 0
    for index, candidate in enumerate(candidates, 1):
        print(f"[{index:02d}/{EXPECTED_CANDIDATES}] {candidate['name']}", file=sys.stderr)
        candidate["macrothemes"] = scrape_macrothemes(
            parse_html(fetch(str(candidate["pageUrl"]))), str(candidate["pageUrl"])
        )
        candidate_topics = sum(
            len(macrotheme["topics"]) for macrotheme in candidate["macrothemes"]
        )
        candidate["topicCount"] = candidate_topics
        topic_count += candidate_topics

    return {
        "schemaVersion": 1,
        "source": "Tribunal Superior Eleitoral",
        "sourceIndexUrl": INDEX_URL,
        "retrievedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "validation": {
            "candidateCount": len(candidates),
            "macrothemesPerCandidate": EXPECTED_MACROTHEMES,
            "candidateMacrothemeCells": len(candidates) * EXPECTED_MACROTHEMES,
            "emptyMacrothemeCells": 0,
            "topicCount": topic_count,
        },
        "candidates": candidates,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/tse-presidential-macrothemes.json"),
        help="arquivo JSON consolidado de saída",
    )
    args = parser.parse_args()
    result = collect()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    validation = result["validation"]
    print(
        f"OK: {validation['candidateCount']} candidaturas, "
        f"{validation['candidateMacrothemeCells']} células, "
        f"{validation['topicCount']} tópicos -> {args.output}"
    )


if __name__ == "__main__":
    main()
