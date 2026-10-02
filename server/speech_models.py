from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
MODELS={
 'ml':{'repo':'facebook/mms-tts-mal','revision':'893b8c6442d6a630896d1d3ac0f429094ddfae82'},
 'or':{'repo':'facebook/mms-tts-ory','revision':'581f221219b728fab4d53efb24e18134bd1a9e28'},
}
if __name__=='__main__':
 from huggingface_hub import snapshot_download
 for lang,model in MODELS.items():
  snapshot_download(model['repo'],revision=model['revision'],local_dir=str(ROOT/'.speech-models'/lang),allow_patterns=['config.json','tokenizer_config.json','vocab.json','special_tokens_map.json','model.safetensors','README.md'])
  print(lang+' neural speech model ready',flush=True)
