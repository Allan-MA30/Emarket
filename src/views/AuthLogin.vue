<template>
  <div class="page-wrapper">
    <div class="auth-wrap">
      <div class="card auth-card">
        <h2>Welcome back</h2>
        <p class="muted">Sign in to your account to continue</p>

        <form @submit.prevent="onSubmit" class="form">
          <div class="form-row">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" placeholder="you@domain.com" />
          </div>

          <div class="form-row">
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" placeholder="Enter your password" />
          </div>

          <div class="form-row role-row">
            <label>Sign in as</label>
              <div class="role-controls">
                <label><input type="radio" value="viewer" v-model="role" /> Viewer</label>
                <label><input type="radio" value="seller" v-model="role" /> Seller</label>
                <label><input type="radio" value="admin" v-model="role" /> Admin</label>
              </div>
          </div>

          <div v-if="error" class="error">{{ error }}</div>

          <div class="actions">
            <button class="btn-primary" type="submit">Sign in</button>
            <RouterLink to="/register" class="btn-outline">Register</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUsersStore } from '@/stores/users'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const role = ref('viewer')
const error = ref('')
const users = useUsersStore()

function onSubmit() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please provide email and password.'
    return
  }

  // If logging in as admin, validate against users registry
  if (role.value === 'admin') {
    const found = users.findByEmail(email.value)
    if (!found || found.role !== 'admin' || found.password !== password.value) {
      error.value = 'Admin credentials invalid.'
      return
    }
    auth.login(found)
    router.push('/admin')
    return
  }

  // For sellers, check users registry first (for pre-existing sellers like demo)
  if (role.value === 'seller') {
    const found = users.findByEmail(email.value)
    if (found && found.password === password.value && found.role === 'seller') {
      auth.login(found)
      router.push('/dashboard')
      return
    } else if (found) {
      error.value = 'Password incorrect.'
      return
    }
    // New seller login - create demo account
    const sellerData = {
      id: Date.now(),
      name: email.value.split('@')[0],
      email: email.value,
      role: 'seller',
    }
    auth.login(sellerData)
    router.push('/dashboard')
    return
  }

  // For viewers: store and continue
  const userData = {
    name: email.value.split('@')[0],
    email: email.value,
    role: 'viewer',
  }
  auth.login(userData)
  router.push('/property/buy')
}
</script>

<style scoped>
.auth-wrap { display: flex; justify-content: center; padding: 3rem 0; }
.auth-card { width: 420px; }
.auth-card h2 { margin-bottom: 0.25rem; }
.muted { color: var(--text-muted); margin-bottom: 1rem; }
.form { display: grid; gap: 12px; margin-top: 8px; }
.form-row label { display: block; font-size: 13px; color: var(--text-muted); margin-bottom: 6px; }
.form-row input[type="email"], .form-row input[type="password"] {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border);
  background: transparent; color: var(--text-main);
}
.role-row .role-controls { display:flex; gap:12px; align-items:center; }
.role-controls label { font-size: 13px; color: var(--text-muted); padding: 6px 8px; border-radius: 6px; }
.role-controls label:hover { background: rgba(0,0,0,0.03); }
.actions { display:flex; gap:10px; margin-top: 8px; align-items:center }
.error { color: #ff8b8b; font-size: 13px; padding: 6px 0; }
</style>
