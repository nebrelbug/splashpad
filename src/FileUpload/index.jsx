import React, { PureComponent } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Button, FileUpload } from 'react-md'
import guid from 'uuid/dist/v1'
import { without } from 'lodash/array'

import './_styles.scss'
import UploadProgress from './UploadProgress'
import UploadedFileCard from './UploadedFileCard'

const LOADING_PROPS = {
  'aria-busy': true,
  'aria-describedby': 'file-upload-progress'
}

export default class SimpleFileUpload extends PureComponent {
  constructor(props) {
    super(props)
    console.log('props.initialImage')
    console.log(props.initialImage)
    this.state = {
      progress: null,
      file: props.initialImage,
      showButton: true
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  setFileUpload = (fileUpload) => {
    this.fileUpload = fileUpload
  }

  setFile = (file) => {
    this.setState({ file })
  }

  abortUpload = () => {
    if (this.fileUpload) {
      this.fileUpload.abort()
    }

    this.setState({ file: null, progress: null, showButton: true })
  }

  /**
   * This is triggered once a file has been successfully uploaded.
   *
   * @param {File} uploadedFile - the fully uploaded file. The properties
   *    of this object change depending on the browser, but normally
   *    the name, size, type, and lastModifiedDate are the same.
   * @param {String} uploadedData - This will be whatever the results of
   *    the upload was. So this could be the text in a file, a data-url
   *    for an image, or some other content for other file types.
   */
  handleLoad = (uploadedFile, uploadedData) => {
    const { name, size, type, lastModified } = uploadedFile
    const file = {
      id: guid(),
      name,
      size,
      type,
      data: uploadedData,
      lastModified: new Date(lastModified)
    }

    this.props.onLoadImage(file)
    // Show progress bar for one more second
    this.timeout = setTimeout(() => {
      this.timeout = null

      this.setState({ progress: null })
    }, 1000)

    this.setState({ file, progress: 100, showButton: false })
  }

  handleProgress = (file, progress) => {
    // The progress event can sometimes happen once more after the abort
    // has been called. So this just a sanity check
    if (this.state.file) {
      this.setState({ progress })
    }
  }

  removeFile = (file) => {
    this.setState({ file: null, showButton: true })
    this.props.removeImage()
  }

  render() {
    const { progress, file } = this.state

    const uploadedFileCard = file && (
      <UploadedFileCard
        key={file.id}
        file={file}
        onRemoveClick={this.removeFile}
      />
    )

    return (
      <div>
        <UploadProgress
          progress={progress}
          onAbortClick={this.abortUpload}
          file={file}
        />

        <CSSTransitionGroup
          component='section'
          transitionName='md-cross-fade'
          transitionEnterTimeout={300}
          transitionLeave={false}
          //   className='md-grid'
          {...(typeof progress === 'number' ? LOADING_PROPS : undefined)}
        >
          {uploadedFileCard}
        </CSSTransitionGroup>
        {
          <FileUpload
            accept='image/*'
            id='background-image-upload'
            secondary
            name='background-image-upload'
            ref={this.setFileUpload}
            label={this.state.file ? 'Upload New Image' : 'Upload Image'}
            onLoadStart={this.setFile}
            onProgress={this.handleProgress}
            onLoad={this.handleLoad}
          />
        }
      </div>
    )
  }
}
