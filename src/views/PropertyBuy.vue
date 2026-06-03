<template>
  <div class="page-wrapper">
    <div class="page-top">
      <h1 class="page-title">Properties For Sale</h1>
      <p class="page-sub">{{ forSale.length }} properties available</p>
    </div>

    <div v-if="forSale.length === 0" class="empty-section">
      <div class="empty-card">
        <div class="empty-icon">🏘️</div>
        <h2>No properties available</h2>
        <p>Check back soon for new listings.</p>
      </div>
    </div>

    <div v-else class="prop-grid">
      <div
        v-for="p in forSale" :key="p.id"
        class="prop-card"
        @click="listings.incrementViews(p.id)"
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
            <span>🛏 {{ p.bedrooms }} beds</span>
            <span>🚿 {{ p.bathrooms }} baths</span>
            <span>{{ p.type }}</span>
          </div>
          <button class="btn-enquire" @click="handleEnquire(p)">Enquire Now</button>
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

const forSale = computed(() => listings.forSale)

function handleEnquire(property) {
  if (!auth.isLoggedIn) {
    alert('Please log in to send an enquiry')
    return
  }
  alert(`Enquiry sent for ${property.title}`)
  // TODO: Wire to enquiries store
}
</script>

<style scoped>
.page-wrapper { padding: 2rem; max-width: 1200px; margin: 0 auto; }
.page-top { margin-bottom: 1.75rem; }
.page-title { font-size: 26px; font-weight: 700; }
.page-sub { color: var(--text-muted); font-size: 14px; margin-top: 4px; }
.empty-section { display: flex; justify-content: center; padding: 4rem 1rem; }
.empty-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 3rem 2rem; max-width: 500px; text-align: center; }
.empty-icon { font-size: 56px; margin-bottom: 1rem; }
.empty-card h2 { font-size: 22px; font-weight: 700; margin-bottom: 0.75rem; }
.empty-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; }
.prop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.prop-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; cursor: pointer; transition: transform .2s, border-color .2s; }
.prop-card:hover { transform: translateY(-4px); border-color: rgba(201,168,76,0.4); }
.prop-img-wrap { position: relative; }
.prop-img { width: 100%; height: 170px; object-fit: cover; display: block; }
.prop-status { position: absolute; top: 10px; right: 10px; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; text-transform: capitalize; }
.prop-status.active { background: rgba(127,224,176,0.2); color: #7fe0b0; }
.prop-status.pending { background: rgba(255,179,71,0.2); color: #ffb347; }
.prop-status.sold { background: rgba(255,130,130,0.2); color: #ff8282; }
.prop-price { position: absolute; bottom: 10px; left: 10px; background: var(--gold); color: var(--navy); font-weight: 700; font-size: 14px; padding: 4px 12px; border-radius: 6px; }
.prop-body { padding: 1rem; }
.prop-name { font-weight: 600; font-size: 15px; }
.prop-loc { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
.prop-meta { display: flex; gap: 14px; font-size: 12px; color: var(--text-muted); margin-top: 10px; }
.btn-enquire { width: 100%; margin-top: 12px; background: rgba(201,168,76,0.1); color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 8px; border-radius: 7px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: var(--font); transition: background .2s; }
.btn-enquire:hover { background: rgba(201,168,76,0.2); }
</style>
