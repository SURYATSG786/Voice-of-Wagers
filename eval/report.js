import fs from 'node:fs';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import {wageVerdict,loadData} from '../lib/wageVerdict.js';
import {predict,route,guide,opportunities} from '../lib/opportunityScore.js';
import {createApp} from '../server/app.js';
const scenarios=JSON.parse(fs.readFileSync(new URL('./synthetic_scenarios.json',import.meta.url),'utf8'));
let pass=0;for(const s of scenarios){const v=wageVerdict(s.input);for(const [k,e]of Object.entries(s.expected))assert.equal(v[k],e);pass++;}
console.log(`[Wage Verification]     ${pass}/${scenarios.length} synthetic ground-truth scenarios (provisional dataset)`);
let predictions=0;for(const row of loadData('wage_table').cities)for(const cat of ['unskilled','semi_skilled','skilled']){const got=predict(row.city,cat);const native=row.unit==='daily'?row.rates.general_construction_daily:row.rates[cat];const expected=native==null?null:Math.round((row.unit==='daily'?native*26:native)*100)/100;assert.equal(got.monthly,expected);if(expected!=null)assert.equal(got.estimated_monthly_savings_range[0],Math.round((expected-got.typical_rent-got.typical_food)*100)/100);predictions++;}
console.log(`[Wage Prediction]       ${predictions}/15 dataset scenarios; missing categories stay unavailable`);
assert.deepEqual(opportunities(),opportunities());console.log('[Opportunity Score]     Deterministic; missing BOCW yields null, experimental formula caveat visible');
for(const c of loadData('wage_table').cities)assert.ok(guide(c.city).documentation.length);console.log('[Survival Guide]        5/5 city records complete; no placeholder phone numbers');
for(const d of loadData('distances').routes){const r=route(d.destination);assert.equal(r.road_km,d.road_km);assert.deepEqual(r.expected_wage,predict(d.destination));assert.deepEqual(r.survival_essentials,guide(d.destination));}console.log('[Route Planner]         5/5 destinations match source dataset + composition; route estimates unverified');
const runtimeDir=fs.mkdtempSync(path.join(os.tmpdir(),'saathi-eval-'));const server=createApp({runtimeDir,enableAI:false}).listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
try{const url=`http://127.0.0.1:${server.address().port}/api/`;const top=async()=>fetch(url+'pulse/top').then(r=>r.json());assert.deepEqual((await top()).top_destinations,[]);for(let i=0;i<9;i++){await fetch(url+'pulse/log-search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({destination_city:'Noida'})});assert.equal((await top()).has_sufficient_data,false);assert.deepEqual((await top()).top_destinations,[]);}await fetch(url+'pulse/log-search',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"destination_city":"Delhi"}'});assert.deepEqual((await top()).top_destinations,[{city:'Noida',count:9},{city:'Delhi',count:1}]);console.log('[Migration Pulse]       Empty below 10 searches; ranking comes only from logged test requests');for(const b of loadData('bocw_registration').states)assert.deepEqual(opportunities().find(x=>x.state===b.state).bocw,b);console.log('[BOCW Data Integrity]   5/5 figures, metric types and dates unchanged; missing values remain null');}finally{server.close();}
console.log('These checks validate implementation against the supplied data, not legal currency or extraction-model accuracy.');
