import { theme } from '@/utils/theme'
import { Box } from '@mui/material'
import React from 'react'

export const dotRadius = 6

interface Props {
  top: number
  left: number
  isHover?: boolean
}

const Dot = ({ top, left, isHover = false }: Props) => {
  return (
    <Box
      position='absolute'
      width={dotRadius * 2}
      height={dotRadius * 2}
      top={top - dotRadius}
      left={left - dotRadius}
      borderRadius='50%'
      bgcolor={isHover ? '#fff' : theme.palette.info.darkText}
      border={`2px solid ${isHover ? theme.palette.info.dark : '#fff'}`}
    />
  )
}

export default Dot
