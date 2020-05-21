import React, { PureComponent } from 'react'
import {
  Button,
  DialogContainer,
  Divider,
  TextField,
  Toolbar,
  FileUpload,
  Tabs,
  SelectionControlGroup,
  Tab,
  TabsContainer
} from 'react-md'
import BackgroundImageChooser from './FileUpload'
export default class SimpleFullPageDialog extends PureComponent {
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
          panelClassName='md-grid'
          colored
          primary
          toolbar={TheToolbar}
        >
          <Tabs tabId='simple-tab'>
            <Tab label='Appearance'>
              <div className='md-cell'>
                <SelectionControlGroup
                  id='selection-control-group-radios'
                  name='radio-example'
                  type='radio'
                  label={'Background'}
                  defaultValue='Default'
                  controls={[
                    {
                      label: 'Default',
                      value: 'Default'
                    },
                    {
                      label: 'Custom Image',
                      value: 'Image'
                    },
                    {
                      label: 'Color',
                      value: 'Color'
                    }
                  ]}
                />
              </div>
              <br />
              <BackgroundImageChooser />
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
