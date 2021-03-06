import React, { Component } from 'react'

import TextWidgetSettings from '../TextWidgetSettings'

import { SelectionControl } from 'react-md'

import {
  getWidgetContent,
  saveWidgetContent,
  saveWidgetSettings,
  getWidgetSettings
} from '../../browser-storage/widget-content'

export default class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      settings: {
        align: 'center',
        fontSize: 2,
        border: false,
        textColor: '#000',
        displaySeconds: true,
        ...this.props.defaultSettings
      },
      visible: false
    }
  }

  startTimer = () => {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

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

  componentDidMount() {
    getWidgetSettings(this.props.uniqueKey).then((widgetSettings) => {
      if (widgetSettings) {
        console.log('settings is:')
        console.log(widgetSettings)
        let defaultSettings = this.props.defaultSettings
        this.setState({
          settings: {
            fontSize: widgetSettings.fontSize || defaultSettings.fontSize || 2,
            align: widgetSettings.align || defaultSettings.align || 'center',
            border: widgetSettings.border || defaultSettings.border || false, // false is default
            textColor:
              widgetSettings.textColor || defaultSettings.textColor || '#000',
            displaySeconds:
              widgetSettings.displaySeconds ||
              defaultSettings.displaySeconds ||
              false
          },
          visible: true
        })
      }
    })

    setTimeout(this.startTimer, (Date.now() % 1000) + 10) // wait until the nearest whole second, then 10 extra milliseconds so we don't have two clocks right on opposite sides of the second
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    var widgetSettings = this.state.settings || {}
    return (
      <>
        <div
          style={{
            // padding: '6px',
            position: 'absolute',
            display: 'table',
            width: '100%',
            height: '100%',
            visibility: this.state.visible ? 'visible' : 'hidden'
          }}
          className={widgetSettings.border ? 'splash-widget-bordered' : ''}
        >
          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <h2
              style={{
                margin: 'auto',
                textAlign: widgetSettings.align || 'center',
                fontSize: widgetSettings.fontSize + 'vw',
                lineHeight: widgetSettings.fontSize + 'px',
                color: widgetSettings.textColor || 'black'
              }}
            >
              {this.state.date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: this.state.settings.displaySeconds
                  ? '2-digit'
                  : undefined
              })}
            </h2>
          </div>
        </div>
        <TextWidgetSettings
          visible={this.props.settingsVisible}
          onHide={this.props.hideSettings}
          settings={widgetSettings}
          onSettingsChange={this.onSettingsChange}
          maxTextSize={20}
        >
          <SelectionControl
            type='switch'
            label='Display Seconds'
            name='display-seconds'
            checked={widgetSettings.displaySeconds}
            onClick={() => {
              this.onSettingsChange(
                'displaySeconds',
                !widgetSettings.displaySeconds
              )
            }}
          />
        </TextWidgetSettings>
      </>
    )
  }
}
