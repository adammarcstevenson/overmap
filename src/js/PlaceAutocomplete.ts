import { GoogleMapsApi } from './GoogleMapsApiLoader'

export default class PlaceAutocomplete {
  constructor(
    key: string,
    google: GoogleMapsApi,
    input: HTMLInputElement,
    handlers: {
      onAutocompleteSelection: (key: string, userCenter: google.maps.LatLngLiteral) => void
    }
  ) {
    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ['geometry'],
      types: ['(cities)']
    })

    // Adds autocomplete event listeners
    autocomplete.addListener('place_changed', () => {
      handlers.onAutocompleteSelection(key, autocomplete.getPlace().geometry.location.toJSON())
    })
  }
}