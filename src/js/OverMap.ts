import Model from './Model'
import Ui from './Ui'
import { GoogleMapsApi, GoogleMapsApiLoader } from './GoogleMapsApiLoader'
import Map from './Map'
import PlaceAutocomplete from './PlaceAutocomplete'
import { getDivCenter, getUserCenter } from './utils/get-map-centers'

/**
 * @class OverMap
 * Controller class for managing maps, UI, and app data
 */
export default class OverMap {
  maps: {
    [key: string]: Map
  }
  model: Model
  ui: Ui
  
  constructor () {
    this.maps = {}
    this.model = new Model()
    this.ui = new Ui(this.model.overlay, this.model.zoom)

    const loader = new GoogleMapsApiLoader()

    // Loads Google Maps API (async)
    loader.load().then(() => {

      const google = loader.api

      // Creates the two Google Maps
      this.createMap('map1', google)
      this.createMap('map2', google)

      // Attaches the Google Maps Autocomplete search to the map search fields
      this.attachAutocomplete('map1', google)
      this.attachAutocomplete('map2', google)
      
      // Binds UI change handlers
      this.ui.bindOverlayChange(this.onOverlayChange.bind(this))
      this.ui.bindZoomChange(this.onZoomChange.bind(this))

      // Loads info box
      this.ui.loadInfoBox()
    })
  }

  // Constructor functions
  private attachAutocomplete(id: string, google: GoogleMapsApi) {
    const input = this.ui.maps[id].searchField
    const handlers = { onAutocompleteSelection: this.onAutocompleteSelection.bind(this) } 
    new PlaceAutocomplete(id, google, input, handlers)
  }
  private createMap(id: string, google: GoogleMapsApi) {
    const el = this.ui.maps[id].container as Element
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
  onAutocompleteSelection(id: string, userCenter: google.maps.LatLngLiteral) {
    let divCenter = userCenter
    if (!this.model.overlay) {
      divCenter = getDivCenter(this.maps[id], userCenter)
    }
    this.model.setMaps(id, divCenter)
    this.maps[id].updateCenter(divCenter)
  }
  onMapIdle(id: string, divCenter: google.maps.LatLngLiteral) {
    this.model.setMaps(id, divCenter)
    let userCenter = divCenter
    if (!this.model.overlay) {
      userCenter = getUserCenter(this.maps[id])
    }
    this.ui.updateMapSearchField(id, userCenter)
  }
  onOverlayChange(overlay: boolean) {
    this.model.setOverlay(overlay)
    this.ui.updateOverlay(overlay)
  }
  onZoomChange(id: string, zoom: number) {
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
