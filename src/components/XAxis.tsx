import { theme } from '@/utils/theme'
import { ScaleBand } from 'd3'
import React from 'react'

interface Props {
  xScale: ScaleBand<string>
  boundedHeight: number
}
const XAxis = ({ xScale, boundedHeight }: Props) => {
  const range = xScale.range()

  const ticks = xScale
    .domain()
    .map((value) => ({ value, xOffset: xScale(value) }))

  return (
    <g transform={`translate(0, ${boundedHeight})`}>
      {/* Horizontal X axis line */}
      <line x2={range[1]} stroke='currentColor' />

      {ticks.map(({ value, xOffset }, index) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          {index > 0 && (
            <line
              y1={-boundedHeight}
              y2='12'
              stroke={theme.palette.d3.lineBand}
            />
          )}
          <text
            style={{
              fontSize: '12px',
              textAnchor: 'middle',
              transform: `translate(${xScale.step() / 2}px, 20px)`,
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </g>
  )
}

export default XAxis
