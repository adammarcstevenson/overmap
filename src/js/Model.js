import { getLocalStorage, setLocalStorage } from './utils/local-storage'
import styles from './map-styles/grayscale.json'
import defaults from './defaults.json'

/**
 * @class Model
 *
 * Manages app data and connection to LocalStorage
 * 
 */
export default class Model {
  constructor() {
    this.maps = getLocalStorage('maps') || defaults.maps
    this.mapStyles = styles
    this.overlay = getLocalStorage('overlay') || defaults.overlay
    this.zoom = getLocalStorage('zoom') || defaults.zoom
  }

  // Model update functions
  setMaps(id, center) {
    this.maps[id].center = center
    setLocalStorage('maps', this.maps)
  }
  setOverlay(overlay) {
    this.overlay = overlay
    setLocalStorage('overlay', this.overlay)
  }
  setZoom(zoom) {
    if (this.zoom !== zoom) {
      this.zoom = zoom
      setLocalStorage('zoom', this.zoom)
    }
  }
}
