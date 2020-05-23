import React, { Component } from 'react'
import {
  getWidgetContent,
  saveWidgetContent,
  saveWidgetSettings,
  getWidgetSettings
} from '../../browser-storage/widget-content'

import ContentEditable from 'react-contenteditable'

import {
  Button,
  FontIcon,
  DialogContainer,
  SelectionControl,
  Slider,
  List,
  ListItem,
  Subheader,
  Divider,
  Avatar
} from 'react-md'

import './text.css'

const InfoIcon = () => <FontIcon>info</FontIcon>

var itemsToAdd = [
  { name: 'Sticky Note', key: 'note', icon: 'note', color: 'amber' },
  { name: 'Searchbar', key: 'search', icon: 'search' },
  { name: 'Clock', key: 'clock', icon: 'schedule' },
  { name: 'Text', key: 'text', icon: 'text_fields' }
]

var fontSizes = ['1em', '1.3em', '1.5em', '2em', '3em']

export default class Text extends Component {
  constructor() {
    super()
    this.state = {
      content: '',
      hovered: false,
      editing: false,
      settings: {
        align: 'center',
        fontSizeIndex: 0
      }
    }

    this.contentEditable = React.createRef()
    this.containerDiv = React.createRef()
  }

  componentDidMount() {
    getWidgetContent(this.props.uniqueKey).then((widgetContent) => {
      if (widgetContent) {
        var settings = widgetContent.settings || {}
        console.log('settings is:')
        console.log(settings)
        this.setState({
          content: widgetContent.content || '',
          settings: {
            fontSizeIndex: settings.fontSizeIndex || 0,
            align: settings.align || 'center'
          }
        })
      }
    })
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value }, () => {
      saveWidgetContent(this.props.uniqueKey, { content: this.state.content })
    })
  }

  mouseOver = () => {
    this.setState({ hovered: true })
  }

  mouseOut = () => {
    this.setState({ hovered: false })
  }

  toggleFontSize = () => {
    this.setState(
      {
        settings: {
          ...this.state.settings,

          fontSizeIndex:
            (this.state.settings.fontSizeIndex + 1) % fontSizes.length
        }
      },
      () => {
        saveWidgetSettings(this.props.uniqueKey, {
          fontSizeIndex: this.state.settings.fontSizeIndex
        })
      }
    )
  }

  toggleTextAlign = () => {
    var currentAlign = this.state.settings.align
    var newAlign = 'center'

    if (currentAlign === 'left') {
      newAlign = 'center' // unnecessary, but for readability
    }
    if (currentAlign === 'right') {
      newAlign = 'left'
    }
    if (currentAlign === 'center') {
      newAlign = 'right'
    }

    this.setState(
      {
        settings: {
          ...this.state.settings,
          align: newAlign
        }
      },
      () => {
        saveWidgetSettings(this.props.uniqueKey, {
          align: newAlign
        })
      }
    )
  }

  render = () => {
    var widgetSettings = this.state.settings || {}

    return (
      <>
        <div
          style={{
            padding: '6px',
            width: '100%',
            height: '100%'
          }}
          onMouseEnter={this.mouseOver}
          onMouseLeave={this.mouseOut}
          onDoubleClick={() => {
            this.setState({ editing: true }, () => {
              this.contentEditable.current.focus()
            })
          }}
          ref={this.containerDiv}
          onBlur={(e) => {
            if (!this.containerDiv.current.contains(e.relatedTarget)) {
              this.setState({ editing: false })
            }
          }}
        >
          {this.state.editing && (
            <>
              <Button
                style={{
                  height: 18,
                  width: 18,
                  padding: 0,
                  position: 'absolute',
                  top: -2,
                  left: -2
                }}
                className='textEditButton'
                icon
                onClick={this.toggleFontSize}
              >
                format_size
              </Button>
              <Button
                style={{
                  height: 18,
                  width: 18,
                  padding: 0,
                  position: 'absolute',
                  top: -2,
                  left: 18
                }}
                className='textEditButton'
                icon
                onClick={this.toggleTextAlign}
              >
                {'format_align_' + widgetSettings.align}
              </Button>
            </>
          )}
          <ContentEditable
            html={this.state.content} // innerHTML of the editable div
            innerRef={this.contentEditable}
            disabled={!this.state.editing} // use true to disable edition
            onChange={this.handleChange} // handle innerHTML change
            className={
              'textEditWidget ' + (this.state.editing ? 'editing' : '')
            }
            style={{
              fontSize: fontSizes[widgetSettings.fontSizeIndex] || '1em',
              textAlign: widgetSettings.align || 'center'
            }}
          />
        </div>
        <DialogContainer
          id='widget-settings-dialog'
          visible={this.props.settingsVisible}
          title='Widget Settings'
          onHide={this.props.hideSettings}
          portal={true}
          lastChild={true}
          // disableScrollLocking={true}
          renderNode={document.getElementById('dialog-container')} // or whatever render node you want
        >
          {/* <List className=''>
            {itemsToAdd.map(({ name, key, icon, color }, i) => (
              <ListItem
                leftAvatar={
                  <Avatar
                    suffix={color}
                    icon={<FontIcon>{icon}</FontIcon>}
                    random
                  />
                }
                onClick={() => {
                  this.hide()
                  this.props.addItem(key)
                }}
                // rightIcon={<InfoIcon />}
                primaryText={name}
                // secondaryText='Jan 9, 2014'
                key={i}
              />
            ))}
          </List> */}
          {/* <GUI /> */}

          <SelectionControl
            type='switch'
            label='Show Border'
            name='show-border'
            defaultChecked
          />
          <Slider
            // label='Discrete with ticks and precision'
            // discrete
            min={6}
            max={48}
            step={2}
            // discreteTicks={0.25}
            valuePrecision={2}
            style={{ marginTop: '10px' }}
            leftIcon={<FontIcon>format_size</FontIcon>}
            editable
          />
        </DialogContainer>
      </>
    )
  }
}
