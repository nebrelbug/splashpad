import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { TwitterPicker } from 'react-color'

import {
  FontIcon,
  DialogContainer,
  SelectionControl,
  SelectField,
  Slider
} from 'react-md'

// Taken from https://codepen.io/gaearon/pen/yzMaBd?editors=1010

class Portal extends Component {
  constructor(props) {
    super(props)
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div')
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    document.getElementById('dialog-container').appendChild(this.el)
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    document.getElementById('dialog-container').removeChild(this.el)
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el
    )
  }
}

export default class Text extends Component {
  render = () => {
    var widgetSettings = this.props.settings || {}

    return (
      this.props.visible && (
        <Portal>
          <DialogContainer
            id='widget-settings-dialog'
            visible={this.props.visible}
            title='Widget Settings'
            onHide={this.props.onHide}
            // disableScrollLocking={true}
            transitionEnterTimeout={50}
            transitionLeaveTimeout={50}
          >
            <SelectionControl
              type='switch'
              label='Show Border'
              name='show-border'
              checked={widgetSettings.border}
              onClick={() => {
                this.props.onSettingsChange('border', !widgetSettings.border)
              }}
            />
            <SelectField
              id='select-field-2'
              label='Align'
              // placeholder='Center'
              className='md-cell'
              menuItems={[
                {
                  label: 'Left',
                  value: 'left'
                },
                {
                  label: 'Center',
                  value: 'center'
                },
                {
                  label: 'Right',
                  value: 'right'
                }
              ]}
              simplifiedMenu={true}
              value={widgetSettings.align}
              onChange={(newAlign) => {
                this.props.onSettingsChange('align', newAlign)
              }}
            />
            <Slider
              // label='Discrete with ticks and precision'
              // discrete
              min={6}
              max={48}
              step={2}
              // discreteTicks={0.25}
              valuePrecision={2}
              style={{ marginTop: '10px' }}
              leftIcon={<FontIcon>format_size</FontIcon>}
              value={widgetSettings.fontSize}
              onChange={(newFontSize) => {
                this.props.onSettingsChange('fontSize', newFontSize)
              }}
              editable
            />
            <br />
            <TwitterPicker
              triangle={'hide'}
              width='100%'
              colors={[
                '#000',
                '#fff',
                '#9e9e9e', // $md-grey-500
                '#03a9f4', // $md-light-blue-500
                '#f44336' // $md-red-500
                // '#ff6e40' // $md-deep-orange-a-200
              ]}
              color={widgetSettings.textColor}
              onChangeComplete={(color) => {
                this.props.onSettingsChange('textColor', color.hex)
              }}
            />
          </DialogContainer>
        </Portal>
      )
    )
  }
}
