import React from 'react'
import { ScaleLinear, format } from 'd3'
import { theme } from '@/utils/theme'

interface Props {
  yScale: ScaleLinear<number, number, never>
  backgroundBandWidth: number
}

const YAxis = ({ yScale, backgroundBandWidth }: Props) => {
  const range = yScale.range()
  const numberOfTicks = 4

  const ticks = yScale.ticks(numberOfTicks).map((value) => ({
    value,
    yOffset: yScale(value),
  }))

  const backgroundBandHeight = ticks[1]?.yOffset

  return (
    <g>
      {ticks.map(({ value, yOffset }, index) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          {backgroundBandWidth && index < ticks.length - 1 && (
            <rect
              width={backgroundBandWidth}
              height={backgroundBandHeight}
              fill={index % 2 ? theme.palette.d3.backgroundBand : '#fff'}
            />
          )}
          {/* Ticks */}
          <line x1='-11' stroke='currentColor' />
          <text
            key={value}
            style={{
              fontSize: '12px',
              textAnchor: 'end',
              transform: `translate(-16px, 3px)`,
            }}
          >
            {value}
          </text>
        </g>
      ))}
      {/* Vertical line */}
      <line y2={range[1] + 12} stroke='currentColor' />
    </g>
  )
}

export default YAxis
