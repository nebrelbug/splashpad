import React, { Component, useEffect } from 'react'
// import { TextField } from 'react-md'
import {
  getWidgetContent,
  saveWidgetContent
} from '../../browser-storage/widget-content'

import WidgetSettings from '../WidgetSettings'

import './embed.css'

export default class Embed extends Component {
  constructor(props) {
    super(props)

    this.state = { title: '', content: '' }
  }

  render() {
    return (
      <>
        <div style={{ padding: '6px', height: '100%' }}>
          <iframe
            title='My Iframe!'
            width='100%'
            height='100%'
            src='https://open.spotify.com/embed/track/27MB0qHaYAZiTlwg25js1Y'
            frameborder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
          ></iframe>
        </div>
        <WidgetSettings
          visible={this.props.settingsVisible}
          onHide={this.props.hideSettings}
        >
          <button>Settings</button>
        </WidgetSettings>
      </>
    )
  }
}
