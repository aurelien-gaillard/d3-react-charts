import React from 'react'

interface Props {
  area: string | null
  color: string
}

const Area = ({ area, color }: Props) => {
  if (!area) return null
  return <path fill={color} d={area} />
}

export default Area
