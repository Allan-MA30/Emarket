<template>
  <div class="page-wrapper">
    <div class="page-top">
      <h1 class="page-title">Properties For Sale</h1>
      <p class="page-sub">{{ listings.forSale.length }} properties available</p>
    </div>

    <div class="prop-grid">
      <div
        v-for="p in listings.forSale" :key="p.id"
        class="prop-card"
        @click="listings.incrementViews(p.id)"
      >
        <div class="prop-img-wrap">
          <img :src="p.image" :alt="p.title" class="prop-img" />
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
          <button class="btn-enquire">Enquire Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useListingsStore } from '@/stores/listings'
const listings = useListingsStore()
</script>

<style scoped>
.page-top { margin-bottom: 1.75rem; }
.page-title { font-size: 26px; font-weight: 700; }
.page-sub { color: var(--text-muted); font-size: 14px; margin-top: 4px; }
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
</style>
