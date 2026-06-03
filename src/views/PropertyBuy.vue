<template>
  <div class="page-wrapper">
    <!--
    ============================================================
    PROPERTY — BUY — Assigned to: [Teammate Name]
    ============================================================
    What to build here:
    - Grid of properties available for purchase
    - Filter by price, type, location (optional)
    - Each card shows: image, title, price, beds, baths, location
    - "Enquire Now" button that adds to enquiries store

    How to get the data:
      import { useListingsStore } from '@/stores/listings'
      const listings = useListingsStore()
      const buyListings = computed(() => listings.forSale)

    To send an enquiry:
      import { useEnquiriesStore } from '@/stores/enquiries'
      enquiriesStore.sendEnquiry({ fromName, fromEmail, propertyId, propertyTitle, message })
    ============================================================
    -->
    <h1 style="color: var(--text-muted); text-align:center; margin-top: 4rem;">
      🏠 Buy page — coming soon (assigned teammate)
    </h1>
  </div>
</template>

<script setup>
// TODO: implement PropertyBuy page
// Hint: import { useListingsStore } from '@/stores/listings'
</script>
