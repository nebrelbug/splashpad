var localforage = require('localforage')

var widgetContentStore = localforage.createInstance({
  name: 'splash-widget-content'
})

async function saveWidgetContent(uniqueWidgetId, newContent) {
  let oldContent = await widgetContentStore.getItem(uniqueWidgetId)

  await widgetContentStore.setItem(uniqueWidgetId, {
    ...oldContent,
    ...newContent
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

async function deleteWidgetContent(uniqueWidgetId) {
  // This will return the old widget content
  let oldWidgetContent = await widgetContentStore.getItem(uniqueWidgetId)
  await widgetContentStore.removeItem(uniqueWidgetId)
  return oldWidgetContent
}

async function getWidgetSettings(uniqueWidgetId) {
  return (
    ((await widgetContentStore.getItem(uniqueWidgetId)) || {}).settings || {}
  )
}

export {
  saveWidgetContent,
  getWidgetContent,
  deleteWidgetContent,
  saveWidgetSettings,
  getWidgetSettings
}
