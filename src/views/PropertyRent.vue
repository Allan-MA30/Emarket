<template>
  <div class="property-page">

    <!-- HERO -->
    <section class="hero">
      <img :src="heroImage" alt="Hero Background" class="hero-bg" />
      <div class="overlay">
        <div class="hero-content">
          <h1>Find Your Perfect Rental Property</h1>
          <p>Browse apartments, houses, villas and offices across Rwanda.</p>

          <div class="search-box">
            <div class="search-container">
              <input 
                type="text" 
                placeholder="Search by location..." 
                v-model="searchQuery"
                @input="filterLocations"
                @focus="showSuggestions = true"
                @blur="setTimeout(() => showSuggestions = false, 200)"
              />
              <div class="suggestions-dropdown" v-if="showSuggestions && filteredLocations.length">
                <div 
                  class="suggestion-item" 
                  v-for="location in filteredLocations" 
                  :key="location"
                  @click="selectLocation(location)"
                >
                  {{ location }}
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats">
      <div class="stat" v-for="(stat, index) in stats" :key="index">
        <h2>{{ stat.value }}</h2>
        <p>{{ stat.label }}</p>
      </div>
    </section>

    <!-- FEATURED PROPERTIES -->
    <section class="featured">
      <div class="section-header">
        <h2 class="section-title">Featured Properties</h2>
        <p class="section-subtitle">Discover our handpicked selection of premium rentals</p>
      </div>

      <div class="property-grid">

        <div
          class="property-card"
          v-for="property in properties"
          :key="property.id"
        >
          <div class="property-image-wrapper">
            <img :src="getPropertyImage(property.id)" :alt="property.name" class="property-img" />
            <div class="property-badge">{{ property.type }}</div>
          </div>

          <div class="property-content">
            <h3>{{ property.name }}</h3>

            <p class="location">
              {{ property.location }}
            </p>

            <div class="details">
              <span class="detail-item">{{ property.bedrooms }} Bed</span>
              <span class="detail-item">{{ property.bathrooms }} Bath</span>
              <span class="detail-item">{{ property.size }}</span>
            </div>

            <div class="bottom">
              <div class="price-section">
                <span class="price-label">From</span>
                <h4>${{ property.price }}<span>/month</span></h4>
              </div>
              <button class="view-btn">View Details</button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="categories">
      <div class="section-header">
        <h2 class="section-title">Property Types</h2>
        <p class="section-subtitle">Find the perfect property type for your needs</p>
      </div>

      <div class="category-grid">
        <div class="category-card" v-for="(category, index) in categories" :key="index">
          <div class="category-icon">{{ category.icon }}</div>
          <h3>{{ category.name }}</h3>
          <p>{{ category.count }} properties</p>
        </div>
      </div>
    </section>

    <!-- WHY US -->
    <section class="why-us">
      <div class="section-header">
        <h2 class="section-title">Why Choose Us?</h2>
        <p class="section-subtitle">Your trusted partner in finding the perfect home</p>
      </div>

      <div class="why-grid">
        <div class="why-card" v-for="(reason, index) in whyUs" :key="index">
          <h3>{{ reason.title }}</h3>
          <p>{{ reason.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="cta-content">
        <h2>Ready To Find Your Next Home?</h2>
        <p>Join thousands of satisfied renters who found their perfect property with us</p>
        <button class="cta-btn">Browse Properties</button>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import image1 from '../assets/images/image1.png'
import image2 from '../assets/images/image2.png'
import image3 from '../assets/images/image3.png'

const heroImage = image1

const searchQuery = ref('')
const showSuggestions = ref(false)
const filteredLocations = ref([])

const rwandaLocations = [
  'Kigali',
  'Kigali Heights',
  'Nyarutarama',
  'Kicukiro',
  'Remera',
  'Kimihurura',
  'Kibagabaga',
  'Gisozi',
  'Muhima',
  'Gacuriro',
  'Butare',
  'Gitarama',
  'Musanze',
  'Ruhengeri',
  'Rubavu',
  'Nyagatare',
  'Kayonza',
  'Gakenke',
  'Bugesera',
  'Nyanza',
  'Muhanga'
]

const filterLocations = () => {
  if (searchQuery.value.trim()) {
    filteredLocations.value = rwandaLocations.filter(location =>
      location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  } else {
    filteredLocations.value = rwandaLocations
  }
}

const selectLocation = (location) => {
  searchQuery.value = location
  showSuggestions.value = false
}

const properties = [
  {
    id: 1,
    name: "Modern Apartment",
    location: "Kigali Heights",
    price: 800,
    bedrooms: 2,
    bathrooms: 2,
    size: "120m²",
    type: "Apartment"
  },
  {
    id: 2,
    name: "Luxury Villa",
    location: "Nyarutarama",
    price: 1500,
    bedrooms: 4,
    bathrooms: 3,
    size: "300m²",
    type: "Villa"
  },
  {
    id: 3,
    name: "Family House",
    location: "Kicukiro",
    price: 600,
    bedrooms: 3,
    bathrooms: 2,
    size: "180m²",
    type: "House"
  }
]

const stats = [
  { value: '500+', label: 'Properties', icon: '' },
  { value: '120+', label: 'Locations', icon: '' },
  { value: '98%', label: 'Satisfaction', icon: '' },
  { value: '24/7', label: 'Support', icon: '' }
]

const categories = [
  { name: 'Houses', icon: '🏠', count: 120 },
  { name: 'Apartments', icon: '🏢', count: 240 },
  { name: 'Villas', icon: '🏰', count: 85 },
  { name: 'Offices', icon: '🏬', count: 55 }
]

const whyUs = [
  {
    icon: '',
    title: 'Verified Listings',
    description: 'All properties are thoroughly verified before publication for your peace of mind.'
  },
  {
    icon: '',
    title: 'Best Prices',
    description: 'Most competitive rental offers in Kigali and across Rwanda.'
  },
  {
    icon: '',
    title: 'Secure Process',
    description: 'Safe and transparent rental transactions with buyer protection.'
  }
]

const getPropertyImage = (id) => {
  const images = {
    1: image1,
    2: image2,
    3: image3
  }
  return images[id] || image1
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.property-page {
  font-family: 'Poppins', sans-serif;
  background: #f9fafb;
}

/* HERO */
.hero {
  position: relative;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  image-rendering: crisp-edges;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  padding: 60px 40px;
  border-radius: 25px;
  backdrop-filter: blur(5px);
  max-width: 700px;
  animation: fadeInDown 0.8s ease-out;
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 20px;
  font-weight: 800;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
}

.search-box {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
}

.search-container {
  position: relative;
  width: 350px;
}

.search-box input {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.3s ease;
}

.search-box input:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 5px;
}

.suggestion-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
  color: #374151;
  font-size: 0.95rem;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background: #f0fdf4;
  color: #10b981;
  padding-left: 25px;
}

.search-box button {
  padding: 15px 35px;
  border: none;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.search-box button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 80px 10%;
  gap: 30px;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
}

.stat {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.stat:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(16, 185, 129, 0.15);
}

.stat h2 {
  color: #10b981;
  font-size: 2.8rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.stat p {
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
}

/* SECTION HEADER */
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 3rem;
  color: #1f2937;
  margin-bottom: 15px;
  font-weight: 800;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

/* PROPERTIES */
.featured {
  padding: 80px 10%;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 35px;
}

.property-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.property-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px rgba(16, 185, 129, 0.15);
}

.property-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 270px;
}

.property-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  image-rendering: crisp-edges;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.property-card:hover .property-img {
  transform: scale(1.08);
}

.property-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
}

.property-content {
  padding: 28px;
}

.detail-icon {
  font-size: 1rem;
  color: #10b981;
}

.property-content h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 12px;
}

.location {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.details {
  display: flex;
  gap: 15px;
  margin: 25px 0;
  flex-wrap: wrap;
}

.detail-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f3f4f6;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #374151;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.price-section h4 {
  font-size: 1.8rem;
  color: #10b981;
  font-weight: 700;
}

.price-section span {
  font-size: 0.85rem;
  color: #6b7280;
}

.price-label {
  display: block;
  font-size: 0.8rem;
  color: #9ca3af;
  margin-bottom: 3px;
}

.view-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.view-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}

/* CATEGORIES */
.categories {
  padding: 80px 10%;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
}

.category-card {
  background: white;
  padding: 40px 30px;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.category-card:hover {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(16, 185, 129, 0.25);
}

.category-icon {
  font-size: 2rem;
  margin-bottom: 15px;
}

.category-card h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.category-card p {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* WHY US */
.why-us {
  padding: 80px 10%;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 35px;
}

.why-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #10b981;
}

.why-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 45px rgba(16, 185, 129, 0.15);
}

.why-card h3 {
  font-size: 1.3rem;
  color: #1f2937;
  margin-bottom: 15px;
  font-weight: 700;
}

.why-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* CTA */
.cta {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 100px 20px;
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta h2 {
  font-size: 2.8rem;
  margin-bottom: 20px;
  font-weight: 800;
}

.cta p {
  font-size: 1.1rem;
  margin-bottom: 35px;
  opacity: 0.95;
  line-height: 1.6;
}

.cta-btn {
  padding: 16px 45px;
  border: none;
  border-radius: 12px;
  background: white;
  color: #10b981;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

/* ANIMATIONS */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .search-box {
    flex-direction: column;
  }

  .search-container {
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }

  .section-title {
    font-size: 2rem;
  }

  .property-grid {
    grid-template-columns: 1fr;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta h2 {
    font-size: 2rem;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
    padding: 50px 5%;
  }
}
</style>