import React, { ReactNode } from 'react'
import { Grid, Box } from '@mui/material'
import { MainButton, PoolSelectionButton } from '../../../AmbassadorPool1/components/form/formElements'

interface PoolSelectionButtonProps {
  href: string
  poolName: string
  size: number
}

const PoolSelectionBox: React.FC<PoolSelectionButtonProps> = ({ href, poolName, size }) => {
  return (
    <Grid item lg={size}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,.4);',
          borderRadius: 3,
        }}
      >
        <PoolSelectionButton href={href}>{poolName}</PoolSelectionButton>
      </Box>
    </Grid>
  )
}

export default PoolSelectionBox
