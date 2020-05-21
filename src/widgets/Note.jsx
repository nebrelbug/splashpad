import React, { Component } from 'react'
import { TextField } from 'react-md'
import { getFromLS, saveToLS } from '../localstorage'

import './note.css'

export default class Note extends Component {
  constructor(props) {
    super(props)
    var originalContent = getFromLS('note:--' + props.uniqueKey) || {
      title: '',
      content: ''
    }
    this.state = originalContent
    this.updateTitle = this.updateTitle.bind(this)
    this.updateContent = this.updateContent.bind(this)
  }

  updateTitle(event) {
    this.setState({ title: event.target.value }, () => {
      saveToLS('note:--' + this.props.uniqueKey, this.state)
    })
  }

  updateContent(event) {
    this.setState({ content: event.target.value }, () => {
      saveToLS('note:--' + this.props.uniqueKey, this.state)
    })
  }

  render() {
    return (
      <div className='postit'>
        <div
          class='md-text-field-container md-full-width md-text-field-container--input'
          style={{ width: '100%', height: '100%', padding: '4%' }}
        >
          <input
            id='placeholder-only-title'
            placeholder='Title'
            type='text'
            class='md-text-field md-text-field--margin md-full-width md-text'
            style={{
              margin: 'auto',
              fontSize: '24px'
            }}
            value={this.state.title}
            onChange={this.updateTitle}
          />
          <textarea
            class='postbody md-text-field md-text-field--multiline md-full-width md-text'
            placeholder='Note to self...'
            value={this.state.content}
            onChange={this.updateContent}
            // style={{ marginTop: '6px', height: 'calc(100%-36px)' }}
          />
        </div>
      </div>
    )
  }
}
