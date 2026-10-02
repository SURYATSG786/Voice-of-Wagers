import {spawn} from 'node:child_process';
const children=[spawn(process.execPath,['server/index.js'],{stdio:'inherit'}),spawn(process.execPath,['node_modules/vite/bin/vite.js','--config','client/vite.config.js'],{stdio:'inherit'})];
let stopping=false;const stop=()=>{if(stopping)return;stopping=true;children.forEach(p=>p.kill('SIGTERM'));};
process.on('SIGINT',stop);process.on('SIGTERM',stop);children.forEach(p=>p.on('exit',code=>{if(!stopping){stop();process.exitCode=code||0;}}));
