import React from 'react'
import { ScaleLinear } from 'd3'
import { theme } from '@/utils/theme'

interface Props {
  boundedHeight: number
  xScale: ScaleLinear<number, number, never>
}
const XAxisLinear = ({ xScale, boundedHeight }: Props) => {
  return (
    <g transform={`translate(0, ${boundedHeight})`}>
      <line x2={xScale.range()[1]} stroke='currentColor' />
      {xScale.ticks(20).map((tick) => (
        <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
          {tick > 0 && <line y2='12' stroke={'currentColor'} />}
          {tick > 0 && (
            <line y1={-boundedHeight} stroke={theme.palette.d3.lineBand} />
          )}
          <text
            style={{
              fontSize: '12px',
              textAnchor: 'middle',
              transform: `translate(0, 24px)`,
            }}
          >
            {tick}
          </text>
        </g>
      ))}
    </g>
  )
}

export default XAxisLinear
