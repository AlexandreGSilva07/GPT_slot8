# Metodologia — Comparador cego de planos de governo 2026

## Escopo

Este projeto compara **exclusivamente** propostas formalmente registradas nos planos de governo das candidaturas à Presidência da República nas Eleições 2026, conforme disponibilizadas pelo Tribunal Superior Eleitoral (TSE).

Fonte primária: página oficial do TSE e os PDFs nela vinculados.

## Regras de integridade

1. O documento integral é a fonte de verdade. A organização temática do TSE pode auxiliar navegação, mas não substitui a leitura do PDF.
2. Toda associação entre alternativa e candidatura precisa apontar para evidência identificável no plano: página, trecho/paráfrase fiel e arquivo-fonte.
3. Ausência de proposta é exibida como `não identificado no plano`. Como o resultado mede aderência documental, uma pergunta respondida sem posição identificada recebe zero; ela continua visualmente distinta de uma oposição expressa.
4. Posições semelhantes só serão agrupadas quando o mecanismo proposto e o sentido da política forem materialmente compatíveis.
5. Diferenças de implementação serão preservadas. Duas candidaturas podem concordar no objetivo e divergir no instrumento.
6. O quiz não utiliza partido, personalidade, histórico, entrevistas, redes sociais ou declarações externas ao plano para determinar a correspondência.
7. Durante o quiz, nomes e siglas das candidaturas permanecem ocultos.
8. As alternativas são embaralhadas a cada novo teste e mantêm a mesma ordem quando o usuário volta à pergunta. “Nenhuma destas medidas” permanece por último.
9. As 15 perguntas são distribuídas igualmente em cinco macrotemas. Cada macrotema recebe a média das perguntas respondidas; a porcentagem geral é a média dos cinco macrotemas, todos com o mesmo peso.
10. Escolha única vale 100% para a alternativa documentada e 0% nas demais. Múltipla escolha usa a interseção dividida pela união entre escolhas do usuário e posições do plano. Na ordenação, a sobreposição ponderada pela prioridade também é reduzida quando o plano registra alternativas que o usuário não selecionou.
11. O usuário pode abrir o plano oficial integral de cada candidatura diretamente a partir do resultado.

## Pipeline

`PDF oficial → hash → extração integral → índice temático oficial do TSE → conferência por página → perguntas/opções → matriz de evidências → interface`

## Reprodutibilidade

Os PDFs originais são preservados em `data/raw-pdfs/`. A extração textual fica em `data/text/`; os hashes SHA-256 em `data/SHA256SUMS`; os índices oficiais capturados ficam em `data/tse-indexes/`. A matriz completa do questionário está em `docs/analysis/questionnaire-v4.md` e sua fonte executável em `src/data/questionnaire-v4.js`.

## Limitação metodológica

Um plano de governo não é necessariamente exaustivo. Quando uma candidatura não se pronuncia sobre uma questão com clareza suficiente, o projeto não infere sua posição a partir de ideologia, partido, histórico ou declarações externas.
