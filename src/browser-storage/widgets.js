var localforage = require('localforage')

var widgetStore = localforage.createInstance({
  name: 'splash-widgets',
  driver: localforage.LOCALSTORAGE
})

function addWidget(uniqueWidgetId, details) {
  widgetStore
    .getItem('widgets')
    .then(function (widgets) {
      // This code runs once the value has been loaded
      // from the offline store.
      widgetStore.setItem('widgets', {
        ...widgets,
        [uniqueWidgetId]: details
      })
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err)
    })
}

function saveWidgets(widgets) {
  widgetStore.setItem('widgets', widgets)
}

async function getWidgets() {
  var widgets = await widgetStore.getItem('widgets')
  var widgetCount = await widgetStore.getItem('current-widget-count')
  return { widgets, widgetCount }
}

function getWidgetsSync() {
  let widgets = {}
  let widgetCount = {}
  if (global.localStorage) {
    try {
      widgets =
        JSON.parse(global.localStorage.getItem('splash-widgets/widgets')) || {}
      widgetCount =
        Number(
          global.localStorage.getItem('splash-widgets/current-widget-count')
        ) || {}
    } catch (e) {
      /*Ignore*/
    }
  }
  return { widgets, widgetCount }
}

async function getWidget(uniqueWidgetId) {
  return await widgetStore.getItem('widgets')[uniqueWidgetId]
}

function saveWidgetCount(newCount) {
  widgetStore.setItem('current-widget-count', newCount)
}

async function getWidgetCount() {
  return await widgetStore.getItem('current-widget-count')
}

export {
  addWidget,
  getWidget,
  getWidgets,
  getWidgetsSync,
  saveWidgets,
  saveWidgetCount,
  getWidgetCount
}
