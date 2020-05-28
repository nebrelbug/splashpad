import React from 'react'

import Clock from './Clock'
import Embed from './Embed'
import Music from './Music'
import Note from './Note'
import Search from './Search'
import Text from './Text'

function Blank({ editingGrid }) {
  return (
    <div style={{ padding: '6px', fontSize: '12px', textAlign: 'center' }}>
      {editingGrid && <p style={{ lineHeight: 1 }}>Place&shy;holder</p>}
    </div>
  )
}

function Unknown() {
  return (
    <div style={{ padding: '6px', fontSize: '14px', textAlign: 'center' }}>
      <p>Uh-oh. Unknown widget type</p>
    </div>
  )
}

var widgets = {
  note: {
    name: 'Sticky Note',
    subheading: '',
    description: <p>This sticky note widget stores its content locally</p>,
    component: Note,
    icon: 'note',
    color: 'amber',
    gridSettings: {
      minH: 2,
      w: 3,
      h: 4
    }
  },
  search: {
    name: 'Searchbar',
    subheading: '',
    component: Search,
    icon: 'search',
    settingsComponent: true,
    gridSettings: {
      minH: 2,
      minW: 2,
      w: 4
    }
  },
  clock: {
    name: 'Clock',
    subheading: '',
    component: Clock,
    icon: 'schedule',
    settingsComponent: true
  },
  text: {
    name: 'Text',
    subheading: 'Double-click to edit',
    component: Text,
    icon: 'text_fields',
    settingsComponent: true
  },
  blank: {
    name: 'Blank Widget',
    subheading: 'For spacing',
    component: Blank,
    icon: ''
  },
  music: {
    name: 'Music',
    subheading: 'Embed playlists or tracks',
    description: (
      <p>Currently this only supports Spotify playlists, albums, and tracks.</p>
    ),
    component: Music,
    icon: 'music_note',
    settingsComponent: true
  },
  embed: {
    name: 'Embed',
    subheading: '',
    component: Embed,
    icon: 'code',
    settingsComponent: true
  }
}

var fallbackWidget = {
  name: 'Unknown Widget',
  component: Unknown,
  icon: 'check_box_outline_blank'
}

export { fallbackWidget }
export default widgets
