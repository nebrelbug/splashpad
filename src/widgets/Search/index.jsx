import React, { Component } from 'react'
import { Paper, TextField, SelectField, FontIcon, Button } from 'react-md'

import {
  getWidgetSettings,
  saveWidgetSettings
} from '../../browser-storage/widget-content'

import WidgetSettings from '../WidgetSettings'

import './search.css'

var Mousetrap = require('mousetrap')

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.state = {
      value: '',
      settings: {
        searchEngine: 'google'
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    getWidgetSettings(this.props.uniqueKey).then((widgetSettings) => {
      if (widgetSettings) {
        this.setState({
          settings: { ...widgetSettings }
        })
      }
    })

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

  onSettingsChange = (key, newValue) => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          [key]: newValue
        }
      },
      () => {
        saveWidgetSettings(this.props.uniqueKey, {
          [key]: newValue
        })
      }
    )
  }

  componentWillUnmount() {
    Mousetrap.unbind('/')
  }

  handleSubmit(event) {
    event.preventDefault()

    var query = this.state.value.replace(' ', '+')
    var url

    var searchEngine = this.state.settings.searchEngine || 'google'

    if (searchEngine === 'google') {
      url = `https://www.google.com/search?q=${query}`
    } else if (searchEngine === 'duckduckgo') {
      url = `https://duckduckgo.com/?q=${query}`
    } else if (searchEngine === 'stackoverflow') {
      url = `https://stackoverflow.com/search?q=${query}`
    } else if (searchEngine === 'wikipedia') {
      url = `https://en.wikipedia.org/wiki/Special:Search?search=${query}`
    }

    if (!url) {
      // something somehow went wrong
      url = 'https://www.google.com/search?q=' + query
    }

    window.location.href = url // this way it keeps the new tab page in the browser history
  }

  render() {
    return (
      <>
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
        <WidgetSettings
          visible={this.props.settingsVisible}
          onHide={this.props.hideSettings}
        >
          <SelectField
            id='select-search-engine'
            label='Search Engine'
            // placeholder='Center'
            className='md-cell'
            style={{ width: 'auto' }}
            menuItems={[
              {
                label: 'Google',
                value: 'google'
              },
              {
                label: 'DuckDuckGo',
                value: 'duckduckgo'
              },
              {
                label: 'Wikipedia',
                value: 'wikipedia'
              },
              {
                label: 'Stack Overflow',
                value: 'stackoverflow'
              }
            ]}
            simplifiedMenu={true}
            value={this.state.settings.searchEngine}
            onChange={(newSearchEngine) => {
              this.onSettingsChange('searchEngine', newSearchEngine)
            }}
          />
        </WidgetSettings>
      </>
    )
  }
}
