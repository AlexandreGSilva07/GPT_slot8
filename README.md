# Comparador Cego — Planos de Governo 2026

Aplicação estática, mobile-first, para comparar respostas do eleitor com propostas **formalmente registradas no TSE** pelas candidaturas à Presidência da República nas Eleições 2026.

O projeto não recomenda voto, não produz ranking e não calcula um “candidato mais compatível”. O quiz permanece cego até a conclusão e o resultado mostra, questão por questão, quais planos contêm posições compatíveis com a opção escolhida, com evidência e acesso ao documento integral.

## Fonte primária

Tribunal Superior Eleitoral (TSE), página “Planos de governo dos candidatos ao cargo de Presidente da República — Eleições 2026”.

Snapshot coletado em 26/09/2026:
- 13 candidaturas;
- 13 PDFs oficiais;
- 836 páginas;
- arquivos originais preservados;
- hashes SHA-256 versionados;
- texto integral extraído para análise e auditoria.

## Estrutura

- `data/raw-pdfs/` — PDFs oficiais baixados do TSE.
- `data/text/` — extração integral dos PDFs.
- `data/manifest.json` — metadados, links oficiais, páginas e hashes.
- `data/SHA256SUMS` — integridade dos arquivos.
- `docs/methodology.md` — regras metodológicas.
- `docs/analysis/` — fichas por candidatura e cruzamentos.
- `src/data/` — dataset do quiz e evidências consumidas pela interface.
- `index.html`, `styles.css`, `app.js` — aplicação estática pronta para GitHub Pages.

## Princípios

- documento integral > resumo;
- nenhuma posição é inferida por partido ou histórico;
- ausência de menção ≠ oposição;
- alternativas preservam diferenças de implementação;
- resultado por tema, sem score agregado;
- acesso ao PDF oficial na revelação.

Veja [docs/methodology.md](docs/methodology.md) para a metodologia completa.
