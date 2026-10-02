Neural fallback speech uses Meta MMS VITS models:

- Malayalam: https://huggingface.co/facebook/mms-tts-mal (revision 893b8c6442d6a630896d1d3ac0f429094ddfae82).
- Odia: https://huggingface.co/facebook/mms-tts-ory (revision 581f221219b728fab4d53efb24e18134bd1a9e28).

Both model weights are licensed CC-BY-NC-4.0 by Meta and are for non-commercial use. Model cards are saved alongside the installed weights. The app is currently a local demo. Commercial deployment requires a suitable licensed speech provider/model. The earlier eSpeak dependency and GPL notice have been removed.

PyTorch uses its BSD license, Transformers uses Apache-2.0, and AI4Bharat indic-numtowords uses MIT. Their licenses are distributed with installed Python packages. Numbers are normalized into native-language words before synthesis. Text and generated audio remain on this local server.
