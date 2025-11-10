import { defineConfig, presetWind4 } from 'unocss';

// For editor & linting

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
  ],
  content: {
    pipeline: {
      include: [
        /\.([jt]sx?|mdx?|html|css)($|\?)/,
      ],
    },
    filesystem: [
      '**/*.{html,md,mdx,js,ts,jsx,tsx,css}',
    ],
  },
});
