import React, { Component } from 'react'
import { Grid, Cell, SelectionControlGroup, Slider } from 'react-md'

import ColorPicker from '../ColorPicker'

import BackgroundImageChooser from '../FileUpload'

import {
  getSplashSettings,
  saveSplashSettings
} from '../browser-storage/splash-settings'

import './settings.css'

var backgroundColor =
  getSplashSettings('appearance', 'backgroundColor') || '#fafafa'

var backgroundImage = getSplashSettings('appearance', 'backgroundImage') || null
var backgroundImageDarkness =
  getSplashSettings('appearance', 'backgroundImageDarkness') || 0

var background = getSplashSettings('appearance', 'background') || 'color' // 'color' or 'image'

function setBackgroundColor(color) {
  document.body.style.background = color
  backgroundColor = color
  saveSplashSettings('appearance', 'backgroundColor', color)
  saveSplashSettings('appearance', 'background', 'color')
}

function setBackgroundImage(image, darkness) {
  if (image && image.data) {
    document.body.style['background-image'] = `linear-gradient(
        rgba(0, 0, 0, ${darkness}), 
        rgba(0, 0, 0, ${darkness})
      ), url(${image.data})`
    backgroundImage = image
    saveSplashSettings('appearance', 'backgroundImage', image)
    saveSplashSettings('appearance', 'background', 'image')

    saveSplashSettings('appearance', 'backgroundImageDarkness', darkness)
  }
}

export default class AppearanceSettings extends Component {
  constructor() {
    super()
    this.state = {
      background: background
    }
  }

  onLoadImage = (image) => {
    console.log(image)
    setBackgroundImage(image, backgroundImageDarkness)
  }

  onRemoveImage = () => {
    this.setState({ background: 'color' })
    setBackgroundColor(backgroundColor)
    backgroundImage = null
    saveSplashSettings('appearance', 'backgroundImage', null)
    saveSplashSettings('appearance', 'background', 'color')
  }

  onDarknessChange = (newValue) => {
    setBackgroundImage(backgroundImage, newValue)
  }

  render() {
    return (
      <Grid className='grid-example'>
        <Cell size={4}>
          {' '}
          <SelectionControlGroup
            id='selection-control-group-radios'
            name='radio-example'
            type='radio'
            label={'Background'}
            value={this.state.background}
            onChange={(value) => {
              this.setState({ background: value })
              // Now change styles on page body
              if (value === 'color') {
                setBackgroundColor(backgroundColor)
              } else if (value === 'image') {
                setBackgroundImage(backgroundImage, backgroundImageDarkness)
              }
            }}
            controls={[
              {
                label: 'Color (default #FAFAFA)',
                value: 'color'
              },
              {
                label: 'Custom Image',
                value: 'image'
              }
            ]}
          />
        </Cell>
        <Cell size={4}>
          {this.state.background === 'color' && (
            <ColorPicker
              initialColor={backgroundColor}
              handleChangeComplete={setBackgroundColor}
              // onChangeComplete={this.handleChangeComplete}
            />
          )}
          {this.state.background === 'image' && (
            <>
              <BackgroundImageChooser
                initialImage={backgroundImage}
                onLoadImage={this.onLoadImage}
                removeImage={this.onRemoveImage}
              />
              <br /> <br />
              {backgroundImage && backgroundImage.data && (
                <Slider
                  id='custom-range-step-slider'
                  label='Darken Image'
                  min={0}
                  max={1}
                  step={0.1}
                  valuePrecision={2}
                  defaultValue={backgroundImageDarkness}
                  onChange={this.onDarknessChange}
                  discrete
                />
              )}
            </>
          )}
        </Cell>
      </Grid>
    )
  }
}