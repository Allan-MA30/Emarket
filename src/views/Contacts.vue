<template>
  <div class="page-wrapper contacts-page">
    <section class="about-card card">
      <div class="section-head">
        <div>
          <div class="section-tag">About Us</div>
          <h1 class="section-title">Helping you find the perfect home, faster.</h1>
        </div>
      </div>

      <p class="section-text">
        At Emarket, our mission is to connect buyers, renters, and sellers with confidence.
        We blend local market expertise with thoughtful service so every client can make
        a smarter property decision.
      </p>

      <div class="about-grid">
        <div class="about-item">
          <h3>Our Promise</h3>
          <p>Reliable listings, fast response, and transparent support from search through closing.</p>
        </div>
        <div class="about-item">
          <h3>Our Team</h3>
          <p>Dedicated local agents, property specialists, and customer care experts working together.</p>
        </div>
        <div class="about-item">
          <h3>Why Choose Us</h3>
          <p>Simplified search, verified properties, and a personal approach tailored to your goals.</p>
        </div>
      </div>
    </section>

    <section class="contact-card card">
      <div class="section-head">
        <div>
          <div class="section-tag">Get in Touch With Us</div>
          <h2 class="section-title">Send us a message</h2>
        </div>
      </div>

      <div class="contact-info-grid">
        <div class="contact-info-item">
          <span class="contact-label">Email</span>
          <a href="mailto:hello@emarket.rw">hello@emarket.rw</a>
        </div>
        <div class="contact-info-item">
          <span class="contact-label">Phone</span>
          <a href="tel:+250788123456">+250 788 123 456</a>
        </div>
        <div class="contact-info-item social-item">
          <span class="contact-label">Follow us</span>
          <div class="social-links">
            <a href="https://www.facebook.com/emarket" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.twitter.com/emarket" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://www.instagram.com/emarket" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
        <label>
          Name
          <input type="text" v-model="name" placeholder="Your full name" :class="{ invalid: nameError }" />
          <p v-if="nameError" class="error-text">{{ nameError }}</p>
        </label>

        <label>
          Email
          <input type="email" v-model="email" placeholder="you@example.com" :class="{ invalid: emailError }" />
          <p v-if="emailError" class="error-text">{{ emailError }}</p>
        </label>

        <label>
          Message
          <textarea v-model="message" rows="5" placeholder="Tell us how we can help" :class="{ invalid: messageError }"></textarea>
          <p v-if="messageError" class="error-text">{{ messageError }}</p>
        </label>

        <button type="submit" class="btn-primary">Send message</button>

        <p v-if="successMessage" class="success-text">{{ successMessage }}</p>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEnquiriesStore } from '@/stores/enquiries'

const enquiriesStore = useEnquiriesStore()
const name = ref('')
const email = ref('')
const message = ref('')
const successMessage = ref('')
const nameError = ref('')
const emailError = ref('')
const messageError = ref('')

function validateEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value)
}

function clearErrors() {
  nameError.value = ''
  emailError.value = ''
  messageError.value = ''
}

function handleSubmit() {
  clearErrors()

  const trimmedName = name.value.trim()
  const trimmedEmail = email.value.trim()
  const trimmedMessage = message.value.trim()

  if (!trimmedName) {
    nameError.value = 'Please enter your full name.'
  }

  if (!trimmedEmail) {
    emailError.value = 'Please enter a valid email address.'
  } else if (!validateEmail(trimmedEmail)) {
    emailError.value = 'Please provide a correct email format.'
  }

  if (!trimmedMessage) {
    messageError.value = 'Please enter a message.'
  } else if (trimmedMessage.length < 10) {
    messageError.value = 'Message should be at least 10 characters long.'
  }

  if (nameError.value || emailError.value || messageError.value) {
    return
  }

  enquiriesStore.sendEnquiry({
    fromName: trimmedName,
    fromEmail: trimmedEmail,
    message: trimmedMessage,
    propertyId: null,
    propertyTitle: 'General enquiry',
    createdAt: new Date().toISOString().slice(0, 10),
  })

  successMessage.value = 'Thank you! Your message has been sent successfully.'
  name.value = ''
  email.value = ''
  message.value = ''

  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
}
</script>

<style scoped>
.contacts-page {
  display: grid;
  gap: 2rem;
}

.about-card,
.contact-card {
  box-shadow: 0 18px 50px rgba(8, 19, 42, 0.08);
}

.section-text {
  color: var(--text-muted);
  line-height: 1.8;
  margin: 1rem 0 1.5rem;
}

.about-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.about-item {
  background: rgba(16, 8, 34, 0.849);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
}

.about-item h3 {
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.contact-form {
  display: grid;
  gap: 1rem;
}

.contact-form label {
  display: grid;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-main);
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.95rem 1rem;
  background: var(--surface);
  color: var(--text-dark);
  font-family: var(--font);
  transition: border-color 0.2s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: rgba(201, 168, 76, 0.55);
}

.btn-primary {
  width: fit-content;
  padding: 0.95rem 1.5rem;
  border: none;
  background: var(--text-main);
  color: white;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  background: rgba(29, 58, 129, 0.95);
}

.error-text {
  color: #c0392b;
  font-size: 0.9rem;
  margin-top: 0.4rem;
}

.invalid {
  border-color: #c0392b;
}

.success-text {
  color: var(--text-main);
  font-weight: 600;
  margin-top: 0.5rem;
}
.contact-info-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items: start;
}

.contact-info-item {
  display: grid;
  gap: 0.75rem;
  background: rgba(16, 8, 34, 0.849);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  min-height: 120px;
  align-items: start;
}

.contact-label {
  font-weight: 700;
  color: var(--text-main);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}

.contact-info-item a {
  color: var(--text-dark);
  text-decoration: none;
  display: inline-block;
}

.contact-info-item a:hover {
  color: var(--text-main);
}

.social-item {
  min-height: auto;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.social-links a {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  font-size: 0.9rem;
  white-space: nowrap;
}

.social-links a:hover {
  border-color: rgba(201, 168, 76, 0.6);
}

@media (max-width: 640px) {
  .contact-info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
