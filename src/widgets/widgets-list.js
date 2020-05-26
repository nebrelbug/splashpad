import React from 'react'

import Clock from './Clock'
import Note from './Note'
import Search from './Search'
import Text from './Text'

function Blank({ editingGrid }) {
  return (
    <div style={{ padding: '6px', fontSize: '12px' }}>
      {editingGrid && <p style={{ lineHeight: 1 }}>Place&shy;holder</p>}
    </div>
  )
}

function Unknown() {
  return (
    <div style={{ padding: '6px', fontSize: '14px' }}>
      <p>Uh-oh. Unknown widget type</p>
    </div>
  )
}

var widgets = {
  note: {
    name: 'Sticky Note',
    description: '',
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
    description: '',
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
    description: '',
    component: Clock,
    icon: 'schedule',
    settingsComponent: true
  },
  text: {
    name: 'Text',
    description: 'Double-click to edit',
    component: Text,
    icon: 'text_fields',
    settingsComponent: true
  },
  blank: {
    name: 'Blank Widget',
    description: 'For spacing',
    component: Blank,
    icon: 'check_box_outline_blank'
  }
}

var fallbackWidget = {
  name: 'Unknown Widget',
  component: Unknown,
  icon: 'check_box_outline_blank'
}

export { fallbackWidget }
export default widgets
