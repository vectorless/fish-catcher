import { defineConfig } from 'vite';

// Served from https://vectorless.github.io/fish-catcher/ in production,
// so assets must resolve under that subpath. Dev server is unaffected.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/fish-catcher/' : '/',
  server: {
    host: '127.0.0.1',
    port: 5173
  }
});
