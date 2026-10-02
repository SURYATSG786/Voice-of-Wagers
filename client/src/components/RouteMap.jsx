import React,{useEffect,useRef,useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {mapCities} from '../../../lib/mapRoutes.js';
import {api} from '../api';
export default function RouteMap({origin,destination,active,onRoute,originLabel,destinationLabel,labels}){
 const host=useRef(),map=useRef(),layers=useRef(),tileLayer=useRef();const [routeData,setRouteData]=useState(null),[state,setState]=useState('preview'),[tileError,setTileError]=useState(false),[retry,setRetry]=useState(0);
 useEffect(()=>{
  const m=L.map(host.current,{scrollWheelZoom:false,attributionControl:true,zoomControl:false,zoomSnap:.25,zoomDelta:.5});map.current=m;layers.current=L.layerGroup().addTo(m);m.attributionControl.setPrefix(false);
  let errors=0;const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(m);
  tileLayer.current=tiles;tiles.on('tileload',()=>{errors=0;setTileError(false);});
  tiles.on('tileerror',()=>{if(++errors>=3)setTileError(true);});
  const resize=new ResizeObserver(()=>m.invalidateSize());resize.observe(host.current);
  return()=>{resize.disconnect();m.remove();map.current=null;};
 },[]);
 useEffect(()=>{const control=L.control.zoom({zoomInTitle:labels.zoomIn,zoomOutTitle:labels.zoomOut}).addTo(map.current);return()=>control.remove();},[labels.zoomIn,labels.zoomOut]);
 useEffect(()=>{
  let live=true;const group=layers.current,m=map.current;group.clearLayers();onRoute(null);setRouteData(null);
  const start=mapCities[origin],end=mapCities[destination];
  const marker=(coordinates,text,color)=>{const label=document.createElement('strong');label.textContent=text;L.circleMarker(coordinates,{radius:8,color:'#fff',weight:3,fillColor:color,fillOpacity:1}).bindTooltip(label,{permanent:true,direction:'top',offset:[0,-8]}).addTo(group);};
  marker(start,originLabel,'#d77b31');if(origin!==destination)marker(end,destinationLabel,'#187e92');
  m.fitBounds(L.latLngBounds([start,end]),{padding:[45,45],maxZoom:11,animate:false});
  if(!active){setState('preview');return()=>{live=false;};}
  setState('loading');
  api(`map-route?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`).then(r=>{
   if(!live)return;
   if(r.available){L.geoJSON(r.geometry,{style:{color:'#fff',weight:9,opacity:.9}}).addTo(group);const road=L.geoJSON(r.geometry,{style:{color:'#4285f4',weight:5,opacity:1}}).addTo(group);m.fitBounds(road.getBounds(),{padding:[35,35],maxZoom:11,animate:false});setState(r.saved?'saved':'ready');setRouteData(r);onRoute(r);}
   else{L.polyline([start,end],{color:'#708ca0',weight:2,dashArray:'6 8'}).addTo(group);setState('unavailable');onRoute(r);}
  }).catch(()=>{if(live){L.polyline([start,end],{color:'#708ca0',weight:2,dashArray:'6 8'}).addTo(group);setState('unavailable');onRoute({available:false});}});
  return()=>{live=false;};
 },[origin,destination,active,retry,originLabel,destinationLabel,onRoute]);
 return <section className="map-card" aria-label={labels.title}><div className="map-top"><strong>{labels.title}</strong><span>{originLabel} → {destinationLabel}</span>{routeData?.available&&<strong className="map-distance">{routeData.distance_km.toLocaleString('en-IN')} {labels.km}</strong>}</div><div ref={host} className="route-map" data-testid="route-map" aria-label={`${labels.title}: ${originLabel} → ${destinationLabel}`}/><div className="map-status" role="status" aria-busy={state==='loading'}>{state==='loading'?labels.loading:state==='unavailable'?labels.unavailable:state==='saved'?labels.saved:state==='ready'?labels.road:labels.preview}{state==='unavailable'&&<button className="btn-glass compact" type="button" onClick={()=>{tileLayer.current?.redraw();setTileError(false);setRetry(x=>x+1);}}>{labels.retry}</button>}</div>{tileError&&<p className="map-status">{labels.internet}</p>}</section>;
}
