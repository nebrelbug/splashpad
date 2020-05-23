var localforage = require('localforage')

var widgetSettingsStore = localforage.createInstance({
  name: 'splash-widget-settings'
})

function saveWidgetSettings(uniqueWidgetId, newSettings) {
  widgetSettingsStore
    .getItem(uniqueWidgetId)
    .then(function (oldSettings) {
      // This code runs once the value has been loaded
      // from the offline store.
      widgetSettingsStore.setItem(uniqueWidgetId, {
        ...oldSettings,
        ...newSettings
      })
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err)
    })
}

async function getWidgetSettings(uniqueWidgetId) {
  return await widgetSettingsStore.getItem(uniqueWidgetId)
}

export { saveWidgetSettings, getWidgetSettings }
