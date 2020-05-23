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

async function getWidgetContent(uniqueWidgetId) {
  return await widgetContentStore.getItem(uniqueWidgetId)
}

export { saveWidgetContent, getWidgetContent }
