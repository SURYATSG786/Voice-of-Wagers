"""Local VITS neural speech worker. JSON requests and WAV responses over stdio."""
import base64,io,json,re,sys,wave,unicodedata
from pathlib import Path
import numpy as np
import torch
from transformers import AutoTokenizer,VitsModel
from indic_numtowords import num2words
from speech_models import ROOT,MODELS

torch.set_num_threads(2)
engines={}

def normalize(text,lang):
 def number(value,split=False):
  if split:return ' '.join(num2words(int(d),lang=lang) for d in str(value))
  return num2words(int(value),lang=lang)
 def money(match):
  amount=match[1].replace(',','');whole,_,fraction=amount.partition('.')
  result=number(whole)+(' രൂപ' if lang=='ml' else ' ଟଙ୍କା')
  if fraction and int(fraction):result+=' '+number(fraction.ljust(2,'0')[:2])+(' പൈസ' if lang=='ml' else ' ପଇସା')
  return result
 text=re.sub(r'₹([\d,]+(?:\.\d+)?)',money,text)
 text=re.sub(r'\b112\b',lambda m:number(m[0],True),text)
 text=re.sub(r'\d[\d,]*',lambda m:number(m[0].replace(',','')),text)
 text=re.sub(r'eShram', 'ഈശ്രം' if lang=='ml' else 'ଇଶ୍ରମ',text,flags=re.I)
 return unicodedata.normalize('NFC',re.sub(r'[<>\[\]|]',' ',text))

def synthesize(text,lang):
 if lang not in MODELS:raise ValueError('Unsupported speech language')
 if lang not in engines:
  location=str(ROOT/'.speech-models'/lang)
  tokenizer=AutoTokenizer.from_pretrained(location,local_files_only=True)
  model=VitsModel.from_pretrained(location,local_files_only=True).eval()
  engines[lang]=(tokenizer,model)
 tokenizer,model=engines[lang]
 text=normalize(text,lang)
 # Short clauses preserve pronunciation and prevent long-utterance alignment failures.
 clauses=[c.strip() for c in re.split(r'(?<=[.!?।])\s+',text) if c.strip()]
 samples=[]
 for clause in clauses:
  inputs=tokenizer(clause,return_tensors='pt')
  if inputs.input_ids.numel()<3:continue
  with torch.inference_mode():
   torch.manual_seed(7)
   waveform=model(**inputs).waveform[0].cpu().numpy()
  samples.extend([waveform,np.zeros(int(model.config.sampling_rate*.15),dtype=np.float32)])
 if not samples:raise ValueError('No readable speech content')
 pcm=(np.clip(np.concatenate(samples),-1,1)*32767).astype('<i2')
 buffer=io.BytesIO()
 with wave.open(buffer,'wb') as wav:
  wav.setnchannels(1);wav.setsampwidth(2);wav.setframerate(model.config.sampling_rate);wav.writeframes(pcm.tobytes())
 return {'audio':base64.b64encode(buffer.getvalue()).decode(),'duration':len(pcm)/model.config.sampling_rate,'voice':MODELS[lang]['repo'],'language':lang,'engine':'mms-vits-local'}

if __name__=='__main__':
 for line in sys.stdin:
  try:
   request=json.loads(line)
   result=synthesize(request['text'],request['language'])
   print(json.dumps({'id':request['id'],**result}),flush=True)
  except Exception as error:
   print(json.dumps({'id':request.get('id') if 'request' in locals() else None,'error':str(error)}),flush=True)
