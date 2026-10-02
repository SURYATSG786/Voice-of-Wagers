let activeStop;
export function claimPlayback(stop){if(activeStop===stop)return;const previous=activeStop;activeStop=undefined;previous?.();globalThis.window?.speechSynthesis?.cancel();activeStop=stop;}
export function releasePlayback(stop){if(activeStop===stop)activeStop=undefined;}
export function stopAllPlayback(){const previous=activeStop;activeStop=undefined;previous?.();globalThis.window?.speechSynthesis?.cancel();}
export function selectVoice(voices,locale){const normalized=String(locale).toLowerCase().replaceAll('_','-');const base=normalized.split('-')[0];return voices.find(v=>v.lang.toLowerCase().replaceAll('_','-')===normalized)||voices.find(v=>v.lang.toLowerCase().split(/[-_]/)[0]===base);}
