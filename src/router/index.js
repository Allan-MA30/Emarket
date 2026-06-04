import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Views — each teammate fills in their own file
import Home            from '@/views/Home.vue'
import Contacts        from '@/views/Contacts.vue'
import PropertyBuy     from '@/views/PropertyBuy.vue'
import PropertySell    from '@/views/PropertySell.vue'
import PropertyRent    from '@/views/PropertyRent.vue'
import SellerDashboard from '@/views/SellerDashboard.vue'
import AuthRegister    from '@/views/AuthRegister.vue'
import AuthLogin       from '@/views/AuthLogin.vue'
import AdminDashboard  from '@/views/AdminDashboard.vue'

const routes = [
  { path: '/',               component: Home },
  { path: '/contacts',       component: Contacts },
  { path: '/property/buy',   component: PropertyBuy },
  { path: '/property/sell',  component: PropertySell },
  { path: '/property/rent',  component: PropertyRent },
  { path: '/register',       component: AuthRegister },
  { path: '/login',          component: AuthLogin },

  // Protected — only sellers can access
  {
    path: '/dashboard',
    component: SellerDashboard,
    meta: { requiresSeller: true }
  },
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAdmin: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to) => {
  const auth = useAuthStore()
  if (auth.isSeller && !['/dashboard', '/login', '/register'].includes(to.path)) {
    return '/dashboard'
  }

  if (to.meta.requiresSeller) {
    if (!auth.isLoggedIn || auth.user.role !== 'seller') return '/login'
  }

  if (to.meta.requiresAdmin) {
    if (!auth.isLoggedIn || auth.user.role !== 'admin') return '/login'
  }
})

export default router
