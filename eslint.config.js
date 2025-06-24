import defineConfig from '@hellolin/eslint-config';

export default defineConfig({
  javascript: {
    env: {
      browser: true,
      node: true,
    },
  },
  react: true,
});
