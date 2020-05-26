import React, { Component } from 'react'
// import { TextField } from 'react-md'
import {
  getWidgetContent,
  saveWidgetContent
} from '../../browser-storage/widget-content'

import './note.css'

export default class Note extends Component {
  constructor(props) {
    super(props)

    this.state = { title: '', content: '' }
    this.updateTitle = this.updateTitle.bind(this)
    this.updateContent = this.updateContent.bind(this)
  }

  componentDidMount() {
    getWidgetContent(this.props.uniqueKey).then((widgetContent) => {
      if (widgetContent) {
        this.setState({
          title: widgetContent.title || '',
          content: widgetContent.content || ''
        })
      }
    })
  }

  updateTitle(event) {
    this.setState({ title: event.target.value }, () => {
      saveWidgetContent(this.props.uniqueKey, { title: this.state.title })
    })
  }

  updateContent(event) {
    this.setState({ content: event.target.value }, () => {
      saveWidgetContent(this.props.uniqueKey, { content: this.state.content })
    })
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%', padding: '6px' }}>
        <div className='postit'>
          <div
            className='md-text-field-container md-full-width md-text-field-container--input'
            style={{ width: '100%', height: '100%', padding: '10px' }}
          >
            <input
              // id='placeholder-only-title'
              placeholder='Title'
              type='text'
              className='md-text-field md-text-field--margin md-full-width md-text'
              style={{
                margin: 'auto',
                fontSize: '24px'
              }}
              value={this.state.title}
              onChange={this.updateTitle}
            />
            <textarea
              className='postbody md-text-field md-text-field--multiline md-full-width md-text'
              placeholder='Note to self...'
              value={this.state.content}
              onChange={this.updateContent}
              // style={{ marginTop: '6px', height: 'calc(100%-36px)' }}
            />
          </div>
        </div>
      </div>
    )
  }
}
