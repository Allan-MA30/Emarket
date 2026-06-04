<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const showNavbar = computed(() => !auth.isSeller)
</script>
