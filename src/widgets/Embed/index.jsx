import React, { Component } from 'react'
import { TextField } from 'react-md'
import {
  getWidgetContent,
  saveWidgetContent
} from '../../browser-storage/widget-content'

import WidgetSettings from '../WidgetSettings'

import './embed.css'

var defaultEmbed = 'https://wikipedia.org'

export default class Music extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    getWidgetContent(this.props.uniqueKey).then((widgetContent) => {
      if (widgetContent) {
        this.setState({
          url: widgetContent.url
        })
      } else {
        this.setState({
          url: defaultEmbed
        })
      }
    })
  }

  onSettingsChange = (key, newValue) => {
    this.setState(
      {
        [key]: newValue
      },
      () => {
        saveWidgetContent(this.props.uniqueKey, {
          [key]: newValue
        })
      }
    )
  }

  render() {
    return (
      <>
        <div
          style={{
            //padding: '6px',
            height: '100%'
          }}
        >
          {this.state.url && (
            <iframe
              title={'Embed - ' + this.props.uniqueKey}
              width='100%'
              height='100%'
              src={this.state.url || ''}
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          )}
        </div>
        <WidgetSettings
          visible={this.props.settingsVisible}
          onHide={this.props.hideSettings}
        >
          <TextField
            id='floating-center-title'
            label='Embed Frame URL'
            lineDirection='center'
            placeholder='https://example.com/ ...'
            className='md-cell md-cell--bottom'
            style={{ width: 'auto' }}
            value={this.state.url}
            onChange={(newURL) => {
              this.onSettingsChange('url', newURL)
            }}
          />
        </WidgetSettings>
      </>
    )
  }
}
