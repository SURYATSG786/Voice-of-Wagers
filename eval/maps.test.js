import {test} from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';import fs from 'node:fs';import path from 'node:path';
import {route,predict} from '../lib/opportunityScore.js';
import {mapCities,mapCity,createRoadRouter} from '../lib/mapRoutes.js';
import {createApp} from '../server/app.js';
for(const origin of Object.keys(mapCities))for(const destination of Object.keys(mapCities))test(`Journey selection: ${origin} → ${destination}`,()=>{
 const r=route(destination,'unskilled',origin);assert.equal(r.origin,origin);assert.equal(r.destination,destination);
 if(destination==='Patna'){assert.equal(r.expected_wage.available,false);assert.equal(r.expected_wage.monthly,null);assert.equal(r.survival_essentials,null);}
 else assert.deepEqual(r.expected_wage,predict(destination));
 if(origin!==destination&&origin!=='Patna')assert.equal(r.road_km,null);
});
test('Guragon and Gurugram aliases resolve without accepting unknown places',()=>{assert.equal(mapCity('GURAGON'),'Gurgaon');assert.equal(mapCity('Gurugram'),'Gurgaon');assert.throws(()=>mapCity('Paris'));});
const geometry={type:'LineString',coordinates:[[77.391,28.5355],[77.209,28.6139]]};
test('Road route preserves provider geometry and caches shared requests',async()=>{let calls=0;const router=createRoadRouter(async url=>{calls++;assert.match(url,/77\.391,28\.5355;77\.209,28\.6139/);return {ok:true,json:async()=>({code:'Ok',routes:[{distance:27740,geometry}]})};});const [a,b]=await Promise.all([router('Noida','Delhi'),router('Noida','Delhi')]);assert.deepEqual(a,b);assert.equal(a.distance_km,27.7);assert.deepEqual(a.geometry,geometry);await router('Noida','Delhi');assert.equal(calls,1);});
test('Failed or malformed routing never invents a road distance or geometry',async()=>{for(const fetchRoad of [async()=>{throw new Error('offline');},async()=>({ok:false}),async()=>({ok:true,json:async()=>({code:'NoRoute',routes:[]})}),async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:Infinity,geometry}]})}),async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:20,geometry:{type:'LineString',coordinates:[[300,20],[50,30]]}}]})})]){const r=await createRoadRouter(fetchRoad)('Delhi','Mumbai');assert.equal(r.available,false);assert.equal(r.distance_km,null);assert.equal(r.geometry,null);}});
test('Same-city routes need no network request',async()=>{const r=await createRoadRouter(()=>{throw new Error('must not fetch');})('Chennai','Chennai');assert.equal(r.same_city,true);assert.equal(r.distance_km,0);});
test('Map and expanded planner API validate all six origins',async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'wagers-map-'));const app=createApp({runtimeDir:dir,enableAI:false,roadFetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:27740,geometry}]})})});const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));t.after(()=>{server.close();fs.rmSync(dir,{recursive:true,force:true});});const base=`http://127.0.0.1:${server.address().port}/api/`;
 for(const origin of Object.keys(mapCities)){const response=await fetch(base+`route-planner?origin=${origin}&destination=Delhi`);assert.equal(response.status,200);assert.equal((await response.json()).origin,origin);}
 assert.equal((await fetch(base+'map-route?origin=Paris&destination=Delhi')).status,400);
 const r=await fetch(base+'map-route?origin=Noida&destination=Delhi').then(r=>r.json());assert.equal(r.available,true);assert.deepEqual(r.geometry,geometry);
});
test('Saved road routes cover every directed pair with provider metres and correct endpoints',()=>{
 const snapshot=JSON.parse(fs.readFileSync(new URL('../data/road_routes.json',import.meta.url),'utf8'));assert.equal(Object.keys(snapshot.routes).length,30);
 for(const origin of Object.keys(mapCities))for(const destination of Object.keys(mapCities))if(origin!==destination){const r=snapshot.routes[`${origin}:${destination}`];assert.equal(r.origin,origin);assert.equal(r.destination,destination);assert.deepEqual(r.start,mapCities[origin]);assert.deepEqual(r.end,mapCities[destination]);assert.equal(r.distance_km,Math.round(r.distance_metres/100)/10);assert.ok(r.distance_metres>0);assert.ok(r.geometry.coordinates.length>=2);assert.equal(r.saved,true);assert.ok(!Number.isNaN(Date.parse(r.as_of)));}
});
test('Saved routes return immediately without depending on a live request',async()=>{const router=createRoadRouter();for(const origin of Object.keys(mapCities))for(const destination of Object.keys(mapCities)){const r=await router(origin,destination);assert.equal(r.available,true);if(origin!==destination)assert.equal(r.saved,true);else assert.equal(r.distance_km,0);}});
test('Routing retries a second provider when the first is unavailable',async()=>{let calls=0;const r=await createRoadRouter(async()=>{if(++calls===1)throw new Error('provider down');return{ok:true,json:async()=>({code:'Ok',routes:[{distance:27740,geometry}]})};})('Noida','Delhi');assert.equal(calls,2);assert.equal(r.distance_km,27.7);});
