import React,{useEffect,useState} from 'react';
import {money} from '../api';

// Only the decorative display counts up. Assistive technology receives the final amount.
export default function AnimatedMoney({value}){
 const [display,setDisplay]=useState(value);
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(value==null||!Number.isFinite(value)||preference.matches){setDisplay(value);return;}
  let frame,start;let stopped=false;
  const finish=()=>{if(preference.matches){stopped=true;cancelAnimationFrame(frame);setDisplay(value);}};
  const tick=time=>{if(stopped)return;start??=time;const progress=Math.min((time-start)/600,1);setDisplay(value*(1-Math.pow(1-progress,3)));if(progress<1)frame=requestAnimationFrame(tick);};
  setDisplay(0);frame=requestAnimationFrame(tick);preference.addEventListener('change',finish);
  return()=>{stopped=true;cancelAnimationFrame(frame);preference.removeEventListener('change',finish);};
 },[value]);
 return <span className="animated-money"><span className="sr-only">{money(value)}</span><span className="money-width" aria-hidden="true">{money(value)}</span><span className="money-display" aria-hidden="true">{money(display)}</span></span>;
}
