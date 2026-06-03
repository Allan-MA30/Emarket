<template>
  <div class="page-wrapper">
    <div class="page-top">
      <h1 class="page-title">My Listed Properties</h1>
      <p class="page-sub">{{ auth.isSeller ? `${myListings.length} properties listed` : 'Sellers only' }}</p>
    </div>

    <div v-if="!auth.isSeller" class="restricted-section">
      <div class="restricted-card">
        <div class="restricted-icon">🔒</div>
        <h2>Seller Access Only</h2>
        <p>This page is reserved for sellers to manage their property listings. Register as a seller to get started.</p>
        <RouterLink :to="{ path: '/register', query: { role: 'seller' } }" class="btn-register">Register as a Seller</RouterLink>
      </div>
    </div>

    <div v-else-if="myListings.length === 0" class="empty-section">
      <div class="empty-card">
        <div class="empty-icon">📭</div>
        <h2>You have uploaded nothing</h2>
        <p>Start by listing your first property to reach buyers across Rwanda.</p>
        <button class="btn-add-listing" @click="handleAddListing">+ Add Your First Listing</button>
      </div>
    </div>

    <div v-else class="prop-grid">
      <div
        v-for="p in myListings" :key="p.id"
        class="prop-card"
      >
        <div class="prop-img-wrap">
          <img :src="p.image" :alt="p.title" class="prop-img" />
          <span class="prop-status" :class="p.status">{{ p.status }}</span>
          <span class="prop-price">${{ p.price.toLocaleString() }}</span>
        </div>
        <div class="prop-body">
          <div class="prop-name">{{ p.title }}</div>
          <div class="prop-loc">📍 {{ p.location }}</div>
          <div class="prop-meta">
            <span>👁 {{ p.views }} views</span>
            <span>{{ p.type }}</span>
          </div>
          <div class="prop-actions">
            <button class="btn-edit">Edit</button>
            <button class="btn-remove">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'

const listings = useListingsStore()
const auth = useAuthStore()

const myListings = computed(() => 
  auth.user ? listings.myListings(auth.user.id) : []
)

function handleAddListing() {
  // TODO: Navigate to add listing form or modal
  alert('Add listing feature coming soon')
}
</script>

<style scoped>
.page-top { margin-bottom: 1.75rem; }
.page-title { font-size: 26px; font-weight: 700; }
.page-sub { color: var(--text-muted); font-size: 14px; margin-top: 4px; }
.restricted-section { display: flex; justify-content: center; padding: 3rem 1rem; }
.restricted-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; max-width: 500px; text-align: center; }
.restricted-icon { font-size: 48px; margin-bottom: 1rem; }
.restricted-card h2 { font-size: 22px; font-weight: 700; margin-bottom: 0.75rem; }
.restricted-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 1.5rem; }
.btn-register { display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 700; text-decoration: none; transition: opacity .2s; }
.btn-register:hover { opacity: 0.85; }
.prop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.prop-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; cursor: pointer; transition: transform .2s, border-color .2s; }
.prop-card:hover { transform: translateY(-4px); border-color: rgba(201,168,76,0.4); }
.prop-img-wrap { position: relative; }
.prop-img { width: 100%; height: 170px; object-fit: cover; display: block; }
.prop-price { position: absolute; bottom: 10px; left: 10px; background: var(--gold); color: var(--navy); font-weight: 700; font-size: 14px; padding: 4px 12px; border-radius: 6px; }
.prop-body { padding: 1rem; }
.prop-name { font-weight: 600; font-size: 15px; }
.prop-loc  { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
.prop-meta { display: flex; gap: 14px; font-size: 12px; color: var(--text-muted); margin-top: 10px; }
.btn-enquire { width: 100%; margin-top: 12px; background: rgba(201,168,76,0.1); color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 8px; border-radius: 7px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: var(--font); transition: background .2s; }
.btn-enquire:hover { background: rgba(201,168,76,0.2); }
.empty-section { display: flex; justify-content: center; padding: 4rem 1rem; }
.empty-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 3rem 2rem; max-width: 500px; text-align: center; }
.empty-icon { font-size: 56px; margin-bottom: 1rem; }
.empty-card h2 { font-size: 22px; font-weight: 700; margin-bottom: 0.75rem; }
.empty-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 1.5rem; }
.btn-add-listing { background: var(--gold); color: var(--navy); border: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: var(--font); transition: opacity .2s; }
.btn-add-listing:hover { opacity: 0.85; }
.prop-status { position: absolute; top: 10px; right: 10px; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; text-transform: capitalize; }
.prop-status.active { background: rgba(127,224,176,0.2); color: #7fe0b0; border: 1px solid rgba(127,224,176,0.4); }
.prop-status.pending { background: rgba(255,179,71,0.2); color: #ffb347; border: 1px solid rgba(255,179,71,0.4); }
.prop-status.sold { background: rgba(255,130,130,0.2); color: #ff8282; border: 1px solid rgba(255,130,130,0.4); }
.prop-actions { display: flex; gap: 8px; margin-top: 12px; }
.btn-edit, .btn-remove { flex: 1; padding: 8px; border-radius: 7px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: var(--font); border: 1px solid var(--border); transition: all .2s; }
.btn-edit { background: rgba(111,186,255,0.1); color: #6fbaff; }
.btn-edit:hover { background: rgba(111,186,255,0.2); border-color: rgba(111,186,255,0.4); }
.btn-remove { background: rgba(255,130,130,0.1); color: #ff8282; }
.btn-remove:hover { background: rgba(255,130,130,0.2); border-color: rgba(255,130,130,0.4); }
</style>
