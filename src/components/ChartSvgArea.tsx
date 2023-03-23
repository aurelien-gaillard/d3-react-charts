import React, { ReactNode } from 'react'
import { theme } from '@/utils/theme'
import { Dimensions } from './useChartDimensions'

interface Props {
  dms: Dimensions
  children: ReactNode
}
const ChartSvgArea = ({ dms, children }: Props) => {
  return (
    <svg width={dms.width} height={dms.height}>
      <g transform={`translate(${dms.marginLeft},${dms.marginTop})`}>
        <line x2={dms.boundedWidth} stroke={theme.palette.d3.lineBand} />
        <line
          x1={dms.boundedWidth}
          x2={dms.boundedWidth}
          y2={dms.boundedHeight}
          stroke={theme.palette.d3.lineBand}
        />
        {children}
      </g>
    </svg>
  )
}

export default ChartSvgArea
