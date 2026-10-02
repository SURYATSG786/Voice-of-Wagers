import {Document,Packer,Paragraph,TextRun,HeadingLevel,ExternalHyperlink} from 'docx';
import {translate,languageInfo,verdictText} from './i18n.js';

const currency=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(n);
export function createCaseDocument(caseFile,language='en'){
 const t=key=>translate(language,key),v=caseFile.verdict,rtl=languageInfo(language).dir==='rtl';
 const p=(text,options={})=>new Paragraph({bidirectional:rtl,spacing:{after:160},children:[new TextRun({text,rtl})],...options});
 const field=(label,value)=>p(`${t(label).replace(/[:：]$/u,'')}: ${value}`);
 const children=[
  p(t('Check my pay'),{heading:HeadingLevel.TITLE}),
  p(t('Voice of Wagers')),
  p(t('No external organisation has received it. Download a copy for a trusted person to review.')),
  p(verdictText(v,language)),
  field('City',t(v.city)),
  field('Type of work',t({unskilled:'Helper / unskilled',semi_skilled:'Semi-skilled worker',skilled:'Mason / skilled worker'}[v.job_category]||v.job_category)),
  field('Pay received (₹)',`${currency(v.wage_amount)} / ${t(v.wage_period==='daily'?'day':v.wage_period==='weekly'?'week':'month')}`),
  field('Your monthly equivalent',currency(v.actual_wage_monthly_equivalent)),
  field('Monthly benchmark',currency(v.legal_minimum)),
  field('Monthly difference',currency(v.gap)),
  p(t('26 paid days per month; 6 per week. Overtime, deductions and partial months require individual review.')),
  p(t('View source & assumptions'),{heading:HeadingLevel.HEADING_1}),
  p(t('This is a provisional benchmark, not a verified legal ruling. A person must verify the latest notification and your circumstances.')),
 ];
 if(v.source?.verification_note)children.push(p(t(v.source.verification_note)));
 if(v.source?.effective_date)children.push(field('Effective period in supplied plan:',v.source.effective_date));
 if(v.source?.source_url)children.push(new Paragraph({bidirectional:rtl,spacing:{after:200},children:[new ExternalHyperlink({link:v.source.source_url,children:[new TextRun({text:t('Open official department portal'),style:'Hyperlink',rtl})]})]}));

 children.push(p(`${caseFile.case_id} · ${new Date(caseFile.created_at).toISOString().slice(0,10)}`,{spacing:{before:200,after:0}}));
 return new Document({creator:'Voice of Wagers',title:t('Check my pay'),description:t('Voice of Wagers'),styles:{default:{document:{run:{font:'Arial',size:24},paragraph:{spacing:{line:300}}}},paragraphStyles:[{id:'Title',name:'Title',basedOn:'Normal',run:{size:36,bold:true,color:'000000'},paragraph:{spacing:{after:240}}},{id:'Heading1',name:'Heading 1',basedOn:'Normal',run:{size:28,bold:true,color:'000000'},paragraph:{spacing:{before:200,after:120},keepNext:true}}]},sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1080,bottom:1080,left:1080,right:1080}}},children}]});
}
export const caseDocumentBlob=(caseFile,language)=>Packer.toBlob(createCaseDocument(caseFile,language));
