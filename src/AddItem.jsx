import React from 'react'
import { Button } from 'react-md'

export default class AddButtons extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hovered: false
    }

    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
  }

  mouseOver() {
    this.setState({ hovered: true })
  }

  mouseOut() {
    this.setState({ hovered: false })
  }

  render() {
    console.log(this.state.items)
    return (
      <div
        style={{
          position: 'fixed',
          right: 64,
          bottom: 8,
          height: this.state.hovered ? 168 : 48,
          width: 48
        }}
        onMouseEnter={this.mouseOver}
        onMouseLeave={this.mouseOut}
      >
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
        >
          add_circle_outline
        </Button>
        {this.state.hovered && (
          <>
            <Button
              style={{
                position: 'fixed',
                right: 64,
                bottom: 64,
                height: 48,
                width: 48,
                padding: 12
              }}
              icon
              primary
              swapTheming
              onClick={() => {
                this.props.onAddItem('note')
              }}
            >
              note
            </Button>
            <Button
              style={{
                position: 'fixed',
                right: 64,
                bottom: 120,
                height: 48,
                width: 48,
                padding: 12
              }}
              icon
              primary
              swapTheming
              onClick={() => {
                this.props.onAddItem('clock')
              }}
            >
              schedule
            </Button>
            <Button
              style={{
                position: 'fixed',
                right: 64,
                bottom: 176,
                height: 48,
                width: 48,
                padding: 12
              }}
              icon
              primary
              swapTheming
              onClick={() => {
                this.props.onAddItem('search')
              }}
            >
              more_horizontal
            </Button>
          </>
        )}
      </div>
    )
  }
}
