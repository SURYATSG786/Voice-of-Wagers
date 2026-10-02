import fs from 'node:fs';
export const loadData = name => JSON.parse(fs.readFileSync(new URL(`../data/${name}.json`, import.meta.url),'utf8'));
export const wages=loadData('wage_table');
export const categories=['unskilled','semi_skilled','skilled'];
export const round = n=>Math.round((n+Number.EPSILON)*100)/100;
export function cityRecord(city){const row=wages.cities.find(r=>r.city.toLowerCase()===String(city).toLowerCase()||r.state.toLowerCase()===String(city).toLowerCase());if(!row)throw Object.assign(new Error('Choose a supported destination.'),{status:400});return row;}
export function benchmark(city,category){
 const row=cityRecord(city); if(!categories.includes(category))throw Object.assign(new Error('Choose a valid job category.'),{status:400});
 const native=row.unit==='daily'?row.rates.general_construction_daily:row.rates[category];
 return {city:row.city,state:row.state,job_category:category,available:native!=null,monthly:native==null?null:round(row.unit==='daily'?native*26:native),daily:native==null?null:round(row.unit==='daily'?native:native/26),source:row,classification_note:row.unit==='daily'?'Single general construction rate; skill tiers are not supplied for this schedule.':null};
}
export function wageVerdict({state,destination_city,job_category,wage_amount,wage_period='daily',days_worked=26}){
 const b=benchmark(destination_city||state,job_category);
 if(typeof wage_amount!=='number'||!Number.isFinite(wage_amount)||wage_amount<0||wage_amount>10000000)throw Object.assign(new Error('Enter a valid non-negative wage amount.'),{status:400});
 if(!['daily','weekly','monthly'].includes(wage_period))throw Object.assign(new Error('Choose daily, weekly or monthly pay.'),{status:400});
 if(!Number.isInteger(days_worked)||days_worked<1||days_worked>31)throw Object.assign(new Error('Days worked must be a whole number from 1 to 31.'),{status:400});
 // Monthly paid workers are compared to the full published monthly benchmark. Daily/weekly equivalence uses 26 days, six days per week.
 const actual=round(wage_period==='daily'?wage_amount*26:wage_period==='weekly'?wage_amount/6*26:wage_amount);
 const gap=b.available?round(Math.max(0,b.monthly-actual)):null;
 const status=!b.available?'unavailable':actual<b.monthly-0.01?'underpaid':Math.abs(actual-b.monthly)<=0.01?'fair':'above_minimum';
 return {...b,legal_minimum:b.monthly,actual_wage_monthly_equivalent:actual,gap,status,wage_amount,wage_period,days_worked,period_assumption:'26 paid days/month; six paid days/week. Monthly input is assumed to cover a full wage month. Overtime, deductions and partial-month entitlements need human review.',comparison_is_provisional:true,verified_legal_minimum:null};
}
