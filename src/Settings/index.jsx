import React, { Component } from 'react'
import {
  Button,
  DialogContainer,
  Divider,
  TextField,
  Toolbar,
  FileUpload,
  Grid,
  Cell,
  Tabs,
  SelectionControlGroup,
  Tab,
  TabsContainer,
  SVGIcon
} from 'react-md'

import Appearance from './Appearance'

// import paypalIcon from '../assets/icons/paypal-font-awesome-icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPaypal } from '@fortawesome/free-brands-svg-icons/faPaypal'

import {
  getSplashSettings,
  saveSplashSettings
} from '../browser-storage/splash-settings'

import './settings.css'

export default class SimpleFullPageDialog extends Component {
  render() {
    const { visible } = this.props

    // const TheToolbar = (
    //   <Toolbar
    //     // fixed
    //     title='Settings'
    //     titleId='simple-full-page-dialog-title'
    //     // nav={
    //     //   <Button icon onClick={this.props.onHide}>
    //     //     close
    //     //   </Button>
    //     // }
    //     actions={
    //       <Button flat onClick={this.props.onHide}>
    //         Save
    //       </Button>
    //     }
    //   />
    // )

    return (
      <DialogContainer
        id='splash-settings-dialog'
        visible={visible}
        // pageX={pageX}
        // pageY={pageY}
        onHide={this.props.onHide}
        transitionEnterTimeout={10}
        transitionLeaveTimeout={10}
        aria-labelledby='settings-dialog'
        height='80%'
        width='80%'
        className='settings-dialog'
      >
        <TabsContainer
          // panelClassName='md-grid'
          colored
          primary
          // toolbar={TheToolbar}
          // defaultTabIndex={2}
        >
          <Tabs tabId='simple-tab'>
            <Tab label='Appearance'>
              <Appearance />
            </Tab>
            <Tab label='Miscellaneous'>
              <h3>More settings coming soon!</h3>
            </Tab>
            <Tab label='About'>
              <div>
                <h1
                  style={{
                    margin: 'auto',
                    width: 'fit-content',
                    marginBottom: '20px'
                  }}
                >
                  Splashpad
                </h1>
                <p>
                  Splashpad is completely open-source and will remain free
                  forever. All of my work on it is unpaid and in my free time.
                </p>
                <p>
                  I would deeply appreciate donations, as a gesture of gratitude
                  and as funding for future development of Splashpad.
                </p>
                <Button
                  raised
                  primary
                  iconEl={<FontAwesomeIcon icon={faPaypal} />}
                  href={
                    'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=48CUT8BYGFRAQ&item_name=Help+fund+my+development+of+Splashpad%21&currency_code=USD&source=url'
                  }
                  style={{
                    height: '36px',
                    marginBottom: '6px'
                  }}
                >
                  Donate with PayPal!
                </Button>
                <br />
                <br />
                <br />
                <b>Links</b>
                <ul>
                  <li>
                    <a href='https://github.com/nebrelbug/splash'>
                      GitHub repository
                    </a>
                  </li>
                </ul>
              </div>
            </Tab>
            <Tab label='Support'>
              <h1
                style={{
                  margin: 'auto',
                  width: 'fit-content',
                  marginBottom: '20px'
                }}
              >
                Support
              </h1>
              <p>We're sorry you're having trouble!</p>
              <p>
                Try creating a GitHub issue at{' '}
                <a href='https://github.com/nebrelbug/splashpad/issues'>
                  the GitHub repository, or browse through existing issues
                </a>
              </p>
            </Tab>
          </Tabs>
        </TabsContainer>
      </DialogContainer>
    )
  }
}
