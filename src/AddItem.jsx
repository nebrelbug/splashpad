import React from 'react'
import {
  Button,
  FontIcon,
  DialogContainer,
  List,
  ListItem,
  Subheader,
  Divider,
  Avatar
} from 'react-md'

const InfoIcon = () => <FontIcon>info</FontIcon>

var itemsToAdd = [
  { name: 'Sticky Note', key: 'note', icon: 'note', color: 'amber' },
  { name: 'Searchbar', key: 'search', icon: 'search' },
  { name: 'Clock', key: 'clock', icon: 'schedule' }
]
export default class AddButtons extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      addButtonHovered: false
    }

    this.mouseOut = this.mouseOut.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
  }

  show = () => {
    this.setState({ visible: true })
  }

  hide = () => {
    this.setState({ visible: false })
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
      this.hide()
    }
  }

  render() {
    console.log(this.state.items)
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
          {this.state.addButtonHovered && (
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
              onClick={this.show}
            >
              note_add
            </Button>
          )}
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
          >
            add_circle_outline
          </Button>
        </div>
        <DialogContainer
          id='add-widget-dialog'
          visible={this.state.visible}
          title='Add Widget'
          onHide={this.hide}
        >
          <List className=''>
            {/* <Subheader primaryText='Folders' /> */}
            {itemsToAdd.map(({ name, key, icon, color }) => (
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
              />
            ))}
          </List>
        </DialogContainer>
      </>
    )
  }
}
