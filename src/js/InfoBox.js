import template from '../templates/info-box.html'

export default class InfoBox {
  constructor(div) {
    this.infoBoxVisible = false

    // Loads HTML template into <div>
    div.innerHTML = template
    
    const infoIcon = document.querySelector('#info-icon')
    const infoBoxCloseBtn = document.querySelector('#info-box-close-button')
    const infoBoxContainer = document.querySelector('#info-box-container')
    const infoBoxTabs = document.querySelectorAll('input[name="info-box-tabs"]')

    infoIcon.addEventListener('click', () => this.toggleInfoBox(infoBoxContainer))
    infoBoxCloseBtn.addEventListener('click', () => this.toggleInfoBox(infoBoxContainer))
    infoBoxContainer.addEventListener('click', (e) => {
      if (e.target !== infoBoxContainer) return
      this.toggleInfoBox(infoBoxContainer)
    })
    infoBoxTabs.forEach(tab => {
      tab.addEventListener('change', e => this.updateInfoBoxItems(e.target.value))
    })
  }

  toggleInfoBox(container) {
    this.infoBoxVisible = !this.infoBoxVisible
    if (this.infoBoxVisible) {
      container.classList.remove('hidden')
      container.classList.add('transition--before-show')
      window.requestAnimationFrame(() => {
        container.classList.remove('transition--before-show')
      })
    } else {
      container.classList.add('hidden')
    }
  }
  updateInfoBoxItems(value) {
    const items = document.querySelectorAll('.info-box-item')
    items.forEach(item => {
      if (item.id === `info-box-item-${value}`) item.classList.add('selected')
      else item.classList.remove('selected')
    })
  }
}