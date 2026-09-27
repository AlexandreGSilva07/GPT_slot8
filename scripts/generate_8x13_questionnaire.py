#!/usr/bin/env python3
"""Gera o questionário 8×13 a partir da extração consolidada do TSE."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/tse-presidential-macrothemes.json"
OUTPUT = ROOT / "docs/questionnaire-8x13-tse.md"

QUESTION_TITLES = [
    "Economia, Trabalho e Responsabilidade Fiscal",
    "Saúde Pública e Assistência",
    "Segurança Pública e Justiça",
    "Educação, Ciência e Meio Ambiente",
    "Política Externa e Inserção Global",
    "Direitos Humanos, Equidade e Inclusão Social",
    "Questão Agrária, Propriedade e Direito à Cidade",
    "Governança, Transparência e Reformas de Estado",
]

QUESTIONS = [
    "Qual conjunto de propostas para economia, trabalho e responsabilidade fiscal mais representa suas prioridades?",
    "Qual conjunto de propostas para saúde pública e assistência mais representa suas prioridades?",
    "Qual conjunto de propostas para segurança pública e justiça mais representa suas prioridades?",
    "Qual conjunto de propostas para educação, ciência e meio ambiente mais representa suas prioridades?",
    "Qual conjunto de propostas para política externa e inserção global mais representa suas prioridades?",
    "Qual conjunto de propostas para direitos humanos, equidade e inclusão social mais representa suas prioridades?",
    "Qual conjunto de propostas para questão agrária, propriedade e direito à cidade mais representa suas prioridades?",
    "Qual conjunto de propostas para governança, transparência e reformas de Estado mais representa suas prioridades?",
]

PAGE_SUFFIX = re.compile(r"\s*[:–—]\s*páginas?\s+.*$", re.IGNORECASE)


def without_page_citation(text: str) -> str:
    cleaned, substitutions = PAGE_SUFFIX.subn("", text)
    if substitutions != 1 or not cleaned.strip():
        raise ValueError(f"não foi possível retirar somente a citação de página: {text!r}")
    return cleaned.strip()


def main() -> None:
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    candidates = source["candidates"]
    if len(candidates) != 13:
        raise ValueError(f"esperadas 13 candidaturas; encontradas {len(candidates)}")

    lines = [
        "# Questionário documental — 8 perguntas × 13 alternativas",
        "",
        "Fonte: páginas individuais das candidaturas à Presidência no portal do Tribunal Superior Eleitoral (TSE).",
        "",
        "## Regras editoriais deste arquivo",
        "",
        "- Cada pergunta corresponde a um dos oito macrotemas do TSE.",
        "- Cada pergunta contém exatamente uma alternativa por candidatura.",
        "- Os tópicos estão na ordem e com a redação publicada pelo TSE.",
        "- Foram removidas somente as citações de página ao final de cada tópico.",
        "- O nome e o partido identificam a correspondência para auditoria; devem ficar ocultos durante o quiz.",
        "- A ordem das alternativas deve ser embaralhada na interface.",
        "",
    ]

    alternative_count = 0
    topic_count = 0
    for macro_index, (title, question) in enumerate(zip(QUESTION_TITLES, QUESTIONS), 1):
        lines.extend([
            f"## Pergunta {macro_index} — {title}",
            "",
            f"**Pergunta:** {question}",
            "",
        ])
        for alternative_index, candidate in enumerate(candidates, 1):
            macrotheme = candidate["macrothemes"][macro_index - 1]
            if macrotheme["number"] != macro_index or not macrotheme["topics"]:
                raise ValueError(
                    f"macrotema {macro_index} ausente ou vazio para {candidate['name']}"
                )
            lines.extend([
                f"### Alternativa {alternative_index:02d} — {candidate['name']} ({candidate['party']})",
                "",
            ])
            for topic in macrotheme["topics"]:
                cleaned = without_page_citation(topic["text"])
                if re.search(r"\bpáginas?\b", cleaned, re.IGNORECASE):
                    raise ValueError(f"citação de página restante em {cleaned!r}")
                lines.append(f"- {cleaned}")
                topic_count += 1
            lines.append("")
            alternative_count += 1

    if alternative_count != 8 * 13:
        raise ValueError(f"esperadas 104 alternativas; geradas {alternative_count}")
    if topic_count != source["validation"]["topicCount"]:
        raise ValueError(
            f"esperados {source['validation']['topicCount']} tópicos; gerados {topic_count}"
        )

    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(
        f"OK: 8 perguntas, {alternative_count} alternativas e "
        f"{topic_count} tópicos -> {OUTPUT.relative_to(ROOT)}"
    )


if __name__ == "__main__":
    main()
