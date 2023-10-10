// styles
import '@/assets/styles/Main.scss'

// Components
import App from './app.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const httpLink = createHttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/hrpalencia/metademocraciatestnet',
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
  setup() {
      provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

registerPlugins(app)

app.mount('#app')
