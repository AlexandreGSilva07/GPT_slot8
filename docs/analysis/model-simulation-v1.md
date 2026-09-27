# Simulação de moldes e matriz de apoiadores integrais

## O que este teste garante

- O perfil documental de cada candidatura é sua própria assinatura e, portanto, recebe 100% no teste direcional.
- “Nenhuma das alternativas” vale zero, em vez de retirar a pergunta do denominador; assim existe um perfil com 0% para todas.
- Um molde só é válido se cobrir os oito macrotemas e se as assinaturas não forem idênticas.
- A simulação do molde é abstrata: testa quantidade, tipos e número de opções sem inventar posições políticas para preencher lacunas dos planos.

## Oito macrotemas fixos

1. Economia, Trabalho e Responsabilidade Fiscal
2. Saúde Pública e Assistência
3. Segurança Pública e Justiça
4. Educação, Ciência e Meio Ambiente
5. Política Externa e Inserção Global
6. Direitos Humanos, Equidade e Inclusão Social
7. Questão Agrária, Propriedade e Direito à Cidade
8. Governança, Transparência e Reformas de Estado

## Matriz direcional do mapeamento documental atual

Cada linha responde: “se o usuário reproduzir integralmente a assinatura documentada da candidatura da linha, quanto cada outra candidatura compartilha?”. A diagonal é 100% por construção.

| Apoiador integral de | Clariana Barão | Edmilson Costa | Escritor Augusto Cury | Flavio Bolsonaro | Hertz Dias | Leonardo Avalanche | Lula | Renan Santos | Ronaldo Caiado | Rui Costa Pimenta | Samara | Veterinário Wilson Grassi | Zema |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Clariana Barão | 100% | 0% | 65% | 38% | 11% | 22% | 61% | 20% | 69% | 0% | 6% | 56% | 23% |
| Edmilson Costa | 0% | 100% | 2% | 4% | 65% | 4% | 35% | 0% | 3% | 56% | 83% | 5% | 4% |
| Escritor Augusto Cury | 45% | 2% | 100% | 46% | 12% | 31% | 47% | 16% | 63% | 2% | 3% | 36% | 37% |
| Flavio Bolsonaro | 23% | 4% | 40% | 100% | 9% | 48% | 25% | 23% | 48% | 2% | 7% | 38% | 75% |
| Hertz Dias | 8% | 71% | 12% | 10% | 100% | 12% | 37% | 4% | 12% | 54% | 69% | 7% | 8% |
| Leonardo Avalanche | 17% | 4% | 34% | 60% | 13% | 100% | 19% | 24% | 52% | 0% | 8% | 35% | 44% |
| Lula | 36% | 33% | 41% | 25% | 32% | 15% | 100% | 9% | 41% | 17% | 33% | 32% | 19% |
| Renan Santos | 20% | 0% | 23% | 38% | 6% | 31% | 15% | 100% | 58% | 6% | 6% | 50% | 48% |
| Ronaldo Caiado | 45% | 3% | 58% | 51% | 11% | 45% | 44% | 38% | 100% | 2% | 9% | 61% | 39% |
| Rui Costa Pimenta | 0% | 78% | 3% | 3% | 70% | 0% | 26% | 5% | 3% | 100% | 88% | 3% | 7% |
| Samara | 4% | 83% | 2% | 7% | 64% | 7% | 35% | 4% | 9% | 63% | 100% | 7% | 5% |
| Veterinário Wilson Grassi | 39% | 5% | 36% | 43% | 7% | 32% | 36% | 35% | 66% | 3% | 8% | 100% | 34% |
| Zema | 14% | 3% | 32% | 75% | 7% | 36% | 19% | 29% | 36% | 4% | 5% | 29% | 100% |

## Busca de molde

Foram executados 15.000 cenários: 60 configurações × 250 bases sintéticas. “Pior par P95” é a compatibilidade do par mais parecido em 95% das execuções; quanto menor, maior a separação.

| Perguntas | Tipos | Opções | Macrotemas cobertos | Compatibilidade média | Pior par médio | Pior par P95 | Válido |
|---:|---|---:|---:|---:|---:|---:|---|
| 5 | single | 2 | 5/8 | 58% | 100% | 100% | não |
| 5 | single | 3 | 5/8 | 44% | 95% | 100% | não |
| 5 | single | 4 | 5/8 | 39% | 88% | 100% | não |
| 5 | single | 5 | 5/8 | 33% | 83% | 100% | não |
| 5 | mixed | 2 | 5/8 | 65% | 100% | 100% | não |
| 5 | mixed | 3 | 5/8 | 47% | 90% | 100% | não |
| 5 | mixed | 4 | 5/8 | 38% | 80% | 95% | não |
| 5 | mixed | 5 | 5/8 | 31% | 74% | 90% | não |
| 5 | varied | 2 | 5/8 | 67% | 99% | 100% | não |
| 5 | varied | 3 | 5/8 | 47% | 86% | 100% | não |
| 5 | varied | 4 | 5/8 | 38% | 78% | 90% | não |
| 5 | varied | 5 | 5/8 | 31% | 71% | 88% | não |
| 10 | single | 2 | 8/8 | 59% | 92% | 100% | sim |
| 10 | single | 3 | 8/8 | 46% | 81% | 90% | sim |
| 10 | single | 4 | 8/8 | 38% | 74% | 90% | sim |
| 10 | single | 5 | 8/8 | 34% | 69% | 80% | sim |
| 10 | mixed | 2 | 8/8 | 65% | 92% | 100% | sim |
| 10 | mixed | 3 | 8/8 | 47% | 77% | 87% | sim |
| 10 | mixed | 4 | 8/8 | 38% | 70% | 81% | sim |
| 10 | mixed | 5 | 8/8 | 32% | 61% | 73% | sim |
| 10 | varied | 2 | 8/8 | 67% | 92% | 100% | sim |
| 10 | varied | 3 | 8/8 | 47% | 75% | 83% | sim |
| 10 | varied | 4 | 8/8 | 38% | 67% | 76% | sim |
| 10 | varied | 5 | 8/8 | 31% | 59% | 72% | sim |
| 15 | single | 2 | 8/8 | 59% | 87% | 93% | sim |
| 15 | single | 3 | 8/8 | 45% | 75% | 87% | sim |
| 15 | single | 4 | 8/8 | 38% | 68% | 80% | sim |
| 15 | single | 5 | 8/8 | 34% | 64% | 73% | sim |
| 15 | mixed | 2 | 8/8 | 65% | 88% | 97% | sim |
| 15 | mixed | 3 | 8/8 | 46% | 71% | 80% | sim |
| 15 | mixed | 4 | 8/8 | 38% | 63% | 71% | sim |
| 15 | mixed | 5 | 8/8 | 32% | 57% | 67% | sim |
| 15 | varied | 2 | 8/8 | 67% | 88% | 93% | sim |
| 15 | varied | 3 | 8/8 | 47% | 71% | 79% | sim |
| 15 | varied | 4 | 8/8 | 38% | 60% | 68% | sim |
| 15 | varied | 5 | 8/8 | 31% | 54% | 64% | sim |
| 16 | single | 2 | 8/8 | 59% | 86% | 94% | sim |
| 16 | single | 3 | 8/8 | 45% | 75% | 81% | sim |
| 16 | single | 4 | 8/8 | 38% | 67% | 75% | sim |
| 16 | single | 5 | 8/8 | 34% | 63% | 75% | sim |
| 16 | mixed | 2 | 8/8 | 65% | 88% | 94% | sim |
| 16 | mixed | 3 | 8/8 | 47% | 71% | 80% | sim |
| 16 | mixed | 4 | 8/8 | 38% | 62% | 72% | sim |
| 16 | mixed | 5 | 8/8 | 32% | 56% | 67% | sim |
| 16 | varied | 2 | 8/8 | 67% | 88% | 94% | sim |
| 16 | varied | 3 | 8/8 | 47% | 70% | 79% | sim |
| 16 | varied | 4 | 8/8 | 38% | 60% | 71% | sim |
| 16 | varied | 5 | 8/8 | 31% | 53% | 62% | sim |
| 20 | single | 2 | 8/8 | 59% | 83% | 90% | sim |
| 20 | single | 3 | 8/8 | 45% | 71% | 80% | sim |
| 20 | single | 4 | 8/8 | 38% | 65% | 75% | sim |
| 20 | single | 5 | 8/8 | 34% | 59% | 70% | sim |
| 20 | mixed | 2 | 8/8 | 65% | 85% | 90% | sim |
| 20 | mixed | 3 | 8/8 | 47% | 68% | 75% | sim |
| 20 | mixed | 4 | 8/8 | 38% | 60% | 68% | sim |
| 20 | mixed | 5 | 8/8 | 32% | 53% | 63% | sim |
| 20 | varied | 2 | 8/8 | 67% | 86% | 93% | sim |
| 20 | varied | 3 | 8/8 | 47% | 67% | 75% | sim |
| 20 | varied | 4 | 8/8 | 38% | 58% | 65% | sim |
| 20 | varied | 5 | 8/8 | 31% | 50% | 59% | sim |

## Melhores configurações válidas

| Posição | Perguntas | Tipos | Opções | Compatibilidade média | Pior par P95 |
|---:|---:|---|---:|---:|---:|
| 1 | 20 | varied | 5 | 31% | 59% |
| 2 | 16 | varied | 5 | 31% | 62% |
| 3 | 20 | mixed | 5 | 32% | 63% |
| 4 | 15 | varied | 5 | 31% | 64% |
| 5 | 20 | varied | 4 | 38% | 65% |
| 6 | 16 | mixed | 5 | 32% | 67% |
| 7 | 15 | mixed | 5 | 32% | 67% |
| 8 | 15 | varied | 4 | 38% | 68% |
| 9 | 20 | mixed | 4 | 38% | 68% |
| 10 | 20 | single | 5 | 34% | 70% |

## Regra proposta para o próximo questionário

O melhor resultado puramente estatístico foi o molde de 20 perguntas variadas com 5 opções. O molde recomendado para equilibrar separação e tempo é **16 perguntas**, apenas três pontos pior no pior par P95.

1. Duas perguntas por macrotema: **16 perguntas** no total.
2. Oito escolhas únicas com 4 ou 5 direções realmente conflitantes.
3. Quatro múltiplas escolhas, limitadas a duas opções e pontuadas por interseção sobre união.
4. Quatro ordenações parciais: o usuário pode excluir alternativas e ordenar apenas as que aceita.
5. A nota de cada candidatura é normalizada pela própria assinatura documentada. Assim, um apoiador integral pode alcançar 100% sem inventar posições que não existem no plano.
6. Cobertura documental é mostrada separadamente da compatibilidade. Silêncio em um macrotema reduz a cobertura e não é transformado em tese política.
7. “Nenhuma das alternativas” vale zero. Ela não apaga uma pergunta desfavorável do denominador.
8. O banco só é publicado se cada assinatura própria marcar 100%, existir perfil 0% e nenhuma resposta substantiva puder dar 100% a todas as candidaturas.
9. Antes da publicação, calcular matriz direcional, distância mínima entre assinaturas e margem do primeiro colocado para os 13 perfis integrais.
