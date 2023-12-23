interact('.tap-target')
  .on('tap', function (event) {
    event.currentTarget.classList.toggle('switch-bg')
    event.preventDefault()
  })
  .on('doubletap', function (event) {
    event.currentTarget.classList.toggle('large')
    event.currentTarget.classList.remove('rotate')
    event.preventDefault()
  })
  .on('hold', function (event) {
    event.currentTarget.classList.toggle('rotate')
    event.currentTarget.classList.remove('large')
  })
interact('.tap-target')
  .on('tap', function (event) {
    event.currentTarget.classList.toggle('switch-bg')
    event.preventDefault()
  })
  .on('doubletap', function (event) {
    event.currentTarget.classList.toggle('large')
    event.currentTarget.classList.remove('rotate')
    event.preventDefault()
  })
  .on('hold', function (event) {
    event.currentTarget.classList.toggle('rotate')
    event.currentTarget.classList.remove('large')
  })