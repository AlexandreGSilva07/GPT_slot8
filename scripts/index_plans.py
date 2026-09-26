#!/usr/bin/env python3
import json, unicodedata
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'data/manifest.json').read_text())
themes={
'economia_fiscal':['economia','fiscal','gasto','divida','dívida','orçamento','orcamento','deficit','déficit','superávit','superavit','juros','inflação','inflacao'],
'tributacao':['tribut','imposto','renda','consumo','isenc','taxa','alíquota','aliquota','iva','fortuna'],
'estado_empresas':['privat','estatiz','estatal','empresa pública','empresa publica','concess','ppp','desestat','nacionaliza'],
'trabalho_renda':['trabalho','trabalh','salário','salario','jornada','emprego','fgts','previd','sindical','6x1','renda'],
'seguranca_justica':['segurança','seguranca','polícia','policia','crime','facção','faccao','droga','arma','penal','pris','fronteira','justiça','justica'],
'educacao':['educa','escola','professor','universidade','ensino','alfabet','creche','enem','técnic','tecnic'],
'saude':['saúde','saude','sus','médic','medic','hospital','atenção básica','atencao basica','vacina','farm'],
'ambiente_agro':['ambiente','ambiental','clima','amaz','cerrado','desmat','agro','agric','agrária','agraria','latif','bioeconom','carbono'],
'politica_social':['pobreza','assistência','assistencia','bolsa','moradia','habita','fome','desigual','mulher','infância','infancia','família','familia'],
'instituicoes':['constitui','democr','stf','supremo','congresso','feder','reforma política','reforma politica','judiciário','judiciario','governança','governanca'],
'exteriores_defesa':['exterior','internacional','mercosul','brics','china','eua','estados unidos','defesa nacional','forças armadas','forcas armadas','otan','diplom'],
'infraestrutura':['infraestrutura','rodovia','ferrovia','porto','aeroporto','logística','logistica','saneamento','energia','habitação','habitacao'],
'tecnologia_inovacao':['tecnologia','inovação','inovacao','digital','inteligência artificial','inteligencia artificial','ia ','internet','semicondutor','dados']
}

def fold(s):
    return ''.join(c for c in unicodedata.normalize('NFKD',s.lower()) if not unicodedata.combining(c))

pages_dir=ROOT/'data/pages'; pages_dir.mkdir(parents=True,exist_ok=True)
index={}; stats={}
for plan in manifest['plans']:
    slug=plan['slug']; raw=(ROOT/plan['extracted_text']).read_text(errors='replace')
    pages=raw.split('\f')
    if pages and not pages[-1].strip(): pages.pop()
    rows=[]
    for i,p in enumerate(pages,1):
        clean='\n'.join(line.rstrip() for line in p.splitlines()).strip()
        rows.append({'page':i,'text':clean})
    (pages_dir/f'{slug}.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
    index[slug]={}; fp=[fold(x['text']) for x in rows]
    for theme,terms in themes.items():
        scored=[]
        for i,text in enumerate(fp):
            score=sum(text.count(fold(t)) for t in terms)
            if score: scored.append({'page':i+1,'score':score})
        index[slug][theme]=sorted(scored,key=lambda x:(-x['score'],x['page']))
    stats[slug]={'pages_expected':plan['pages'],'pages_extracted':len(rows),'chars':sum(len(x['text']) for x in rows),'nonempty_pages':sum(bool(x['text'].strip()) for x in rows)}
(ROOT/'data/theme-index.json').write_text(json.dumps({'themes':themes,'index':index,'stats':stats},ensure_ascii=False,indent=2))
print(json.dumps(stats,ensure_ascii=False,indent=2))
