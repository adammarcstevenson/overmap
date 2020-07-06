import { maxZoom, minZoom } from './defaults.json'
import InfoBox from './InfoBox'
import { decimalToDegrees } from './utils/convert-lat-lng'

/**
 * @class Ui
 *
 * Manages UI and map container components
 *
 */
export default class Ui {
  /**
   * @param {boolean} overlay 
   * @param {number} zoom 
   */
  constructor (overlay, zoom) {
    this.maps = {
      map1: {
        container: document.querySelector('#map1'),
        radioSelector: document.querySelector('#map-menu-item-1'),
        searchField: document.querySelector('#map-search-1')
      },
      map2: {
        container: document.querySelector('#map2'),
        radioSelector: document.querySelector('#map-menu-item-2'),
        searchField: document.querySelector('#map-search-2')
      }
    }
    this.overlay = document.querySelector('#overlay')
    this.zoom = document.querySelector('#zoom')

    // Syncs UI with model data
    this.overlay.checked = overlay
    this.updateOverlay(overlay)
    this.zoom.max = maxZoom
    this.zoom.min = minZoom
    this.zoom.value = zoom

    // Displays Size Validation
    this.checkDisplaySize()
    window.addEventListener('resize', this.checkDisplaySize)

    // Adds UI component event listeners
    for (const id in this.maps) {
      const map = this.maps[id]
      map.radioSelector.addEventListener('change', e => this.updateSelectedMap(e.target.value))
      map.searchField.addEventListener('click', () => {
        if (map.searchField.readOnly) this.resetMapSearchField(map.searchField)
      })
    }
  }

  // UI change handler bindings
  bindOverlayChange(handler) {
    this.overlay.addEventListener('change', (e) => handler(e.target.checked))
  }
  bindZoomChange(handler) {
  this.zoom.addEventListener('input', (e) => {
    setTimeout(() => handler('slider', parseInt(e.target.value), false), 100)  // setTimeout period implemented to improve performance
    })
  }

  /* UI update methods */
  checkDisplaySize() {
    const dialog = document.querySelector('#display-validation-dialog')
    const width = document.body.clientWidth
    const height = document.body.clientHeight
    if (width < 768 || height < 600) dialog.classList.remove('hidden')
    else dialog.classList.add('hidden')
  }
  loadInfoBox() {
    const div = document.querySelector('#info-box')
    new InfoBox(div)
  }
  resetMapSearchField(field) {
    field.value = ''
    field.readOnly = false
    field.focus()
  }
  updateMapSearchField(id, center) {
    const field = this.maps[id].searchField
    field.value = decimalToDegrees(center)
    field.readOnly = true
  }
  updateOverlay(overlay) {
    for (const id in this.maps) {
      const map = this.maps[id]
      if (overlay) {
        map.container.classList.add('overlay')
        map.radioSelector.disabled = false
      } else {
        map.container.classList.remove('overlay')
        map.radioSelector.disabled = true
      }
    }
  }
  updateSelectedMap(selectedId) {
    /*
     * When the maps are set to overlay, changing the selected map triggers a cross-fade animation
     * between the two maps and changes the z-index ordering of the maps, bringing the selected map
     * "to the top" and allowing it to become clickable.
     * 
     * The cross-fade animation works by cloning the deselected map and fading the clone to opacity 0.
     * Simultaneously, the "real" deselected map is moved "to the bottom" in z-index ordering and has
     * its opacity set to the default (100%). The selected map moves up in z-index ordering and has
     * its opactity set to semi-transparent. Once all transitions are complete or interrupted, the cloned
     * map is removed, revealing the newly selected map "on top".
    **/

    // Check for overlay = false (only reachable by page source hacking)
    if (!this.overlay.checked) return

    // Assign 'selectedMap' and 'deselectedMap'
    let selectedMap
    let deselectedMap
    for (const id in this.maps) {
      if (id === selectedId) selectedMap = this.maps[id].container
      else deselectedMap = this.maps[id].container
    }

    // Clean up any previous map clones from interrupted transitions
    const clones = document.querySelectorAll('.map-clone')
    clones.forEach(clone => clone.remove())

    // Clone the deselected map and add it to DOM
    const mapsContainer = document.querySelector('.map-container')
    let clone = deselectedMap.cloneNode(true)
    clone.id = `${deselectedMap.id}-clone`
    clone.classList.add('map-clone')
    mapsContainer.appendChild(clone)

    // Add an event listener to remove the clone after its opacity transition is complete
    const deselectedTransitionhandler = (e) => {
      if (e.propertyName === 'opacity') e.target.remove()
    }
    clone.addEventListener('transitionend', deselectedTransitionhandler)
    clone.addEventListener('transitioncancel', deselectedTransitionhandler)

    // Remove 'selected' class from the deselected map to jump the map to the back in z-index order and apply the default (100%) opacity
    deselectedMap.classList.remove('selected')

    // Apply the 'selected' class to the selected map to jump the map on top of the deselected map in z-index ordering and to fade the opacity to 60%
    selectedMap.classList.add('selected')

    // Request a browser re-render, then add the 'transition--deselected-clone' class to jump the cloned map to the top in z-index ordering and to initiate the opacity fade to 0
    window.requestAnimationFrame(() => { clone.classList.add('transition--deselected-clone') })
  }
  updateZoomSlider(zoom) {
    this.zoom.value = zoom
  }
}