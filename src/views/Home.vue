<template>
  <div class="home">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop"
          alt="Luxury home"
          class="hero-img"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">🏡 Rwanda's #1 Property Platform</div>
        <h1 class="hero-title">
          Find Your Perfect<br />
          <span class="gold">Home in Rwanda</span>
        </h1>
        <p class="hero-sub">
          Buy, sell, or rent properties across Kigali and beyond.<br />
          Thousands of listings. Trusted sellers. Simple process.
        </p>
        <div class="hero-actions">
          <RouterLink to="/property/buy"  class="btn-hero-primary">Browse for Sale</RouterLink>
          <RouterLink to="/property/rent" class="btn-hero-outline">Browse Rentals</RouterLink>
        </div>

        <!-- Search bar -->
        <div class="search-bar">
          <select class="search-select">
            <option>All Types</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Studio</option>
            <option>Land</option>
          </select>
          <div class="search-divider"></div>
          <select class="search-select">
            <option>All Locations</option>
            <option>Kacyiru</option>
            <option>Nyarutarama</option>
            <option>Kimihurura</option>
            <option>Remera</option>
            <option>Gisozi</option>
          </select>
          <div class="search-divider"></div>
          <select class="search-select">
            <option>Any Price</option>
            <option>Under $50k</option>
            <option>$50k – $100k</option>
            <option>$100k – $200k</option>
            <option>$200k+</option>
          </select>
          <RouterLink to="/property/sell" class="btn-search">Search</RouterLink>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-section">
      <div class="stats-inner">
        <div class="stat-item">
          <div class="stat-number">{{ listings.properties.length }}+</div>
          <div class="stat-label">Active Listings</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">120+</div>
          <div class="stat-label">Trusted Sellers</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">85+</div>
          <div class="stat-label">Properties Sold</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">12+</div>
          <div class="stat-label">Districts Covered</div>
        </div>
      </div>
    </section>

    <!-- FEATURED PROPERTIES -->
    <section class="section">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <div class="section-tag">Featured Properties</div>
            <h2 class="section-title">Handpicked For You</h2>
          </div>
          <RouterLink to="/property/buy" class="btn-view-all">View All →</RouterLink>
        </div>

        <div class="prop-grid">
          <div
            v-for="p in featured" :key="p.id"
            class="prop-card"
          >
            <div class="prop-img-wrap">
              <img :src="p.image" :alt="p.title" class="prop-img" />
              <span class="prop-mode" :class="p.mode">
                {{ p.mode === 'sell' ? 'For Sale' : 'For Rent' }}
              </span>
              <span class="prop-price">
                {{ p.mode === 'rent' ? '$' + p.price + '/mo' : '$' + p.price.toLocaleString() }}
              </span>
            </div>
            <div class="prop-body">
              <div class="prop-name">{{ p.title }}</div>
              <div class="prop-loc">📍 {{ p.location }}</div>
              <div v-if="auth.isLoggedIn" class="prop-meta">
                <span>🛏 {{ p.bedrooms }} beds</span>
                <span>🚿 {{ p.bathrooms }} baths</span>
                <span>{{ p.type }}</span>
              </div>
              <div v-else class="prop-meta muted">Log in to view details</div>
              <RouterLink
                @click="handlePropertyClick"
                :to="p.mode === 'rent' ? '/property/rent' : '/property/buy'"
                class="btn-view"
                :style="!auth.isLoggedIn ? 'opacity: 0.5; cursor: not-allowed;' : ''"
              >{{ auth.isLoggedIn ? 'View Property' : 'Log in to View' }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ARCHITECTURE SHOWCASE -->
    <section class="arch-section">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <div class="section-tag">Architecture</div>
            <h2 class="section-title">Built for Modern Living</h2>
          </div>
        </div>
        <div class="arch-grid">
          <div class="arch-main">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop"
              alt="Modern architecture"
              class="arch-img"
            />
            <div class="arch-label">
              <div class="arch-title">Contemporary Villas</div>
              <div class="arch-sub">Spacious, modern, and elegant designs</div>
            </div>
          </div>
          <div class="arch-side">
            <div class="arch-small">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop"
                alt="Apartment"
                class="arch-img"
              />
              <div class="arch-label">
                <div class="arch-title">City Apartments</div>
                <div class="arch-sub">Urban lifestyle at its finest</div>
              </div>
            </div>
            <div class="arch-small">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop"
                alt="Family home"
                class="arch-img"
              />
              <div class="arch-label">
                <div class="arch-title">Family Homes</div>
                <div class="arch-sub">Safe, comfortable neighbourhoods</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE US -->
    <section class="section">
      <div class="section-inner">
        <div class="section-head centered">
          <div class="section-tag">Why NestLink</div>
          <h2 class="section-title">The Smarter Way to Find Property</h2>
        </div>
        <div class="why-grid">
          <div class="why-card">
            <div class="why-icon">🔍</div>
            <div class="why-title">Easy Search</div>
            <div class="why-text">Filter by type, location, and price to find exactly what you need in seconds.</div>
          </div>
          <div class="why-card">
            <div class="why-icon">✅</div>
            <div class="why-title">Verified Listings</div>
            <div class="why-text">Every property is listed by a registered seller. No fake listings, no scams.</div>
          </div>
          <div class="why-card">
            <div class="why-icon">💬</div>
            <div class="why-title">Direct Contact</div>
            <div class="why-text">Send enquiries directly to sellers and get responses fast.</div>
          </div>
          <div class="why-card">
            <div class="why-icon">📊</div>
            <div class="why-title">Seller Dashboard</div>
            <div class="why-text">Sellers get a full dashboard to manage listings, track views, and respond to buyers.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BANNER (hidden for sellers) -->
    <section v-if="!auth.isSeller" class="cta-section">
      <div class="cta-inner">
        <h2 class="cta-title">Ready to List Your Property?</h2>
        <p class="cta-sub">Join hundreds of sellers already using NestLink to reach buyers across Rwanda.</p>
        <RouterLink :to="{ path: '/register', query: { role: 'seller' } }" class="btn-hero-primary">Get Started as a Seller</RouterLink>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'

const listings = useListingsStore()
const auth = useAuthStore()
const featured = computed(() => listings.properties.slice(0, 3))

function handlePropertyClick(e) {
  if (!auth.isLoggedIn) {
    e.preventDefault()
    alert('Please log in to view property details.')
  }
}
</script>

<style scoped>
.home { background: var(--navy); }

/* HERO */
.hero { position: relative; height: 620px; display: flex; align-items: center; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; }
.hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,22,40,0.92) 45%, rgba(10,22,40,0.4)); }
.hero-content { position: relative; z-index: 2; padding: 0 4rem; max-width: 680px; }
.hero-badge { display: inline-block; background: rgba(201,168,76,0.15); color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 6px 16px; border-radius: 20px; font-size: 13px; margin-bottom: 1.25rem; }
.hero-title { font-size: 52px; font-weight: 700; line-height: 1.15; margin-bottom: 1rem; color: var(--text-main); }
.gold { color: var(--gold); }
.hero-sub { font-size: 16px; color: var(--text-muted); line-height: 1.7; margin-bottom: 1.75rem; }
.hero-actions { display: flex; gap: 12px; margin-bottom: 2rem; }
.btn-hero-primary { background: var(--gold); color: var(--navy); padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 700; transition: opacity .2s; }
.btn-hero-primary:hover { opacity: .85; }
.btn-hero-outline { background: transparent; color: var(--text-main); border: 1px solid rgba(255,255,255,0.3); padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 500; transition: all .2s; }
.btn-hero-outline:hover { border-color: var(--gold); color: var(--gold); }

/* SEARCH BAR */
.search-bar { display: flex; align-items: center; background: rgba(255,255,255,0.07); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; overflow: hidden; max-width: 560px; }
.search-select { background: transparent; border: none; padding: 14px 16px; color: var(--text-main); font-size: 13px; font-family: var(--font); outline: none; cursor: pointer; flex: 1; }
.search-select option { background: var(--navy-2); color: var(--text-main); }
.search-divider { width: 1px; height: 24px; background: rgba(255,255,255,0.15); flex-shrink: 0; }
.btn-search { background: var(--gold); color: var(--navy); border: none; padding: 14px 24px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: var(--font); white-space: nowrap; transition: opacity .2s; }
.btn-search:hover { opacity: .85; }

/* STATS */
.stats-section { background: var(--navy-2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.stats-inner { max-width: 1200px; margin: 0 auto; padding: 2rem; display: flex; align-items: center; justify-content: center; gap: 0; }
.stat-item { flex: 1; text-align: center; padding: 1rem; }
.stat-number { font-size: 36px; font-weight: 700; color: var(--gold); }
.stat-label { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
.stat-divider { width: 1px; height: 50px; background: var(--border); flex-shrink: 0; }

/* SECTIONS */
.section { padding: 5rem 0; }
.section-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.section-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
.section-head.centered { flex-direction: column; align-items: center; text-align: center; gap: .5rem; }
.section-tag { font-size: 12px; color: var(--gold); text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; margin-bottom: .4rem; }
.section-title { font-size: 30px; font-weight: 700; color: var(--text-main); }
.btn-view-all { color: var(--gold); font-size: 14px; font-weight: 500; transition: opacity .2s; }
.btn-view-all:hover { opacity: .7; }

/* PROPERTY CARDS */
.prop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.prop-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: transform .2s, border-color .2s; }
.prop-card:hover { transform: translateY(-4px); border-color: rgba(201,168,76,0.4); }
.prop-img-wrap { position: relative; }
.prop-img { width: 100%; height: 180px; object-fit: cover; display: block; }
.prop-mode { position: absolute; top: 10px; left: 10px; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; }
.prop-mode.sell { background: rgba(201,168,76,0.9); color: var(--navy); }
.prop-mode.rent { background: rgba(127,224,176,0.9); color: var(--navy); }
.prop-price { position: absolute; bottom: 10px; left: 10px; background: var(--navy); color: var(--gold); font-weight: 700; font-size: 14px; padding: 4px 12px; border-radius: 6px; border: 1px solid rgba(201,168,76,0.3); }
.prop-body { padding: 1rem; }
.prop-name { font-weight: 600; font-size: 15px; }
.prop-loc { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
.prop-meta { display: flex; gap: 14px; font-size: 12px; color: var(--text-muted); margin-top: 8px; }
.btn-view { display: block; width: 100%; margin-top: 12px; background: rgba(201,168,76,0.1); color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 9px; border-radius: 7px; font-size: 13px; font-weight: 500; text-align: center; transition: background .2s; }
.btn-view:hover { background: rgba(201,168,76,0.2); }

/* ARCHITECTURE */
.arch-section { background: var(--navy-2); padding: 5rem 0; }
.arch-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; }
.arch-main { position: relative; border-radius: var(--radius); overflow: hidden; }
.arch-side { display: flex; flex-direction: column; gap: 16px; }
.arch-small { position: relative; border-radius: var(--radius); overflow: hidden; flex: 1; }
.arch-img { width: 100%; height: 100%; object-fit: cover; display: block; min-height: 180px; }
.arch-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem 1.2rem; background: linear-gradient(to top, rgba(10,22,40,0.95), transparent); }
.arch-title { font-weight: 600; font-size: 15px; color: var(--text-main); }
.arch-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

/* WHY GRID */
.why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 2rem; }
.why-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; text-align: center; transition: border-color .2s; }
.why-card:hover { border-color: rgba(201,168,76,0.4); }
.why-icon { font-size: 32px; margin-bottom: .75rem; }
.why-title { font-size: 15px; font-weight: 600; margin-bottom: .5rem; }
.why-text { font-size: 13px; color: var(--text-muted); line-height: 1.6; }

/* CTA */
.cta-section { background: var(--navy-2); border-top: 1px solid var(--border); padding: 5rem 2rem; text-align: center; }
.cta-inner { max-width: 600px; margin: 0 auto; }
.cta-title { font-size: 32px; font-weight: 700; margin-bottom: 1rem; }
.cta-sub { font-size: 15px; color: var(--text-muted); margin-bottom: 2rem; line-height: 1.7; }
</style>