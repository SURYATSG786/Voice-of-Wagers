import {catalogs} from './i18n.js';
const zeros=[0x660,0x6f0,0x966,0x9e6,0xa66,0xae6,0xb66,0xbe6,0xc66,0xce6,0xd66];
export function normalizeDigits(text){return text.replace(/\p{Nd}/gu,c=>{const n=c.codePointAt(0);const z=zeros.find(z=>n>=z&&n<z+10);return z===undefined?c:String(n-z);});}
const native={unskilled:'సహాయకుడి|உதவியாளர|હેલ્પર|हेल्पर|मजदूर|मज़दूर|अकुशल|সহায়ক|হেল্পার|অদক্ষ|मदतनीस|సహాయకుడు|హెల్పర్|కూలీ|உதவியாளர்|ஹெல்பர்|திறனற்ற|મદદનીશ|સહાયક|અકુશળ|مددگار|معاون|ہیلپر|غیر ہنر مند|ಸಹಾಯಕ|ಹೆಲ್ಪರ್|ಕೌಶಲ್ಯರಹಿತ|ସହାୟକ|ସାହାଯ୍ୟକାରୀ|ହେଲପର|ଅକୁଶଳ|സഹായി|ഹെൽപ്പർ|അവിദഗ്ധ',semi_skilled:'अर्ध कुशल|আধা দক্ষ|అర్ధ నైపుణ్యం|அரை திறன்|અર્ધ કુશળ|نیم ہنر مند|ಅರೆ ಕುಶಲ|ଅର୍ଦ୍ଧ କୁଶଳ|അർദ്ധ വിദഗ്ധ',skilled:'राजमिस्त्री|कुशल|রাজমিস্ত্রি|দক্ষ|गवंडी|మేస్త్రీ|கொத்தனார்|திறமையான|કડિયો|કુશળ|راج مستری|ہنر مند|ಮೇಸ್ತ್ರಿ|ಕುಶಲ|ରାଜମିସ୍ତ୍ରୀ|ଦକ୍ଷ|കൽപ്പണിക്കാരൻ|വിദഗ്ധ',daily:'રોજના|दिहाड़ी|रोज|प्रतिदिन|প্রতিদিন|দৈনিক|दररोज|రోజుకు|రోజూ|రోజువారీ|தினமும்|தினசரி|நாளுக்கு|દરરોજ|દૈનિક|روزانہ|یومیہ|ದಿನಕ್ಕೆ|ಪ್ರತಿದಿನ|ପ୍ରତିଦିନ|ଦୈନିକ|ദിവസവും|പ്രതിദിനം|ദിവസം',weekly:'हफ्ते|सप्ताह|সপ্তাহ|आठवड|వారానికి|வாரத்திற்கு|વાર|ہفتہ|ವಾರಕ್ಕೆ|ସପ୍ତାହ|ആഴ്ച',monthly:'महीन|माह|মাস|महिन|నెలకు|மாதம்|மாதத்திற்கு|મહિન|ماہ|ತಿಂಗಳ|ମାସ|മാസം|മാസത്തിൽ'};
const terms=(key,english,label)=>[...english,...(native[key]||'').split('|'),...Object.values(catalogs).map(c=>c[label]?.split('/')[0].trim()).filter(Boolean)];
const groups={unskilled:terms('unskilled',['unskilled','helper'],'Helper / unskilled'),semi_skilled:terms('semi_skilled',['semi-skilled','semi skilled'],'Semi-skilled worker'),skilled:terms('skilled',['mason','skilled'],'Mason / skilled worker')};
function hits(text,term){const out=[];let i=text.indexOf(term.toLowerCase());while(i>=0){if(!/^[a-z -]+$/i.test(term)||(!/[a-z]/i.test(text[i-1]||'')&&!/[a-z]/i.test(text[i+term.length]||'')))out.push([i,i+term.length]);i=text.indexOf(term.toLowerCase(),i+1);}return out;}
export function parseLocal(transcript){
 const text=normalizeDigits(transcript).toLowerCase();
 const cities=['Delhi','Noida','Gurgaon','Chennai','Mumbai'];
 const city=cities.filter(c=>[c,...(c==='Noida'?['નોઈડા','ନୋଏଡା']:[]),...Object.values(catalogs).map(l=>l[c]),...(c==='Gurgaon'?['gurugram','गुरुग्राम','गुड़गांव']:[])].filter(Boolean).some(t=>hits(text,t).length));
 const spans=Object.fromEntries(Object.entries(groups).map(([k,ts])=>[k,ts.flatMap(t=>hits(text,t))]));
 const jobs=Object.keys(spans).filter(k=>spans[k].some(s=>k!=='skilled'||![...spans.unskilled,...spans.semi_skilled].some(o=>s[0]>=o[0]&&s[1]<=o[1])));
 const amounts=[...text.matchAll(/-?\d[\d,]*(?:\.\d+)?/g)].map(m=>Number(m[0].replaceAll(',','')));
 const periods=Object.entries({daily:terms('daily',['daily','per day','a day'],'Per day'),weekly:terms('weekly',['weekly','per week','a week'],'Per week (6 days)'),monthly:terms('monthly',['monthly','per month','a month'],'Per full month')}).filter(([,ts])=>ts.some(t=>hits(text,t).length)).map(([k])=>k);
 return {state:city.length===1?city[0]:'unclear',job_category:jobs.length===1?jobs[0]:'unclear',wage_amount:amounts.length===1&&amounts[0]>=0?amounts[0]:'unclear',wage_period:periods.length===1?periods[0]:'unclear',engine:'local_rules',confidence:'review_required'};
}
