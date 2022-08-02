import Vue from 'vue'
import { format, parseISO } from 'date-fns'

Vue.filter('formatDate', (dateStr) =>
  dateStr ? format(parseISO(dateStr), 'dd-MM-yyyy') : ''
)

Vue.filter('formatDateTime', (dateStr) =>
  dateStr ? format(parseISO(dateStr), 'dd-MM-yyyy hh:mm aa') : ''
)

Vue.filter('formatMoney', (value, options = {}) => {
  const locale = options.locale || 'en-US'
  const currency = options.currency || 'USD'
  const digits = typeof options.digits === 'undefined' ? 2 : options.digits

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: digits
  }).format(value)
})
