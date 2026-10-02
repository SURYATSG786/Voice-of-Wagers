import {mapCity} from './mapRoutes.js';
import {loadData,benchmark,round} from './wageVerdict.js';
const workerRecords=loadData('worker_records');
const costs=loadData('cost_of_living'); const bocw=loadData('bocw_registration'); const distance=loadData('distances'); const guides=loadData('survival_guide');
export function predict(city,category='unskilled'){
 const b=benchmark(city,category), c=costs.cities.find(x=>x.city===b.city);
 return {...b,expected_daily_range:b.available?[b.daily,b.daily]:null,expected_monthly_range:b.available?[b.monthly,b.monthly]:null,typical_rent:c.typical_shared_rent_monthly,typical_food:c.typical_food_monthly,estimated_monthly_savings_range:b.available?[round(b.monthly-c.typical_shared_rent_monthly-c.typical_food_monthly),round(b.monthly-c.typical_shared_rent_monthly-c.typical_food_monthly)]:null,data_confidence:{wage:'requires_verification',cost_of_living:'estimated_col'},note:'Published benchmark from supplied plan; not an expected market salary or a job offer. Savings exclude travel, utilities, healthcare and remittances.'};
}
export function guide(city){const b=benchmark(city,'unskilled');return guides.cities.find(x=>x.city===b.city);}
export function route(city,category='unskilled',origin='Patna'){
 origin=mapCity(origin);city=mapCity(city);
 if(city==='Patna')return {origin,destination:city,road_km:origin===city?0:null,distance_confidence:'unavailable',distance_note:'Road distance is unavailable until the map loads.',expected_wage:{available:false,monthly:null,estimated_monthly_savings_range:null,source:null},survival_essentials:null};
 const p=predict(city,category), d=origin==='Patna'?distance.routes.find(x=>x.destination===p.city):null;
 return {origin,destination:p.city,road_km:origin===city?0:d?.road_km??null,distance_confidence:d?.confidence??'unavailable',distance_verification:d?.verification_status??'live_map_required',source_url:distance.source_url,distance_note:distance.source_note,expected_wage:p,survival_essentials:guide(p.city)};
}
export function opportunityScore({normalized_wage,govt_compliance_score,savings_potential}){
 return govt_compliance_score==null?null:round((normalized_wage*0.35+govt_compliance_score*0.30+0.7*0.15+savings_potential*0.20)*100);
}
export function opportunities(){
 const rows=costs.cities.map(c=>{const p=predict(c.city),board=bocw.states.find(b=>b.cities_covered.includes(c.city));return {...p,avg_wage:p.monthly,cost_of_living_index:c.typical_shared_rent_monthly+c.typical_food_monthly,bocw:board,worker_record:workerRecords.records.find(record=>record.city===c.city)||null};});
 const maxW=Math.max(...rows.map(x=>x.avg_wage)), maxB=Math.max(...bocw.states.map(x=>x.figure||0));
 return rows.map(r=>{const govt=r.bocw.figure==null?null:r.bocw.figure/maxB;const savings=Math.max(0,(r.avg_wage-r.cost_of_living_index)/r.avg_wage);return {...r,govt_compliance_score:govt,safety_proxy_score:0.7,savings_potential:savings,opportunity_score:opportunityScore({normalized_wage:r.avg_wage/maxW,govt_compliance_score:govt,savings_potential:savings}),score_disclaimer:'Experimental supplied formula, not a safety or employer rating. BOCW metrics and years differ and cannot be fairly compared. Constant safety placeholder: 0.7. Missing BOCW data means score unavailable.'};});
}
export {bocw};
