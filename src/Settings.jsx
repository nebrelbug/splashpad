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
  TabsContainer
} from 'react-md'

import ColorPicker from './ColorPicker'

import BackgroundImageChooser from './FileUpload'

import { getFromLS, saveToLS } from './localstorage'

const originalBackgroundColor = getFromLS('background-color') || '#fafafa'

function setBackgroundColor(color) {
  document.body.style.background = color
  saveToLS('background-color', color)
}

setBackgroundColor(originalBackgroundColor)
export default class SimpleFullPageDialog extends Component {
  render() {
    const { visible, pageX, pageY } = this.props

    const TheToolbar = (
      <Toolbar
        // fixed
        title='Settings'
        titleId='simple-full-page-dialog-title'
        // nav={
        //   <Button icon onClick={this.props.onHide}>
        //     close
        //   </Button>
        // }
        actions={
          <Button flat onClick={this.props.onHide}>
            Save
          </Button>
        }
      />
    )

    return (
      <DialogContainer
        id='simple-full-page-dialog'
        visible={visible}
        pageX={pageX}
        pageY={pageY}
        fullPage
        onHide={this.props.onHide}
        transitionEnterTimeout={10}
        transitionLeaveTimeout={10}
        aria-labelledby='simple-full-page-dialog-title'
      >
        {/* 
        <section className='md-toolbar-relative'>
          <BackgroundImageChooser />
        </section> */}

        <TabsContainer
          // panelClassName='md-grid'
          colored
          primary
          toolbar={TheToolbar}
        >
          <Tabs tabId='simple-tab'>
            <Tab label='Appearance'>
              <Grid className='grid-example'>
                <Cell size={2}>
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
          </Tabs>
        </TabsContainer>
      </DialogContainer>
    )
  }
}
