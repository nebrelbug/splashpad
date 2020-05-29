import React, { Component, useEffect } from 'react'
import { TextField } from 'react-md'
import {
  getWidgetContent,
  saveWidgetContent
} from '../../browser-storage/widget-content'

import WidgetSettings from '../WidgetSettings'

import getIFrameURL from './utils'

import './music.css'

var defaultSong = 'https://open.spotify.com/embed/track/7GhIk7Il098yCjg4BQjzvb'

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
          url: defaultSong
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
            // padding: '6px',
            height: '100%'
          }}
        >
          {this.state.url && (
            <iframe
              title={'Spotify embed - ' + this.props.uniqueKey}
              width='100%'
              height='100%'
              src={getIFrameURL(this.state.url || '')}
              frameborder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen
            ></iframe>
          )}
        </div>
        <WidgetSettings
          visible={this.props.settingsVisible}
          onHide={this.props.hideSettings}
        >
          <TextField
            id='floating-center-title'
            label='Playlist/Track URL'
            lineDirection='center'
            placeholder='https://open.spotify.com ...'
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
