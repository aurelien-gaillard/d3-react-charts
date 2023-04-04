import { theme } from '@/utils/theme'
import { ScaleTime } from 'd3'
import { format } from 'date-fns'
import React from 'react'

interface Props {
  xScale: ScaleTime<number, number, never>
  boundedHeight: number
}
const XAxisTime = ({ xScale, boundedHeight }: Props) => {
  const range = xScale.range()

  const ticks = xScale.ticks(20).map((value) => ({
    value: format(value, 'LLL dd'),
    xOffset: xScale(value),
  }))

  return (
    <g transform={`translate(0, ${boundedHeight})`}>
      {/* Horizontal X axis line */}
      <line x2={range[1]} stroke='currentColor' />

      {ticks.map(({ value, xOffset }, index) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          {index > 0 && <line y2={12} stroke='currentColor' />}
          {index > 0 && (
            <line y1={-boundedHeight} stroke={theme.palette.d3.lineBand} />
          )}
          <text
            style={{
              fontSize: '12px',
              textAnchor: 'end',
              transform: 'translate(0px,20px) rotate(-45deg)',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </g>
  )
}

export default XAxisTime
