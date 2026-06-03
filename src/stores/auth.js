/**
 * AUTH STORE
 * Owned by: Auth teammate
 *
 * Stores who is logged in and what their role is.
 * Every other teammate reads from this store — do NOT modify
 * the shape of `user` without telling the whole team.
 *
 * user.role options: 'viewer' | 'seller' | 'admin'
 */
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'estate_auth_user'

function loadUserFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  // STATE
  const user = ref(loadUserFromStorage())
  // Example user shape:
  // { id: 1, name: 'Jean Pierre', email: 'jp@email.com', role: 'seller' }

  watch(user, (newUser) => {
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  })

  // GETTERS
  const isLoggedIn = computed(() => !!user.value)
  const isSeller   = computed(() => user.value?.role === 'seller')
  const isViewer   = computed(() => user.value?.role === 'viewer')
  const isAdmin    = computed(() => user.value?.role === 'admin')

  // ACTIONS — Auth teammate implements these
  function login(userData) {
    // TODO (Auth teammate): connect to your backend/API here
    user.value = userData
  }

  function logout() {
    user.value = null
  }

  function register(userData) {
    // TODO (Auth teammate): handle registration + role assignment
    user.value = userData
  }

  return { user, isLoggedIn, isSeller, isViewer, isAdmin, login, logout, register }
})
