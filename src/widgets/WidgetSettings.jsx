import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { DialogContainer } from 'react-md'

// Taken from https://codepen.io/gaearon/pen/yzMaBd?editors=1010

class Portal extends Component {
  constructor(props) {
    super(props)
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div')
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    document.getElementById('dialog-container').appendChild(this.el)
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    document.getElementById('dialog-container').removeChild(this.el)
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el
    )
  }
}

export default class WidgetSettings extends Component {
  render = () => {
    return (
      this.props.visible && (
        <Portal>
          <DialogContainer
            id='widget-settings-dialog'
            visible={this.props.visible}
            title='Widget Settings'
            onHide={this.props.onHide}
            disableScrollLocking={true}
            transitionEnterTimeout={50}
            transitionLeaveTimeout={50}
          >
            {this.props.children}
          </DialogContainer>
        </Portal>
      )
    )
  }
}
