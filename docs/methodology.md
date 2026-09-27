# Metodologia — Comparador cego de planos de governo 2026

## Escopo

O questionário usa exclusivamente os tópicos publicados pelo Tribunal Superior Eleitoral nas páginas individuais das 13 candidaturas à Presidência da República nas Eleições 2026.

O corpus possui:

- 13 candidaturas;
- 8 macrotemas por candidatura;
- 104 alternativas documentais;
- 723 tópicos oficiais.

## Estrutura do questionário

1. Antes das propostas, o usuário distribui no máximo oito pontos entre os oito macrotemas. Todos começam com peso 1.
2. Existem oito torneios independentes, um para cada macrotema do TSE.
3. Cada torneio contém exatamente 13 alternativas: uma por candidatura. Duas aparecem por vez em 12 duelos sucessivos; a vencedora enfrenta a proposta seguinte até restar uma campeã.
4. Cada alternativa preserva os tópicos da candidatura naquele macrotema. Somente as citações de página foram retiradas da tela.
5. Os nomes e partidos ficam ocultos durante o questionário.
6. As alternativas são embaralhadas no início de cada torneio, os lados dos duelos variam aleatoriamente e o estado é preservado quando o usuário retorna ao tema.
7. A campeã do torneio constitui a única alternativa escolhida naquele macrotema.
8. Um macrotema pode receber peso zero ou vários pontos, desde que a soma de todos os pesos não ultrapasse oito.

## Cálculo

O peso pertence à decisão, não à candidatura. Uma candidatura recebe o peso de um macrotema somente quando sua alternativa é escolhida naquele tema.

Para cada decisão com peso positivo:

`pontos[candidatura escolhida] += peso do macrotema`

O peso total ativo é a soma dos pesos das oito decisões. Para cada candidatura:

`percentual = pontos da candidatura / peso total ativo × 100`

Os valores internos usam precisão completa. O arredondamento ocorre somente na exibição. A ordenação utiliza os pontos sem arredondamento.

Não existem bônus, penalidades, multiplicadores, similaridade parcial, correções de cobertura ou regras específicas por candidatura.

## Peso zero

Peso zero significa que o macrotema não deve influenciar o resultado. A decisão não entrega pontos, não aumenta o total ativo e não altera o denominador.

Se todos os oito pesos forem zero, o sistema não calcula percentuais e solicita que pelo menos um macrotema receba peso positivo.

## Empates e simetria

Empates reais permanecem empates. Todas as candidaturas com a maior soma de pesos são exibidas juntas no destaque. A identidade da candidatura não interfere no cálculo.

A ordem das decisões também não interfere no resultado: somente a candidatura escolhida e o peso de cada macrotema entram na soma.

## Reprodutibilidade

O coletor `scripts/scrape_tse_macrothemes.py` descobre as 13 páginas a partir da tabela oficial do TSE e gera `data/tse-presidential-macrothemes.json`. A execução falha se não encontrar 13 links únicos, oito macrotemas não vazios por candidatura ou referências válidas.

O gerador `scripts/generate_8x13_questionnaire.py` transforma esse consolidado em:

- `docs/questionnaire-8x13-tse.md`, para auditoria editorial;
- `src/data/questionnaire-8x13.js`, consumido pela interface.

Os PDFs oficiais também permanecem preservados em `data/raw-pdfs/`, com hashes em `data/SHA256SUMS`.

## Limitação

O percentual final representa a distribuição das escolhas documentais ponderadas pelo usuário. Ele não mede concordância parcial, viabilidade, qualidade, cumprimento futuro ou proximidade ideológica fora dos tópicos publicados pelo TSE.
