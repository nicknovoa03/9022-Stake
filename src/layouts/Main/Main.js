import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'

const Main = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: 'rgba(0,0,0,.55);', minHeight: '100vh' }} paddingTop={15}>
      <main>{children}</main>
    </Box>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string
}

export default Main
