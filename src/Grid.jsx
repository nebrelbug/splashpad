import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { Button } from 'react-md'
import AddButtons from './AddItem'
import Clock from './widgets/Clock'
import Note from './widgets/Note'
import Search from './widgets/Search'

import './Grid.scss'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { getFromLS, saveToLS } from './localstorage'
var Mousetrap = require('mousetrap')

const ReactGridLayout = WidthProvider(RGL)

function Hi() {
  return <span className='text'>HI!!!</span>
}

function Date() {
  return <span className='text'>{'05-22-33'}</span>
}

const defaultItems = [
  // defaults
  { i: '0', x: 0, y: 0, w: 2, h: 2, type: 'hi' },
  { i: '1', x: 2, y: 0, w: 2, h: 2, type: 'hi' },
  { i: '2', x: 4, y: 0, w: 2, h: 2, type: 'date' }
]

const itemTypeProps = {
  note: {
    minH: 2,
    w: 3,
    h: 4
  },
  search: {
    minH: 2,
    minW: 2,
    w: 4
  }
}

const originalItems = getFromLS('items') || defaultItems

const currentCount = getFromLS('currentCount') || 0

function getComponent(type, uniqueKey) {
  if (type === 'hi') {
    return <Hi />
  } else if (type === 'date') {
    return <Date />
  } else if (type === 'clock') {
    return <Clock />
  } else if (type === 'note') {
    return <Note uniqueKey={uniqueKey} />
  } else if (type === 'search') {
    return <Search />
  } else {
    return <span className='text'>UNKNOWN</span>
  }
}

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class AddRemoveLayout extends React.Component {
  static defaultProps = {
    className: 'layout',
    cols: 12,
    rowHeight: 40,
    compactType: null
  }

  constructor(props) {
    super(props)

    this.state = {
      items: originalItems,
      newCounter: currentCount,
      editing: true
    }

    this.onAddItem = this.onAddItem.bind(this)
    this.onRemoveItem = this.onRemoveItem.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    // this.resetLayout = this.resetLayout.bind(this)
  }

  componentDidMount() {
    Mousetrap.bind('e', this.toggleEditing)
  }

  componentWillUnmount() {
    Mousetrap.unbind('e')
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing })
  }

  onLayoutChange(layout) {
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
        saveToLS('items', this.state.items)
      }
    )
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
    throw new Error(
      'Could not find a place for new item in the first 10000 rows'
    )

    return [0, 0]
  }

  createElement(el, ind) {
    const key = el.i
    return (
      <div
        key={key}
        data-grid={el}
        style={{
          background: this.state.editing ? 'rgba(200, 200, 200, 0.5)' : 'none'
        }}
      >
        {this.state.editing && (
          <>
            <Button
              style={{
                height: 18,
                width: 18,
                padding: 0,
                zIndex: 999,
                float: 'left',
                position: 'absolute',
                top: -8,
                left: -8
              }}
              className='smallButton'
              icon
              onClick={() => {
                this.onRemoveItem(ind)
              }}
            >
              settings_applications
            </Button>
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
              cancel
            </Button>
          </>
        )}
        {getComponent(el.type, key)}
        {this.state.editing && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0px',
              left: '0px'
            }}
            className='draggableOverlay'
          />
        )}
      </div>
    )
  }

  onAddItem(type) {
    /*eslint no-console: 0*/
    var itemConstraints = itemTypeProps[type] || {}
    // console.log('adding', 'n' + this.state.newCounter)
    var newItem = {
      i: 'n' + this.state.newCounter,
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
        newCounter: this.state.newCounter + 1
      },
      () => {
        saveToLS('currentCount', this.state.newCounter)
      }
    )
  }

  onRemoveItem(i) {
    console.log('removing', i)
    this.setState({
      items: this.state.items.filter(function (item, ind) {
        return ind !== i
      })
    })
  }

  render() {
    console.log(this.state.items)
    return (
      <>
        <div>
          <ReactGridLayout
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            measureBeforeMount={true}
            useCSSTransforms={true}
            isDraggable={this.state.editing}
            isResizable={this.state.editing}
            preventCollision={true}
            // draggableHandle='.draggableOverlay'
            {...this.props}
          >
            {this.state.items.map((el, index) => this.createElement(el, index))}
          </ReactGridLayout>
        </div>
        <AddButtons addItem={this.onAddItem} />
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
          primary={this.state.editing}
          swapTheming
          onClick={this.toggleEditing}
        >
          {this.state.editing ? 'done' : 'edit'}
        </Button>
      </>
    )
  }
}
