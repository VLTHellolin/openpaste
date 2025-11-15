import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWebFonts, presetWind4, transformerAttributifyJsx } from 'unocss';

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
        ph: () => import('@iconify-json/ph/icons.json').then(i => i.default) as any,
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'DM Sans',
        mono: 'DM Mono',
      },
    }),
    presetTypography(),
    presetAttributify(),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
  content: {
    pipeline: {
      include: [
        /\.([jt]sx?|mdx?|html)($|\?)/,
      ],
    },
  },
});
