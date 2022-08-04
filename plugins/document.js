import Vue from 'vue'
import pdf from 'pdfvuer'

export default ({ app }, inject) => {
    inject('document', {
        open(param) {
            if (window.$nuxt) {
                window.$nuxt.$emit('openDoc', param)
            }
        },
        close() {
            if (window.$nuxt) {
                window.$nuxt.$emit('closeDoc', null)
            }
        },
        pdfInstance() {
            return pdf
        }
    })
}

// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Pdf', pdf)
