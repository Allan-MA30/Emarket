/**
 * USERS STORE
 * Owned by: Auth teammate
 * Used by: Login, Register, PropertySell (to show seller name)
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref([
    // Demo seller account — for testing
    {
      id: 1,
      name: 'Jean (Demo Seller)',
      email: 'seller@nestlink.com',
      password: 'seller123',
      role: 'seller',
      profilePicture: '',
    },
    // Demo admin account
    {
      id: 2,
      name: 'Admin',
      email: 'admin@nestlink.com',
      password: 'admin123',
      role: 'admin',
      profilePicture: '',
    },
  ])

  function findByEmail(email) {
    return users.value.find(u => u.email === email) || null
  }

  function findById(id) {
    return users.value.find(u => u.id === id) || null
  }

  function addUser(user) {
    users.value.push(user)
  }

  return { users, findByEmail, findById, addUser }
})