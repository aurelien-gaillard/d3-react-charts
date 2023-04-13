import React, { useMemo, useState } from 'react'
import * as d3 from 'd3'
import { useChartDimensions } from '@/components/useChartDimensions'
import Chart from '@/components/Chart'
import ChartSvgArea from '@/components/ChartSvgArea'
import { addDays, startOfToday } from 'date-fns'
import YAxis from '@/components/YAxis'
import XAxisTime from '@/components/XAxisTime'
import Line from '@/components/Line'
import { theme } from '@/utils/theme'
import { Button } from '@mui/material'
import Area from '@/components/Area'

const dataGenerator = () =>
  Array.from({ length: 21 }, (v, i) => ({
    date: addDays(startOfToday(), i),
    value: 350 + Math.random() * 200,
  }))

const ScaleTimeChart = () => {
  const [ref, dms] = useChartDimensions()

  const [data, setData] = useState(dataGenerator())

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([Math.max(...data.map((d) => d.value)), 0])
        .range([0, dms.boundedHeight])
        .nice(4),
    [data, dms.boundedHeight]
  )

  const xDomain = useMemo(
    () => [startOfToday(), addDays(startOfToday(), 20)],
    []
  )

  const xScale = useMemo(
    () => d3.scaleTime().domain(xDomain).range([0, dms.boundedWidth]),
    [dms.boundedWidth, xDomain]
  )

  const line = d3
    .line<{ date: Date; value: number }>()
    .curve(d3.curveCardinal)
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))(data)

  const area = d3
    .area<{ date: Date; value: number }>()
    .curve(d3.curveCardinal)
    .x((d) => xScale(d.date))
    .y1((d) => yScale(d.value))
    .y0(yScale(0))(data)

  const handleGenerateData = () => {
    setData(dataGenerator())
  }

  return (
    <div>
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
          {/* Here is defined the gradient used for the area */}
          <defs>
            <linearGradient id='Gradient1' x1='0' x2='0' y1='0' y2='1'>
              <stop
                offset='0%'
                stopColor={theme.palette.info.main}
                stopOpacity='0.5'
              />
              <stop
                offset='100%'
                stopColor={theme.palette.info.main}
                stopOpacity='0'
              />
            </linearGradient>
          </defs>
          <YAxis yScale={yScale} backgroundBandWidth={dms.boundedWidth} />
          <XAxisTime xScale={xScale} boundedHeight={dms.boundedHeight} />
          <Area area={area} color='url(#Gradient1)' />
          <Line line={line} color={theme.palette.info.main} />
        </ChartSvgArea>
      </Chart>
    </div>
  )
}

export default ScaleTimeChart
