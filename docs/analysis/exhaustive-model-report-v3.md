# Relatório consolidado — 2,4 milhões de cenários

Execução reproduzível sobre 13 candidaturas × 8 macrotemas reais do TSE. Foram processadas **2.400.000 simulações**, 2.400 configurações e 1.000 repetições por configuração em 83.2 segundos. O dump contém histogramas e médias dos 78 pares em cada configuração.

## Regras verificadas

- “Nenhuma me representa” remove somente a pergunta; não existe “prefiro não responder”.
- Foram testados bancos de 5 a 20 perguntas e todos os totais possíveis de perguntas válidas, de 1 até o banco completo.
- Os oito macrotemas recebem o mesmo peso quando possuem ao menos uma resposta válida.
- A autoaderência da assinatura de cada candidatura é 100%; nenhum cenário substantivo produziu empate universal em 100%.
- Bancos com menos de oito perguntas são mantidos no dump, mas reprovados para cobertura integral.

## Melhores modelos com todas as perguntas respondidas

| # | Perguntas | Molde | Composição | Média entre candidatos | Pior par P95 | Cobertura média |
|---:|---:|---|---|---:|---:|---:|
| 1 | 8 | all_single5 | 8×single5 | 6% | 27% | 8.0/8 |
| 2 | 9 | all_single5 | 9×single5 | 6% | 27% | 8.0/8 |
| 3 | 10 | all_single5 | 10×single5 | 6% | 27% | 8.0/8 |
| 4 | 11 | all_single5 | 11×single5 | 6% | 27% | 8.0/8 |
| 5 | 12 | all_single5 | 12×single5 | 6% | 27% | 8.0/8 |
| 6 | 13 | all_single5 | 13×single5 | 6% | 27% | 8.0/8 |
| 7 | 14 | all_single5 | 14×single5 | 6% | 27% | 8.0/8 |
| 8 | 15 | all_single5 | 15×single5 | 6% | 27% | 8.0/8 |
| 9 | 16 | all_single5 | 16×single5 | 6% | 27% | 8.0/8 |
| 10 | 17 | all_single5 | 17×single5 | 6% | 27% | 8.0/8 |
| 11 | 18 | all_single5 | 18×single5 | 6% | 27% | 8.0/8 |
| 12 | 19 | all_single5 | 19×single5 | 6% | 27% | 8.0/8 |
| 13 | 20 | all_single5 | 20×single5 | 6% | 27% | 8.0/8 |
| 14 | 8 | all_single4 | 8×single4 | 7% | 31% | 8.0/8 |
| 15 | 9 | all_single4 | 9×single4 | 7% | 31% | 8.0/8 |

## Melhores modelos mistos

| # | Perguntas | Molde | Composição | Média | Pior par P95 |
|---:|---:|---|---|---:|---:|
| 1 | 9 | recommended | 5×single5, 2×multi5, 2×rank5 | 7% | 32% |
| 2 | 13 | recommended | 7×single5, 3×multi5, 3×rank5 | 7% | 32% |
| 3 | 17 | recommended | 9×single5, 4×multi5, 4×rank5 | 7% | 32% |
| 4 | 16 | recommended | 8×single5, 4×multi5, 4×rank5 | 8% | 32% |
| 5 | 20 | recommended | 10×single5, 5×multi5, 5×rank5 | 8% | 32% |
| 6 | 12 | recommended | 6×single5, 3×multi5, 3×rank5 | 8% | 33% |
| 7 | 8 | recommended | 4×single5, 2×multi5, 2×rank5 | 8% | 33% |
| 8 | 18 | recommended | 9×single5, 5×multi5, 4×rank5 | 8% | 33% |
| 9 | 14 | recommended | 7×single5, 4×multi5, 3×rank5 | 8% | 33% |
| 10 | 19 | recommended | 9×single5, 5×multi5, 5×rank5 | 8% | 33% |
| 11 | 10 | recommended | 5×single5, 3×multi5, 2×rank5 | 8% | 33% |
| 12 | 15 | recommended | 7×single5, 4×multi5, 4×rank5 | 8% | 33% |
| 13 | 11 | recommended | 5×single5, 3×multi5, 3×rank5 | 8% | 33% |
| 14 | 9 | interactive | 3×single5, 2×multi5, 2×rank5, 2×scale5 | 9% | 35% |
| 15 | 17 | interactive | 5×single5, 4×multi5, 4×rank5, 4×scale5 | 9% | 35% |

## Efeito de “Nenhuma me representa” em bancos de 20 perguntas

Valores médios entre todos os 12 moldes.

| Nenhuma | Perguntas válidas | Macrotemas cobertos | Média entre candidatos | Pior par P95 |
|---:|---:|---:|---:|---:|
| 0 | 20 | 8.0/8 | 10% | 37% |
| 1 | 19 | 8.0/8 | 10% | 38% |
| 2 | 18 | 8.0/8 | 10% | 38% |
| 3 | 17 | 7.9/8 | 10% | 38% |
| 4 | 16 | 7.9/8 | 10% | 40% |
| 5 | 15 | 7.8/8 | 10% | 41% |
| 6 | 14 | 7.6/8 | 10% | 41% |
| 7 | 13 | 7.4/8 | 10% | 41% |
| 8 | 12 | 7.2/8 | 10% | 41% |
| 9 | 11 | 6.9/8 | 10% | 42% |
| 10 | 10 | 6.6/8 | 10% | 44% |
| 11 | 9 | 6.3/8 | 10% | 45% |
| 12 | 8 | 5.8/8 | 10% | 46% |
| 13 | 7 | 5.3/8 | 10% | 47% |
| 14 | 6 | 4.8/8 | 10% | 48% |
| 15 | 5 | 4.2/8 | 10% | 50% |
| 16 | 4 | 3.5/8 | 10% | 53% |
| 17 | 3 | 2.8/8 | 10% | 58% |
| 18 | 2 | 1.9/8 | 10% | 64% |
| 19 | 1 | 1.0/8 | 10% | 71% |

## Conclusão operacional

O relatório separa desempenho matemático de experiência de uso. O melhor molde puro e o melhor molde misto devem ser avaliados lado a lado. Um molde final precisa cobrir os oito macrotemas, manter o pior par abaixo do limite escolhido e conservar cobertura aceitável mesmo quando o usuário marca algumas respostas como “Nenhuma me representa”. O dump é a prova bruta; este arquivo é o contexto curto para futuras revisões.
