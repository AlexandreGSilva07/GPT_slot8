# Assinaturas reais do TSE e simulação de moldes — versão 2

Fonte: páginas individuais das 13 candidaturas no TSE, organizadas nos oito macrotemas oficiais. Foram processados 719 tópicos e 104 células candidatura × macrotema; duas células não possuem tópico publicado pelo TSE. A semântica combina similaridade TF-IDF dos títulos com eixos explícitos de convergência e oposição. É uma heurística auditável, não uma interpretação automática definitiva.

## Matriz de apoiador integral

A linha é o apoiador integral da candidatura; a diagonal é 100%. A direção importa porque planos têm coberturas diferentes.

| Apoiador de | Clariana Barão | Edmilson Costa | Escritor Augusto Cury | Flavio Bolsonaro | Hertz Dias | Leonardo Avalanche | Lula | Renan Santos | Ronaldo Caiado | Rui Costa Pimenta | Samara | Veterinário Wilson Grassi | Zema |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Clariana Barão | 100% | 8% | 22% | 7% | 7% | 7% | 17% | 9% | 26% | 8% | 13% | 7% | 8% |
| Edmilson Costa | 6% | 100% | 17% | 12% | 39% | 4% | 19% | 5% | 14% | 16% | 41% | 3% | 4% |
| Escritor Augusto Cury | 16% | 17% | 100% | 10% | 17% | 7% | 9% | 4% | 18% | 7% | 16% | 5% | 5% |
| Flavio Bolsonaro | 5% | 12% | 10% | 100% | 3% | 30% | 13% | 15% | 16% | 3% | 4% | 14% | 22% |
| Hertz Dias | 5% | 39% | 17% | 3% | 100% | 3% | 11% | 2% | 10% | 13% | 32% | 3% | 3% |
| Leonardo Avalanche | 5% | 4% | 7% | 30% | 3% | 100% | 9% | 10% | 12% | 3% | 4% | 18% | 16% |
| Lula | 13% | 19% | 9% | 13% | 11% | 9% | 100% | 19% | 31% | 6% | 19% | 8% | 5% |
| Renan Santos | 7% | 5% | 4% | 15% | 2% | 10% | 19% | 100% | 6% | 3% | 4% | 12% | 12% |
| Ronaldo Caiado | 19% | 14% | 18% | 16% | 10% | 12% | 31% | 6% | 100% | 6% | 19% | 7% | 10% |
| Rui Costa Pimenta | 6% | 16% | 7% | 3% | 13% | 3% | 6% | 3% | 6% | 100% | 23% | 2% | 1% |
| Samara | 10% | 41% | 16% | 4% | 32% | 4% | 19% | 4% | 19% | 23% | 100% | 3% | 4% |
| Veterinário Wilson Grassi | 5% | 3% | 5% | 14% | 3% | 18% | 8% | 12% | 7% | 2% | 3% | 100% | 11% |
| Zema | 6% | 4% | 5% | 22% | 3% | 16% | 5% | 12% | 10% | 1% | 4% | 11% | 100% |

## Simulações do molde

Foram executadas **240.000 simulações reais condicionadas**: 60 configurações × 4.000 execuções, sempre usando as 104 assinaturas derivadas do TSE.

| Perguntas | Tipos | Opções | Cobertura | Média entre candidatos | Pior par P95 | Empate universal | Válido |
|---:|---|---:|---:|---:|---:|---:|---|
| 5 | single | 2 | 5/8 | 12% | 37% | 0% | não |
| 5 | single | 3 | 5/8 | 10% | 32% | 0% | não |
| 5 | single | 4 | 5/8 | 9% | 29% | 0% | não |
| 5 | single | 5 | 5/8 | 8% | 26% | 0% | não |
| 5 | mixed | 2 | 5/8 | 12% | 37% | 0% | não |
| 5 | mixed | 3 | 5/8 | 10% | 33% | 0% | não |
| 5 | mixed | 4 | 5/8 | 9% | 29% | 0% | não |
| 5 | mixed | 5 | 5/8 | 8% | 26% | 0% | não |
| 5 | varied | 2 | 5/8 | 13% | 37% | 0% | não |
| 5 | varied | 3 | 5/8 | 11% | 33% | 0% | não |
| 5 | varied | 4 | 5/8 | 9% | 29% | 0% | não |
| 5 | varied | 5 | 5/8 | 8% | 27% | 0% | não |
| 10 | single | 2 | 8/8 | 11% | 41% | 0% | sim |
| 10 | single | 3 | 8/8 | 9% | 36% | 0% | sim |
| 10 | single | 4 | 8/8 | 8% | 33% | 0% | sim |
| 10 | single | 5 | 8/8 | 7% | 30% | 0% | sim |
| 10 | mixed | 2 | 8/8 | 11% | 42% | 0% | sim |
| 10 | mixed | 3 | 8/8 | 9% | 37% | 0% | sim |
| 10 | mixed | 4 | 8/8 | 8% | 34% | 0% | sim |
| 10 | mixed | 5 | 8/8 | 7% | 31% | 0% | sim |
| 10 | varied | 2 | 8/8 | 11% | 42% | 0% | sim |
| 10 | varied | 3 | 8/8 | 9% | 38% | 0% | sim |
| 10 | varied | 4 | 8/8 | 8% | 34% | 0% | sim |
| 10 | varied | 5 | 8/8 | 7% | 31% | 0% | sim |
| 15 | single | 2 | 8/8 | 11% | 40% | 0% | sim |
| 15 | single | 3 | 8/8 | 9% | 36% | 0% | sim |
| 15 | single | 4 | 8/8 | 8% | 32% | 0% | sim |
| 15 | single | 5 | 8/8 | 7% | 29% | 0% | sim |
| 15 | mixed | 2 | 8/8 | 11% | 41% | 0% | sim |
| 15 | mixed | 3 | 8/8 | 9% | 37% | 0% | sim |
| 15 | mixed | 4 | 8/8 | 8% | 34% | 0% | sim |
| 15 | mixed | 5 | 8/8 | 7% | 30% | 0% | sim |
| 15 | varied | 2 | 8/8 | 11% | 42% | 0% | sim |
| 15 | varied | 3 | 8/8 | 9% | 37% | 0% | sim |
| 15 | varied | 4 | 8/8 | 8% | 34% | 0% | sim |
| 15 | varied | 5 | 8/8 | 7% | 31% | 0% | sim |
| 16 | single | 2 | 8/8 | 11% | 40% | 0% | sim |
| 16 | single | 3 | 8/8 | 9% | 36% | 0% | sim |
| 16 | single | 4 | 8/8 | 8% | 32% | 0% | sim |
| 16 | single | 5 | 8/8 | 7% | 29% | 0% | sim |
| 16 | mixed | 2 | 8/8 | 11% | 41% | 0% | sim |
| 16 | mixed | 3 | 8/8 | 9% | 37% | 0% | sim |
| 16 | mixed | 4 | 8/8 | 8% | 33% | 0% | sim |
| 16 | mixed | 5 | 8/8 | 7% | 30% | 0% | sim |
| 16 | varied | 2 | 8/8 | 11% | 41% | 0% | sim |
| 16 | varied | 3 | 8/8 | 9% | 37% | 0% | sim |
| 16 | varied | 4 | 8/8 | 8% | 34% | 0% | sim |
| 16 | varied | 5 | 8/8 | 7% | 31% | 0% | sim |
| 20 | single | 2 | 8/8 | 11% | 40% | 0% | sim |
| 20 | single | 3 | 8/8 | 9% | 36% | 0% | sim |
| 20 | single | 4 | 8/8 | 8% | 32% | 0% | sim |
| 20 | single | 5 | 8/8 | 7% | 29% | 0% | sim |
| 20 | mixed | 2 | 8/8 | 11% | 41% | 0% | sim |
| 20 | mixed | 3 | 8/8 | 9% | 37% | 0% | sim |
| 20 | mixed | 4 | 8/8 | 8% | 33% | 0% | sim |
| 20 | mixed | 5 | 8/8 | 7% | 30% | 0% | sim |
| 20 | varied | 2 | 8/8 | 11% | 41% | 0% | sim |
| 20 | varied | 3 | 8/8 | 9% | 37% | 0% | sim |
| 20 | varied | 4 | 8/8 | 8% | 34% | 0% | sim |
| 20 | varied | 5 | 8/8 | 7% | 31% | 0% | sim |

## Melhores moldes

| # | Perguntas | Tipos | Opções | Média | Pior par P95 |
|---:|---:|---|---:|---:|---:|
| 1 | 20 | single | 5 | 7% | 29% |
| 2 | 16 | single | 5 | 7% | 29% |
| 3 | 15 | single | 5 | 7% | 29% |
| 4 | 10 | single | 5 | 7% | 30% |
| 5 | 20 | mixed | 5 | 7% | 30% |
| 6 | 16 | mixed | 5 | 7% | 30% |
| 7 | 15 | mixed | 5 | 7% | 30% |
| 8 | 20 | varied | 5 | 7% | 31% |
| 9 | 16 | varied | 5 | 7% | 31% |
| 10 | 15 | varied | 5 | 7% | 31% |
| 11 | 10 | mixed | 5 | 7% | 31% |
| 12 | 10 | varied | 5 | 7% | 31% |

## As 104 respostas macrotemáticas

### Clariana Barão (DC)

#### Economia, Trabalho e Responsabilidade Fiscal

- Ambiente de negócios simples, previsível e digitalização — p. 5
- Crédito produtivo, garantias e capacitação para pequenos negócios — p. 5
- Infraestrutura, logística, rodovias, ferrovias e hidrovias (Concessões e PPPs) — p. 5
- Responsabilidade fiscal focada em resultados, revisão de gastos e subsídios — p. 5, 6
- Segurança energética, conectividade e economia digital — p. 5

Eixos detectados: estado-mercado=+; fiscal=+.

#### Saúde Pública e Assistência

- Atenção primária resolutiva e coordenação do cuidado — p. 11
- Esporte e atividade física como vetor de saúde — p. 11
- Inovação, pesquisa clínica e avaliação transparente de terapias no SUS — p. 11
- Prevenção, diagnóstico precoce, vacinação e saúde materno-infantil — p. 11
- Saúde digital, telemedicina e regulação inteligente de filas — p. 11, 12

Eixos detectados: saúde=−.

#### Segurança Pública e Justiça

- Combate ao narcotráfico e ao tráfico de armas (Inteligência e cooperação) — p. 9
- Fronteiras inteligentes, integradas e monitoradas por tecnologia — p. 9
- Segurança urbana orientada por dados e policiamento baseado em evidências — p. 9
- Sistema prisional, trabalho, educação e controle de comunicações ilícitas — p. 9, 10
- Sufocamento financeiro das facções e rastreamento de ativos — p. 9

#### Educação, Ciência e Meio Ambiente

- Alfabetização na idade adequada e recomposição de aprendizagem — p. 7
- Ensino médio, técnico e transição para o trabalho — p. 7, 8
- Escola para o século XXI (Tecnologia, IA e pensamento crítico) — p. 7
- Primeira infância e prontidão para aprender — p. 7
- Valorização e apoio aos professores (Formação e carreira) — p. 7

#### Política Externa e Inserção Global

- **Sem tópico publicado pelo TSE neste macrotema.**

#### Direitos Humanos, Equidade e Inclusão Social

- Autonomia econômica das mulheres (Qualificação e crédito) — p. 3
- Governança transversal de proteção (Orçamento e painéis públicos) — p. 3, 4
- Primeira infância como prioridade nacional (Saúde e creches) — p. 3
- Proteção de crianças e adolescentes (Ambiente digital seguro e busca ativa) — p. 3, 4
- Rede nacional de proteção e resposta à violência integrada — p. 3

#### Questão Agrária, Propriedade e Direito à Cidade

- **Sem tópico publicado pelo TSE neste macrotema.**

#### Governança, Transparência e Reformas de Estado

- Federalismo de resultados (Pactos com estados e municípios) — p. 13, 14
- Gestão por metas, evidências e avaliação de programas — p. 13
- Governo digital, simples e integrado (Princípio de dado único) — p. 13
- Integridade, transparência e compras públicas rastreáveis — p. 13
- Serviço público orientado à entrega (Liderança e equipes de missão) — p. 13

### Edmilson Costa (PCB)

#### Economia, Trabalho e Responsabilidade Fiscal

- Impulsionar a jornada de 30 horas semanais sem redução salarial e fim da escala 6x1 — p. 2, 5, 14
- Revogação do arcabouço fiscal, Lei de Responsabilidade Fiscal e leis neoliberais — p. 2, 4, 13
- Nacionalização e estatização do sistema monetário, financeiro e bancário (criação do Banco dos Trabalhadores) — p. 4
- Reestruturação e auditoria da dívida pública com suspensão de juros — p. 4
- Reforma tributária progressiva, com isenção do IR para quem ganha até um salário-mínimo do DIEESE — p. 4, 14
- Petrobras 100% estatal e fim do Preço de Paridade de Importação (PPI) — p. 5, 14, 15

Eixos detectados: estado-mercado=−; fiscal=+; trabalho=−; saúde=−.

#### Saúde Pública e Assistência

- Saúde 100% pública, gratuita e universal, com estatização do setor privado de saúde e fim das OSs — p. 2, 6, 10
- Investimento de 10% do PIB na saúde pública e fortalecimento da atenção básica — p. 6, 10
- Ampliação e consolidação do Complexo Econômico-Industrial da Saúde (CEIS) — p. 6, 10
- Criação dos Conselhos Populares de Saúde em todos os níveis — p. 6, 10
- Fortalecimento do SUS na perspectiva da luta antimanicomial e proibição de comunidades terapêuticas — p. 6, 10

Eixos detectados: estado-mercado=−; saúde=−; governança=−.

#### Segurança Pública e Justiça

- Completa desmilitarização da segurança pública, unificação das polícias e instituição do ciclo completo — p. 6, 12
- Fim da política de "guerra às drogas" e descriminalização do uso (legalização da maconha a curto prazo) — p. 6, 12
- Revogação da Lei Antiterrorismo (12.850/2013) e da Lei Antidrogas — p. 6, 12
- Ocupação de territórios dominados pelo crime organizado com serviços públicos (cultura, saúde e educação) — p. 12, 13

Eixos detectados: segurança=−.

#### Educação, Ciência e Meio Ambiente

- Ensino 100% público e gratuito, das creches à pós-graduação, com estatização do ensino privado — p. 2, 7, 10
- Fim do vestibular nas universidades federais e universalização de cotas (54% para negros e ampla inclusão trans) — p. 2, 7, 10, 12
- Implementação do Piso Salarial Profissional Nacional para a educação básica — p. 7, 10
- Ampliação dos Institutos Federais, Escolas Técnicas e valorização dos profissionais da educação — p. 7, 10

Eixos detectados: estado-mercado=−.

#### Política Externa e Inserção Global

- Combate e denúncia ao imperialismo (OTAN, OEA e Cúpula das Américas) — p. 2, 8, 15, 16
- Solidariedade ativa a Cuba, Palestina, Venezuela, Irã, Saara Ocidental e povos em luta — p. 2, 8, 15, 16
- Rompimento imediato de relações diplomáticas e econômicas com o Estado de Israel — p. 15, 16
- Fortalecimento de blocos de integração regional soberanos, como ALBA e UNASUL — p. 8, 15

Eixos detectados: alinhamento-global=+.

#### Direitos Humanos, Equidade e Inclusão Social

- Combate radical ao machismo, racismo, LGBTfobia, capacitismo e misoginia — p. 2, 6, 11
- Legalização do aborto e garantia de atendimento na rede pública de saúde — p. 11
- Políticas públicas direcionadas à garantia de direitos e emprego para a população Trans e Travesti — p. 11, 12
- Garantia de acessibilidade universal, tecnologia assistiva e combate ao capacitismo para pessoas com deficiência — p. 12

Eixos detectados: direitos=−.

#### Questão Agrária, Propriedade e Direito à Cidade

- Reforma agrária popular com expropriação de latifúndios improdutivos e do agronegócio — p. 2, 6, 9
- Combate rigoroso ao desmatamento, garimpo ilegal e proteção de biomas (Amazônia, Cerrado, Pantanal) — p. 8, 9, 11
- Demarcação integral e titulação de terras indígenas e quilombolas (fim do Marco Temporal) — p. 11, 12
- Incentivo à produção agroecológica e fortalecimento da agricultura familiar — p. 6, 9

#### Governança, Transparência e Reformas de Estado

- Convocação de uma Assembleia Constituinte de Novo Tipo e criação de Conselhos Populares deliberativos — p. 3, 4, 9
- Instituição de Orçamento Popular 100% deliberativo e revogabilidade de mandatos — p. 3, 4
- Democratização radical dos meios de comunicação e regulação das Big Techs — p. 4, 13
- Reforma estrutural do Judiciário com mandatos fixos e revogáveis para tribunais superiores — p. 4, 13

Eixos detectados: governança=−.

### Escritor Augusto Cury (AVANTE)

#### Economia, Trabalho e Responsabilidade Fiscal

- Banco do Empreendedor e Crédito Produtivo — p. 39, 98, 107, 108
- Carga Tributária e Simplificação — p. 37, 38, 42
- Controle Rigoroso e Eficiência de Gastos Públicos — p. 36, 38
- Déficit Público Próximo de Zero — p. 36
- Desenvolvimento de 10 Milhões de Novos Empreendedores — p. 39, 40, 95
- Prevenção ao Desemprego Estrutural (Era da Inteligência Artificial) — p. 95, 96, 121, 122
- Redução Gradual e Sustentável da Dívida Pública — p. 36
- Regularização Fundiária e Patrimonial — p. 40, 105, 106
- Segurança Jurídica e Estabilidade Regulatória — p. 37
- Zonas de Processamento de Exportação (ZPEs) e Corredores Estratégicos — p. 41, 42

Eixos detectados: saúde=−.

#### Saúde Pública e Assistência

- Atenção Primária e Saúde Preventiva — p. 44, 161
- Modernização e Gestão do SUS — p. 44, 161
- Prevenção e Detecção Precoce do Câncer (Projeto SEA) — p. 166
- Programa Nacional de Saúde Mental e Apoio Emocional — p. 44, 45, 163
- Tele Saúde Brasil (Telemedicina em Massa para Desafogar o SUS) — p. 44, 161, 164

Eixos detectados: saúde=−.

#### Segurança Pública e Justiça

- Combate Estruturado às Facções Criminosas e Lavagem de Dinheiro — p. 45, 46, 189
- Cooperação Internacional e Controle de Fronteiras — p. 46, 190
- Criação da Polícia FOCO (Força de Combate Preventivo Municipal) — p. 45, 187
- Programa FATO (Força Alerta Total) — p. 46, 186
- Recriação do Ministério da Segurança Pública — p. 45
- Sistema Penitenciário e Foco em Ressocialização — p. 47
- Tecnologia e Inteligência Artificial aplicadas à Segurança — p. 46, 189

Eixos detectados: segurança=−.

#### Educação, Ciência e Meio Ambiente

- Escolas de Empreendedorismo (Rede Nacional) — p. 39, 75, 106, 107
- Gestão da Emoção nas Escolas (Saúde Emocional) — p. 44, 68, 83
- Novo Ensino Médio Conectado ao Futuro e ao Trabalho — p. 43, 75
- Prioridade Absoluta para a Educação Básica e Alfabetização — p. 43, 68
- Universidades Conectadas à Inovação e Produção de Riqueza — p. 43, 78
- Valorização, Formação e Papel Transformador dos Professores — p. 43, 68

#### Política Externa e Inserção Global

- Diplomacia Climática e Ambiental — p. 59
- Embaixadas Empreendedoras (Modelo 4.0) — p. 59, 146
- Integração Econômica e Comercial Regional e Global — p. 59, 140
- Plano de Combate Mundial da Fome (Make Humanity Great Again) — p. 157
- Proteção de Interesses Estratégicos Nacionais — p. 60

#### Direitos Humanos, Equidade e Inclusão Social

- Autonomia Econômica Feminina e Igualdade Salarial — p. 53, 54, 88
- Brasil Neuroinclusivo (Autismo, TDAH, Dislexia e Altas Habilidades) — p. 81, 83, 84
- Combate à Tirania da Beleza e à Síndrome Comparativa nas Redes — p. 54, 86, 90
- Indicação de Mulheres para o Supremo Tribunal Federal (STF) — p. 56, 92
- Programa Mulheres Vivas (Prevenção e Combate ao Feminicídio) — p. 53, 86
- Proteção Psicológica e Digital de Crianças e Jovens — p. 57, 91

#### Questão Agrária, Propriedade e Direito à Cidade

- Agricultura 4.0 (Inovação, Drones e Irrigação de Precisão) — p. 47, 48, 115
- Agroindústria Brasil (Do Grão à Proteína - 10 Mil Agroindústrias) — p. 40, 126
- BCOO (Brasil Cooperativismo - Dobrar Cooperados) — p. 48, 131
- Desenvolvimento do Semiárido (Projeto Brasil Oásis) — p. 61, 114
- Economia Verde, Hidrogênio Verde e Mercado de Carbono — p. 51, 175
- Floresta Viva - BR (Combate a Incêndios com IA e Drones / Amazônia Viva) — p. 182
- PETRA-BR (Terras Raras e Minerais Estratégicos) — p. 41, 178

#### Governança, Transparência e Reformas de Estado

- Avaliação Permanente de Políticas Públicas e Metas Ministeriais — p. 38, 39
- Combate à Corrupção com Inteligência Artificial e Controle Social (Projeto SEO) — p. 39, 52
- Governo Totalmente Digital e Desburocratização — p. 38, 40
- Implantação do Regime Semipresidencialismo — p. 60, 63
- Reforma Administrativa e Moderna Gestão Pública — p. 36, 37
- Reforma do Supremo Tribunal Federal (Mandatos de 8 anos e 9 ministros) — p. 60, 64

Eixos detectados: governança=+; justiça=+.

### Flavio Bolsonaro (PL)

#### Economia, Trabalho e Responsabilidade Fiscal

- Abertura de empresa — p. 27
- Banco nacional de vagas de emprego — p. 44
- CAIXA - banco da prosperidade — p. 46
- Crédito para empreender — p. 45, 46
- Dívida Pública — p. 29, 33, 7
- Equilíbrio fiscal — p. 71
- Inflação no centro da meta — p. 33
- Minerais críticos — p. 55, 56, 63
- Negociado sobre o legislado — p. 44, 45
- Primeira empresa — p. 45
- Primeiro emprego — p. 43
- Redução de impostos — p. 30, 53, 71, 72
- Redução do custo do trabalho — p. 43, 44
- Reforma Tributária — p. 30, 71, 72
- Reformulação das regras fiscais — p. 70, 71
- Resistir à República Sindical — p. 44, 45
- Trabalhador acima de 50 anos — p. 43, 44

Eixos detectados: tributação=+; fiscal=+; trabalho=+.

#### Saúde Pública e Assistência

- Agendamento ágil por inteligência artificial — p. 25, 26
- Apostas com recurso de programas sociais — p. 32, 33
- Apostas conscientização — p. 32, 33
- Casa Verde e Amarela — p. 47, 48
- Digitalização do SUS — p. 25, 26
- Exames preventivos — p. 37, 38
- Horários ociosos da rede privada — p. 37, 38
- Hospitais universitários federais - modernização — p. 37, 38
- Idosos - Casa segura para envelhecer — p. 38, 39
- Idosos - Instituições de longa permanência — p. 38, 39
- Imunização — p. 37, 38
- INSS sem fila — p. 26, 73
- Pacote antifraude — p. 72, 73
- Prevenção — p. 37, 38
- Programa de atendimento aos idosos — p. 37, 38
- Programas sociais - manutenção — p. 42, 43
- Prontuário eletrônico único — p. 25, 26
- Rede Nacional de Cuidado — p. 21, 38, 39
- Remédio à domicílio — p. 37, 38
- Retorno sem fila pós seguro desemprego — p. 42, 43
- Saúde da família — p. 37, 38
- Saúde mental — p. 38, 39
- Tabela SUS - Correção — p. 37, 38
- Telessaúde — p. 37, 38

#### Segurança Pública e Justiça

- Auxílio às famílias das vítimas — p. 15
- Castração química para estupradores — p. 14
- Facções e crime organizado — p. 13
- Feminicídio - Canais de denúncia — p. 18, 19
- Feminicídio - tolerância zero — p. 14
- Fronteiras — p. 13, 14
- Investimento em segurança pública — p. 15
- Maioridade penal — p. 13
- Presídios — p. 14
- Progressão de pena zero para crimes hediondos — p. 15, 16
- Reconhecimento facial — p. 15
- Retomar áreas sob domínio de facções — p. 47, 48
- Roubo de celular — p. 16
- Tráfico e cocaína nos portos — p. 13, 14, 15

Eixos detectados: segurança=+.

#### Educação, Ciência e Meio Ambiente

- Alfabetização (método fônico) — p. 34, 35
- Altas habilidades — p. 35, 36
- Capacitação contínua de professores — p. 34, 35
- Conectividade nas escolas — p. 24
- Creche - ampliação de vagas — p. 21
- Economia digital no currículo escolar — p. 34, 35, 36
- Ensino superior e inovação — p. 36, 37
- Ensino técnico — p. 36, 37
- Escola em tempo integral — p. 34, 35, 36
- Escola nas férias — p. 34, 35, 36
- Escola sem doutrinação — p. 34, 35, 36
- Escolas cívico-militares — p. 34, 35, 36
- Esporte na escola — p. 40, 41
- Financiamento estudantil — p. 36, 37
- Gestão escolar por resultados — p. 34, 35, 36
- Política Nacional de Formação de Talentos — p. 34, 35, 36
- Reforço escolar - Programa Acolher — p. 34, 35, 36
- Voucher educacional em falta de vagas — p. 34, 35, 36
- Voucher-creche — p. 21

Eixos detectados: educação=+.

#### Política Externa e Inserção Global

- Abertura comercial — p. 62, 63
- Adesão à OCDE — p. 63
- Cadeias globais de valor — p. 62, 63
- Competitividade doméstica — p. 64
- Defesa nacional — p. 62, 63
- Fortalecimento de multinacionais brasileiras — p. 62, 63
- Soberania — p. 61, 62
- Transição energética — p. 62, 63

Eixos detectados: alinhamento-global=+.

#### Direitos Humanos, Equidade e Inclusão Social

- Bônus de internet — p. 18
- Canais de denúncia — p. 18, 19
- Capacitação feminina — p. 20
- Central da Mulher — p. 17, 18
- ClarIA (assistente virtual) — p. 18, 19
- Doenças Raras — p. 38, 39
- Escritura da casa própria — p. 20
- Espaços de acolhimento — p. 20
- Esporte feminino — p. 40, 41
- Ganha, Ganha — p. 19, 20, 46
- Independência financeira — p. 19
- Orientação financeira — p. 19, 33
- Paradesporto — p. 40, 41
- Pessoas com deficiência — p. 38, 39
- Saúde para Elas — p. 21, 22
- Trabalho para elas — p. 20
- Transtorno do Espectro Autista — p. 38, 39

#### Questão Agrária, Propriedade e Direito à Cidade

- Amazônia — p. 58, 59
- Armazenamento de safras — p. 31, 32, 53, 54, 55
- Bioeconomia — p. 57, 58, 59, 60, 61
- Cadastro ambiental rural — p. 54, 55
- Cadastro fundiário e ambiental — p. 27, 28
- Combustíveis sustentáveis de aviação — p. 53, 54, 55
- Conectividade nas áreas rurais — p. 24
- Desenvolvimento sustentável — p. 55, 56, 57, 58, 59
- Direito de propriedade — p. 53, 54, 55
- Fiscalização ambiental — p. 57, 58, 59
- Floresta preservada — p. 57, 58, 59
- Irrigação — p. 27, 28, 53, 54, 55
- Lixão zero — p. 47, 48
- Mercado de carbono — p. 57, 58, 59
- O povo da floresta não é inimigo — p. 57, 58, 59
- Outorgas de irrigação — p. 27, 28
- Pagamento por serviços ambientais — p. 53, 54, 55, 57, 58, 59
- Rastreabilidade de cadeias produtivas — p. 27, 28
- Redução de queimadas / desmatamento — p. 57, 58, 59
- Saneamento básico — p. 47, 48, 57, 58, 59
- Saneamento rural — p. 47, 48
- Segurança alimentar — p. 31, 32, 52, 53, 54, 55
- Seguro rural — p. 31, 32, 53, 54, 55
- Títulos rurais — p. 27, 28, 53, 54, 55
- Transparência de financiadores — p. 57, 58, 59

Eixos detectados: saúde=−.

#### Governança, Transparência e Reformas de Estado

- 100% dos serviços públicos digitalizados — p. 24, 25
- Agências reguladoras — p. 69, 70
- Avaliação de políticas públicas — p. 70, 71
- Combate à corrupção — p. 10, 11, 12, 70
- Corte de Ministérios — p. 69, 70, 71
- Fim da reeleição — p. 66
- Identidade digital única — p. 24, 25
- Judiciário - fim das decisões monocráticas — p. 65, 66
- Processo orçamentário — p. 68, 69, 70, 71
- Profissionalização da gestão pública — p. 69, 70
- Programa Nacional de Desestatização — p. 69, 70
- Reforma Administrativa — p. 69, 70
- Reforma do judiciário — p. 65, 66
- Reforma política — p. 66
- Revisão normativa infralegal — p. 69, 70
- Revogaço regulatório — p. 27, 69, 70
- Tesouraço — p. 68
- Transparência — p. 68, 69, 70, 71, 72, 73

Eixos detectados: justiça=+.

### Hertz Dias (PSTU)

#### Economia, Trabalho e Responsabilidade Fiscal

- Fim da escala 6x1 sem redução de salários e direitos — p. 7, 8
- Redução da jornada de trabalho para 36 horas semanais (rumo ao pleno emprego) — p. 8
- Aumento de 100% no salário mínimo rumo ao piso do DIEESE — p. 8
- Revogação da reforma trabalhista e da lei das terceirizações — p. 8
- Expropriação de grandes empresas estratégicas (Petrobras, Vale, siderurgia e agronegócio exportador) — p. 6, 26
- Controle do sistema financeiro, suspensão do pagamento da dívida pública e auditoria — p. 6, 27, 28

Eixos detectados: trabalho=−; saúde=−.

#### Saúde Pública e Assistência

- Defesa do SUS público, universal, gratuito e 100% estatal — p. 11, 26
- Fim das privatizações, Organizações Sociais (OSs) e Fundações na saúde — p. 11
- Proibição de investimentos públicos em Comunidades Terapêuticas e expansão dos CAPS — p. 11
- Produção pública de medicamentos e insumos estratégicos — p. 11
- Bolsa de um salário mínimo para desempregados enquanto não houver pleno emprego — p. 8

Eixos detectados: estado-mercado=+; saúde=−.

#### Segurança Pública e Justiça

- Desmilitarização da Polícia Militar e unificação das polícias em uma única instituição civil — p. 19
- Fim da Justiça Militar e punição exemplar para crimes praticados por agentes do Estado — p. 19
- Descriminalização das drogas e revogação da Lei Antidrogas — p. 19
- Implantação de câmeras corporais com armazenamento sob controle de órgãos civis — p. 19
- Combate ao crime organizado atingindo seu patrimônio, bancos e redes financeiras — p. 19

Eixos detectados: segurança=−.

#### Educação, Ciência e Meio Ambiente

- Educação 100% pública, laica, gratuita e de qualidade para toda a população — p. 11, 12
- Nenhuma verba pública para empresários da educação (fim de PPPs e terceirizações) — p. 12
- Revogação da BNCC, do Novo Ensino Médio e combate à militarização das escolas — p. 12
- Valorização profissional, carreira e salários dignos para os profissionais da educação — p. 12
- Garantia de permanência estudantil (transporte, alimentação e bolsas) — p. 12

Eixos detectados: estado-mercado=+.

#### Política Externa e Inserção Global

- Ruptura com o imperialismo e recusa a acordos de submissão (EUA, Europa e China) — p. 3, 4
- Defesa da soberania nacional sobre recursos estratégicos e recusa ao tarifaço externo — p. 3, 4
- Oposição a tratados que transformam o Brasil em exportador exclusivo de commodities — p. 4

#### Direitos Humanos, Equidade e Inclusão Social

- Criminalização da LGBTfobia, da misoginia e do racismo — p. 19, 21, 23
- Legalização do aborto e garantia de atendimento seguro pelo SUS — p. 22
- Cotas trans nas universidades e concursos públicos, combatendo o apartheid trans — p. 23, 24
- Combate ao capacitismo e garantia de acessibilidade universal e intérprete de Libras — p. 24
- Fim da violência contra a mulher, criação de casas-abrigo e delegacias 24h — p. 21

Eixos detectados: saúde=−; direitos=−.

#### Questão Agrária, Propriedade e Direito à Cidade

- Reforma agrária com expropriação dos grandes latifúndios e do agronegócio sem indenização — p. 15, 17
- Demarcação imediata de terras indígenas e titulação de territórios quilombolas — p. 14, 15
- Fim dos subsídios públicos e créditos ao grande agronegócio predatório — p. 14, 17
- Proibição da exploração de petróleo na Margem Equatorial e defesa rigorosa dos biomas — p. 14, 15
- Apoio à agroecologia e fortalecimento da soberania alimentar — p. 16

#### Governança, Transparência e Reformas de Estado

- Construção de um governo socialista da classe trabalhadora sem capitalistas — p. 28, 29, 30
- Estabelecimento de um Estado operário revolucionário baseado na democracia operária — p. 31
- Organização de conselhos populares e comitês de base nos locais de trabalho, estudo e moradia — p. 30, 31
- Soberania digital com proibição de hospedagem de dados governamentais em nuvens estrangeiras — p. 8, 27

Eixos detectados: governança=−.

### Leonardo Avalanche (PRTB)

#### Economia, Trabalho e Responsabilidade Fiscal

- Substituição de múltiplos tributos por um Imposto Único de 3,5% sobre tudo — p. 4, 5, 6
- Financiamento de veículos sem imposto e redução de taxas para motoristas de aplicativo — p. 11, 12
- IPVA fixo de R$ 50 mensais para carros de passeio e isenção total para caminhoneiros — p. 18
- Desoneração fiscal para reindustrializar o país e processar minerais estratégicos — p. 21, 22
- Programa "Crédito Raiz" com linhas específicas por porte para produtores rurais — p. 24, 25
- Plano de investimentos em infraestrutura para ferrovias e hidrovias — p. 26, 27
- Desoneração para a produção nacional de veículos e carros elétricos — p. 30, 31
- Programa "Meu Primeiro Emprego" com complemento do custo salarial pelo governo — p. 42

Eixos detectados: tributação=+.

#### Saúde Pública e Assistência

- Mutirões e parcerias com hospitais privados para zerar a fila do SUS — p. 9, 10
- Uso de inteligência artificial para monitorar o estoque de remédios em tempo real — p. 9
- Atenção especializada à saúde da mulher (climatério e menopausa) e ampliação de geriatras — p. 9
- Criação de plano de saúde exclusivo para motoristas de aplicativo — p. 12
- Rede "Respira", com centros de saúde mental exclusivos e acolhedores para a juventude — p. 43
- Universalização da água tratada e coleta de esgoto como prevenção de doenças — p. 45, 46

#### Segurança Pública e Justiça

- Criação do Sistema Único Nacional de Segurança integrando bases policiais e antecedentes — p. 13
- Integração de câmeras e reconhecimento facial para combate a roubos — p. 13
- Endurecimento de penas e isolamento total de líderes de facções em presídios — p. 13, 14
- Aumento real do orçamento de defesa e modernização das Forças Armadas — p. 28, 29
- Aumento de penas e identificação técnica automática contra a exploração sexual infantil — p. 39, 40, 41

Eixos detectados: segurança=+.

#### Educação, Ciência e Meio Ambiente

- Qualificação em empreendedorismo digital com distribuição de iPhones e internet — p. 7
- Ensino tecnológico, IA e educação financeira integrados nas escolas públicas — p. 15
- Fluência em inglês via imersão e tecnologia celular, além de foco em inteligência emocional — p. 16
- Recomposição de orçamento para Capes/CNPq e foco em um polo tecnológico mundial — p. 19
- Regulamentação e fiscalização do ensino domiciliar (homeschooling) — p. 16, 42
- "Crédito Nacional de Qualificação" para educação contínua de jovens adultos — p. 44

Eixos detectados: educação=+.

#### Política Externa e Inserção Global

- Atração de capital e fábricas estrangeiras através de uma carga tributária competitiva — p. 6
- Desenvolvimento de vacinas e biotecnologia nacional para exportação — p. 19, 20
- Proteção para resguardar riquezas estratégicas e a "Amazônia Azul" perante o mundo — p. 28, 29
- Atração de montadoras globais para produção e nacionalização de veículos elétricos — p. 30, 31

#### Direitos Humanos, Equidade e Inclusão Social

- Inclusão digital via ferramenta de trabalho sem corte de benefício social — p. 7
- Rede "Abraço Azul" com creches especializadas, apoio jurídico e psicológico (mães atípicas) — p. 34, 35
- Expansão de casas de abrigo, combate ao feminicídio e proteção patrimonial a idosos — p. 36, 37
- Lei nacional para criação de vagões exclusivos para mulheres no transporte público urbano — p. 37
- Restrição da categoria feminina em competições esportivas via critério biológico/genético — p. 37
- Programa "Nunca Mais Sozinha" de acompanhamento contínuo a crianças vítimas de abuso — p. 40, 41

#### Questão Agrária, Propriedade e Direito à Cidade

- Investimento pesado em fábricas nacionais de fertilizantes (potássio, fósforo) — p. 24
- Vigilância integral da Amazônia por drones contra desmatamento, garimpo ilegal e poluição — p. 28
- Regularização de saneamento em áreas de ocupação com reassentamento seguro — p. 45, 46
- Modernização da coleta seletiva, incineração sustentável de lixo e valorização de catadores — p. 45, 46, 47

Eixos detectados: saúde=−.

#### Governança, Transparência e Reformas de Estado

- Combate à corrupção e desvios de recursos através de auditoria e gestão tecnológica no SUS — p. 10
- Redução da lentidão do Judiciário com mutirões e garantias de estabilidade contratual — p. 32, 33
- Criação de órgão externo independente para fiscalizar casos de assédio em empresas — p. 37, 38
- Banimento de plataformas que não bloquearem ativamente conteúdos ilícitos e abuso infantil — p. 39, 40
- Obrigatoriedade de transparência algorítmica para redes sociais (menores de 14 anos) — p. 43
- Capacitação técnica do governo federal a pequenos municípios para obras de saneamento — p. 45

Eixos detectados: saúde=−.

### Lula (PT)

#### Economia, Trabalho e Responsabilidade Fiscal

- Arcabouço fiscal e responsabilidade fiscal — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 11, 47, 48, 49
- Desenrola Brasil e renegociação de dívidas — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 57, 58
- Economia popular e solidária (Lei Paul Singer) — p. 73, 74, 75, 76, 77
- Fim da escala 6x1 e redução da jornada (40h) — p. 73, 74, 75, 76, 77
- Infraestrutura e logística (Novo PAC) — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 63, 64, 65, 66, 67, 68, 69
- Micro, pequenas e médias empresas (fomento e crédito) — p. 57, 58
- Nova Indústria Brasil (NIB) e neoindustrialização — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 47, 48, 49, 50, 51, 52, 53, 54, 63, 64, 65, 66, 67, 68, 69, 77, 78, 79, 80, 81, 82
- Plano de Transformação Ecológica (PTE) — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 50, 51, 52
- Reforma tributária — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 47, 48, 55, 56, 57, 58
- Trabalho por aplicativos e economia digital — p. 54, 55, 74, 75
- Valorização do salário-mínimo — p. 18, 19, 20, 21, 22, 23, 24, 25, 26, 73, 74, 75, 76, 77

Eixos detectados: fiscal=+; trabalho=−.

#### Saúde Pública e Assistência

- Atenção especializada e redução de filas (Agora tem Especialistas) — p. 34, 35, 36, 37, 38, 39, 40
- Complexo Econômico e Industrial da Saúde (CEIS) — p. 34, 35, 36, 37, 38, 39, 40
- Cuidados e corresponsabilização (Política Nacional de Cuidados) — p. 18, 19, 20, 21, 22, 23, 24, 25, 26
- Farmácia Popular e distribuição de medicamentos — p. 34, 35, 36, 37, 38, 39, 40
- Mais Médicos e fixação de profissionais — p. 34, 35, 36, 37, 38, 39, 40
- Saúde da mulher e dignidade menstrual — p. 34, 35, 36, 37, 38, 39, 40
- Saúde mental (CAPS) — p. 18, 19, 20, 21, 22, 23, 24, 25, 26, 34, 35, 36, 37, 38, 39, 40
- Saúde bucal (Brasil Sorridente) — p. 34, 35, 36, 37, 38, 39, 40
- Sistema Único de Assistência Social (SUAS) — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 25
- Vacinação (recuperação das coberturas vacinais) — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 34, 35, 36

#### Segurança Pública e Justiça

- Asfixia financeira do crime organizado — p. 26, 27, 28, 29, 30
- Controle de armas de fogo — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 26, 27, 28, 29, 30
- Crimes financeiros, cibernéticos e Celular Seguro — p. 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
- Enfrentamento da violência contra a mulher — p. 18, 19, 20, 21, 22, 23, 24, 25, 26, 29
- Fronteiras e segurança na Amazônia — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 26, 27, 28, 29, 30, 77, 78, 79, 80, 81, 82
- Ministério da Segurança Pública — p. 26, 27, 28, 29, 30
- Sistema prisional e penitenciário (Plano Pena Justa) — p. 26, 27, 28, 29, 30
- Sistema Único de Segurança Pública (SUSP) e inteligência — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 26, 27, 28, 29, 30

Eixos detectados: saúde=−; armas=−.

#### Educação, Ciência e Meio Ambiente

- Alfabetização (Compromisso Nacional Criança Alfabetizada) — p. 30, 31, 32, 33, 34
- Ciência, Tecnologia e Inovação — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 50, 51, 52
- Creches e educação infantil — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 34
- Ensino médio (Pé-de-Meia) — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 30, 31, 32, 33, 34
- Ensino técnico e Institutos Federais — p. 30, 31, 32, 33, 34
- Ensino superior (expansão, ProUni, FIES, hospitais universitários) — p. 18, 19, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 34
- Escola em tempo integral — p. 18, 19, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 34
- Professores (valorização e formação) — p. 30, 31, 32, 33, 34

#### Política Externa e Inserção Global

- Aliança Global contra a Fome e a Pobreza — p. 58, 59, 60, 61, 62, 63, 77, 78, 79, 80, 81, 82
- COP30, Fundo Florestas Tropicais e diplomacia climática — p. 69, 70, 71, 72, 73, 77, 78, 79, 80, 81, 82
- Defesa Nacional e Base Industrial de Defesa — p. 6, 7, 8, 9, 10, 11, 12, 13, 14, 77, 78, 79, 80, 81, 82
- Integração sul-americana (Mercosul, OTCA, UNASUL) — p. 77, 78, 79, 80, 81, 82
- Multilateralismo (ONU, OMC, FMI) e BRICS — p. 77, 78, 79, 80, 81, 82
- Relações com África, Ásia, Oriente Médio e Sul Global — p. 77, 78, 79, 80, 81, 82

Eixos detectados: alinhamento-global=−.

#### Direitos Humanos, Equidade e Inclusão Social

- Combate ao racismo e cotas raciais — p. 18, 19, 20, 21, 22, 23, 24, 25, 26
- Cultura (Fomento, Lei Rouanet, Aldir Blanc, Cultura Viva) — p. 40, 41, 42, 43, 44
- Esporte (Bolsa Atleta, Arenas Brasil) — p. 43, 44
- Mulheres (autonomia, combate ao machismo e igualdade salarial) — p. 18, 19, 20, 21, 22, 23, 24, 25, 26
- Pessoas com deficiência (Viver sem Limites, educação inclusiva) — p. 18, 19, 20, 21, 22, 23, 24, 25, 26
- Pessoas idosas (Atenção domiciliar, envelhecimento ativo) — p. 18, 19, 20, 21, 22, 23, 24, 25, 26
- População LGBTQIAP+ — p. 18, 19, 20, 21, 22, 23, 24, 25, 26
- Povos indígenas e quilombolas (direitos e demarcação) — p. 18, 19, 20, 21, 22, 23, 24, 25, 26

Eixos detectados: direitos=−.

#### Questão Agrária, Propriedade e Direito à Cidade

- Agricultura familiar (Plano Safra, Pronaf) — p. 58, 59, 60, 61, 62, 63
- Agronegócio (financiamento e sustentabilidade) — p. 58, 59, 60, 61, 62, 63
- Biocombustíveis (Combustível do Futuro) — p. 63, 64, 65, 66, 67, 68, 69
- Desmatamento líquido zero e combate a incêndios — p. 69, 70, 71, 72, 73
- Fundo Amazônia e Fundo Clima — p. 55, 56, 57, 69, 70, 71, 72, 73
- Mercado de carbono e Sistema Brasileiro de Comércio de Emissões — p. 50, 51, 52, 69, 70, 71, 72, 73
- Reforma agrária e regularização fundiária — p. 58, 59, 60, 61, 62, 63
- Transição energética e energias renováveis (eólica, solar, hidrogênio) — p. 63, 64, 65, 66, 67, 68, 69

Eixos detectados: saúde=−; terra=−.

#### Governança, Transparência e Reformas de Estado

- Compras públicas (poder de compra do Estado) — p. 16, 17, 18
- Controle, integridade e combate à corrupção — p. 16, 17, 18
- Emendas parlamentares (transparência e debate) — p. 15, 16
- Estado digital, infraestrutura de dados e serviços integrados — p. 16, 17, 18
- Participação social (Conferências, Conselhos, PPA) — p. 15, 16
- Portal da Transparência — p. 16, 17, 18
- Regulação de redes sociais e plataformas digitais — p. 5, 16

### Renan Santos (MISSÃO)

#### Economia, Trabalho e Responsabilidade Fiscal

- Ajuste fiscal e desindexação de despesas (PEC de Transição / PEC do Equilíbrio Fiscal) — p. 9, 10
- Desvinculação de pisos de saúde, educação e Fundeb — p. 10
- Frentes Cidadãs (substituição do Bolsa Família por trabalho remunerado em prol da comunidade) — p. 20, 21, 22
- Reforma do funcionalismo público e combate a supersalários — p. 9, 10
- Reformas microeconômicas, justiça tributária, regulação financeira e legislação trabalhista — p. 20, 21, 22
- Revisão de renúncias fiscais (gastos tributários) e abono salarial — p. 10

Eixos detectados: fiscal=+.

#### Saúde Pública e Assistência

- Escala Nacional de Estratificação de Risco (ENER / Sistema de fila viva focada em prioridade de gravidade) — p. 25, 26
- Fundo Nacional de Modernização do Acesso (FNMA) com repasses condicionados — p. 26
- Integração do Projeto Genomas Brasil ao Prontuário Eletrônico — p. 26
- Modelo Hub-and-Spoke para centralização de demandas complexas em centros regionais — p. 26
- Prontuário Eletrônico Nacional Interoperável (PRONTO) e telessaúde com inteligência artificial (modelo DoctorSV) — p. 25, 26

#### Segurança Pública e Justiça

- Direito Penal do Inimigo (DPI) como framework jurídico e decretação da Guerra ao Crime — p. 11, 12, 13
- Inversão do ônus da prova e confisco de bens de faccionados (presunção de ilicitude) — p. 12
- Superpresídios de segurança máxima em regiões remotas (modelo CECOT) — p. 11, 13
- Tecnologia urbana preditiva (drones, reconhecimento facial e totens de denúncia) — p. 13
- Uso de Garantia da Lei e da Ordem (GLO) e Estado de Defesa para retomada territorial — p. 12, 13

Eixos detectados: segurança=+.

#### Educação, Ciência e Meio Ambiente

- Alfabetização universal com base no método fônico — p. 30, 31, 32
- Código de conduta disciplinar estudantil com punições objetivas e ranking de disciplina — p. 31, 32
- Escolas civis-militares em áreas de alta criminalidade — p. 31, 32
- Reforma do ensino superior (Foco em STEM e substituição de cotas por bolsas de mérito) — p. 21, 30, 31, 32

#### Política Externa e Inserção Global

- Atuação como Árbitro do Sul Global (diplomacia ativa na África, Ásia e América Latina) — p. 44, 45, 46
- Autonomia completa do ciclo de combustível nuclear e reprocessamento (Ativo de dissuasão) — p. 46
- Pacto Interamericano contra o narcotráfico transnacional — p. 44, 45, 46
- Pragmatismo institucional em política externa (Distanciamento de alinhamentos puramente ideológicos) — p. 45, 46
- Segurança de fronteiras e expansão tecnológica do SISFRON — p. 46

Eixos detectados: alinhamento-global=−.

#### Direitos Humanos, Equidade e Inclusão Social

- A Batalha do Brasil (Plano de desfavelização integral em 10 anos) — p. 48, 49, 50
- Cadastro Fundiário Unificado Nacional e Título de desfavelização (mortgage social) — p. 49
- Código unificado de imprensa e defesa firme da liberdade de expressão — p. 29, 30
- Revisão do fomento à cultura (Teto progressivo na Lei Rouanet e incentivo a novos talentos) — p. 27, 28, 29
- Reunificação do Ministério da Cultura com o Ministério da Educação — p. 27, 28, 29

#### Questão Agrária, Propriedade e Direito à Cidade

- AgroBrasil 2030 (Segurança jurídica e fim das invasões de propriedade rural) — p. 41, 42, 43
- Auditoria de produtividade nos assentamentos de reforma agrária (condicionante para destinação) — p. 41, 42
- Soberania em fertilizantes e licenciamento acelerado para minerais estratégicos (Plano Nacional de Fertilizantes) — p. 41, 42
- Zonas Econômicas Especiais (ZEEs) para terras raras, transição verde, semicondutores e defesa — p. 34, 35, 36, 37, 38, 39, 40

Eixos detectados: terra=−.

#### Governança, Transparência e Reformas de Estado

- Cláusula Antimáfia (Dissolução judicial de administrações locais infiltradas por facções) — p. 17, 18
- Comissariado Federal de Gestão Pública e fiscalização em tempo real (pari passu) — p. 17, 18
- Grande Consolidação Municipal (Fusão de municípios fiscalmente inviáveis) — p. 14, 15, 16
- Lei de Responsabilidade Gerencial (Metas de desempenho atreladas ao financiamento partidário) — p. 17, 18

### Ronaldo Caiado (PSD)

#### Economia, Trabalho e Responsabilidade Fiscal

- Agenda nacional de produtividade — p. 14
- Crescimento (Estratégia Brasil 2040) — p. 14
- Despesas obrigatórias (controle) — p. 12
- Estabilização fiscal — p. 12
- Indústria (reindustrialização e transição) — p. 42, 43
- Infraestrutura e logística — p. 46
- Investimento público e privado — p. 13, 14
- Mercado de trabalho (modernização) — p. 15
- Micro e pequenas empresas (fortalecimento) — p. 15
- Mineração estratégica — p. 53
- Orçamento da Verdade — p. 12
- Revisão de subsídios e benefícios tributários — p. 12

#### Saúde Pública e Assistência

- Assistência social e Sistema Único de Assistência Social (SUAS) — p. 61, 63
- Atenção Primária — p. 78
- Câncer (Rede contra o câncer) — p. 80
- Crianças e Adolescentes (Prioridade Absoluta) — p. 62
- Doenças raras — p. 93
- Fila transparente e regulação inteligente — p. 77
- Hospital inteligente (SUS digital) — p. 89
- Infância (Saúde da) — p. 82
- Longevidade e idosos — p. 83
- Política e proteção social — p. 61
- Saúde mental — p. 84
- Transferência de renda — p. 61
- Vacinas, vigilância e resposta a emergências — p. 88

Eixos detectados: saúde=−.

#### Segurança Pública e Justiça

- Asfixia financeira do crime organizado — p. 17
- Combate à corrupção — p. 20
- Controle do sistema penitenciário (REDAD) — p. 18
- Cooperação sul-americana (SULPOL) — p. 18
- Defesa Nacional e Soberania — p. 30
- Enriquecimento ilícito (Lei do) — p. 20
- Fronteiras, portos e aeroportos — p. 18
- Inteligência criminal (Sistema Nacional) — p. 17
- Jogos e apostas on-line (regulamentação) — p. 19
- Maioridade penal (redução) — p. 20
- Ministério da Segurança Pública — p. 16
- Terrorismo doméstico (Lei do) — p. 17
- Violência contra mulheres e crianças — p. 19

#### Educação, Ciência e Meio Ambiente

- Alfabetização na idade certa (Pacto Nacional) — p. 32
- Ciência, Tecnologia e Inovação — p. 25
- Conectividade significativa — p. 26
- Ensino médio com flexibilidade — p. 33
- Ensino superior e inovação — p. 33
- Escola em tempo integral — p. 33
- Inteligência artificial (desenvolvimento e uso) — p. 26
- Primeira infância (creches) — p. 32
- Professores e liderança escolar — p. 33
- Recomposição de aprendizagens — p. 32

#### Política Externa e Inserção Global

- Acordos comerciais (Mercosul-União Europeia) — p. 73
- Ásia, África e Indo-Pacífico (mercados) — p. 73
- Diplomacia ambiental — p. 51
- Diplomacia de Defesa — p. 74
- Diplomacia econômica e atração de investimentos — p. 74
- Integração sul-americana — p. 74
- Multilateralismo (ONU, OMC, G20, BRICS, OCDE) — p. 74
- Relações exteriores (Estratégia de Inserção) — p. 72

#### Direitos Humanos, Equidade e Inclusão Social

- Combate ao Racismo (metas de equidade) — p. 67
- Comunidades quilombolas — p. 68
- Cultura (acesso e financiamento) — p. 28
- Esporte e paradesporto (inclusão) — p. 39, 40
- Igualdade salarial e proteção no trabalho — p. 59
- Liberdade religiosa — p. 68
- Mulheres (proteção, saúde e igualdade) — p. 58
- Pessoas com deficiência (inclusão) — p. 62
- População em situação de rua — p. 62
- Povos indígenas (direitos e saúde) — p. 68, 86

Eixos detectados: direitos=−.

#### Questão Agrária, Propriedade e Direito à Cidade

- Agricultura de baixo carbono e bioinsumos — p. 22, 23
- Agronegócio (financiamento e sustentabilidade) — p. 22
- Biocompetitividade — p. 22
- Código Florestal e regularização (CAR) — p. 23, 51
- Combate a incêndios, grilagem e desmatamento — p. 51
- Energia (transição, biocombustíveis e fontes limpas) — p. 35, 37
- Licenciamento ambiental (previsibilidade) — p. 47, 50
- Meio ambiente (Pacto Nacional) — p. 50
- Mercado de carbono — p. 51
- Nordeste (segurança hídrica e desenvolvimento) — p. 64
- Pagamento por Serviços Ambientais — p. 51
- Região Amazônica (governança, bioeconomia e proteção) — p. 69

Eixos detectados: saúde=−.

#### Governança, Transparência e Reformas de Estado

- Centro de Governo (coordenação) — p. 9, 100
- Emendas parlamentares (transparência e reordenação) — p. 9, 11, 13
- Estado digital e serviços integrados — p. 6, 27
- Fim da reeleição no Poder Executivo — p. 8
- Maioria de programa (Pacto Nacional) — p. 8, 9
- Padrões de integridade e transparência — p. 11, 20
- Plano Plurianual (PPA) orientado a missões — p. 100
- Profissionalização da alta administração — p. 9
- Reforma do sistema político e partidário — p. 10
- Rastreabilidade do financiamento político — p. 10

### Rui Costa Pimenta (PCO)

#### Economia, Trabalho e Responsabilidade Fiscal

- Aumento emergencial de 50% nos salários e reposição integral de 100% das perdas — p. 2
- Auxílio-desemprego igual ao último salário recebido — p. 2
- Bolsa Família de pelo menos um salário mínimo — p. 2
- Anulação de todas as dívidas dos trabalhadores com o sistema financeiro — p. 2
- Escala móvel dos salários (reajuste automático a cada 3% de inflação) — p. 2
- Fim da "independência" do Banco Central e cancelamento das dívidas externa e interna — p. 6
- Fim dos impostos sobre o consumo e os salários (tributação restrita a lucros e grandes fortunas) — p. 6
- Nacionalização do petróleo e Petrobrás 100% estatal sob o controle dos trabalhadores — p. 3
- Reajuste das aposentadorias e pensões e fim dos privilégios de oficiais militares e juízes — p. 3
- Redução da jornada de trabalho para no máximo 7 horas diárias e 35 horas semanais — p. 2
- Redução imediata de 50% no preço dos combustíveis e fim da paridade com o dólar — p. 3
- Reestatização de empresas privatizadas (Eletrobrás, Vale, bancos, telefonia) — p. 3
- Restabelecimento integral da CLT, fim da terceirização e proibição de demissões — p. 2, 3
- Salário mínimo vital correspondente às necessidades básicas (mínimo de R$ 7.500) — p. 2
- Estatização do sistema financeiro (criação de um banco estatal único) — p. 6

Eixos detectados: tributação=−; trabalho=−.

#### Saúde Pública e Assistência

- Abertura imediata de centenas de cursos de medicina e enfermagem sem vestibular nas universidades públicas — p. 5
- Fim do teto de gastos, da Lei de Responsabilidade Fiscal e do congelamento de gastos públicos — p. 4
- Mais verbas para a saúde pública sem limite de gastos para salvar vidas — p. 5
- Plano de emergência para construção de hospitais e postos de saúde em todo o país — p. 5
- Piso salarial de R$ 8 mil para os profissionais da saúde — p. 5
- Proibição de despejos e de cortes de serviços essenciais (água, luz e gás) para desempregados — p. 2
- Volta do programa Mais Médicos e validação imediata de diplomas de médicos brasileiros e estrangeiros — p. 5

Eixos detectados: fiscal=+; saúde=−.

#### Segurança Pública e Justiça

- Direito de autodefesa para os trabalhadores da cidade, do campo e dos povos indígenas — p. 5, 6
- Dissolução da Polícia Militar e de todo o aparato repressivo do Estado — p. 5
- Formação de comitês de autodefesa dos trabalhadores nas cidades, campos e comunidades de índios — p. 5

#### Educação, Ciência e Meio Ambiente

- Abaixo a censura e fim da proibição do uso de celulares nas escolas — p. 5
- Eleição direta de diretores e de todos os postos de gestão escolar e universitária — p. 4
- Estatização de todo o ensino privado (ensino pago) — p. 5
- Fim dos vestibulares e garantia de livre ingresso nas universidades públicas — p. 5
- Governo tripartite (estudantes, professores e funcionários) nas Universidades — p. 5
- Jornada de trabalho máxima de 30 horas semanais para os professores — p. 5
- Mais verbas para a educação, destinando recursos públicos exclusivamente para o ensino público — p. 5
- Piso salarial nacional dos professores de pelo menos R$ 8,5 mil — p. 5
- Revogação de todas as "reformas" contra a educação e o ensino público — p. 5

Eixos detectados: estado-mercado=−; educação=−.

#### Política Externa e Inserção Global

- Defesa dos povos que se levantam contra o imperialismo (Palestina, Irã, Rússia, Cuba, Nicarágua, Venezuela) — p. 7
- Fora o imperialismo da Amazônia e de toda a América Latina — p. 7
- Luta contra a ingerência dos Estados Unidos e da OEA na região — p. 7

#### Direitos Humanos, Equidade e Inclusão Social

- Combate à especulação imobiliária, proibição de despejos e desocupações — p. 4
- Passe livre nos transportes para desempregados e trabalhadores da economia informal — p. 2

#### Questão Agrária, Propriedade e Direito à Cidade

- Assentamento imediato dos milhões de trabalhadores sem-terra acampados no país — p. 4
- Demarcação e posse de terras para os povos indígenas, com expulsão de latifundiários invasores — p. 4
- Punição dos latifundiários e responsáveis por assassinatos de trabalhadores e lideranças rurais — p. 4

#### Governança, Transparência e Reformas de Estado

- Fim da ditadura do Judiciário e extinção do Supremo Tribunal Federal (STF) — p. 6
- Cancelamento da concessão da Rede Globo e dos grandes meios de comunicação (fim do "PIG") — p. 6
- Cancelamento de leis restritivas à organização política, como a "ficha limpa" e a "cláusula de barreira" — p. 6
- Eleição de todos os juízes e procuradores pelo voto popular com mandatos revogáveis — p. 6
- Governo das organizações operárias e camponesas, sem patrões e sem golpistas — p. 7
- Fim de privilégios de oficiais militares, juízes e de seus familiares — p. 3
- Internet gratuita para toda a população — p. 6
- Liberdade irrestrita de expressão na imprensa, na internet e nas ruas (abaixo a censura e a "Lei Felca") — p. 6
- Revogação imediata de todas as "reformas" antipopulares contra os trabalhadores da ativa e aposentados — p. 3

Eixos detectados: estado-mercado=+.

### Samara (UP)

#### Economia, Trabalho e Responsabilidade Fiscal

- Aumento de 100% no Salário Mínimo e Reajuste — p. 8, 9
- Controle Popular e Planificação Democrática da Economia — p. 7, 9, 56
- Fim da Escala 6x1 e Implementação da Escala 4x3 (Jornada de 30h/36h) — p. 7, 9, 10
- Frentes Emergenciais de Trabalho e Emprego Público — p. 10, 11, 12
- Nacionalização dos Bancos e Estatização do Sistema Financeiro — p. 17, 18
- Regulamentação do Trabalho em Aplicativos e Fim do Domínio Estrangeiro — p. 11, 13
- Reindustrialização Nacional e Cadeias Produtivas Completas — p. 7, 11, 56, 63
- Revogação do Arcabouço Fiscal, da Reforma Trabalhista e da Previdenciária — p. 9, 12, 13
- Suspensão Imediata e Auditoria Cidadã da Dívida Pública — p. 14, 15, 16
- Tributação Progressiva, Imposto sobre Grandes Fortunas e Isenção para Baixa Renda — p. 16, 17

Eixos detectados: estado-mercado=−; tributação=−; trabalho=−; saúde=−.

#### Saúde Pública e Assistência

- Combate e Fim da Exploração dos Planos de Saúde Privados — p. 19, 20
- Fim das Organizações Sociais de Saúde (OSS) e Gestão 100% Estatal — p. 20
- Obrigatoriedade de Uso do SUS por Agentes Políticos — p. 13
- Saúde Indígena Pública e Respeito às Práticas Tradicionais — p. 36
- Soberania Farmacêutica e Produção Nacional de Remédios e Vacinas — p. 20
- Valorização dos Trabalhadores da Saúde e Pisos Salariais — p. 20

Eixos detectados: saúde=−.

#### Segurança Pública e Justiça

- Assembleias Populares de Segurança (Substituição dos Conselhos Comunitários) — p. 49
- Combate ao Genocídio da Juventude Negra e Periférica — p. 30, 32, 48
- Desmilitarização das Polícias e Unificação sob Estrutura Civil — p. 48
- Fim da Política de "Guerra às Drogas" e Foco na Saúde Pública — p. 48
- Reformulação do Sistema Prisional (Unidades de Reeducação) — p. 49, 50

Eixos detectados: saúde=−; segurança=−.

#### Educação, Ciência e Meio Ambiente

- Abolição do Vestibular e Livre Acesso ao Ensino Técnico e Superior — p. 21
- Anistia das Dívidas do FIES e Estatização de Conglomerados Educacionais — p. 22
- Destinação de no Mínimo 10% do PIB para a Educação Pública — p. 22
- Erradicação do Analfabetismo — p. 22
- Investimento em Ciência, Tecnologia e Soberania Nacional — p. 7, 23
- Revogação do Novo Ensino Médio e das Reformas Empresariais — p. 22

Eixos detectados: estado-mercado=−; educação=−.

#### Política Externa e Inserção Global

- Anti-imperialismo e Defesa da Autodeterminação dos Povos — p. 4, 5, 64, 65
- Proibição da Remessa de Recursos Financeiros ao Exterior Sem Autorização Estatal — p. 57
- Rompimento de Relações com o Estado de Israel (Causa Palestina) — p. 65
- Rompimento de Tratados de Submissão com EUA, OTAN ou China — p. 65
- Solidariedade Internacionalista com Cuba, Venezuela, Irã, Iêmen e Saara Ocidental — p. 5, 65

#### Direitos Humanos, Equidade e Inclusão Social

- Combate ao Machismo, Violência de Gênero e Descriminalização do Aborto — p. 26, 27, 28
- Combate ao Racismo, Reparação Histórica e Cumprimento das Leis 10.639 e 11.645 — p. 31, 32
- Enfrentamento à LGBTfobia e Criação de Casas de Acolhimento — p. 32, 33
- Garantia de Direitos das Pessoas com Deficiência e Luta Anticapacitista — p. 34, 35
- Rede Pública de Cuidados (Creches, Lavanderias e Restaurantes Populares) — p. 28

Eixos detectados: direitos=−.

#### Questão Agrária, Propriedade e Direito à Cidade

- Combate ao Desmatamento, Garimpo Ilegal e Agrotóxicos Banidos — p. 35, 62, 63
- Demarcação Imediata e Proteção de Terras Indígenas e Quilombolas — p. 32, 35, 36, 61, 63
- Estatização e Passe Livre no Transporte Público (Tarifa Zero) — p. 30, 51, 52
- Expropriação de Terras com Trabalho Escravo ou Cultivo Ilegal — p. 44
- Fim da Especulação Imobiliária e Desapropriação de Imóveis Ociosos — p. 45, 46
- Reforma Agrária Popular e Limitação do Monopólio da Terra — p. 43, 44, 45
- Reforma Urbana e Produção Pública de Moradias — p. 45, 46

Eixos detectados: estado-mercado=−; ambiente=−; terra=−.

#### Governança, Transparência e Reformas de Estado

- Combate Radical à Corrupção e Confisco de Bens de Corruptos e Sonegadores — p. 24, 25
- Conselhos Populares com Poder Orçamentário e Democracia Direta — p. 37
- Democratização e Socialização dos Meios de Comunicação (TV, Rádios e Sites) — p. 37, 38
- Eleição Direta para Juízes e Tribunais Superiores — p. 49
- Fim das Doações Empresariais e do Lobby Corporativo em Campanhas — p. 25, 36
- Fim dos Altos Salários e Privilégios no Setor Público (Políticos e Juízes) — p. 13, 49
- Reestatização de Estatais Privatizadas (Eletrobras, Petrobras, Vale, etc.) — p. 58, 59, 60
- Revisão da Lei da Anistia e Punição a Torturadores e Golpistas — p. 53, 54

Eixos detectados: governança=−.

### Veterinário Wilson Grassi (DEMOCRATA)

#### Economia, Trabalho e Responsabilidade Fiscal

- Abertura, alteração e baixa de empresa (ambiente único digital) — p. 20
- Contribuição patronal sobre a folha (extinção) — p. 8, 13, 14, 19
- Custo de conformidade tributária e obrigações acessórias — p. 5, 8, 13, 14, 15, 16, 18
- Desoneração da folha de pagamento — p. 13, 14, 15, 19, 20
- Imposto de Renda da Pessoa Física (isenção até 5 salários mínimos) — p. 8, 9
- Imposto Único Federal (IUF sobre movimentação financeira) — p. 8, 9, 10
- Microempreendedor individual (MEI) e pequeno negócio — p. 20
- Qualificação profissional com destino (demanda regional) — p. 20

Eixos detectados: tributação=+.

#### Saúde Pública e Assistência

- Atenção primária como prioridade orçamentária — p. 34, 35
- Fila cirúrgica e diagnóstica (fila única e pública) — p. 34
- Medicamentos e insumos estratégicos (produção nacional) — p. 34
- Prontuário eletrônico integrado entre os níveis de atenção — p. 34
- Saúde Única (integração entre saúde humana, animal e ambiental) — p. 26, 27, 28
- Zoonoses (programa nacional de vigilância) — p. 26

#### Segurança Pública e Justiça

- Asfixia financeira do crime organizado (investigação patrimonial) — p. 21
- Fronteiras (vigilância eletrônica, portos e aeroportos) — p. 22, 50
- Isolamento de comando em presídios federais de segurança máxima — p. 21
- Plebiscito sobre o modelo penitenciário de segurança máxima — p. 23
- Sistema Único de Segurança Pública (Sinesp e PEC nº 18/2025) — p. 22

Eixos detectados: segurança=+.

#### Educação, Ciência e Meio Ambiente

- Alfabetização na idade certa (com condicionalidade) — p. 36
- Educação física escolar (padrão mínimo e jogos) — p. 38
- Ensino médio e formação técnica — p. 36
- PEC da Pesquisa (transformação de bolsistas em servidores públicos) — p. 36

#### Política Externa e Inserção Global

- Adaptação climática e defesa civil — p. 47, 48
- Desmatamento ilegal (combate por inteligência e rastreabilidade) — p. 47, 48
- Licenciamento ambiental (prazo definido e painel público) — p. 47, 48
- Mineração em terra indígena (regime legal e Convenção nº 169 da OIT) — p. 47, 48
- Previsibilidade Regulatória e redução de encargos setoriais (Energia) — p. 47
- Programa Brasil nos Trilhos (corredores ferroviários de carga) — p. 46
- Saneamento (cobrança de metas do marco legal de 2020) — p. 46

Eixos detectados: trabalho=+; ambiente=+.

#### Direitos Humanos, Equidade e Inclusão Social

- Assistência técnica gratuita para reforma e ampliação de habitação (Lei nº 11.888/2008) — p. 42
- Bolsa Atleta (inscrição individual direta e contrato com a União) — p. 38, 39
- Cadastro Nacional de Animais Domésticos (SinPatinhas). Financiamento, integração e ampliação da cobertura — p. 27, 28
- Portabilidade do aluguel para financiamento habitacional — p. 41
- Regularização fundiária e titulação em massa — p. 42

Eixos detectados: terra=+.

#### Questão Agrária, Propriedade e Direito à Cidade

- Bem-estar animal na cadeia produtiva — p. 33
- Defesa sanitária (recomposição do serviço veterinário oficial) — p. 32
- Diplomacia sanitária ativa — p. 33, 52
- Rastreabilidade individual de bovinos e búfalos (antecipação) — p. 32, 33

#### Governança, Transparência e Reformas de Estado

- Interoperabilidade obrigatória com o uso do CPF (Lei nº 14.534/2023) — p. 44
- Método D35 (desburocratizar, desonerar, digitalizar, democratizar e desenvolver) — p. 7
- Pacto institucional e relação com o Congresso e federados — p. 53
- Painel público de acompanhamento dos primeiros cem dias e de metas — p. 18, 45, 54
- Proteção de dados (Lei nº 13.709/2018) — p. 44

Eixos detectados: tributação=+.

### Zema (NOVO)

#### Economia, Trabalho e Responsabilidade Fiscal

- Choque fiscal e estabilização da relação dívida/PIB — p. 14, 18
- Privatização de todas as empresas estatais — p. 15
- Redução gradual do Imposto de Renda das empresas (IRPJ) — p. 19
- Reforma Administrativa para enxugamento de ministérios e cargos — p. 15
- Reforma da Previdência (inclusão de estados, municípios e previdência rural/militar) — p. 14
- Redução de encargos na folha de pagamento e alternativa flexível à CLT — p. 23, 24

Eixos detectados: estado-mercado=+; trabalho=+.

#### Saúde Pública e Assistência

- Telemedicina, prontuário eletrônico e registro nacional de saúde — p. 57, 58
- Parcerias público-privadas e uso da capacidade ociosa do setor privado para reduzir filas no SUS — p. 60
- Programa Casas da Cidadania (superação da pobreza vinculada ao trabalho) — p. 63
- Combate a fraudes no CadÚnico e unificação de programas sociais — p. 63, 64

#### Segurança Pública e Justiça

- Classificação de facções criminosas como organizações terroristas — p. 5
- Construção de presídios de segurança máxima em regiões remotas — p. 6
- Redução da maioridade penal para 16 anos ou menos — p. 6
- Fim do "prende e solta" e prisão preventiva obrigatória para reincidentes — p. 6
- Expansão das Patrulhas Maria da Penha e Salas Lilás — p. 7

Eixos detectados: segurança=+.

#### Educação, Ciência e Meio Ambiente

- Transferência do ensino superior do MEC para o Ministério de Ciência e Tecnologia — p. 52, 54
- Foco na primeira infância e ampliação de vagas em creches via parcerias privadas — p. 50
- Revisão e aprimoramento da Base Nacional Comum Curricular (BNCC) — p. 51
- Recuperação da alfabetização, recomposição da aprendizagem e formação deprofessores e diretores escolares — p. 51, 52
- Vinculação do programa Pé-de-Meia ao aprendizado e à frequência escolar — p. 53
- Liberdade de escolha educacional (escolas cívico-militares e homeschooling) — p. 53

Eixos detectados: saúde=+; educação=+.

#### Política Externa e Inserção Global

- Saída diplomática do BRICS — p. 37
- Adesão do Brasil à OCDE através de reformas institucionais — p. 37
- Transformação do Mercosul em zona de livre comércio — p. 38
- Cooperação internacional para combate ao crime organizado transnacional — p. 38

#### Direitos Humanos, Equidade e Inclusão Social

- Apoio a instituições de longa permanência para idosos (ILPIs) — p. 65
- Fortalecimento de redes de acolhimento a vítimas de violência doméstica — p. 66
- Acessibilidade e inclusão para pessoas com deficiência e TEA — p. 53, 61
- Criação de indicadores e capacitação para a rede de saúde mental (CAPS/CRAS) — p. 59

#### Questão Agrária, Propriedade e Direito à Cidade

- Facilitação da produção nacional e da compra de fertilizantes e defensivos agrícolas — p. 43
- Melhoria da logística de transporte de cargas e do ambiente de negócios parainovação no agro — p. 43, 44
- Aceleração da emissão de títulos de propriedade rural e combate à grilagem — p. 46
- Implementação da Nova Lei Geral do Licenciamento Ambiental — p. 47
- Atração de investimentos para o mercado voluntário de créditos de carbono — p. 48

#### Governança, Transparência e Reformas de Estado

- Fim do sigilo de 100 anos e ampliação da transparência ativa — p. 10
- Fim do Fundo Partidário e do Fundo Eleitoral — p. 75
- Adoção do sistema distrital misto para eleições legislativas — p. 75
- Fim da reeleição e imposição de requisitos mais rigorosos para ministros do STF — p. 11
