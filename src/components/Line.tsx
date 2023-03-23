import React from 'react'

interface Props {
  line: string | null
  color: string
  strokeWidth?: number
}

const Line = ({ line, color, strokeWidth = 2 }: Props) => {
  if (!line) return null
  return <path strokeWidth={strokeWidth} fill='none' stroke={color} d={line} />
}

export default Line
