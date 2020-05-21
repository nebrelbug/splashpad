export function getFromLS(key) {
  let ls = {}
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('splash')) || {}
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key]
}

export function saveToLS(key, value) {
  if (global.localStorage) {
    var localStorageObj = {}
    try {
      localStorageObj = JSON.parse(global.localStorage.getItem('splash')) || {}
    } catch (e) {
      /*Ignore*/
    }
    global.localStorage.setItem(
      'splash',
      JSON.stringify({
        ...localStorageObj,
        [key]: value
      })
    )
  }
}
