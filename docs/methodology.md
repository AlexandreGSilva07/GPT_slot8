# Metodologia — Comparador cego de planos de governo 2026

## Escopo

Este projeto compara **exclusivamente** propostas formalmente registradas nos planos de governo das candidaturas à Presidência da República nas Eleições 2026, conforme disponibilizadas pelo Tribunal Superior Eleitoral (TSE).

Fonte primária: página oficial do TSE e os PDFs nela vinculados.

## Regras de integridade

1. O documento integral é a fonte de verdade. A organização temática do TSE pode auxiliar navegação, mas não substitui a leitura do PDF.
2. Toda associação entre alternativa e candidatura precisa apontar para evidência identificável no plano: página, trecho/paráfrase fiel e arquivo-fonte.
3. Ausência de proposta não será tratada como oposição. O estado correto é `não identificado no plano`.
4. Posições semelhantes só serão agrupadas quando o mecanismo proposto e o sentido da política forem materialmente compatíveis.
5. Diferenças de implementação serão preservadas. Duas candidaturas podem concordar no objetivo e divergir no instrumento.
6. O quiz não utiliza partido, personalidade, histórico, entrevistas, redes sociais ou declarações externas ao plano para determinar a correspondência.
7. Durante o quiz, nomes e siglas das candidaturas permanecem ocultos.
8. O resultado não produz ranking, nota, porcentagem global, “vencedor” nem recomendação de voto. Ele revela uma matriz factual, questão por questão.
9. A ordem das candidaturas na revelação é neutra e não depende das respostas.
10. O usuário pode abrir o plano oficial integral de cada candidatura diretamente a partir do resultado.

## Pipeline

`PDF oficial → hash → extração integral → indexação por página → fichas temáticas → cruzamento → perguntas/opções → matriz de evidências → interface`

## Reprodutibilidade

Os PDFs originais são preservados em `data/raw-pdfs/`. A extração textual fica em `data/text/`; os hashes SHA-256 em `data/SHA256SUMS`. As fichas analíticas e as evidências usadas pelo quiz ficam versionadas em `docs/analysis/` e `src/data/`.

## Limitação metodológica

Um plano de governo não é necessariamente exaustivo. Quando uma candidatura não se pronuncia sobre uma questão com clareza suficiente, o projeto não infere sua posição a partir de ideologia, partido, histórico ou declarações externas.
