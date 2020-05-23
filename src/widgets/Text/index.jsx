import React, { Component } from 'react'
import {
  getWidgetContent,
  saveWidgetContent
} from '../../browser-storage/widget-content'
import { Button } from 'react-md'
import ContentEditable from 'react-contenteditable'

import './text.css'

var fontSizes = ['1em', '1.3em', '1.5em', '2em']

export default class Text extends Component {
  constructor() {
    super()
    this.state = {
      content: '',
      hovered: false,
      editing: false,
      fontSizeIndex: 0
    }

    this.contentEditable = React.createRef()
  }

  componentDidMount() {
    getWidgetContent(this.props.uniqueKey).then((widgetContent) => {
      if (widgetContent) {
        this.setState({
          content: widgetContent.content || '',
          fontSizeIndex: widgetContent.fontSizeIndex || 0
        })
      }
    })
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value }, () => {
      saveWidgetContent(this.props.uniqueKey, { content: this.state.content })
    })
  }

  mouseOver = () => {
    this.setState({ hovered: true })
  }

  mouseOut = () => {
    this.setState({ hovered: false })
  }

  toggleFontSize = () => {
    this.setState(
      {
        fontSizeIndex: (this.state.fontSizeIndex + 1) % fontSizes.length
      },
      () => {
        saveWidgetContent(this.props.uniqueKey, {
          fontSizeIndex: this.state.fontSizeIndex
        })
      }
    )
  }

  render = () => {
    return (
      <div
        style={{
          padding: '6px',
          width: '100%',
          height: '100%'
        }}
        onMouseEnter={this.mouseOver}
        onMouseLeave={this.mouseOut}
        onDoubleClick={() => {
          this.setState({ editing: true }, () => {
            this.contentEditable.current.focus()
          })
        }}
        onBlur={() => {
          this.setState({ editing: false })
        }}
      >
        {this.state.hovered && (
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
              onClick={() => {
                this.setState({ editing: !this.state.editing })
              }}
            >
              format_size
            </Button>
          </>
        )}
        <ContentEditable
          html={this.state.content} // innerHTML of the editable div
          innerRef={this.contentEditable}
          disabled={!this.state.editing} // use true to disable edition
          onChange={this.handleChange} // handle innerHTML change
          className={'textEditWidget ' + (this.state.editing ? 'editing' : '')}
          style={{ fontSize: fontSizes[this.state.fontSizeIndex] }}
        />
      </div>
    )
  }
}
