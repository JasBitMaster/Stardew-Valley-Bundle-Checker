
import CommunityCenter from '@/pages/CommunityCenter.vue'
import HomePage from '@/pages/HomePage.vue'
import { mergeProps } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/viewBundles", name: "bundle", component: CommunityCenter, props: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
