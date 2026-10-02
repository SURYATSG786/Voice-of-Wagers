import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
let worker,sequence=0;const pending=new Map();
export function speechLanguage(locale){const code=String(locale||'').toLowerCase().split(/[-_]/)[0];return code==='od'||code==='ori'?'or':code;}
function rejectPending(error){for(const job of pending.values()){clearTimeout(job.timer);job.reject(error);}pending.clear();}
export function stopSpeechWorker(){worker?.kill();worker=undefined;rejectPending(new Error('Speech stopped.'));}
function startWorker(){
 if(worker)return worker;
 const python=process.env.SPEECH_PYTHON||path.join(root,'.speech-env',process.platform==='win32'?'Scripts/python.exe':'bin/python');
 if(!fs.existsSync(python))throw Object.assign(new Error('Run npm run setup:speech to install neural voices.'),{status:503});
 const child=spawn(python,['-u',path.join(root,'server/neural_speech.py')],{cwd:root,stdio:['pipe','pipe','pipe'],env:{...process.env,HF_HOME:path.join(root,'.speech-cache'),HF_HUB_OFFLINE:'1',TOKENIZERS_PARALLELISM:'false'}});worker=child;
 // Do not log speech text, audio or arbitrary upstream diagnostics.
 child.stderr.on('data',()=>{});
 createInterface({input:child.stdout}).on('line',line=>{let result;try{result=JSON.parse(line);}catch{return;}const job=pending.get(result.id);if(!job)return;pending.delete(result.id);clearTimeout(job.timer);if(result.error)job.reject(Object.assign(new Error('Neural speech could not be generated.'),{status:503}));else job.resolve({wav:Buffer.from(result.audio,'base64'),language:result.language,duration:result.duration,voice:result.voice,engine:result.engine});});
 child.on('error',()=>{if(worker===child){worker=undefined;rejectPending(Object.assign(new Error('Neural speech worker is unavailable.'),{status:503}));}});
 child.on('exit',()=>{if(worker===child){worker=undefined;rejectPending(Object.assign(new Error('Neural speech worker stopped.'),{status:503}));}});
 child.unref();child.stdin.unref();child.stdout.unref();child.stderr.unref();
 return child;
}
process.once('exit',()=>worker?.kill());
export async function synthesizeSpeech(text,locale){
 const language=speechLanguage(locale);
 if(!['ml','or'].includes(language))throw Object.assign(new Error('Unsupported speech language.'),{status:400});
 if(typeof text!=='string'||!text.trim()||text.length>2000)throw Object.assign(new Error('Enter a short speech message.'),{status:400});
 const child=startWorker(),id=++sequence;
 return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{stopSpeechWorker();},90000);pending.set(id,{resolve,reject,timer});child.stdin.write(JSON.stringify({id,text,language})+'\n',error=>{if(error){const job=pending.get(id);pending.delete(id);clearTimeout(timer);job?.reject(error);}});});
}
