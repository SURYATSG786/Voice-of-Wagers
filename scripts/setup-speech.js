import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const windows=process.platform==='win32';const python=process.env.PYTHON||'python3';
const run=(cmd,args)=>{const result=spawnSync(cmd,args,{stdio:'inherit',env:{...process.env,HF_HOME:path.resolve('.speech-cache'),HF_HUB_DISABLE_XET:'1'}});if(result.status!==0)process.exit(result.status||1);};
if(!fs.existsSync('.speech-env'))run(python,['-m','venv','.speech-env']);
const local=path.join('.speech-env',windows?'Scripts/python.exe':'bin/python');
run(local,['-m','pip','install','--cache-dir',path.resolve('.speech-cache/pip'),'-r','server/speech-requirements.txt']);
run(local,['server/speech_models.py']);
