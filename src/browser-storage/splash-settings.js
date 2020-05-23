const storeName = 'splash-settings-sync'

function getSplashSettings(category, key) {
  let ls = {}
  if (global.localStorage) {
    try {
      ls =
        JSON.parse(global.localStorage.getItem(storeName + '/' + category)) ||
        {}
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key]
}

function saveSplashSettings(category, key, value) {
  if (global.localStorage) {
    var oldCategorySettings = {}
    try {
      oldCategorySettings =
        JSON.parse(global.localStorage.getItem(storeName + '/' + category)) ||
        {}
    } catch (e) {
      /*Ignore*/
    }
    global.localStorage.setItem(
      storeName + '/' + category,
      JSON.stringify({
        ...oldCategorySettings,
        [key]: value
      })
    )
  }
}

export { saveSplashSettings, getSplashSettings }
