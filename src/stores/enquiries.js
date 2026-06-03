/**
 * ENQUIRIES STORE
 * Owned by: Seller teammate
 *
 * Stores messages sent by buyers/renters to sellers.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEnquiriesStore = defineStore('enquiries', () => {
  const enquiries = ref([
    {
      id: 1,
      fromName: 'Amina Uwase',
      fromEmail: 'amina@email.com',
      propertyId: 1,
      propertyTitle: 'Kacyiru Heights Villa',
      message: 'Is the price negotiable? We would like to schedule a viewing this weekend.',
      read: false,
      createdAt: '2025-06-02',
    },
    {
      id: 2,
      fromName: 'Patrick Habimana',
      fromEmail: 'patrick@email.com',
      propertyId: 3,
      propertyTitle: 'Gisozi Family Home',
      message: 'Does it include a garage? Also what is the land size?',
      read: false,
      createdAt: '2025-06-01',
    },
  ])

  function sendEnquiry(enquiry) {
    enquiries.value.push({ ...enquiry, id: Date.now(), read: false })
  }

  function markRead(id) {
    const e = enquiries.value.find(e => e.id === id)
    if (e) e.read = true
  }

  const unreadCount = () => enquiries.value.filter(e => !e.read).length

  return { enquiries, sendEnquiry, markRead, unreadCount }
})
