export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
export function setLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}