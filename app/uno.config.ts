import { defineConfig, presetIcons, presetWind4 } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        lucide: () => import('@iconify-json/lucide/icons.json').then(i => i.default),
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
