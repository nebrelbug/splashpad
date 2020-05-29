import React from 'react'
import {
  Button,
  FontIcon,
  DialogContainer,
  List,
  ListItem,
  Subheader,
  Divider,
  Grid,
  Cell,
  Avatar
} from 'react-md'
import widgets from './widgets/widgets-list'

import './addwidgets.css'

var Mousetrap = require('mousetrap')

const InfoIcon = () => <FontIcon>info</FontIcon>

let widgetList = Object.keys(widgets).map((key) => ({
  ...widgets[key],
  key: key
}))

export default class AddButtons extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      addButtonHovered: false,
      description: false
    }
  }

  componentDidMount() {
    Mousetrap.bind('p', this.toggleEditing)
  }

  componentWillUnmount() {
    Mousetrap.unbind('p')
  }

  show = () => {
    this.setState({ visible: true })
  }

  hide = () => {
    this.setState({ visible: false })
  }

  hideDescription = () => {
    this.setState({ description: false })
  }

  toggleEditing = () => {
    this.setState({ visible: !this.state.visible })
  }

  mouseOver = () => {
    this.setState({ addButtonHovered: true })
  }

  mouseOut = () => {
    this.setState({ addButtonHovered: false })
  }

  handleKeyDown = (e) => {
    const key = e.which || e.keyCode
    if (key === 13 || key === 32) {
      // also close on enter or space keys
      // this.hide()
    }
  }

  render() {
    return (
      <>
        {/* Some easy-access buttons */}
        <div
          style={{
            position: 'fixed',
            right: '8px',
            bottom: '56px',
            height: this.state.addButtonHovered ? 48 + 48 + 'px' : '48px',
            width: '48px'
          }}
          onMouseEnter={this.mouseOver}
          onMouseLeave={this.mouseOut}
        >
          {/* {this.state.addButtonHovered && (
            <Button
              style={{
                position: 'fixed',
                right: 8,
                bottom: 104,
                height: 48,
                width: 48,
                padding: 12
              }}
              icon
              // secondary
              swapTheming
              onClick={() => {
                this.props.addItem('note')
              }}
              className='actionButton'
            >
              note_add
            </Button>
          )} */}
          <Button
            style={{
              position: 'fixed',
              right: '8px',
              bottom: '56px',
              height: '48px',
              width: '48px',
              padding: '12px'
            }}
            icon
            // secondary
            swapTheming
            onClick={this.show}
            className={
              'actionButton ' +
              (this.props.appSettings.buttonStyle === 'light' ? 'light' : '')
            }
          >
            add_circle_outline
          </Button>
        </div>
        <DialogContainer
          id='add-widget-dialog'
          visible={this.state.visible}
          title='Add Widget'
          onHide={this.hide}
          // width='40%'
        >
          {/* Consider adding search, larger dialog */}
          <List className=''>
            {/* <Subheader primaryText='Folders' /> */}
            {widgetList.map(
              ({ name, subheading, description, key, icon, color }, i) => (
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
                  secondaryText={subheading}
                  renderChildrenOutside
                  key={i}
                >
                  <Button
                    icon
                    onClick={() => {
                      this.setState({
                        description: description,
                        descriptionTitle: name
                      })
                    }}
                  >
                    info
                  </Button>
                </ListItem>
              )
            )}
          </List>
        </DialogContainer>
        <DialogContainer
          id='add-widget-description'
          visible={this.state.description !== false}
          title={this.state.descriptionTitle}
          onHide={this.hideDescription}
          focusOnMount={false}
          // width='40%'
        >
          {this.state.description || <p>Responsive widget</p>}
        </DialogContainer>
      </>
    )
  }
}
