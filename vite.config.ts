// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig((userConfig) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const env = loadEnv(userConfig.mode, process.cwd(), '')

  const baseUrl = isProduction ? env.BASE_URL : env.VITE_BASE_URL

  return {
    base: baseUrl,
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        styles: { configFile: 'src/assets/styles/settings.scss' }
      }),
    ],
    define: {
      'process.env': {
        BASE_URL: baseUrl,
        API_URL: env.VITE_API_URL,
        RECAPTCHA_SITE_KEY: env.VITE_RECAPTCHA_SITE_KEY,
        DOMAIN_WEB: env.DOMAIN_WEB,
        NETWORK: env.NETWORK,
        CONTRACT_NFT: env.CONTRACT_NFT,
        ROUTER_WALLET: env.ROUTER_WALLET,
        ROUTER_EXPLORER_NEAR_HASH: env.ROUTER_EXPLORER_NEAR_HASH,
        URL_APIP_PRICE: env.URL_APIP_PRICE,
        ROUTER_RPC: env.ROUTER_RPC,
        ROUTER_GRAPH: env.ROUTER_GRAPH,
        CONTRACT_USDT: env.CONTRACT_USDT,
      },
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
    server: {
      port: 3002,
    },
  }
})
