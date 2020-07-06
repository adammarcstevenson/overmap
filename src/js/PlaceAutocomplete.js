export default class PlaceAutocomplete {
  constructor(key, google, input, handlers) {
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