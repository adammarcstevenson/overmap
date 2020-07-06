import { maxZoom, minZoom } from './defaults.json'

/**
 * @class Maps
 *
 * @classdesc Manages Google Maps components
 *
 */
export default class Map {
  constructor(id, google, el, { center, styles, zoom }, handlers) {
    this.id = id
    this.map = new google.maps.Map(el, {
      center,
      clickableIcons: false,
      controlSize: 25,
      disableDefaultUI: true,
      gestureHandling: 'auto',
      maxZoom,
      minZoom,
      scaleControl: true,
      styles,
      zoom
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
  updateCenter(center) {
    this.map.setCenter(center)
  }
  updateZoom(zoom) {
    this.systemZoomChange = true  // Set flag for programmatic zoom change
    this.map.setZoom(zoom)
  }
}