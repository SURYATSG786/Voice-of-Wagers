
(function(){
var root=document.documentElement,ac;
function tone(f,d){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.value=.08;g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
function prog(){var m=document.documentElement.scrollHeight-innerHeight;root.style.setProperty('--p',Math.min(1,Math.max(0,scrollY/(m*.85||1))).toFixed(3))}
addEventListener('scroll',prog,{passive:true});prog();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(count);if(e.target.dataset.n)count(e.target);io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.rev').forEach(function(el){io.observe(el)});
function count(el){if(el.done)return;el.done=1;var n=+el.dataset.n,t0=performance.now();if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=n.toLocaleString('en-IN');return;}(function s(t){var k=Math.min(1,(t-t0)/1400);el.textContent=Math.round(n*(1-Math.pow(1-k,3))).toLocaleString('en-IN');if(k<1&&!matchMedia('(prefers-reduced-motion: reduce)').matches)requestAnimationFrame(s)})(t0)}
document.querySelectorAll('.btn').forEach(function(b){b.addEventListener('click',function(e){var r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),x=document.createElement('span');x.className='rip';x.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';b.appendChild(x);setTimeout(function(){x.remove()},650)})});
// particles
var cv=document.getElementById('fx'),cx=cv.getContext('2d'),ps=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
for(var i=0;i<90;i++)ps.push({x:Math.random(),y:Math.random(),r:Math.random()*1.8+.3,v:Math.random()*.0004+.0001,t:Math.random()*6});
var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
(function f(){if(reduced||document.hidden){if(!reduced)requestAnimationFrame(f);return;}cx.clearRect(0,0,cv.width,cv.height);var p=+getComputedStyle(root).getPropertyValue('--p')||0;ps.forEach(function(q){q.t+=.03;q.y-=q.v;if(q.y<0)q.y=1;cx.globalAlpha=(.4+.5*Math.sin(q.t))*(1-p*.6);cx.fillStyle=p>.5?'#ffe79a':'#cfe6ff';cx.beginPath();cx.arc(q.x*cv.width,q.y*cv.height,q.r,0,7);cx.fill()});requestAnimationFrame(f)})();
// mascot
var msgs=["Namaste! I'm Saathi. Scroll down to reach the app.","Your pay, your right. Let's check it!","Ek saath, har kadam. 🧡","Ask me about Delhi, Noida or Chennai!"],mi=0;
document.getElementById('mas').addEventListener('click',function(){mi=(mi+1)%msgs.length;document.getElementById('bub').textContent=msgs[mi];tone(523,.25);document.getElementById('moon').classList.add('lit');setTimeout(function(){document.getElementById('moon').classList.remove('lit')},900)});
document.getElementById('rise').onclick=function(){tone(523,.2);setTimeout(function(){tone(784,.4)},120)};
// cities
var cg=document.getElementById('cityGrid'),ci=document.getElementById('cityInfo');
var fmt=function(n){return '₹'+Number(n).toLocaleString('en-IN',{maximumFractionDigits:2})};
ci.textContent='Loading city information…';
fetch('/api/opportunity-map').then(function(r){if(!r.ok)throw Error();return r.json()}).then(function(rows){
 function show(row){[].forEach.call(cg.children,function(b){b.classList.toggle('on',b.dataset.c===row.city);b.setAttribute('aria-pressed',String(b.dataset.c===row.city))});ci.innerHTML='<h3>'+row.city+'</h3><div class="row"><span>Monthly pay figure · needs checking</span><b>'+fmt(row.avg_wage)+'</b></div><div class="row"><span>Rent + food · estimated</span><b>'+fmt(row.typical_rent+row.typical_food)+'</b></div><div class="row"><span>Possible savings · estimated</span><b>'+fmt(row.estimated_monthly_savings_range[0])+'</b></div><p style="margin-top:12px;color:var(--t2)">Confirm the pay figure with the labour office. Costs vary for each person.</p>';}
 rows.forEach(function(row){var b=document.createElement('button');b.className='city';b.dataset.c=row.city;b.innerHTML='<b>'+row.city+'</b><small>Monthly pay · needs checking</small><em>'+fmt(row.avg_wage)+'</em>';b.onclick=function(){show(row);tone(660,.2)};cg.appendChild(b)});show(rows.find(function(r){return r.city==='Delhi'})||rows[0]);
}).catch(function(){ci.textContent='City information could not load. Open the app to try again.'});
document.getElementById('chk').onclick=async function(){
 var button=this,input=document.getElementById('pd'),v=document.getElementById('vd'),t=document.getElementById('vtx'),im=document.getElementById('vimg');v.className='verdict show';v.setAttribute('role','status');
 if(input.value.trim()===''||!input.checkValidity()||!Number.isFinite(Number(input.value))){im.hidden=true;t.textContent='Enter a daily pay of zero or more.';return;}
 button.disabled=true;button.textContent='Checking…';im.hidden=true;t.textContent='Comparing your pay…';
 try{var r=await fetch('/api/verdict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:document.getElementById('pc').value,job_category:'unskilled',wage_amount:Number(input.value),wage_period:'daily',language:'en'})});if(!r.ok)throw Error();var result=await r.json();im.hidden=false;im.src=result.gap>0?SAD:CHEER;v.className='verdict show '+(result.gap>0?'bad':'ok');t.innerHTML='<div class="num">'+fmt(Math.abs(result.gap))+'</div><b>'+(result.gap>0?'below the monthly pay figure':'difference from the monthly pay figure')+'</b><p style="margin-top:6px">Your pay: '+fmt(result.actual_wage_monthly_equivalent)+' / month. City figure: '+fmt(result.legal_minimum)+'. Uses 26 paid days. Confirm with the labour office.</p>';}
 catch(e){im.hidden=true;t.textContent='The pay check could not load. Please try again or open the app.';}
 finally{button.disabled=false;button.textContent='Check my pay';}
};
var SAD="/welcome/assets/31ba58496956.webp",CHEER="/welcome/assets/0b8c9ce6cfe2.webp";
// languages
var L=[['English','Your work deserves respect.',"Hello! I’m Saathi."],['हिन्दी','आपकी मेहनत सम्मान की हकदार है।','नमस्ते! मैं साथी हूँ।'],['বাংলা','আপনার পরিশ্রম সম্মান পাওয়ার যোগ্য।','নমস্কার! আমি সাথী।'],['मराठी','तुमच्या मेहनतीला सन्मान मिळायला हवा.','नमस्कार! मी साथी आहे.'],['తెలుగు','మీ కష్టానికి గౌరవం దక్కాలి.','నమస్కారం! నేను సాథీని.'],['தமிழ்','உங்கள் உழைப்புக்கு மரியாதை கிடைக்க வேண்டும்.','வணக்கம்! நான் சாத்தி.'],['ગુજરાતી','તમારી મહેનતને સન્માન મળવું જોઈએ.','નમસ્તે! હું સાથી છું.'],['اردو','آپ کی محنت عزت کی مستحق ہے۔','السلام علیکم! میں ساتھی ہوں۔'],['ಕನ್ನಡ','ನಿಮ್ಮ ದುಡಿಮೆಗೆ ಗೌರವ ಸಿಗಬೇಕು.','ನಮಸ್ಕಾರ! ನಾನು ಸಾಥಿ.'],['ଓଡ଼ିଆ','ଆପଣଙ୍କ ପରିଶ୍ରମକୁ ସମ୍ମାନ ମିଳିବା ଉଚିତ।','ନମସ୍କାର! ମୁଁ ସାଥୀ।'],['മലയാളം','നിങ്ങളുടെ അധ്വാനത്തിന് ബഹുമാനം ലഭിക്കണം.','നമസ്കാരം! ഞാൻ സാഥിയാണ്.']];
var tb=document.getElementById('tabs'),sy=document.getElementById('say'),sb=document.getElementById('sub');
function lang(i){[].forEach.call(tb.children,function(b,j){b.classList.toggle('on',i===j);b.setAttribute('aria-pressed',String(i===j))});sy.textContent=L[i][1];sb.textContent=L[i][2];sy.parentNode.dir=L[i][0]==='اردو'?'rtl':'ltr';}
L.forEach(function(l,i){var b=document.createElement('button');b.className='tab';b.textContent=l[0];b.onclick=function(){lang(i)};tb.appendChild(b)});
lang(0);
})();
