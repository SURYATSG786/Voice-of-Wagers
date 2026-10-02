import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createApp} from '../server/app.js';
test('Introduction, dashboard refresh and feature deep links are served separately',async t=>{
 const server=createApp({runtimeDir:fs.mkdtempSync(path.join(os.tmpdir(),'wagers-landing-')),enableAI:false}).listen(0,'127.0.0.1');
 await new Promise(r=>server.once('listening',r));t.after(()=>new Promise(r=>server.close(r)));
 const base=`http://127.0.0.1:${server.address().port}`;
 const landing=await fetch(base+'/');assert.equal(landing.status,200);const html=await landing.text();assert.match(html,/id="rise" href="\/home"/);assert.match(html,/Know your worth/);assert.ok(!html.includes('id="root"'));
 for(const route of ['/home','/guide?city=Chennai','/route?city=Mumbai','/opportunities']){const r=await fetch(base+route);assert.equal(r.status,200);assert.match(await r.text(),/id="root"/);}
 for(const asset of ['/welcome/landing.css','/welcome/landing.js',...Array.from(html.matchAll(/src="(\/welcome\/assets\/[^\"]+)"/g),m=>m[1])])assert.equal((await fetch(base+asset)).status,200,asset);
 const demo=await fetch(base+'/api/verdict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:'Noida',job_category:'unskilled',wage_amount:400,wage_period:'daily',language:'en'})});assert.equal((await demo.json()).gap,3290);
});
