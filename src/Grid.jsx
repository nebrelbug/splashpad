import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { Button } from 'react-md'
import AddButtons from './AddItem'
import Clock from './widgets/Clock'
import Note from './widgets/Note'
import Search from './widgets/Search'
import Text from './widgets/Text'

import './Grid.scss'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {
  getWidgets,
  getWidgetsSync,
  saveWidgets,
  saveWidgetCount
} from './browser-storage/widgets'

import widgets, { fallbackWidget } from './widgets/widgets-list'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faThumbtack } from '@fortawesome/free-solid-svg-icons/faThumbtack'

var Mousetrap = require('mousetrap')

const ReactGridLayout = WidthProvider(RGL)

const defaultItems = [
  // defaults
  { i: 'widget-0', x: 4, y: 0, w: 4, h: 2, minH: 2, minW: 2, type: 'search' },
  { i: 'widget-2', x: 10, y: 0, w: 2, h: 2, type: 'clock' },
  { i: 'widget-1', x: 0, y: 2, w: 3, h: 4, minH: 2, type: 'note' }
]

export default class WidgetGrid extends React.Component {
  static defaultProps = {
    className: 'layout',
    cols: 12,
    rowHeight: 40,
    compactType: null
  }

  constructor(props) {
    super(props)

    const { widgets, widgetCount } = getWidgetsSync()

    // console.log('widgets: ')
    // console.log(widgets)

    this.state = {
      items: widgets || [],
      widgetCount: widgetCount || false,
      editing: false,
      widgetSettings: 'widget-26'
    }

    // this.resetLayout = this.resetLayout.bind(this)
  }

  componentDidMount() {
    getWidgets().then(({ widgets, widgetCount }) => {
      this.setState({
        items: widgets || defaultItems,
        widgetCount: widgetCount || 3 // widgetCount should be undefined, or a number greater than 2
      })
    })

    Mousetrap.bind('e', this.toggleEditing)
  }

  componentWillUnmount() {
    Mousetrap.unbind('e')
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing, widgetSettings: false })
  }

  showWidgetSettings = (uniqueKey) => {
    this.setState({ widgetSettings: uniqueKey })
  }

  hideWidgetSettings = () => {
    this.setState({ widgetSettings: false })
  }

  onLayoutChange = (layout, otherlayouts) => {
    // this.props.onLayoutChange(layout)
    // console.log('layout: ')
    // console.log(layout)

    this.setState(
      {
        items: this.state.items.map(function (item, i) {
          return {
            ...item,
            ...layout[i]
          }
        })
      },
      () => {
        saveWidgets(this.state.items)
      }
    )
  }

  toggleItemStatic = (index) => {
    // see https://stackoverflow.com/a/49502115/7983596
    let items = this.state.items.map((item, i) => ({
      ...item,
      static: i === index ? !item.static : item.static // if correct element, toggle item.static
    }))

    this.onLayoutChange(items)
  }

  findPositionForItem = (newItem) => {
    let items = this.state.items

    var grid = Array.from({ length: 12 }, () => []) // This is to make sure the columns aren't deep linked

    items.forEach((item) => {
      for (var col = item.x; col < item.x + item.w; col++) {
        for (var row = item.y; row < item.y + item.h; row++) {
          grid[col][row] = true // filled
        }
      }
    })

    // window.grid = grid

    function checkForSpace(x, y, width, height) {
      if (x + width > 12) {
        return false
      }
      for (var col = x; col < x + width; col++) {
        for (var row = y; row < y + height; row++) {
          if (grid[col][row] === true) {
            // filled
            return false
          }
        }
      }
      return true
    }

    for (var y = 0; y < 10000; y++) {
      for (var x = 0; x < 12; x++) {
        if (grid[x][y] !== true) {
          if (checkForSpace(x, y, newItem.w, newItem.h)) {
            return [x, y]
          }
        }
      }
    }
    // TIME OUT
    console.error('Could not find a place for new item in the first 10000 rows')

    return [0, 0]
  }

  createElement(el, ind) {
    const key = el.i
    // console.log(
    //   `this.state.widgetSettings = ${this.state.widgetSettings}, key = ${key}`
    // )

    let showSettingsControls =
      this.state.editing &&
      !this.state.widgetSettings &&
      !this.props.appSettingsOpen

    var widget = widgets[el.type] || fallbackWidget

    var WidgetComponent = widget.component

    return (
      <div
        key={key}
        style={{
          background: showSettingsControls ? 'rgba(200, 200, 200, 0.5)' : 'none'
        }}
      >
        {showSettingsControls && (
          <>
            {/* <div style={{ position: 'absolute', left: '50%' }}></div> */}
            <Button
              style={{
                height: 18,
                width: 18,
                padding: 0,
                zIndex: 999,
                float: 'right',
                position: 'absolute',
                top: -8,
                right: -8
              }}
              className='smallButton'
              icon
              onClick={() => {
                this.onRemoveItem(ind)
              }}
            >
              close
            </Button>
          </>
        )}
        <WidgetComponent
          uniqueKey={key}
          settingsVisible={this.state.widgetSettings === key}
          hideSettings={this.hideWidgetSettings}
          editingGrid={this.state.editing}
        />

        {showSettingsControls && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0px',
              left: '0px'
            }}
            className='draggableOverlay'
          >
            <div
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%'
              }}
            >
              <div
                style={{
                  margin: 0,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%'
                }}
              >
                <div style={{ width: 'fit-content', margin: 'auto' }}>
                  <Button
                    style={{
                      paddingTop: '10px'
                    }}
                    className='settingsButton'
                    secondary={!!el.static}
                    swapTheming={!!el.static}
                    icon
                    iconEl={<FontAwesomeIcon icon={faThumbtack} />}
                    onClick={() => {
                      this.toggleItemStatic(ind)
                    }}
                  >
                    pin widget to grid
                  </Button>
                  {widget.settingsComponent && (
                    <Button
                      style={{
                        marginLeft: '8px'
                      }}
                      className='settingsButton'
                      icon
                      onClick={() => {
                        this.showWidgetSettings(key)
                      }}
                    >
                      settings
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  onAddItem = (type) => {
    /*eslint no-console: 0*/
    var itemConstraints = widgets[type].gridSettings || {}
    // console.log('adding', 'n' + this.state.newCounter)
    var newItem = {
      i: 'widget-' + this.state.widgetCount,
      x: 0,
      y: 0, // puts it at the bottom
      w: 2,
      h: 2,
      type: type,
      ...itemConstraints
    }

    var [x, y] = this.findPositionForItem(newItem)
    newItem.x = x
    newItem.y = y
    this.setState(
      {
        // Add a new item. It must have a unique key!
        items: this.state.items.concat(newItem),
        // Increment the counter to ensure key is always unique.
        widgetCount: this.state.widgetCount + 1
      },
      () => {
        saveWidgetCount(this.state.widgetCount)
      }
    )
  }

  onRemoveItem = (i) => {
    console.log('removing', i)
    this.setState({
      items: this.state.items.filter(function (item, ind) {
        return ind !== i
      })
    })
  }

  render() {
    console.log('Rendering...')
    console.log(this.state.items)
    let showGridControls =
      this.state.editing &&
      !this.state.widgetSettings &&
      !this.props.appSettingsOpen

    // don't show grid controls when app settings or widget settings are open

    return (
      <>
        <div>
          <ReactGridLayout
            onLayoutChange={this.onLayoutChange}
            layout={this.state.items}
            onBreakpointChange={this.onBreakpointChange}
            measureBeforeMount={true}
            useCSSTransforms={true}
            isDraggable={showGridControls}
            isResizable={showGridControls}
            preventCollision={true}
            draggableCancel='.editButton'
            // TODO: this doesn't work...
            // onClick={(e) => {
            //   console.log('clicked')
            //   console.log(e.currentTarget)
            //   console.log(e.target)
            //   if (this.state.editing && e.target === e.currentTarget) {
            //     this.setState({ editing: false })
            //   }
            // }}
            {...this.props}

            // draggableHandle='.draggableOverlay'
          >
            {this.state.items.map((el, index) => this.createElement(el, index))}
          </ReactGridLayout>
        </div>
        {this.state.widgetCount !== false && (
          <AddButtons addItem={this.onAddItem} />
        )}

        <Button
          style={{
            position: 'fixed',
            right: 8,
            bottom: 8,
            height: 48,
            width: 48,
            padding: 12
          }}
          icon
          // primary={this.state.editing}
          swapTheming
          onClick={this.toggleEditing}
          className='actionButton'
        >
          {this.state.editing ? 'done' : 'edit'}
        </Button>
      </>
    )
  }
}
