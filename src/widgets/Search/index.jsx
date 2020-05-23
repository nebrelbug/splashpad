import React, { Component } from 'react'
import { Paper, TextField, FontIcon, Button } from 'react-md'
import './search.css'

var Mousetrap = require('mousetrap')

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.state = {
      value: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    Mousetrap.bind('/', (e) => {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }

      this.textInput.current.focus()
    })
  }

  componentWillUnmount() {
    Mousetrap.unbind('/')
  }

  handleSubmit(event) {
    event.preventDefault()

    var query = this.state.value.replace(' ', '+')
    var url = 'https://www.google.com/search?q=' + query
    window.location.href = url // this way it keeps the new tab page in the browser history
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
          <Paper
            zDepth={2}
            className='papers__example'
            style={{
              padding: '6px',
              paddingRight: '28px',
              backgroundColor: 'white',
              borderRadius: '100px'
            }}
          >
            <form onSubmit={this.handleSubmit}>
              <TextField
                id='phone-number-with-icon-left'
                className='no-search-input-x'
                type='search'
                // placeholder
                leftIcon={
                  <Button
                    icon
                    style={{
                      marginBottom: '0px',
                      marginRight: '-4px'
                    }}
                    onClick={() => {
                      this.setState({
                        value: ''
                      })
                    }}
                  >
                    search
                  </Button>
                }
                // error={true}
                // rightIcon={
                //   <Button
                //     icon
                //     style={{
                //       marginBottom: '0px',
                //       marginLeft: '4px'
                //     }}
                //     onClick={() => {
                //       this.setState({
                //         value: ''
                //       })
                //     }}
                //   >
                //     search
                //   </Button>
                // }
                size={10}
                ref={this.textInput}
                value={this.state.value}
                onChange={(newValue) => {
                  this.setState({ value: newValue })
                }}
              />
            </form>
          </Paper>
        </div>
      </div>
    )
  }
}
