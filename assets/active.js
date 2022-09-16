const navLinks = document.querySelectorAll('#link')

for (link of navLinks) {
  link.addEventListener('click', function (event) {
    const target = event.target

    if (target.innerText === 'HOME') {
      target.setAttribute('class', 'active')
      navLinks[1].setAttribute('class', '')
      navLinks[2].setAttribute('class', '')
      navLinks[3].setAttribute('class', '')
    }
    if (target.innerText === 'ABOUT') {
      target.setAttribute('class', 'active')
      navLinks[0].setAttribute('class', '')
      navLinks[2].setAttribute('class', '')
      navLinks[3].setAttribute('class', '')
    }
    if (target.innerText === 'GALLERY') {
      target.setAttribute('class', 'active')
      navLinks[0].setAttribute('class', '')
      navLinks[1].setAttribute('class', '')
      navLinks[3].setAttribute('class', '')
    }
    if (target.innerText === 'CONTACT') {
      target.setAttribute('class', 'active')
      navLinks[0].setAttribute('class', '')
      navLinks[1].setAttribute('class', '')
      navLinks[2].setAttribute('class', '')
    }
  })
}
