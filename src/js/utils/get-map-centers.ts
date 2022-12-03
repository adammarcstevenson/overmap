import Map from '../Map'

/**
 * @function getDivCenter A function for getting the <div> center of the map, based on a user's perceived center of the map.
 * 
 * @param {Map} map The Map object
 * @param {LatLngLiteral} userCenter The [LatLngLiteral](https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngLiteral) object representing the user's perceived center of the map
 * @param {number} zoom The zoom level
 * 
 * @return {LatLngLiteral} The [LatLngLiteral](https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngLiteral) object representing the map's <div> center
 * 
 */
export function getDivCenter(map: Map, userCenter: google.maps.LatLngLiteral) {
  const m = map.map
  let divCenter = userCenter
  const boundaryLng = m.getBounds().getNorthEast().lng()
  const centerLng = m.getCenter().lng()
  const lngOffset = Math.abs((boundaryLng - centerLng) / 2)
  if (map.id === 'map1') { divCenter.lng = divCenter.lng - lngOffset }
  if (map.id === 'map2') { divCenter.lng = divCenter.lng + lngOffset }
  return divCenter
}

/**
 * @function getUserCenter A function for getting the user's perceived center of the map, based on the true <div> center of the map.
 * 
 * @param {Map} map The Map object
 * 
 * @return {LatLngLiteral} The [LatLngLiteral](https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngLiteral) object representing the user's perceived center of the map
 * 
 */
export function getUserCenter(map: Map) {
  const m = map.map
  let userCenter = map.getCenter()
  const boundaryLng = m.getBounds().getNorthEast().lng()
  const centerLng = m.getCenter().lng()
  const lngOffset = Math.abs((boundaryLng - centerLng) / 2)
  if (map.id === 'map1') { userCenter.lng = userCenter.lng + lngOffset }
  if (map.id === 'map2') { userCenter.lng = userCenter.lng - lngOffset }
  return userCenter  
}