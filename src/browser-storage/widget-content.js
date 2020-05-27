var localforage = require('localforage')

var widgetContentStore = localforage.createInstance({
  name: 'splash-widget-content'
})

function saveWidgetContent(uniqueWidgetId, newContent) {
  widgetContentStore
    .getItem(uniqueWidgetId)
    .then(function (oldContent) {
      // This code runs once the value has been loaded
      // from the offline store.
      widgetContentStore.setItem(uniqueWidgetId, {
        ...oldContent,
        ...newContent
      })
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err)
    })
}

function saveWidgetSettings(uniqueWidgetId, newSettings) {
  widgetContentStore
    .getItem(uniqueWidgetId)
    .then(function (oldContent) {
      // This code runs once the value has been loaded
      // from the offline store.
      oldContent = oldContent || {}
      widgetContentStore.setItem(uniqueWidgetId, {
        ...oldContent,
        settings: {
          ...oldContent.settings,
          ...newSettings
        }
      })
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err)
    })
}

async function getWidgetContent(uniqueWidgetId) {
  return await widgetContentStore.getItem(uniqueWidgetId)
}

async function getWidgetSettings(uniqueWidgetId) {
  return (await widgetContentStore.getItem(uniqueWidgetId)).settings || {}
}

export {
  saveWidgetContent,
  getWidgetContent,
  saveWidgetSettings,
  getWidgetSettings
}
