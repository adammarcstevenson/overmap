import Model from './Model'
import Ui from './Ui'
import GoogleMapsApi from './GoogleMapsApi'
import Map from './Map'
import PlaceAutocomplete from './PlaceAutocomplete'
import { getDivCenter, getUserCenter } from './utils/get-map-centers'

/**
 * @class OverMap
 *
 * Controller class for managing maps, UI, and app data
 * 
 */
export default class OverMap {
  constructor () {
    this.model = new Model()
    this.ui = new Ui(this.model.overlay, this.model.zoom)
    this.google = {}
    this.maps = {}

    const api = new GoogleMapsApi()

    // Loads Google Maps API (async)
    api.load().then(() => {

      this.google = api.google

      // Creates the two Google Maps
      this._createMap('map1')
      this._createMap('map2')

      // Attaches the Google Maps Autocomplete search to the map search fields
      this._attachAutocomplete('map1')
      this._attachAutocomplete('map2')
      
      // Binds UI change handlers
      this.ui.bindOverlayChange(this.onOverlayChange.bind(this))
      this.ui.bindZoomChange(this.onZoomChange.bind(this))

      // Loads info box
      this.ui.loadInfoBox()
    })
  }

  // Constructor functions
  _attachAutocomplete(id) {
    const google = this.google
    const input = this.ui.maps[id].searchField
    const handlers = { onAutocompleteSelection: this.onAutocompleteSelection.bind(this) } 
    new PlaceAutocomplete(id, google, input, handlers)
  }
  _createMap(id) {

    const google = this.google
    const el = this.ui.maps[id].container
    const options = {
      center: this.model.maps[id].center,
      styles: this.model.mapStyles,
      zoom: this.model.zoom,
    }
    const handlers = {
      onMapIdle: this.onMapIdle.bind(this),
      onZoomChange: this.onZoomChange.bind(this)
    }

    // Creates map
    this.maps[id] = new Map(id, google, el, options, handlers)
  }

  /* UI change handlers */
  onAutocompleteSelection(id, userCenter) {
    let divCenter = userCenter
    if (!this.model.overlay) {
      divCenter = getDivCenter(this.maps[id], userCenter)
    }
    this.model.setMaps(id, divCenter)
    this.maps[id].updateCenter(divCenter)
  }
  onMapIdle(id, divCenter) {
    this.model.setMaps(id, divCenter)
    let userCenter = divCenter
    if (!this.model.overlay) {
      userCenter = getUserCenter(this.maps[id])
    }
    this.ui.updateMapSearchField(id, userCenter)
  }
  onOverlayChange(overlay) {
    this.model.setOverlay(overlay)
    this.ui.updateOverlay(overlay)
  }
  onZoomChange(id, zoom) {
    this.model.setZoom(zoom)
    if (id !== 'slider') this.ui.updateZoomSlider(zoom)
    for (const key in this.maps) {
      if (key === id) continue
      const map = this.maps[key]
      let userCenter = map.getCenter()
      if (!this.model.overlay) {
        userCenter = getUserCenter(map)
      }
      map.updateZoom(zoom)
      let divCenter = getDivCenter(map, userCenter)
      map.updateCenter(divCenter)
    }
  }
}
