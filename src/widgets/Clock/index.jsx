import React, { Component } from 'react'

import TextWidgetSettings from '../TextWidgetSettings'

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
        fontSize: 14,
        border: false,
        textColor: '#000'
      }
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
      var settings = widgetSettings || {}
      this.setState({
        settings: {
          fontSize: settings.fontSize || 28,
          align: settings.align || 'center',
          border: settings.border || false, // false is default
          textColor: settings.textColor || '#000'
        }
      })
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
            padding: '6px',
            position: 'absolute',
            display: 'table',
            width: '100%',
            height: '100%'
          }}
          className={widgetSettings.border ? 'splash-widget-bordered' : ''}
        >
          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <h2
              style={{
                margin: 'auto',
                textAlign: widgetSettings.align || 'center',
                fontSize: widgetSettings.fontSize + 'px',
                color: widgetSettings.textColor || 'black'
              }}
            >
              {this.state.date.toLocaleTimeString()}
            </h2>
          </div>
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
