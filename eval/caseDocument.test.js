import test from 'node:test';
import assert from 'node:assert/strict';
import {Packer} from 'docx';
import JSZip from 'jszip';
import {createCaseDocument} from '../lib/caseDocument.js';
import {wageVerdict} from '../lib/wageVerdict.js';
import {languages,translate} from '../lib/i18n.js';
const caseFile={case_id:'document-test',created_at:'2026-10-02T12:00:00Z',verdict:wageVerdict({destination_city:'Noida',job_category:'unskilled',wage_amount:300,wage_period:'daily'})};
for(const language of languages)test(`readable Word copy in ${language.code}`,async()=>{
 const buffer=await Packer.toBuffer(createCaseDocument(caseFile,language.code));
 const zip=await JSZip.loadAsync(buffer);const xml=await zip.file('word/document.xml').async('string');
 assert.ok(zip.file('[Content_Types].xml'));
 for(const amount of ['13,690','7,800','5,890'])assert.ok(xml.includes(amount));
 assert.ok(xml.includes(translate(language.code,'No external organisation has received it. Download a copy for a trusted person to review.')));
 assert.ok(xml.includes(translate(language.code,'Helper / unskilled')));
 assert.ok(!xml.includes('legal_minimum'));assert.ok(!xml.includes('verdict_id'));
 if(language.code==='ur')assert.ok(xml.includes('w:bidi'));
});
