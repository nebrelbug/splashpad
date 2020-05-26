import React from 'react'
import { FontIcon } from 'react-md'

export default [
  {
    key: 'title',
    primaryText: 'Splashpad',
    subheader: true
  },
  {
    key: 'about',
    primaryText: 'About',
    leftIcon: <FontIcon>info</FontIcon>,
    active: true
  },
  {
    key: 'help',
    primaryText: 'Help',
    leftIcon: <FontIcon>help</FontIcon>
  },
  {
    key: 'settings',
    primaryText: 'Settings',
    leftIcon: <FontIcon>settings</FontIcon>
  }
]
