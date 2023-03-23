import { Tooltip } from '@mui/material'
import React, { ReactElement, ReactNode } from 'react'

interface Props {
  children: ReactElement
  title: ReactNode
  yPosition: number
}
const ChartTooltip = ({ children, title, yPosition }: Props) => {
  return (
    <Tooltip
      title={title}
      arrow
      placement='top'
      PopperProps={{
        style: { pointerEvents: 'none' },
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -yPosition],
            },
          },
        ],
      }}
    >
      {children}
    </Tooltip>
  )
}

export default ChartTooltip
