# -*- coding: utf-8 -*-
import json
from pathlib import Path
from decimal import Decimal, ROUND_HALF_UP
root=Path(__file__).resolve().parents[1]
wages=json.loads((root/'data/wage_table.json').read_text())['cities']
rows=[]
for city in wages:
 for category in ['unskilled','semi_skilled','skilled']:
  raw=city['rates'].get('general_construction_daily') if city['unit']=='daily' else city['rates'].get(category)
  minimum=None if raw is None else Decimal(str(raw))*(26 if city['unit']=='daily' else 1)
  for offset in [-100,100]:
   amount=10000 if minimum is None else float(minimum+offset)
   rows.append(dict(input=dict(state=city['city'],job_category=category,wage_amount=amount,wage_period='monthly'),expected=dict(status='unavailable' if minimum is None else 'underpaid' if offset<0 else 'above_minimum',legal_minimum=None if minimum is None else float(minimum),gap=None if minimum is None else max(0,-offset),actual_wage_monthly_equivalent=amount)))
for city in wages:
 minimum=Decimal(str(city['rates'].get('general_construction_daily') if city['unit']=='daily' else city['rates']['unskilled']))*(26 if city['unit']=='daily' else 1)
 daily=(minimum/26).quantize(Decimal('.01'),rounding=ROUND_HALF_UP)
 actual=(daily*26).quantize(Decimal('.01'),rounding=ROUND_HALF_UP)
 rows.append(dict(input=dict(state=city['city'],job_category='unskilled',wage_amount=float(minimum),wage_period='monthly'),expected=dict(status='fair',legal_minimum=float(minimum),gap=0,actual_wage_monthly_equivalent=float(minimum))))
 rows.append(dict(input=dict(state=city['city'],job_category='unskilled',wage_amount=float(daily),wage_period='daily'),expected=dict(status='underpaid' if actual<minimum-Decimal('.01') else 'above_minimum' if actual>minimum+Decimal('.01') else 'fair',legal_minimum=float(minimum),gap=float(max(Decimal(0),minimum-actual)),actual_wage_monthly_equivalent=float(actual))))
(root/'eval/synthetic_scenarios.json').write_text(json.dumps(rows,indent=2)+'\n')
assert len(rows)==40
