import { getLocalStorage, setLocalStorage } from './utils/local-storage'
import { styles } from './map-styles/grayscale'
import { defaults } from './defaults'

interface StoredMapCoordinates {
  [key: string]: {
    center: {
      lat: number,
      lng: number
    }
  }
}

/**
 * @class Model
 * Manages app data and connection to LocalStorage
 */
export default class Model {
  maps: StoredMapCoordinates
  mapStyles: Array<google.maps.MapTypeStyle>
  overlay: boolean
  zoom: number

  constructor() {
    this.maps = getLocalStorage('maps') || defaults.maps
    this.mapStyles = styles
    this.overlay = getLocalStorage('overlay') || defaults.overlay
    this.zoom = getLocalStorage('zoom') || defaults.zoom
  }

  // Model update functions
  setMaps(id: string, center: google.maps.LatLngLiteral) {
    this.maps[id].center = center
    setLocalStorage('maps', this.maps)
  }
  setOverlay(overlay: boolean) {
    this.overlay = overlay
    setLocalStorage('overlay', this.overlay)
  }
  setZoom(zoom: number) {
    if (this.zoom !== zoom) {
      this.zoom = zoom
      setLocalStorage('zoom', this.zoom)
    }
  }
}
