import React, { PureComponent } from 'react'
import { Button, Drawer } from 'react-md'
import Grid from './Grid'
import Settings from './Settings'
import inboxListItems from './constants/inboxListItems'
import inkContextTypes from 'react-md/lib/Inks/inkContextTypes'

export default class App extends PureComponent {
  static childContextTypes = inkContextTypes

  getChildContext() {
    return { inkDisabled: true }
  }

  constructor(props) {
    super(props)

    this.state = {
      settingsOpen: false
    }

    this.toggleSettings = this.toggleSettings.bind(this)
  }

  toggleSettings() {
    this.setState({ settingsOpen: !this.state.settingsOpen })
  }

  render() {
    return (
      <div>
        <Settings
          visible={this.state.settingsOpen}
          onHide={this.toggleSettings}
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
        >
          {this.state.settingsOpen ? 'highlight_off' : 'settings'}
        </Button>
        {/* <Drawer
          id='simple-drawer-example'
          type={Drawer.DrawerTypes.TEMPORARY_MINI}
          visible={true}
          position='left'
          navItems={inboxListItems}
        /> */}
        <Grid />
      </div>
    )
  }
}
