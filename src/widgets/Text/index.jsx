import React, { Component } from 'react'
import {
  getWidgetContent,
  saveWidgetContent,
  saveWidgetSettings,
  getWidgetSettings
} from '../../browser-storage/widget-content'

import ContentEditable from 'react-contenteditable'
import { TwitterPicker } from 'react-color'

import {
  Button,
  FontIcon,
  DialogContainer,
  SelectionControl,
  SelectField,
  Slider
} from 'react-md'

import './text.css'

// var fontSizes = ['1em', '1.3em', '1.5em', '2em', '3em']

export default class Text extends Component {
  constructor() {
    super()
    this.state = {
      content: '',
      hovered: false,
      editing: false,
      settings: {
        align: 'center',
        fontSize: 14,
        border: false,
        textColor: 'black'
      }
    }

    this.contentEditable = React.createRef()
    this.containerDiv = React.createRef()
  }

  componentDidMount() {
    getWidgetContent(this.props.uniqueKey).then((widgetContent) => {
      if (widgetContent) {
        var settings = widgetContent.settings || {}
        console.log('settings is:')
        console.log(settings)
        this.setState({
          content: widgetContent.content || '',
          settings: {
            fontSize: settings.fontSize || 0,
            align: settings.align || 'center',
            border: settings.border || false, // false is default
            textColor: settings.textColor || '#000'
          }
        })
      }
    })
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value }, () => {
      saveWidgetContent(this.props.uniqueKey, { content: this.state.content })
    })
  }

  mouseOver = () => {
    this.setState({ hovered: true })
  }

  mouseOut = () => {
    this.setState({ hovered: false })
  }

  setFontSize = (newFontSize) => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          fontSize: newFontSize
        }
      },
      () => {
        saveWidgetSettings(this.props.uniqueKey, {
          fontSize: this.state.settings.fontSize
        })
      }
    )
  }

  toggleFontSize = () => {
    let oldFontSize = this.state.settings.fontSize
    let newFontSize = 14 // default

    if (oldFontSize < 14) {
      newFontSize = 14 // 1em
    } else if (oldFontSize < 21) {
      newFontSize = 21 // 1.5em
    } else if (oldFontSize < 28) {
      newFontSize = 28 // 2em
    } else if (oldFontSize < 35) {
      newFontSize = 35 // etc.
    } else if (oldFontSize < 42) {
      newFontSize = 42
    } else if (oldFontSize >= 42) {
      newFontSize = 14
    }

    console.log(`fontSize was ${oldFontSize} and is now ${newFontSize}`)

    this.setFontSize(newFontSize)
  }

  setTextAlign = (newAlign) => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          align: newAlign
        }
      },
      () => {
        saveWidgetSettings(this.props.uniqueKey, {
          align: newAlign
        })
      }
    )
  }

  toggleTextAlign = () => {
    var currentAlign = this.state.settings.align
    var newAlign = 'center'

    if (currentAlign === 'left') {
      newAlign = 'center' // unnecessary, but for readability
    }
    if (currentAlign === 'right') {
      newAlign = 'left'
    }
    if (currentAlign === 'center') {
      newAlign = 'right'
    }

    this.setTextAlign(newAlign)
  }

  toggleBorder = () => {
    // console.log(`showBorder is ${showBorder}`)
    this.setState(
      {
        settings: {
          ...this.state.settings,
          border: !this.state.settings.border
        }
      },
      () => {
        saveWidgetSettings(this.props.uniqueKey, {
          border: this.state.settings.border
        })
      }
    )
  }

  setTextColor = (newColor) => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          textColor: newColor.hex
        }
      },
      () => {
        saveWidgetSettings(this.props.uniqueKey, {
          textColor: newColor.hex
        })
      }
    )
  }

  render = () => {
    var widgetSettings = this.state.settings || {}

    return (
      <>
        <div
          style={{
            padding: '6px',
            width: '100%',
            height: '100%'
          }}
          onMouseEnter={this.mouseOver}
          onMouseLeave={this.mouseOut}
          onDoubleClick={() => {
            this.setState({ editing: true }, () => {
              this.contentEditable.current.focus()
            })
          }}
          ref={this.containerDiv}
          onBlur={(e) => {
            if (!this.containerDiv.current.contains(e.relatedTarget)) {
              this.setState({ editing: false })
            }
          }}
        >
          {this.state.editing && (
            <>
              <Button
                style={{
                  height: 18,
                  width: 18,
                  padding: 0,
                  position: 'absolute',
                  top: -2,
                  left: -2
                }}
                className='textEditButton'
                icon
                onClick={this.toggleFontSize}
              >
                format_size
              </Button>
              <Button
                style={{
                  height: 18,
                  width: 18,
                  padding: 0,
                  position: 'absolute',
                  top: -2,
                  left: 18
                }}
                className='textEditButton'
                icon
                onClick={this.toggleTextAlign}
              >
                {'format_align_' + widgetSettings.align}
              </Button>
            </>
          )}
          <ContentEditable
            html={this.state.content} // innerHTML of the editable div
            innerRef={this.contentEditable}
            disabled={!this.state.editing} // use true to disable edition
            onChange={this.handleChange} // handle innerHTML change
            className={
              'textEditWidget ' +
              (this.state.editing ? 'editing' : '') +
              (this.state.settings.border ? 'bordered' : '')
            }
            style={{
              fontSize: widgetSettings.fontSize + 'px',
              textAlign: widgetSettings.align || 'center',
              color: widgetSettings.textColor || '#000'
            }}
          />
        </div>
        <DialogContainer
          id='widget-settings-dialog'
          visible={this.props.settingsVisible}
          title='Widget Settings'
          onHide={this.props.hideSettings}
          portal={true}
          lastChild={true}
          // disableScrollLocking={true}
          renderNode={document.getElementById('dialog-container')} // or whatever render node you want
          transitionEnterTimeout={50}
          transitionLeaveTimeout={50}
        >
          <SelectionControl
            type='switch'
            label='Show Border'
            name='show-border'
            checked={this.state.settings.border}
            onClick={this.toggleBorder}
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
            simplifiedMenu={false}
            value={this.state.settings.align}
            onChange={this.setTextAlign}
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
            value={this.state.settings.fontSize}
            onChange={this.setFontSize}
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
            color={this.state.settings.textColor}
            onChangeComplete={this.setTextColor}
          />
        </DialogContainer>
      </>
    )
  }
}
