const storeName = 'splash-settings-sync/appearance' // this stores the user's background-color

let lsAppearance = {}
if (window && window.localStorage) {
  try {
    lsAppearance = JSON.parse(window.localStorage.getItem(storeName)) || {}
  } catch (e) {
    /*Ignore*/
  }
}

if (lsAppearance.background === 'color' && lsAppearance.backgroundColor) {
  document.body.style.background = lsAppearance.backgroundColor
  console.log('set background color')
} else if (
  lsAppearance.background === 'image-url' &&
  lsAppearance.backgroundImageURL
) {
  let imageDarkness = lsAppearance.backgroundImageDarkness || 0
  document.body.style['background-image'] = `linear-gradient(
      rgba(0, 0, 0, ${imageDarkness}), 
      rgba(0, 0, 0, ${imageDarkness})
    ), url(${lsAppearance.backgroundImageURL})`

  //   console.log('set background image')
} else if (
  lsAppearance.background === 'image' &&
  lsAppearance.backgroundImage &&
  lsAppearance.backgroundImage.data
) {
  // TODO: I may want to move this into my initial code for performance reasons...
  let imageDarkness = lsAppearance.backgroundImageDarkness || 0
  document.body.style['background-image'] = `linear-gradient(
    rgba(0, 0, 0, ${imageDarkness}), 
    rgba(0, 0, 0, ${imageDarkness})
  ), url(${lsAppearance.backgroundImage.data})`

  console.log('set background image')
}
