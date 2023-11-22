const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('showHidden')
    } else {
      entry.target.classList.remove('showHidden')
    }
  })
})

const mainHiddenElements = document.querySelectorAll('.main-hidden')
mainHiddenElements.forEach((el) => observer.observe(el))

const pictureHiddenElement = document.querySelectorAll('.picture-hidden')
pictureHiddenElement.forEach((el) => observer.observe(el))

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el))
