import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { map } from '@/config'

Vue.use(VueGoogleMaps, {
  load: {
    key: map.apiKey,
    region: 'KM'
  },
  installComponents: true
})
