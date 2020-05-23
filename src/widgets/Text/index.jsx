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
      align: 'center',
      fontSizeIndex: 0
    }

    this.contentEditable = React.createRef()
    this.containerDiv = React.createRef()
  }

  componentDidMount() {
    getWidgetContent(this.props.uniqueKey).then((widgetContent) => {
      if (widgetContent) {
        this.setState({
          content: widgetContent.content || '',
          fontSizeIndex: widgetContent.fontSizeIndex || 0,
          align: widgetContent.align || 'center'
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

  toggleTextAlign = () => {
    var currentAlign = this.state.align
    var newAlign = 'center'

    if (currentAlign === 'left') {
      newAlign = 'center' // unnecessary, but for readability
    }
    if (currentAlign === 'right') {
      newAlign = 'left'
    }
    if (currentAlign === 'center') {
      newAlign = 'right'
    }

    this.setState(
      {
        align: newAlign
      },
      () => {
        saveWidgetContent(this.props.uniqueKey, {
          align: newAlign
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
        ref={this.containerDiv}
        onBlur={(e) => {
          if (!this.containerDiv.current.contains(e.relatedTarget)) {
            this.setState({ editing: false })
          }
        }}
      >
        {this.state.editing && (
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
                this.toggleFontSize()
              }}
            >
              format_size
            </Button>
            <Button
              style={{
                height: 18,
                width: 18,
                padding: 0,
                position: 'absolute',
                top: -2,
                left: 18
              }}
              className='textEditButton'
              icon
              onClick={this.toggleTextAlign}
            >
              {'format_align_' + this.state.align}
            </Button>
          </>
        )}
        <ContentEditable
          html={this.state.content} // innerHTML of the editable div
          innerRef={this.contentEditable}
          disabled={!this.state.editing} // use true to disable edition
          onChange={this.handleChange} // handle innerHTML change
          className={'textEditWidget ' + (this.state.editing ? 'editing' : '')}
          style={{
            fontSize: fontSizes[this.state.fontSizeIndex],
            textAlign: this.state.align
          }}
        />
      </div>
    )
  }
}
