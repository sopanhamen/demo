import Vue from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Editor from 'primevue/editor'
import Fieldset from 'primevue/fieldset'
import Message from 'primevue/message'
import Menu from 'primevue/menu'
import Textarea from 'primevue/textarea'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

Vue.component('PvButton', Button)
Vue.component('PvDialog', Dialog)
Vue.component('PvFieldset', Fieldset)
Vue.component('PvFieldset', Fieldset)
Vue.component('PvMessage', Message)
Vue.component('PvMenu', Menu)
Vue.component('PvTextarea', Textarea)
Vue.component('PvEditor', Editor)
Vue.use(ConfirmationService)
Vue.use(ToastService)
