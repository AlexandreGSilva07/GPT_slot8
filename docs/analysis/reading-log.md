# Registro de leitura e análise

## Corpus

- 13 planos oficiais disponibilizados pelo TSE;
- 836 páginas no total;
- 33.655 linhas de texto extraídas;
- PDFs originais preservados com SHA-256;
- todas as páginas separadas e indexadas em JSON.

## Processo

1. Download dos PDFs diretamente dos endereços oficiais do TSE.
2. Validação dos arquivos e geração de hashes.
3. Extração integral preservando o layout.
4. Separação e indexação página a página.
5. Varredura temática do corpus completo para localizar trechos relevantes.
6. Leitura dirigida das páginas de maior relevância e de páginas adjacentes, distinguindo objetivo, instrumento e grau de compromisso.
7. Construção conservadora das alternativas: só associações explicitamente sustentadas pelo plano entram no quiz.
8. Revisão cruzada de propostas semelhantes para não fundir mecanismos diferentes.
9. Geração automática da documentação a partir do mesmo dataset consumido pelo site.

## Auditoria

O corpus integral permanece no repositório. A interface pública usa paráfrases curtas, referências de página e links aos documentos oficiais completos.
