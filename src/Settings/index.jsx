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

import ColorPicker from '../ColorPicker'

// import paypalIcon from '../assets/icons/paypal-font-awesome-icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPaypal } from '@fortawesome/free-brands-svg-icons/faPaypal'

import BackgroundImageChooser from '../FileUpload'

import {
  getSplashSettings,
  saveSplashSettings
} from '../browser-storage/splash-settings'

import './settings.css'

var originalBackgroundColor =
  getSplashSettings('appearance', 'backgroundColor') || '#fafafa'

function setBackgroundColor(color) {
  document.body.style.background = color
  saveSplashSettings('appearance', 'backgroundColor', color)
  originalBackgroundColor = color
}

export default class SimpleFullPageDialog extends Component {
  render() {
    const { visible, pageX, pageY } = this.props

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
        // fullPage
        onHide={this.props.onHide}
        transitionEnterTimeout={10}
        transitionLeaveTimeout={10}
        aria-labelledby='simple-full-page-dialog-title'
        height='80%'
        width='80%'
        className='settings-dialog'
      >
        {/* 
        <section className='md-toolbar-relative'>
          <BackgroundImageChooser />
        </section> */}

        <TabsContainer
          // panelClassName='md-grid'
          colored
          primary
          // toolbar={TheToolbar}
        >
          <Tabs tabId='simple-tab'>
            <Tab label='Appearance'>
              <Grid className='grid-example'>
                <Cell size={4}>
                  {' '}
                  <SelectionControlGroup
                    id='selection-control-group-radios'
                    name='radio-example'
                    type='radio'
                    label={'Background'}
                    defaultValue='Default'
                    controls={[
                      {
                        label: 'Color (1st swatch is default)',
                        value: 'Color'
                      },
                      {
                        label: 'Custom Image',
                        value: 'Image'
                      }
                    ]}
                  />
                </Cell>
                <Cell size={4}>
                  <ColorPicker
                    initialColor={originalBackgroundColor}
                    handleChangeComplete={setBackgroundColor}
                    // onChangeComplete={this.handleChangeComplete}
                  />
                </Cell>
              </Grid>

              <br />
              {/* <BackgroundImageChooser /> */}
            </Tab>
            <Tab label='Miscellaneous'>
              <h3>Now look at me!</h3>
            </Tab>
            <Tab label='About'>
              <h3>Now look at me!</h3>

              <Button
                raised
                primary
                iconEl={<FontAwesomeIcon icon={faPaypal} />}
                href={
                  'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=48CUT8BYGFRAQ&item_name=Help+fund+my+development+of+Splashpad%21&currency_code=USD&source=url'
                }
                style={{ height: '36px', marginBottom: '6px' }}
              >
                Donate!
              </Button>
            </Tab>
            <Tab label='Support'>
              <h3>Now look at me!</h3>
            </Tab>
          </Tabs>
        </TabsContainer>
      </DialogContainer>
    )
  }
}
