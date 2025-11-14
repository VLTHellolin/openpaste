// For linters and editors

import { defineConfig, presetWind4 } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
  ],
});
