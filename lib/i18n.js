import catalogs from '../data/translations.json' with {type:'json'};
export const languages=[
 {code:'en',name:'English',native:'English',locale:'en-IN',dir:'ltr'},
 {code:'hi',name:'Hindi',native:'हिन्दी',locale:'hi-IN',dir:'ltr'},
 {code:'bn',name:'Bengali',native:'বাংলা',locale:'bn-IN',dir:'ltr'},
 {code:'mr',name:'Marathi',native:'मराठी',locale:'mr-IN',dir:'ltr'},
 {code:'te',name:'Telugu',native:'తెలుగు',locale:'te-IN',dir:'ltr'},
 {code:'ta',name:'Tamil',native:'தமிழ்',locale:'ta-IN',dir:'ltr'},
 {code:'gu',name:'Gujarati',native:'ગુજરાતી',locale:'gu-IN',dir:'ltr'},
 {code:'ur',name:'Urdu',native:'اردو',locale:'ur-IN',dir:'rtl'},
 {code:'kn',name:'Kannada',native:'ಕನ್ನಡ',locale:'kn-IN',dir:'ltr'},
 {code:'or',name:'Odia',native:'ଓଡ଼ିଆ',locale:'or-IN',dir:'ltr'},
 {code:'ml',name:'Malayalam',native:'മലയാളം',locale:'ml-IN',dir:'ltr'},
];
export const languageInfo=code=>languages.find(l=>l.code===code)||languages[0];
export function translate(language,key,hindi){const code=languageInfo(language).code;return catalogs[code]?.[key]||(code==='hi'&&hindi?hindi:catalogs.en[key]||key);}
export function formatMessage(language,key,params={}){return translate(language,key).replace(/\{(\w+)\}/g,(whole,name)=>Object.hasOwn(params,name)?String(params[name]):whole);}
export function verdictText(v,language='en'){
 if(!v.available)return translate(language,'unavailable_message');
 const money=n=>`₹${n.toLocaleString('en-IN',{maximumFractionDigits:2})}`;
 return formatMessage(language,'verdict_message',{city:translate(language,v.city),minimum:money(v.monthly),actual:money(v.actual_wage_monthly_equivalent),difference:v.gap>0?formatMessage(language,'difference_message',{gap:money(v.gap)}):''});
}
export {catalogs};
