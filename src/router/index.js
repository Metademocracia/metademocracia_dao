// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useStorage } from "vue3-storage-secure";
import { nextTick } from 'vue'
import { APP_NAMES } from '@/plugins/dictionary';

const DEFAULT_TITLE = APP_NAMES.capitalize;

const routes = [
  // ? Default routes
  {
    path: '/',
    component: () => import('@/layouts/default-layout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/layouts/render-layout.vue'),
        meta: { head: `Home - ${DEFAULT_TITLE}` },
        children: [  
          {
            path: '',
            name: 'Home',
            component: () => import('@/pages/home.vue'), 
            meta: { head: `Home - ${DEFAULT_TITLE}` }
          },
          {
            path: 'members',
            name: 'Members',
            component: () => import('@/pages/members.vue'), 
            meta: { head: `Miembros - ${DEFAULT_TITLE}` }
          },
          {
            path: 'proposals',
            name: 'Proposal',
            component: () => import('@/pages/proposals-new.vue'), 
            meta: { head: `Propuestas - ${DEFAULT_TITLE}` }
          },
          {
            path: 'proposal-details',
            name: 'ProposalDetails',
            component: () => import('@/pages/proposal-details-new.vue'), 
            meta: { head: `Detalle de propuesta - ${DEFAULT_TITLE}` }
          },
          // {
          //   path: 'funds',
          //   name: 'Funds',
          //   component: () => import('@/pages/funds-new.vue'),
          //   meta: { head: `Fondos - ${DEFAULT_TITLE}` }
          // },
          // {
          //   path: 'create-proposal',
          //   name: 'CreateProposal',
          //   component: () => import('@/pages/create-proposal-new.vue'), 
          //   meta: { head: `Crear propuesta - ${DEFAULT_TITLE}` }
          // },
          {
            path: 'settings',
            name: 'Settings',
            component: () => import('@/pages/settings.vue'), 
            meta: { head: `Configuración - ${DEFAULT_TITLE}` }
          },
          // TODO
          // proposals

          // funds
        ]
      },
      {
        path: 'daos',
        name: 'Daos',
        component: () => import('@/pages/daos.vue'), 
        meta: { head: `DAOs - ${DEFAULT_TITLE}` }
      },
      {
        path: 'my-daos',
        name: 'MyDaos',
        component: () => import('@/pages/my-daos.vue'), 
        meta: { head: `Mis DAOs - ${DEFAULT_TITLE}` }
      },
      {
        path: 'create-daos',
        name: 'CreateDaos',
        component: () => import('@/pages/create-daos.vue'), 
        meta: { head: `Crear DAOs - ${DEFAULT_TITLE}` }
      },
    ],
  },


  // ? No Authenticated routes
  {
    path: '/auth',
    component: () => import('@/layouts/auth-layout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/login.vue'),
        meta: { head: `Login - ${DEFAULT_TITLE}` }
      },
      {
        path: "/:pathMatch(.*)*",
        name: "Error",
        component: () => import('@/pages/error.vue'),
        meta: { head: `Error - ${DEFAULT_TITLE}` }
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.path === '/auth') return next({ name: 'Login' })


  // this route requires auth, check if logged in
  // if not, redirect to login page.
  const tokenAuth = useStorage().getStorageSync("tokenAuth")
  if (to.matched.some(record => record.meta.requiresAuth) && !tokenAuth)
    return next({ name: 'Login' })

  // go to wherever I'm going
  next()
})


router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  nextTick(() => {
    if (to.meta.head) document.title = to.meta.head.toString();
    else document.title = DEFAULT_TITLE;
  });
});

export default router
