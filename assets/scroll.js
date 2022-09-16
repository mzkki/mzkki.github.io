const navbar = document.getElementById('nav')
const navLink = document.querySelectorAll('#link')
const checkBtn = document.querySelector('.checkbtn')
const ulBg = document.getElementById('links')

document.addEventListener('scroll', () => {
  if (window.pageYOffset > 5) {
    navbar.setAttribute('class', 'sticky')
    checkBtn.style.color = 'white'
    for (let i = 0; i < navLink.length; i++) {
      navLink[i].style.color = 'white'
    }
    ulBg.style.backgroundColor = '#73777b'
  }

  if (window.pageYOffset < 5) {
    navbar.setAttribute('class', '')
    checkBtn.style.color = 'black'
    for (let i = 0; i < navLink.length; i++) {
      navLink[i].style.color = 'black'
    }
    ulBg.style.backgroundColor = 'aliceblue'
  }
})
