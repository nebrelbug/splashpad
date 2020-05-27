import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Button, Card, CardActions, CardTitle, Media } from 'react-md'

function getLang() {
  if (navigator.languages !== undefined) {
    return navigator.languages[0]
  } else {
    return navigator.language
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

class UploadedFileCard extends PureComponent {
  static propTypes = {
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      lastModified: PropTypes.instanceOf(Date).isRequired,
      data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(ArrayBuffer)
      ]).isRequired
    }).isRequired,
    onRemoveClick: PropTypes.func.isRequired
  }

  state = {
    aspectRatio: undefined
  }

  gcd = (a, b) => {
    if (b === 0) {
      return a
    }

    return this.gcd(b, a % b)
  }

  findClosestAspectRatio = (e) => {
    const { naturalHeight: h, naturalWidth: w } = e.target
    const denominator = this.gcd(w, h)
    const x = w / denominator
    const y = h / denominator

    // if (x < y) {
    //   this.setState({ aspectRatio: '1-1' })
    // }

    // this.setState({ aspectRatio: '1-1' })
  }

  removeCard = () => {
    this.props.onRemoveClick(this.props.file)
  }

  render() {
    const { aspectRatio } = this.state
    const { name, size, lastModified, data, type } = this.props.file

    return (
      <Card className={cn('file-inputs__upload-card')}>
        {/* <Media aspectRatio={'16-9'}> */}
        <img src={data} alt={name} onLoad={this.findClosestAspectRatio} />
        {/* </Media> */}
        <CardTitle
          title={`${name} ${type ? `(${type})` : ''}`}
          subtitle={`Last Modified: ${Intl.DateTimeFormat(
            getLang() - 'US'
          ).format(lastModified)}. Size: (${formatBytes(size)})`}
        />
        <CardActions centered>
          <Button flat secondary onClick={this.removeCard}>
            Remove Image
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default UploadedFileCard
