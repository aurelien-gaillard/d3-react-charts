import React, { useState } from 'react'
import { Box, Button, Tooltip } from '@mui/material'
import * as d3 from 'd3'
import { PieArcDatum } from 'd3'
import { theme } from '@/utils/theme'

interface PieData {
  value: number
  color: string
}

const PieChart = () => {
  const [data, setData] = useState([
    {
      value: 50,
      color: theme.palette.d3.darkGreen,
    },
    {
      value: 60,
      color: theme.palette.d3.blue,
    },
    {
      value: 90,
      color: theme.palette.d3.deepRed,
    },
  ])

  const height = 268
  const total = data.reduce((acc, item) => acc + item.value, 0)
  const arcs = d3.pie<PieData>().value((d) => d.value)(data)

  const arcsData = arcs.map((arc) => {
    const arcObj = d3
      .arc<PieArcDatum<PieData>>()
      .innerRadius(0)
      .outerRadius(height / 2)
      .startAngle(arc.startAngle)
      .endAngle(arc.endAngle)

    return {
      path: arcObj(arc),
      data: arc.data,
      center: arcObj.innerRadius(height / 8).centroid(arc),
    }
  })

  const handleGenerateData = () => {
    setData([
      {
        value: Math.ceil(Math.random() * 100),
        color: theme.palette.d3.darkGreen,
      },
      {
        value: Math.ceil(Math.random() * 100),
        color: theme.palette.d3.blue,
      },
      {
        value: Math.ceil(Math.random() * 100),
        color: theme.palette.d3.deepRed,
      },
    ])
  }

  return (
    <>
      <Button
        variant='outlined'
        sx={{ mt: 2 }}
        size='small'
        onClick={handleGenerateData}
      >
        Generate random data
      </Button>
      <Box display='flex' justifyContent='center' py={2}>
        <svg width={height} height={height}>
          <g transform={`translate(${height / 2},${height / 2})`}>
            {arcsData.map((arc, index) => (
              <Tooltip
                key={index}
                title={`value: ${arc.data.value}`}
                followCursor
                enterDelay={600}
              >
                <path
                  d={arc.path ?? ''}
                  fill={arc.data.color}
                  strokeWidth={3}
                  stroke='#fff'
                  strokeLinejoin='round'
                />
              </Tooltip>
            ))}
            {arcsData.map((arc, index) => {
              const percentage = Math.round((arc.data.value / total) * 100)
              return (
                <text
                  key={index}
                  fill='#fff'
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: 0.44,
                    textAnchor: 'middle',
                    transform: `translate(${arc.center[0]}px, ${arc.center[1]}px)`,
                    pointerEvents: 'none',
                  }}
                >
                  {percentage > 6 ? `${percentage}%` : ''}
                </text>
              )
            })}
          </g>
        </svg>
      </Box>
    </>
  )
}

export default PieChart
