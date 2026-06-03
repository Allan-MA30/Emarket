/**
 * LISTINGS STORE
 * Owned by: Seller teammate (Jean / team leader)
 *
 * This is the single source of truth for ALL properties.
 * - Buy teammate:  filter by mode === 'sell'
 * - Rent teammate: filter by mode === 'rent'
 * - Sell/Dashboard: full access (add, edit, remove)
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useListingsStore = defineStore('listings', () => {
  // STATE
  const properties = ref([
    {
      id: 1,
      title: 'Kacyiru Heights Villa',
      type: 'Villa',
      price: 180000,
      mode: 'sell',          // 'sell' | 'rent'
      location: 'Kacyiru, Kigali',
      bedrooms: 4,
      bathrooms: 3,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      description: 'Spacious villa with garden and parking in a quiet neighborhood.',
      sellerId: 2,
      status: 'active',      // 'active' | 'pending' | 'sold' | 'rented'
      views: 412,
      createdAt: '2025-01-10',
    },
    {
      id: 2,
      title: 'Nyarutarama Apartment 3B',
      type: 'Apartment',
      price: 95000,
      mode: 'sell',
      location: 'Nyarutarama, Kigali',
      bedrooms: 3,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      description: 'Modern apartment with city views on the 3rd floor.',
      sellerId: 2,
      status: 'pending',
      views: 287,
      createdAt: '2025-02-05',
    },
    {
      id: 3,
      title: 'Kimihurura Studio',
      type: 'Studio',
      price: 600,
      mode: 'rent',
      location: 'Kimihurura, Kigali',
      bedrooms: 1,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      description: 'Cozy studio apartment, ideal for a single professional.',
      sellerId: 2,
      status: 'active',
      views: 193,
      createdAt: '2025-03-12',
    },
  ])

  // GETTERS
  const forSale    = computed(() => properties.value.filter(p => p.mode === 'sell'))
  const forRent    = computed(() => properties.value.filter(p => p.mode === 'rent'))
  const myListings = (sellerId) => properties.value.filter(p => p.sellerId === sellerId)

  // ACTIONS
  function addListing(listing) {
    const newListing = {
      ...listing,
      id: Date.now(),
      views: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    }
    properties.value.push(newListing)
  }

  function updateListing(id, updates) {
    const index = properties.value.findIndex(p => p.id === id)
    if (index !== -1) {
      properties.value[index] = { ...properties.value[index], ...updates }
    }
  }

  function removeListing(id) {
    properties.value = properties.value.filter(p => p.id !== id)
  }

  function incrementViews(id) {
    const prop = properties.value.find(p => p.id === id)
    if (prop) prop.views++
  }

  return {
    properties,
    forSale,
    forRent,
    myListings,
    addListing,
    updateListing,
    removeListing,
    incrementViews,
  }
})
