<template>
  <div class="page-wrapper">

    <!-- Dashboard Tabs -->
    <div class="dash-tabs">
      <button
        v-for="tab in tabs" :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
        <span v-if="tab.id === 'enquiries' && unread > 0" class="unread-dot">{{ unread }}</span>
      </button>
    </div>

    <!-- STATS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Active Listings</div>
        <div class="stat-value">{{ activeListings.length }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Views</div>
        <div class="stat-value">{{ totalViews.toLocaleString() }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Enquiries</div>
        <div class="stat-value">{{ enquiriesStore.enquiries.length }}</div>
        <div class="stat-sub">{{ unread }} unread</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Sold / Rented</div>
        <div class="stat-value">{{ soldCount }}</div>
      </div>
    </div>

    <!-- MY LISTINGS TAB -->
    <div v-if="activeTab === 'listings'">
      <div class="section-header">
        <h2 class="section-title">My Listings</h2>
        <button class="btn-primary" @click="showModal = true">+ Add Listing</button>
      </div>

      <div class="table-card">
        <table class="listings-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Mode</th>
              <th>Price</th>
              <th>Views</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in sellerListings" :key="p.id">
              <td>
                <div class="prop-cell">
                  <img :src="p.image" class="prop-thumb" :alt="p.title" />
                  <div>
                    <div class="prop-name">{{ p.title }}</div>
                    <div class="prop-loc">{{ p.location }}</div>
                  </div>
                </div>
              </td>
              <td>{{ p.type }}</td>
              <td>
                <span class="mode-badge" :class="p.mode">
                  {{ p.mode === 'sell' ? 'For Sale' : 'For Rent' }}
                </span>
              </td>
              <td class="price-cell">
                {{ p.mode === 'rent' ? '$' + p.price + '/mo' : '$' + p.price.toLocaleString() }}
              </td>
              <td>{{ p.views }}</td>
              <td>
                <span class="status-badge" :class="p.status">{{ p.status }}</span>
              </td>
              <td>
                <div class="row-actions">
                  <button class="action-btn edit" @click="editListing(p)">Edit</button>
                  <button class="action-btn del"  @click="listings.removeListing(p.id)">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ENQUIRIES TAB -->
    <div v-if="activeTab === 'enquiries'">
      <div class="section-header">
        <h2 class="section-title">Enquiries</h2>
        <button class="btn-outline" @click="markAllRead">Mark all read</button>
      </div>
      <div class="enquiry-list">
        <div
          v-for="e in enquiriesStore.enquiries" :key="e.id"
          class="enquiry-card"
          :class="{ unread: !e.read }"
        >
          <div class="eq-left">
            <div class="eq-name">{{ e.fromName }}</div>
            <div class="eq-prop">Re: {{ e.propertyTitle }}</div>
            <div class="eq-msg">"{{ e.message }}"</div>
          </div>
          <div class="eq-right">
            <div class="eq-time">{{ e.createdAt }}</div>
            <button class="btn-reply" @click="enquiriesStore.markRead(e.id)">
              {{ e.read ? 'Replied' : 'Reply' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ANALYTICS TAB -->
    <div v-if="activeTab === 'analytics'">
      <div class="section-header">
        <h2 class="section-title">Analytics</h2>
      </div>
      <div class="analytics-grid">
        <div class="stat-card">
          <div class="stat-label">Most Viewed</div>
          <div class="stat-value" style="font-size:16px;">{{ mostViewed?.title || '—' }}</div>
          <div class="stat-sub">{{ mostViewed?.views }} views</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Listings</div>
          <div class="stat-value">{{ sellerListings.length }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">For Sale</div>
          <div class="stat-value">{{ sellerListings.filter(p => p.mode==='sell').length }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">For Rent</div>
          <div class="stat-value">{{ sellerListings.filter(p => p.mode==='rent').length }}</div>
        </div>
      </div>
    </div>

    <!-- ADD / EDIT LISTING MODAL -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ editingId ? 'Edit Listing' : 'Add New Listing' }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Title</label>
            <input v-model="form.title" class="form-input" placeholder="e.g. Kacyiru 3-bed Villa" />
          </div>
          <div class="form-group">
            <label>Type</label>
            <select v-model="form.type" class="form-input">
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Studio</option>
              <option>Land</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Price (USD)</label>
            <input v-model="form.price" type="number" class="form-input" placeholder="150000" />
          </div>
          <div class="form-group">
            <label>Mode</label>
            <select v-model="form.mode" class="form-input">
              <option value="sell">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Location</label>
          <input v-model="form.location" class="form-input" placeholder="District, Kigali" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Bedrooms</label>
            <input v-model="form.bedrooms" type="number" class="form-input" placeholder="3" />
          </div>
          <div class="form-group">
            <label>Bathrooms</label>
            <input v-model="form.bathrooms" type="number" class="form-input" placeholder="2" />
          </div>
        </div>

        <div class="form-group">
          <label>Image URL</label>
          <input v-model="form.image" class="form-input" placeholder="https://images.unsplash.com/..." />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="form.description" class="form-input" rows="3" placeholder="Describe the property..."></textarea>
        </div>

        <div class="modal-footer">
          <button class="btn-outline" @click="closeModal">Cancel</button>
          <button class="btn-primary" @click="submitForm">
            {{ editingId ? 'Save Changes' : 'Publish Listing' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useListingsStore }   from '@/stores/listings'
import { useEnquiriesStore }  from '@/stores/enquiries'
import { useAuthStore }       from '@/stores/auth'

const listings       = useListingsStore()
const enquiriesStore = useEnquiriesStore()
const auth           = useAuthStore()

const activeTab = ref('listings')
const showModal = ref(false)
const editingId = ref(null)

const tabs = [
  { id: 'listings',   label: 'My Listings' },
  { id: 'enquiries',  label: 'Enquiries' },
  { id: 'analytics',  label: 'Analytics' },
]

const blankForm = () => ({
  title: '', type: 'House', price: '', mode: 'sell',
  location: '', bedrooms: '', bathrooms: '', image: '', description: '',
})
const form = reactive(blankForm())

// Seller's listings only
const sellerId      = computed(() => auth.user?.id || 1)
const sellerListings = computed(() => listings.properties.filter(p => p.sellerId === sellerId.value))
const activeListings = computed(() => sellerListings.value.filter(p => p.status === 'active'))
const soldCount      = computed(() => sellerListings.value.filter(p => ['sold','rented'].includes(p.status)).length)
const totalViews     = computed(() => sellerListings.value.reduce((sum, p) => sum + p.views, 0))
const mostViewed     = computed(() => [...sellerListings.value].sort((a,b) => b.views - a.views)[0])
const unread         = computed(() => enquiriesStore.enquiries.filter(e => !e.read).length)

function editListing(p) {
  editingId.value = p.id
  Object.assign(form, { ...p })
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingId.value = null
  Object.assign(form, blankForm())
}

function submitForm() {
  if (editingId.value) {
    listings.updateListing(editingId.value, { ...form, price: Number(form.price) })
  } else {
    listings.addListing({ ...form, price: Number(form.price), sellerId: sellerId.value })
  }
  closeModal()
}

function markAllRead() {
  enquiriesStore.enquiries.forEach(e => e.read = true)
}
</script>

<style scoped>
.dash-tabs { display: flex; gap: 4px; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0; }
.tab-btn { background: none; border: none; padding: 10px 20px; font-size: 14px; color: var(--text-muted); cursor: pointer; border-bottom: 2px solid transparent; font-family: var(--font); position: relative; transition: all .2s; }
.tab-btn:hover { color: var(--text-main); }
.tab-btn.active { color: var(--gold); border-bottom-color: var(--gold); }
.unread-dot { background: var(--gold); color: var(--navy); font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px; margin-left: 6px; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 2rem; }
.analytics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 1.2rem; }
.stat-label { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
.stat-value { font-size: 28px; font-weight: 700; }
.stat-sub { font-size: 12px; color: var(--text-muted); margin-top: 4px; }

.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
.section-title { font-size: 18px; font-weight: 600; }

.table-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.listings-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.listings-table th { background: var(--navy-3); color: var(--text-muted); font-weight: 500; padding: 10px 14px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: .5px; }
.listings-table td { padding: 12px 14px; border-bottom: 1px solid var(--border); }
.listings-table tr:last-child td { border-bottom: none; }
.listings-table tr:hover td { background: rgba(201,168,76,0.03); }
.prop-cell { display: flex; align-items: center; gap: 10px; }
.prop-thumb { width: 48px; height: 38px; border-radius: 5px; object-fit: cover; }
.prop-name { font-weight: 500; }
.prop-loc { font-size: 12px; color: var(--text-muted); }
.price-cell { color: var(--gold); font-weight: 600; }

.mode-badge { font-size: 11px; padding: 2px 8px; border-radius: 20px; }
.mode-badge.sell { background: rgba(201,168,76,0.12); color: var(--gold); }
.mode-badge.rent { background: rgba(127,224,176,0.12); color: #7fe0b0; }

.status-badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 600; text-transform: capitalize; }
.status-badge.active  { background: rgba(127,224,176,0.15); color: #7fe0b0; }
.status-badge.pending { background: rgba(201,168,76,0.15); color: var(--gold); }
.status-badge.sold    { background: rgba(111,186,255,0.15); color: #6fbaff; }
.status-badge.rented  { background: rgba(111,186,255,0.15); color: #6fbaff; }

.row-actions { display: flex; gap: 6px; }
.action-btn { padding: 4px 10px; border-radius: 5px; font-size: 11px; cursor: pointer; border: 1px solid var(--border); background: none; color: var(--text-muted); font-family: var(--font); transition: all .2s; }
.action-btn.edit:hover { color: var(--gold); border-color: var(--gold); }
.action-btn.del:hover  { color: #ff8080; border-color: #ff8080; }

.enquiry-list { display: flex; flex-direction: column; gap: 10px; }
.enquiry-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 1.2rem; display: flex; justify-content: space-between; gap: 1rem; }
.enquiry-card.unread { border-left: 3px solid var(--gold); }
.eq-name { font-weight: 500; }
.eq-prop { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.eq-msg  { font-size: 13px; color: var(--text-muted); margin-top: 6px; font-style: italic; }
.eq-right { text-align: right; flex-shrink: 0; }
.eq-time { font-size: 12px; color: var(--text-muted); }
.btn-reply { margin-top: 8px; background: rgba(201,168,76,0.1); color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 5px 14px; border-radius: 6px; font-size: 12px; cursor: pointer; font-family: var(--font); }

/* Modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(5,12,25,0.8); display: flex; align-items: center; justify-content: center; z-index: 200; }
.modal { background: var(--navy-2); border: 1px solid var(--border); border-radius: 14px; padding: 1.75rem; width: 540px; max-height: 90vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.modal-header h3 { font-size: 17px; font-weight: 600; }
.close-btn { background: none; border: none; color: var(--text-muted); font-size: 22px; cursor: pointer; line-height: 1; }
.close-btn:hover { color: var(--text-main); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-group { margin-bottom: 14px; }
.form-group label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 5px; }
.form-input { width: 100%; background: var(--navy); border: 1px solid var(--border); border-radius: 7px; padding: 9px 12px; color: var(--text-main); font-size: 13px; font-family: var(--font); outline: none; resize: vertical; }
.form-input:focus { border-color: var(--gold); }
.modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding-top: 1rem; border-top: 1px solid var(--border); margin-top: .5rem; }
</style>
