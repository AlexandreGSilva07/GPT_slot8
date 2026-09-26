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

## Publicação

A aplicação é estática e foi construída para servir diretamente da raiz do repositório no GitHub Pages, sem etapa de build. O arquivo `.nojekyll` evita processamento desnecessário.

No estado atual, o repositório é privado. A tentativa de habilitar GitHub Pages em 26/09/2026 retornou que o plano atual da conta não oferece Pages para este repositório privado. Nenhuma mudança de visibilidade foi feita. Se o repositório for tornado público posteriormente (ou o plano passar a aceitar Pages privados), basta configurar Pages para publicar a branch `main` a partir de `/`.

### Verificação local

```bash
python3 -m http.server 8765
```

Abra `http://127.0.0.1:8765`.
