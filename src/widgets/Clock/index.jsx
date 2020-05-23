import React, { Component } from 'react'

export default class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div
        style={{
          padding: '6px',
          position: 'absolute',
          display: 'table',
          width: '100%',
          height: '100%'
        }}
      >
        <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
          <h2 style={{ margin: 'auto', textAlign: 'center' }}>
            {this.state.date.toLocaleTimeString()}
          </h2>
        </div>
      </div>
    )
  }
}
