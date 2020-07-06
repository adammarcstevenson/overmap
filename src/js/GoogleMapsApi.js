import { Loader } from 'google-maps'

export default class GoogleMapsApi {
  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_KEY
    this.options = {
      version: 'weekly',
      libraries: ['places']
    }
  }
  async load() {
    const loader = new Loader(this.apiKey, this.options)
    this.google = await loader.load()
  }
}