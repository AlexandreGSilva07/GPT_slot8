#!/usr/bin/env python3
"""Cross-check TSE index entries against the cited local PDF page text."""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STOP = {
    "pagina", "paginas", "para", "como", "com", "sem", "uma", "das", "dos", "que",
    "nacional", "programa", "politica", "publica", "publico", "governo", "brasil",
    "criacao", "ampliacao", "fortalecimento", "combate", "sistema", "modelo",
}

def fold(value):
    return "".join(c for c in unicodedata.normalize("NFKD", value.lower()) if not unicodedata.combining(c))

def tokens(value):
    return {t for t in re.findall(r"[a-z0-9]+", fold(value)) if len(t) >= 4 and t not in STOP}

total = weak = missing = 0
for index_path in sorted((ROOT / "data/tse-indexes").glob("*.txt")):
    pages = {row["page"]: row["text"] for row in json.loads((ROOT / "data/pages" / f"{index_path.stem}.json").read_text())}
    candidate_weak = []
    for line in index_path.read_text().splitlines():
        match = re.match(r"\d+: \* (.+?): (.+)$", line)
        if not match:
            continue
        subject, refs = match.groups()
        cited = [int(n) for n in re.findall(r"\d+", refs)]
        if not cited:
            continue
        total += 1
        absent = [page for page in cited if page not in pages]
        if absent:
            missing += 1
            candidate_weak.append((subject, cited, "missing-page"))
            continue
        wanted = tokens(subject)
        found = max((len(wanted & tokens(pages[page])) for page in cited), default=0)
        if found == 0:
            weak += 1
            candidate_weak.append((subject, cited, "no-title-token"))
    print(f"{index_path.stem}: {len(candidate_weak)} registros exigem leitura manual")
    for subject, cited, reason in candidate_weak[:12]:
        print(f"  - {reason}: {subject} — p.{','.join(map(str,cited))}")

print(f"TOTAL={total} MISSING_PAGE={missing} MANUAL_REVIEW={weak}")
