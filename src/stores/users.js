/**
 * USERS STORE
 * Simple client-side user registry for demo/admin features
 * Persists to localStorage for data retention across sessions
 */
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'estate_users'

const defaultUsers = [
  {
    id: 1,
    name: 'Administrator',
    email: 'admin@local',
    password: 'admin',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Demo Seller',
    email: 'seller@local',
    password: 'seller',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Demo Viewer',
    email: 'viewer@local',
    password: 'viewer',
    role: 'viewer',
  },
]

function loadUsersFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultUsers
  } catch {
    return defaultUsers
  }
}

export const useUsersStore = defineStore('users', () => {
  const users = ref(loadUsersFromStorage())

  watch(users, (newUsers) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsers))
  }, { deep: true })

  function addUser(user) {
    users.value.push({ ...user, id: Date.now() })
  }

  function updateUser(id, updates) {
    const i = users.value.findIndex(u => u.id === id)
    if (i !== -1) users.value[i] = { ...users.value[i], ...updates }
  }

  function removeUser(id) {
    users.value = users.value.filter(u => u.id !== id)
  }

  function findByEmail(email) {
    return users.value.find(u => u.email === email)
  }

  function findById(id) {
    return users.value.find(u => u.id === id)
  }

  return { users, addUser, updateUser, removeUser, findByEmail, findById }
})
