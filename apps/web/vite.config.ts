import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  envPrefix: ['VITE_', 'APP_'],
  server: {
    host: true,
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      router: {
        routeToken: 'layout',
        indexToken: 'index',
      },
    }),
    nitro({
      preset: 'bun',
    }) as any,
    unocss(),
    react(),
  ],
});
