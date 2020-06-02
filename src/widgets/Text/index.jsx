import React, { Component } from 'react'
import {
  getWidgetContent,
  saveWidgetContent,
  saveWidgetSettings,
  getWidgetSettings
} from '../../browser-storage/widget-content'

import ContentEditable from 'react-contenteditable'

import { Button } from 'react-md'

import TextWidgetSettings from '../TextWidgetSettings'

import './text.css'

// var fontSizes = ['1em', '1.3em', '1.5em', '2em', '3em']

export default class Text extends Component {
  constructor() {
    super()
    this.state = {
      content: '',
      // hovered: false,
      editing: false,
      settings: {
        align: 'center',
        fontSize: 2,
        border: false,
        textColor: '#000'
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
            fontSize: settings.fontSize || 2,
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

  // mouseOver = () => {
  //   this.setState({ hovered: true })
  // }

  // mouseOut = () => {
  //   this.setState({ hovered: false })
  // }

  onSettingsChange = (key, newValue) => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          [key]: newValue
        }
      },
      () => {
        saveWidgetSettings(this.props.uniqueKey, {
          [key]: newValue
        })
      }
    )
  }

  toggleFontSize = () => {
    let oldFontSize = this.state.settings.fontSize
    let newFontSize = 2 // default

    if (oldFontSize < 2) {
      newFontSize = 2
    } else if (oldFontSize < 4) {
      newFontSize = 4
    } else if (oldFontSize < 6) {
      newFontSize = 6
    } else if (oldFontSize < 8) {
      newFontSize = 8
    } else if (oldFontSize < 10) {
      newFontSize = 10
    } else if (oldFontSize >= 10) {
      newFontSize = 2
    }

    console.log(`fontSize was ${oldFontSize} and is now ${newFontSize}`)

    this.onSettingsChange('fontSize', newFontSize)
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

    this.onSettingsChange('align', newAlign)
  }

  render = () => {
    var widgetSettings = this.state.settings || {}

    return (
      <>
        <div
          style={{
            // padding: '6px',
            width: '100%',
            height: '100%'
          }}
          // onMouseEnter={this.mouseOver}
          // onMouseLeave={this.mouseOut}
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
          {this.props.editingGrid && !this.state.content && (
            <p style={{ textAlign: 'center' }}>Text</p>
          )}

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
              (this.state.settings.border ? 'splash-widget-bordered' : '')
            }
            style={{
              fontSize: widgetSettings.fontSize + 'vw',
              textAlign: widgetSettings.align || 'center',
              color: widgetSettings.textColor || '#000'
            }}
          />
        </div>

        <TextWidgetSettings
          visible={this.props.settingsVisible}
          onHide={this.props.hideSettings}
          settings={widgetSettings}
          onSettingsChange={this.onSettingsChange}
        />
      </>
    )
  }
}
