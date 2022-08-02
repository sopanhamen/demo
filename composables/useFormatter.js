import { format, parseISO } from 'date-fns'

export default function useFormatter() {
  function formatMoney(value, options = {}) {
    const locale = options.locale || 'en-US'
    const currency = options.currency || 'USD'
    const digits = typeof options.digits === 'undefined' ? 0 : options.digits

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: digits
    }).format(value)
  }

  function formatNumber(value, options = {}) {
    const locale = options.locale || 'en-US'
    const digits = typeof options.digits === 'undefined' ? 0 : options.digits

    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: digits
    }).format(value)
  }

  function formatDate(dateStr) {
    return dateStr ? format(parseISO(dateStr), 'dd-MM-yyyy') : ''
  }

  function formatDateTime(dateStr) {
    return dateStr ? format(parseISO(dateStr), 'dd-MM-yyyy hh:mm aa') : ''
  }

  return { formatDate, formatDateTime, formatMoney, formatNumber }
}
