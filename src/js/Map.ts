import { defaults } from './defaults'
import { GoogleMapsApi } from './GoogleMapsApiLoader'

/**
 * @class Maps
 * @classdesc Manages Google Maps components
 */
export default class Map {
  id: string
  map: google.maps.Map
  systemZoomChange: boolean

  constructor(
    id: string,
    google: GoogleMapsApi,
    el: Element,
    { center, styles, zoom }: google.maps.MapOptions,
    handlers: {
      onMapIdle: (id: string, center: google.maps.LatLngLiteral) => void,
      onZoomChange: (id: string, zoom: number) => void
    }
  ) {
    this.id = id
    this.map = new google.maps.Map(el as HTMLElement, {
      center,
      clickableIcons: false,
      controlSize: 25,
      disableDefaultUI: true,
      gestureHandling: 'auto',
      maxZoom: defaults.maxZoom,
      minZoom: defaults.minZoom,
      scaleControl: true,
      styles,
      zoom,
    })

    // Adds map event listeners
    this.map.addListener('idle', () => {
      const center = this.map.getCenter().toJSON()
      handlers.onMapIdle(id, center)
    })
    this.map.addListener('zoom_changed', () => {
      if (this.systemZoomChange) {
        this.systemZoomChange = false
      } else {
        const zoom = this.map.getZoom()
        handlers.onZoomChange(id, zoom)
      }
    })
  }
  getCenter() {
    return this.map.getCenter().toJSON()
  }
  updateCenter(center: google.maps.LatLngLiteral) {
    this.map.setCenter(center)
  }
  updateZoom(zoom: number) {
    this.systemZoomChange = true // Set flag for programmatic zoom change
    this.map.setZoom(zoom)
  }
}
