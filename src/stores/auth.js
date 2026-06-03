/**
 * AUTH STORE
 * Owned by: Auth teammate
 *
 * Stores who is logged in and what their role is.
 * Every other teammate reads from this store — do NOT modify
 * the shape of `user` without telling the whole team.
 *
 * user.role options: 'viewer' | 'seller'
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // STATE
  const user = ref(null)
  // Example user shape:
  // { id: 1, name: 'Jean Pierre', email: 'jp@email.com', role: 'seller' }

  // GETTERS
  const isLoggedIn = computed(() => !!user.value)
  const isSeller   = computed(() => user.value?.role === 'seller')
  const isViewer   = computed(() => user.value?.role === 'viewer')

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

  return { user, isLoggedIn, isSeller, isViewer, login, logout, register }
})
