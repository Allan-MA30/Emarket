<template>
  <div class="page-wrapper">
    <div class="page-top">
      <h1 class="page-title">Properties For Sale</h1>
      <p class="page-sub">{{ forSale.length }} properties available</p>
    </div>

    <div class="filters-bar">
      <select v-model="filters.category" class="filter-select">
        <option value="">All Categories</option>
        <option value="house">Houses</option>
        <option value="land">Land</option>
        <option value="car">Cars</option>
      </select>
      <select v-model="filters.location" class="filter-select">
        <option value="">All Locations</option>
        <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
      </select>
      <select v-model="filters.price" class="filter-select">
        <option value="">Any Price</option>
        <option value="0-1000">Under $1k</option>
        <option value="1000-50000">$1k - $50k</option>
        <option value="50000-100000">$50k - $100k</option>
        <option value="100000-999999999">$100k+</option>
      </select>
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
          <div class="seller-name">Listed by: {{ getSellerName(p.sellerId) }}</div>
          <div v-if="auth.user?.id === p.sellerId" class="your-listing">Your listing</div>
          <div class="prop-meta">
            <span>🛏 {{ p.bedrooms }} beds</span>
            <span>🚿 {{ p.bathrooms }} baths</span>
            <span>{{ p.type }}</span>
          </div>
          <button class="btn-enquire" @click.stop="handleEnquire(p)">Enquire Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'
import { useUsersStore } from '@/stores/users'
import { useEnquiriesStore } from '@/stores/enquiries'

const route = useRoute()
const listings = useListingsStore()
const auth = useAuthStore()
const users = useUsersStore()
const enquiries = useEnquiriesStore()

const filters = reactive({
  category: route.query.category || '',
  location: route.query.location || '',
  price: route.query.price || '',
})

const locations = computed(() => [...new Set(listings.properties.filter(p => p.mode === 'sell').map(p => p.location))])

const forSale = computed(() =>
  listings.properties.filter((p) => {
    if (p.mode !== 'sell') return false
    if (filters.category && p.category !== filters.category) return false
    if (filters.location && p.location !== filters.location) return false
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number)
      if (p.price < min || p.price > max) return false
    }
    return true
  })
)

function getSellerName(sellerId) {
  const seller = users.findById(sellerId)
  return seller ? seller.name : 'Seller'
}

function handleEnquire(property) {
  if (!auth.isLoggedIn) {
    alert('Please log in to send an enquiry')
    return
  }
  const message = prompt(`Message to seller about ${property.title}:`, 'I am interested in this listing. Is it still available?')
  if (!message) return
  enquiries.sendEnquiry({
    fromName: auth.user?.name || 'Buyer',
    fromEmail: auth.user?.email || 'buyer@email.com',
    propertyId: property.id,
    sellerId: property.sellerId,
    propertyTitle: property.title,
    message,
    createdAt: new Date().toISOString().split('T')[0],
  })
  alert(`Enquiry sent for ${property.title}`)
}
</script>

<style scoped>
.page-wrapper { padding: 2rem; max-width: 1200px; margin: 0 auto; }
.page-top { margin-bottom: 1.75rem; }
.page-title { font-size: 26px; font-weight: 700; }
.page-sub { color: var(--text-muted); font-size: 14px; margin-top: 4px; }
.filters-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 1.5rem; }
.filter-select { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; color: var(--text-main); padding: 10px 12px; font-family: var(--font); }
.filter-select option { background: var(--navy-2); }
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
.seller-name { margin-top: 6px; font-size: 13px; color: #d8d8ff; }
.your-listing { margin-top: 6px; display: inline-block; background: rgba(111,186,255,0.12); color: #6fbaff; border: 1px solid rgba(111,186,255,0.25); border-radius: 16px; padding: 4px 10px; font-size: 12px; font-weight: 600; }
.prop-meta { display: flex; gap: 14px; font-size: 12px; color: var(--text-muted); margin-top: 10px; }
.btn-enquire { width: 100%; margin-top: 12px; background: rgba(201,168,76,0.1); color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 8px; border-radius: 7px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: var(--font); transition: background .2s; }
.btn-enquire:hover { background: rgba(201,168,76,0.2); }
</style>
