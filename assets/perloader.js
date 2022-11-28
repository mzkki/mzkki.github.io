const loader = document.getElementById('preloader')
//
window.addEventListener('load', () => {
  loader.style.opacity = 0

  setTimeout(hideLoader, 1000)
})

const hideLoader = () => {
  loader.style.display = 'none'
}
