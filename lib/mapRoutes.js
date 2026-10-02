import savedRoads from '../data/road_routes.json' with {type:'json'};
// Approximate city-centre coordinates; destinations are not exact worker addresses.
export const mapCities={Patna:[25.5941,85.1376],Noida:[28.5355,77.3910],Chennai:[13.0827,80.2707],Delhi:[28.6139,77.2090],Gurgaon:[28.4595,77.0266],Mumbai:[19.0760,72.8777]};
export function mapCity(value){const name=String(value||'').trim().toLowerCase();const alias=['guragon','gurugram'].includes(name)?'gurgaon':name;const city=Object.keys(mapCities).find(c=>c.toLowerCase()===alias);if(!city)throw Object.assign(new Error('Choose a supported destination.'),{status:400});return city;}
export function createRoadRouter(fetchRoad=fetch){
 const cache=new Map(),pending=new Map();
 return async function roadRoute(originValue,destinationValue){
  const origin=mapCity(originValue),destination=mapCity(destinationValue),start=mapCities[origin],end=mapCities[destination];
  if(origin===destination)return {available:true,same_city:true,origin,destination,distance_km:0,geometry:{type:'LineString',coordinates:[[start[1],start[0]],[end[1],end[0]]]},provider:'OSRM / OpenStreetMap'};
  const key=`${origin}:${destination}`;const saved=fetchRoad===fetch?savedRoads.routes[key]:null;if(saved?.available&&saved.start?.every((v,i)=>v===start[i])&&saved.end?.every((v,i)=>v===end[i]))return saved;const hit=cache.get(key);if(hit&&Date.now()-hit.at<3600000)return hit.value;if(pending.has(key))return pending.get(key);
  const task=(async()=>{for(const host of ['https://router.project-osrm.org','https://routing.openstreetmap.de/routed-car']){try{
   const points=`${start[1]},${start[0]};${end[1]},${end[0]}`;
   const response=await fetchRoad(`${host}/route/v1/driving/${points}?overview=simplified&geometries=geojson&steps=false`,{signal:AbortSignal.timeout(9000)});
   if(!response.ok)throw new Error('routing unavailable');const data=await response.json(),r=data.routes?.[0],coordinates=r?.geometry?.coordinates;
   if(data.code!=='Ok'||!Number.isFinite(r?.distance)||r.distance<0||r.geometry?.type!=='LineString'||!Array.isArray(coordinates)||coordinates.length<2||!coordinates.every(p=>Array.isArray(p)&&p.length>=2&&Number.isFinite(p[0])&&Number.isFinite(p[1])&&Math.abs(p[0])<=180&&Math.abs(p[1])<=90))throw new Error('invalid road route');
   const value={available:true,origin,destination,distance_km:Math.round(r.distance/100)/10,geometry:r.geometry,provider:'OSRM / OpenStreetMap',profile:'driving',city_centres:true};cache.set(key,{at:Date.now(),value});return value;
  }catch{}}return {available:false,origin,destination,distance_km:null,geometry:null,provider:'OSRM / OpenStreetMap'};})().finally(()=>pending.delete(key));pending.set(key,task);return task;
 };
}
