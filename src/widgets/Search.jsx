import React from 'react'
import { Paper, TextField, FontIcon } from 'react-md'

const Simple = () => (
  <div
    style={{
      padding: '6px',
      position: 'absolute',
      display: 'table',
      width: '100%',
      height: '100%'
    }}
  >
    <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
      <Paper
        zDepth={2}
        className='papers__example'
        style={{ padding: '6px', backgroundColor: 'white' }}
      >
        <TextField
          id='phone-number-with-icon-left'
          //   label='Phone'
          type='search'
          placeholder
          leftIcon={<FontIcon>search</FontIcon>}
          size={10}
          //   fullWidth={false}
        />
      </Paper>
    </div>
  </div>
)

export default Simple
