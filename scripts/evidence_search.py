#!/usr/bin/env python3
import argparse,json,re,unicodedata
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

def fold(s):
    return ''.join(c for c in unicodedata.normalize('NFKD',s.lower()) if not unicodedata.combining(c))

ap=argparse.ArgumentParser()
ap.add_argument('terms',nargs='+')
ap.add_argument('--slug')
ap.add_argument('--limit',type=int,default=8)
a=ap.parse_args()
files=[ROOT/'data/pages'/f'{a.slug}.json'] if a.slug else sorted((ROOT/'data/pages').glob('*.json'))
for f in files:
    pages=json.loads(f.read_text())
    hits=[]
    for row in pages:
        ft=fold(row['text'])
        score=sum(ft.count(fold(t)) for t in a.terms)
        if score:
            lines=[x.strip() for x in row['text'].splitlines() if x.strip()]
            matched=[x for x in lines if any(fold(t) in fold(x) for t in a.terms)]
            hits.append((score,row['page'],matched[:12]))
    hits.sort(key=lambda x:(-x[0],x[1]))
    if hits:
        print(f'\n## {f.stem}')
        for score,page,lines in hits[:a.limit]:
            print(f'### p.{page} score={score}')
            for line in lines: print(line)
