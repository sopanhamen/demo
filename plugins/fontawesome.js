import { dom, library, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
    faLine,
    faWeixin,
    faInstagram
} from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

library.add(fas, faLine, faWeixin, faInstagram)

dom.watch()
