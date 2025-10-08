import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  site: 'https://florizeflowers.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: true, // Both languages use locale prefix (/en/ and /de/)
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          de: 'de',
        },
      },
    })
  ],
  output: 'static',
  build: {
    format: 'directory',
    // Inline small assets to reduce requests
    assetsInlineLimit: 4096,
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    },
    // Default image settings
    domains: ['florizeflowers.com'],
    remotePatterns: [{ protocol: 'https' }],
  },
  // Vite configuration for optimized bundling
  vite: {
    build: {
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // Rollup options for better code splitting
      rollupOptions: {
        plugins: [
          process.env.ANALYZE === 'true' && visualizer({
            open: true,
            filename: './dist/stats.html',
            gzipSize: true,
            brotliSize: true,
            template: 'treemap' // or 'sunburst', 'network'
          })
        ].filter(Boolean),
        output: {
          // Manual chunks for vendor code splitting
          manualChunks: (id) => {
            // Core framework chunks
            if (id.includes('node_modules/astro') || id.includes('node_modules/@astrojs')) {
              return 'astro-framework';
            }
            // React/Preact if used
            if (id.includes('node_modules/react') || id.includes('node_modules/preact')) {
              return 'ui-framework';
            }
            // Date/time libraries
            if (id.includes('date-fns') || id.includes('dayjs') || id.includes('moment')) {
              return 'datetime';
            }
            // Form/validation libraries
            if (id.includes('zod') || id.includes('yup') || id.includes('joi')) {
              return 'validation';
            }
            // Utility libraries
            if (id.includes('lodash') || id.includes('ramda')) {
              return 'utils';
            }
            // All other vendor code
            if (id.includes('node_modules')) {
              // Group small modules together
              const module = id.split('node_modules/')[1].split('/')[0];
              // Only create separate chunks for larger dependencies
              if (['tailwindcss', 'postcss'].includes(module)) {
                return `vendor-${module}`;
              }
              return 'vendor';
            }
          },
          // Asset file naming
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const extType = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/woff2?|ttf|eot|otf/i.test(extType)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          // Chunk file naming
          chunkFileNames: 'chunks/[name]-[hash].js',
          // Entry file naming
          entryFileNames: 'js/[name]-[hash].js',
        },
        // External dependencies (if any)
        external: [],
        // Tree shaking
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
      // Minification options
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
      // Source maps for production debugging
      sourcemap: false,
      // CSS code splitting
      cssCodeSplit: true,
      // Target modern browsers
      target: 'es2020',
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [],
      exclude: [],
      esbuildOptions: {
        target: 'es2020',
      },
    },
    // CSS optimization
    css: {
      devSourcemap: false,
      modules: {
        generateScopedName: '[hash:base64:5]',
      },
    },
    // Server options
    server: {
      fs: {
        strict: true,
      },
    },
    // Preview options
    preview: {
      host: true,
    },
  }
});
