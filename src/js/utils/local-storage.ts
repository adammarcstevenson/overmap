export function getLocalStorage(key: string): any {
  return JSON.parse(localStorage.getItem(key))
}
export function setLocalStorage(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value))
}