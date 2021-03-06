import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import WidgetSettings from './WidgetSettings'

import { TwitterPicker } from 'react-color'

import {
  FontIcon,
  ExpansionList,
  ExpansionPanel,
  SelectionControl,
  SelectField,
  Slider
} from 'react-md'

export default class TextWidgetSettings extends Component {
  render = () => {
    var widgetSettings = this.props.settings || {}

    return (
      <WidgetSettings visible={this.props.visible} onHide={this.props.onHide}>
        {this.props.children}
        <ExpansionList
          style={{ width: 'calc(100% + 48px)', marginLeft: '-24px' }}
        >
          <ExpansionPanel label='Text Appearance' footer={null}>
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
              id='text-widget-align'
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
              min={1}
              max={this.props.maxTextSize || 15}
              step={1}
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
          </ExpansionPanel>
          {/* <ExpansionPanel label='Other Settings' footer={null}>
            {this.props.children}
          </ExpansionPanel> */}
        </ExpansionList>
      </WidgetSettings>
    )
  }
}
