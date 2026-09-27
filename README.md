# Comparador Cego — Planos de Governo 2026

Aplicação estática, mobile-first, para comparar respostas do eleitor com propostas **formalmente registradas no TSE** pelas candidaturas à Presidência da República nas Eleições 2026.

O projeto não recomenda voto. O quiz permanece cego até a conclusão: são oito macrotemas, cada um com uma alternativa documental por candidatura. O usuário escolhe uma proposta e o peso do tema; o resultado distribui 100% dos pesos ativos entre as candidaturas escolhidas.

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
- `data/tse-presidential-macrothemes.json` — coleta consolidada dos 8 macrotemas nas 13 páginas individuais do TSE.
- `data/SHA256SUMS` — integridade dos arquivos.
- `docs/methodology.md` — regras metodológicas.
- `docs/analysis/` — fichas por candidatura e cruzamentos.
- `src/data/` — dataset do quiz e evidências consumidas pela interface.
- `src/data/questionnaire-8x13.js` — versão navegável das 104 alternativas documentais.
- `index.html`, `styles.css`, `app.js` — aplicação estática pronta para GitHub Pages.

## Princípios

- uma alternativa documental por candidatura em cada macrotema;
- nenhuma posição é inferida por partido ou histórico;
- peso definido exclusivamente pelo usuário;
- fórmula idêntica para as 13 candidaturas;
- empates reais permanecem empates;
- acesso ao PDF oficial na revelação.

Veja [docs/methodology.md](docs/methodology.md) para a metodologia completa.

## Publicação

A aplicação é estática e foi construída para servir diretamente da raiz do repositório no GitHub Pages, sem etapa de build. O arquivo `.nojekyll` evita processamento desnecessário.

O GitHub Pages publica automaticamente a branch `main` em `https://alexandregsilva07.github.io/GPT_slot8/`.

### Verificação local

```bash
python3 -m http.server 8765
```

Abra `http://127.0.0.1:8765`.

### Atualizar os macrotemas do TSE

```bash
python3 scripts/scrape_tse_macrothemes.py
```

O coletor descobre as 13 páginas pela tabela oficial e só substitui o JSON
consolidado quando encontra oito macrotemas não vazios em cada candidatura.
