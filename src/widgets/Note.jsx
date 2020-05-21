import React, { Component } from 'react'
import { TextField } from 'react-md'

import './note.css'

export default class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  // componentDidMount() {
  //   this.timerID = setInterval(() => this.tick(), 1000)
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerID)
  // }

  // tick() {
  //   this.setState({
  //     date: new Date()
  //   })
  // }

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
          />
          <textarea
            class='postbody md-text-field md-text-field--multiline md-full-width md-text'
            placeholder='Note to self...'
            // style={{ marginTop: '6px', height: 'calc(100%-36px)' }}
          ></textarea>
        </div>
      </div>
    )
  }
}
