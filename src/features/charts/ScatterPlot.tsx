import React, { useMemo, useState } from 'react'
import * as d3 from 'd3'
import Chart from '@/components/Chart'
import ChartSvgArea from '@/components/ChartSvgArea'
import YAxis from '@/components/YAxis'
import { useChartDimensions } from '@/components/useChartDimensions'
import XAxisLinear from '@/components/XAxisLinear'
import { theme } from '@/utils/theme'
import { Button } from '@mui/material'

const dataGenerator = () =>
  Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

const ScatterPlot = () => {
  const [ref, dms] = useChartDimensions()

  const [data, setData] = useState(dataGenerator())

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([Math.max(...data.map((d) => d.y)), 0])
        .range([0, dms.boundedHeight])
        .nice(4),
    [data, dms.boundedHeight]
  )

  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, Math.max(...data.map((d) => d.x))])
        .range([0, dms.boundedWidth])
        .nice(4),
    [data, dms.boundedWidth]
  )

  const handleGenerateData = () => {
    setData(dataGenerator())
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

      <Chart ref={ref} height={300}>
        <ChartSvgArea dms={dms}>
          <YAxis yScale={yScale} backgroundBandWidth={dms.boundedWidth} />
          <XAxisLinear xScale={xScale} boundedHeight={dms.boundedHeight} />
          {data.map((d, index) => (
            <circle
              key={index}
              cx={xScale(d.x)}
              cy={yScale(d.y)}
              r={6}
              strokeWidth={3}
              stroke={theme.palette.d3.blue}
              fill={theme.palette.d3.green}
            />
          ))}
        </ChartSvgArea>
      </Chart>
    </>
  )
}

export default ScatterPlot
