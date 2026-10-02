import { createApp } from '../server/app.js';

const app = createApp({
  runtimeDir: process.env.VERCEL ? '/tmp/.runtime' : undefined
});

export default app;
