import React, { Component } from 'react'

import { SketchPicker } from 'react-color'

export default class ColorPicker extends Component {
  state = {
    color: this.props.initialColor
  }

  handleChange = (color) => {
    this.setState({ color: color.hex })
  }

  handleChangeComplete = (color) => {
    this.props.handleChangeComplete(color.hex)
    this.setState({ color: color.hex })
  }

  render() {
    return (
      <SketchPicker
        color={this.state.color}
        onChange={this.handleChange}
        onChangeComplete={this.handleChangeComplete}
        disableAlpha={true}
        presetColors={[
          '#fafafa', // $md-grey-50
          '#ffcdd2', // $md-red-100,
          '#bbdefb', // $md-blue-100
          '#b3e5fc', // $md-light-blue-100
          '#c8e6c9', // $md-green-100
          '#fff9c4', // $md-yellow-100
          '#fff0b2', // $md-orange-100
          '#d7ccc8', // $md-brown-100

          '#eee', // $md-grey-200
          '#ef9a9a', // $md-red-200
          '#90caf9', // $md-blue-200
          '#81d4fa', // $md-light-blue-200
          '#a5d6a7', // $md-green-200
          '#fff59d', // $md-yellow-200
          '#ffcc80', // $md-orange-200
          '#b39ddb', // md-deep-purple-200

          '#9e9e9e', // $md-grey-500
          '#f44336', // $md-red-500
          '#2196f3', // $md-blue-500
          '#03a9f4', // $md-light-blue-500
          '#4caf50', // $md-green-500
          '#ffeb3b', // $md-yellow-500
          '#ff9800', // $md-orange-500
          '#FFFFFF' // white
        ]}
      />
    )
  }
}
