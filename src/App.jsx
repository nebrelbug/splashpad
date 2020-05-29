import React, { PureComponent } from 'react'
import { Button } from 'react-md'
import Grid from './Grid'
import Settings from './Settings/index.jsx'
import {
  getSplashSettings,
  saveSplashSettings
} from './browser-storage/splash-settings'

import inkContextTypes from 'react-md/lib/Inks/inkContextTypes'

import './App.css'

export default class App extends PureComponent {
  static childContextTypes = inkContextTypes

  getChildContext() {
    return { inkDisabled: true }
  }

  constructor(props) {
    super(props)

    this.state = {
      settingsOpen: true,
      settings: {
        buttonStyle: getSplashSettings('appearance', 'buttonStyle') || 'dark'
      }
    }
  }

  toggleSettings = () => {
    this.setState({ settingsOpen: !this.state.settingsOpen })
  }

  onSettingsChange = (category, key, newValue) => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          [key]: newValue
        }
      },
      () => {
        saveSplashSettings(category, key, newValue)
      }
    )
  }

  render() {
    return (
      <div ref={this.divRef}>
        <Settings
          visible={this.state.settingsOpen}
          onHide={this.toggleSettings}
          settings={this.state.settings}
          onSettingsChange={this.onSettingsChange}
        />
        <Button
          style={{
            position: 'fixed',
            left: 8,
            bottom: 8,
            height: 48,
            width: 48,
            padding: 12,
            zIndex: 999
          }}
          icon
          swapTheming
          onClick={this.toggleSettings}
          className={
            'actionButton ' +
            (this.state.settings.buttonStyle === 'light' ? 'light' : '')
          }
        >
          {this.state.settingsOpen ? 'check' : 'settings'}
        </Button>
        {/* <Drawer
          id='splashpad-main-drawer'
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={this.state.drawerOpen}
          position='left'
          navItems={inboxListItems}
          drawerTitle='Splashpad'
          header={
            <Toolbar
              nav={null}
              actions={null}
              className='md-divider-border md-divider-border--bottom'
              title='Splashpad'
            />
          }
        /> */}
        <Grid
          appSettingsOpen={this.state.settingsOpen}
          appSettings={this.state.settings}
        />
      </div>
    )
  }
}
