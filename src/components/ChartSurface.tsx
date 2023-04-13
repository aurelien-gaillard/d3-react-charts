import { Paper } from '@mui/material'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const ChartSurface = ({ children }: Props) => {
  return (
    <Paper
      sx={{
        borderRadius: '8px',
        p: 2,
        boxShadow: 'rgba(221, 229, 244, 0.8) 0px 4px 12px',
      }}
    >
      {children}
    </Paper>
  )
}

export default ChartSurface
