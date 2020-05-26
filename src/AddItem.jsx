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
      visible: true,
      addButtonHovered: false
    }

    this.mouseOut = this.mouseOut.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
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

  toggleEditing = () => {
    this.setState({ visible: !this.state.visible })
  }

  mouseOver() {
    this.setState({ addButtonHovered: true })
  }

  mouseOut() {
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
            right: 64,
            bottom: 8,
            height: 48,
            width: this.state.addButtonHovered ? 48 + 8 + 48 : 48
          }}
          onMouseEnter={this.mouseOver}
          onMouseLeave={this.mouseOut}
        >
          {/* {this.state.addButtonHovered && (
            <Button
              style={{
                position: 'fixed',
                right: 120,
                bottom: 8,
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
              right: 64,
              bottom: 8,
              height: 48,
              width: 48,
              padding: 12
            }}
            icon
            // secondary
            swapTheming
            onClick={this.show}
            className='actionButton'
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
              ({ name, description, key, icon, color }, i) => (
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
                  secondaryText={description}
                  key={i}
                />
              )
            )}
          </List>
        </DialogContainer>
      </>
    )
  }
}
