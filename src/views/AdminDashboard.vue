<template>
  <div class="page-wrapper admin-wrap">
    <div class="card">
      <div class="header">
        <div>
          <h2>Admin — User Management</h2>
          <p class="muted">Manage registered users ({{ filteredUsers.length }} shown, {{ users.users.length }} total)</p>
        </div>

        <div class="controls">
          <input v-model="search" placeholder="Search by name or email" class="input-search" />
          <select v-model="filterRole" class="select-role">
            <option value="">All roles</option>
            <option value="viewer">Viewer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <button class="btn-primary" @click="showAdd = !showAdd">{{ showAdd ? 'Close' : 'Add user' }}</button>
        </div>
      </div>

          <div v-if="showAdd" class="add-form">
            <input v-model="newUser.name" placeholder="Full name" />
            <input v-model="newUser.email" placeholder="Email" />
            <input v-model="newUser.password" placeholder="Password" />
            <select v-model="newUser.role">
              <option value="viewer">Viewer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
            <input type="file" accept="image/*" @change="handleAddFile" />
            <button class="btn-primary" @click="addUser">Create</button>
          </div>

      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in filteredUsers" :key="u.id">
            <td>
              <div class="user-cell">
                <img v-if="u.profilePicture" :src="u.profilePicture" class="avatar" />
                <div v-else class="avatar placeholder">{{ u.name ? u.name.charAt(0).toUpperCase() : '?' }}</div>
                <span class="name-text">{{ u.name }}</span>
              </div>
            </td>
            <td>{{ u.email }}</td>
            <td>
              <select v-model="u.role" @change="changeRole(u)">
                <option value="viewer">Viewer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td>
              <button class="btn-outline" @click="resetPassword(u)">Reset PW</button>
              <input type="file" accept="image/*" @change="onRowFileChange($event, u)" />
              <button class="btn-danger" @click="remove(u)" :disabled="u.email===currentUser.email">Delete</button>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0"><td colspan="4" class="muted">No users match your criteria.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'

const users = useUsersStore()
const auth = useAuthStore()

const currentUser = auth.user || { email: '' }

const search = ref('')
const filterRole = ref('')
const showAdd = ref(false)

const newUser = ref({ name: '', email: '', password: '', role: 'viewer', profilePicture: '' })

const filteredUsers = computed(() => {
  return users.users.filter(u => {
    if (filterRole.value && u.role !== filterRole.value) return false
    const q = search.value.trim().toLowerCase()
    if (!q) return true
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  })
})

function changeRole(user) {
  users.updateUser(user.id, { role: user.role })
}

function remove(user) {
  if (user.email === currentUser.email) return
  if (!window.confirm(`Delete user ${user.email}? This action cannot be undone.`)) return
  users.removeUser(user.id)
}

function addUser() {
  if (!newUser.value.name || !newUser.value.email || !newUser.value.password) return
  users.addUser({ ...newUser.value })
  newUser.value = { name: '', email: '', password: '', role: 'viewer', profilePicture: '' }
  showAdd.value = false
}

function resetPassword(user) {
  const pw = prompt(`Set new password for ${user.email}`, '')
  if (pw !== null && pw !== '') {
    users.updateUser(user.id, { password: pw })
    alert('Password updated')
  }
}

function handleAddFile(e) {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  const reader = new FileReader()
  reader.onload = () => {
    newUser.value.profilePicture = reader.result
  }
  reader.readAsDataURL(f)
}

function onRowFileChange(e, user) {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  const reader = new FileReader()
  reader.onload = () => {
    users.updateUser(user.id, { profilePicture: reader.result })
  }
  reader.readAsDataURL(f)
}
</script>

<style scoped>
.admin-wrap { display:flex; justify-content:center; }
.card { width: 900px; padding: 16px }
.header { display:flex; justify-content:space-between; align-items:center }
.controls { display:flex; gap:8px; align-items:center }
.input-search { padding:6px 8px; border-radius:6px; border:1px solid var(--border) }
.select-role { padding:6px 8px; border-radius:6px; border:1px solid var(--border) }
.add-form { display:flex; gap:8px; margin:12px 0 }
.add-form input, .add-form select { padding:6px 8px; border-radius:6px; border:1px solid var(--border) }
.user-table { width:100%; border-collapse: collapse; margin-top: 12px }
.user-table th, .user-table td { padding:8px 10px; border:1px solid var(--border); text-align:left }
.user-cell { display:flex; align-items:center; gap:8px }
.avatar { width:32px; height:32px; border-radius:4px; object-fit:cover; flex-shrink:0 }
.avatar.placeholder { display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg, #c9a84c 0%, #9d8b3f 100%); color:#fff; font-weight:600; font-size:12px }
.name-text { display:inline-block }
.user-table select { padding:6px 8px; border-radius:6px; border:1px solid var(--border); background:transparent }
.user-table select:hover { background: rgba(0,0,0,0.02) }
.user-table select:focus { outline:2px solid rgba(0,0,0,0.06) }
.actions-col { width:220px }
.muted { color: var(--text-muted); }
.btn-outline { margin-left:8px }
.btn-danger { background:#ff6666; color:#fff; border:none; padding:6px 8px; border-radius:6px; margin-left:8px }
.btn-primary { background:var(--primary); color:#fff; border:none; padding:8px 10px; border-radius:6px }
</style>
