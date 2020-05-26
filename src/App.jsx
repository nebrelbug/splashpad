import React, { PureComponent } from 'react'
import { Button } from 'react-md'
import Grid from './Grid'
import Settings from './Settings/index.jsx'
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
      settingsOpen: false
    }
  }

  toggleSettings = () => {
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
          className='actionButton'
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
        <Grid />
      </div>
    )
  }
}
