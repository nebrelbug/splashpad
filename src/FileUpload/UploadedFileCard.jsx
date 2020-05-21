import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Button, Card, CardTitle, FontIcon, Media } from 'react-md'

// import Markdown from 'components/Markdown'

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
    onRemoveClick: PropTypes.func.isRequired,
    locale: PropTypes.string
  }

  state = {
    image: false,
    video: false,
    language: null,
    aspectRatio: undefined
  }

  componentWillMount() {
    this.determineFileType()
    this.formatter = Intl.DateTimeFormat(this.props.locale)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.formatter = Intl.DateTimeFormat(nextProps.locale)
    }

    if (this.props.file !== nextProps.file) {
      this.determineFileType(nextProps)
    }
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

    if (x < y) {
      this.setState({ aspectRatio: '1-1' })
    }
  }

  determineFileType = (props = this.props) => {
    const { type } = props.file
    let image = false
    let video = false
    let language = null
    if (type.match(/image/)) {
      image = true
    }

    this.setState({ image, video, language })
  }

  removeCard = () => {
    this.props.onRemoveClick(this.props.file)
  }

  render() {
    const { image, language, aspectRatio } = this.state
    const { name, size, lastModified, data, type } = this.props.file

    let content
    if (image) {
      content = (
        <img src={data} alt={name} onLoad={this.findClosestAspectRatio} />
      )
    } else {
      content = <p>ERROR!!! </p>
    }

    if (language === null) {
      content = <Media aspectRatio={aspectRatio}>{content}</Media>
    }

    return (
      <Card className={cn('file-inputs__upload-card')}>
        <Button
          icon
          onClick={this.removeCard}
          className='file-inputs__upload-card__remove'
        >
          close
        </Button>
        {content}
        <CardTitle
          title={`${name} ${type ? `(${type})` : ''}`}
          subtitle={`Last Modified: ${this.formatter.format(
            lastModified
          )}. Size: (${formatBytes(size)})`}
        />
      </Card>
    )
  }
}

export default UploadedFileCard
