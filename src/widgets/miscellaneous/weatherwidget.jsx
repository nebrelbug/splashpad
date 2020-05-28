import React, { Component, useEffect } from 'react'
// import { TextField } from 'react-md'
import {
  getWidgetContent,
  saveWidgetContent
} from '../../browser-storage/widget-content'

import './embed.css'

export default function Weather(props) {
  useEffect(() => {
    const script = document.createElement('script')

    script.innerHTML = `!function(d, id) {
      var js, fjs = d.getElementsByTagName('script')[0];
      if (!d.getElementById(id)) {
          js = d.createElement('script');
          js.id = id;
          js.src = 'https://weatherwidget.io/js/widget.min.js';
          fjs.parentNode.insertBefore(js, fjs);
      }
  }(document, 'weatherwidget-io-js');`
    // script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div style={{ padding: '6px', height: '100%' }}>
      <a
        class='weatherwidget-io'
        href='https://forecast7.com/en/40d30n111d68/84097/?unit=us'
        style={{ maxHeight: '100%' }}
        data-label_1='OREM'
        data-label_2='WEATHER'
        data-days='3'
        data-theme='pure'
      >
        OREM WEATHER
        <iframe
          id='weatherwidget-io-0'
          class='weatherwidget-io-frame'
          title='Weather Widget'
          scrolling='no'
          frameborder='0'
          width='100%'
          src='https://weatherwidget.io/w/'
          style={{
            display: 'block',
            position: 'absolute',
            top: '0px',
            height: '207px'
          }}
        />
      </a>
    </div>
  )
}
