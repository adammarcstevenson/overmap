// Import OverMap app class
import OverMap from './js/OverMap'

// Import Styles
import 'normalize.css'
import './css/global.css'
import './css/ui-components.css'
import './css/overlay-toggle.css'
import './css/map-menu.css'
import './css/zoom-slider.css'
import './css/info-box.css'
import './css/maps.css'


if (process.env.NODE_ENV !== 'production') {
  console.warn('Heads up! Looks like we are in development mode.')  // eslint-disable-line no-console
}

new OverMap()
