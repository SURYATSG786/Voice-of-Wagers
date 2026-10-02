import fs from 'node:fs';
import {createApp} from './app.js';
if(fs.existsSync('.env'))process.loadEnvFile('.env');
const port=Number(process.env.PORT||3001);
createApp().listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`Shram Saathi running at http://127.0.0.1:${port}`));
