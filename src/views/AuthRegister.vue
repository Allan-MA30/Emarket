<template>
  <div class="page-wrapper">
    <div class="auth-wrap">
      <div class="card auth-card">
        <h2>Create an account</h2>
        <p class="muted">Register to list or browse properties</p>

        <form @submit.prevent="onSubmit" class="form">
          <div class="form-row">
            <label for="name">Full name</label>
            <input id="name" v-model="name" type="text" placeholder="Your full name" />
          </div>

          <div class="form-row">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" placeholder="you@domain.com" />
          </div>

          <div class="form-row">
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" placeholder="Choose a password" />
          </div>

          <div v-if="role !== 'viewer'" class="form-row">
            <label>Profile picture (optional)</label>
            <div class="profile-upload">
              <div v-if="profilePreview" class="profile-preview">
                <img :src="profilePreview" class="preview-img-large" />
                <input id="profile" type="file" accept="image/*" @change="handleFile" class="file-input-overlay" title="Click to change" />
              </div>
              <div v-else class="profile-placeholder">
                <div class="placeholder-text">{{ name ? name.charAt(0).toUpperCase() : '?' }}</div>
                <input id="profile" type="file" accept="image/*" @change="handleFile" class="file-input-overlay" />
              </div>
            </div>
          </div>

          <div class="form-row role-row">
            <label>Account type</label>
            <div class="role-controls">
              <label><input type="radio" value="viewer" v-model="role" /> Viewer</label>
              <label><input type="radio" value="seller" v-model="role" /> Seller</label>
              <label><input type="radio" value="admin" v-model="role" /> Admin</label>
            </div>
          </div>

          <div v-if="role === 'admin'" class="form-row">
            <label for="adminkey">Admin key</label>
            <input id="adminkey" v-model="adminKey" type="password" placeholder="Enter admin key" />
          </div>

          <div v-if="error" class="error">{{ error }}</div>

          <div class="actions">
            <button class="btn-primary" type="submit">Create account</button>
            <RouterLink to="/login" class="btn-outline">Sign in</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUsersStore } from '@/stores/users'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('viewer')
const users = useUsersStore()
const adminKey = ref('')
const error = ref('')
// preselect role from query (e.g. /register?role=seller)
if (route.query.role === 'seller') role.value = 'seller'
if (route.query.role === 'admin') role.value = 'admin'
const profilePreview = ref('')
const profilePicture = ref('')

// Clear profile picture when switching to viewer
watch(role, (newRole) => {
  if (newRole === 'viewer') {
    profilePreview.value = ''
    profilePicture.value = ''
  }
})

function onSubmit() {
  error.value = ''
  if (!name.value || !email.value || !password.value) {
    error.value = 'Please complete all fields.'
    return
  }

  // Demo registration — validate uniqueness and store user
  if (users.findByEmail(email.value)) {
    error.value = 'Email already registered.'
    return
  }

  if (role.value === 'admin') {
    // simple demo admin key check
    if (!adminKey.value || adminKey.value !== 'ADMIN2025') {
      error.value = 'Invalid admin key.'
      return
    }
  }

  const userData = {
    id: Date.now(),
    name: name.value,
    email: email.value,
    role: role.value,
    password: password.value,
    profilePicture: profilePicture.value,
  }

  users.addUser(userData)
  auth.register({ id: userData.id, name: userData.name, email: userData.email, role: userData.role })

  // Redirect based on role
  if (role.value === 'seller') router.push('/dashboard')
  else router.push('/property/buy')
}

function handleFile(e) {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  const reader = new FileReader()
  reader.onload = () => {
    profilePreview.value = reader.result
    profilePicture.value = reader.result
  }
  reader.readAsDataURL(f)
}

function clearProfilePicture() {
  profilePreview.value = ''
  profilePicture.value = ''
}
</script>

<style scoped>
.auth-wrap { display: flex; justify-content: center; padding: 3rem 0; }
.auth-card { width: 460px; }
.auth-card h2 { margin-bottom: 0.25rem; }
.muted { color: var(--text-muted); margin-bottom: 1rem; }
.form { display: grid; gap: 12px; margin-top: 8px; }
.form-row label { display: block; font-size: 13px; color: var(--text-muted); margin-bottom: 6px; }
.form-row input[type="text"], .form-row input[type="email"], .form-row input[type="password"] {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border);
  background: transparent; color: var(--text-main);
}
.role-row .role-controls { display:flex; gap:12px; align-items:center; }
.role-controls label { font-size: 13px; color: var(--text-muted); padding: 6px 8px; border-radius: 6px; }
.role-controls label:hover { background: rgba(0,0,0,0.03); }
.actions { display:flex; gap:10px; margin-top: 8px; align-items:center }
.error { color: #ff8b8b; font-size: 13px; padding: 6px 0; }
.profile-section { display:flex; align-items:center; gap:12px; margin-top:8px }
.placeholder-logo { width:48px; height:48px; border-radius:4px; background:linear-gradient(135deg, #c9a84c 0%, #9d8b3f 100%); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:18px; flex-shrink:0 }
.preview-container { display:flex; align-items:center; gap:8px }
.preview-logo { width:48px; height:48px; border-radius:4px; object-fit:cover; flex-shrink:0 }
.btn-change { background:#c9a84c; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:12px; font-weight:600; cursor:pointer; transition:opacity .2s }
.btn-change:hover { opacity:.85 }
.file-input { flex:1 }
</style>
