/**
 * Entry point of the application.
 * 
 * @module main
 */

// styles
import '@/assets/styles/main.scss'

// Components
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

window.global = window;
// Fix for Buffer not defined
import { Buffer } from 'buffer'
if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
} else if (typeof global !== 'undefined') {
    global.Buffer = Buffer;
}

const httpLink = createHttpLink({
    uri: process.env.ROUTER_GRAPH,
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

// Composables
import { createApp, provide, h } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp({
  /**
   * Setup function for the Vue application.
   * Provides the Apollo client to the application.
   */
  setup() {
      provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

registerPlugins(app)

app.mount('#app')
