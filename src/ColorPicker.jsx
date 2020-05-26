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
          //   '#f8bbd0', // $md-pink-100,
          //   '#e1bee7', // $md-purple-100
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
          '#FFFFFF' // white
        ]}
      />
    )
  }
}
