'use client'
import React, { useMemo, useState } from 'react'
import * as d3 from 'd3'
import { theme } from '@/utils/theme'
import { Box, Button, Tooltip, alpha } from '@mui/material'
import { useChartDimensions } from '@/components/useChartDimensions'
import Chart from '@/components/Chart'
import ChartSvgArea from '@/components/ChartSvgArea'
import Dot from '@/components/Dot'
import XAxis from '@/components/XAxis'
import YAxis from '@/components/YAxis'
import ChartTooltip from '@/components/ChartTooltip'
import Line from '@/components/Line'

const distribution = [0.025, 0.025, 0.135, 0.68, 0.135]

const TestChart = () => {
  const [ref, dms] = useChartDimensions()
  const [hover, setHover] = useState<number | null>(null)

  const [data, setData] = useState([
    { value: 200, label: 'Brown', color: theme.palette.d3.deepRed },
    { value: 50, label: 'Red', color: theme.palette.d3.red },
    { value: 400, label: 'Yellow', color: theme.palette.d3.yellow },
    { value: 800, label: 'Green', color: theme.palette.d3.green },
    { value: 250, label: 'Blue', color: theme.palette.d3.blue },
  ])
  const totalValue = data.reduce((acc, item) => acc + item.value, 0)

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([
          Math.max(
            ...data.map((d) => d.value),
            totalValue * Math.max(...distribution)
          ),
          0,
        ])
        .range([0, dms.boundedHeight])
        .nice(4),
    [data, dms.boundedHeight, totalValue]
  )

  const xScale = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, dms.boundedWidth]),
    [data, dms.boundedWidth]
  )

  const xStep = xScale.step()

  const barLine = d3.line().curve(d3.curveCardinal)([
    [0, yScale(data[0].value)],
    ...(data.map(({ label, value }) => [
      (xScale(label) || 0) + xStep / 2,
      yScale(value) || 0,
    ]) satisfies [number, number][]),
    [dms.boundedWidth, yScale(data[data.length - 1].value)],
  ])

  const distributionLine = d3.line().curve(d3.curveCardinal)([
    ...(data.map(({ label }, index) => [
      (xScale(label) || 0) + xStep / 2,
      yScale(totalValue * distribution[index]),
    ]) satisfies [number, number][]),
  ])

  const barWidth = xStep * 0.5

  const handleGenerateData = () => {
    setData(
      data.map((data) => ({ ...data, value: Math.floor(Math.random() * 1000) }))
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <Button variant='outlined' sx={{ ml: 2 }} onClick={handleGenerateData}>
        Generate random data
      </Button>
      {/* Scale Band  */}
      <Chart ref={ref} height={300} isReady={dms.width > 0}>
        <ChartSvgArea dms={dms}>
          <YAxis yScale={yScale} backgroundBandWidth={dms.boundedWidth} />
          {/* Hover box */}
          {typeof hover === 'number' && (
            <rect
              x={xStep * hover}
              width={xStep}
              height={dms.boundedHeight}
              fill={theme.palette.info.main}
              fillOpacity={0.04}
            />
          )}
          {/* Data colored rectangles */}
          {data.map(({ value, color }, index) => (
            <rect
              key={index}
              x={(index + 0.5) * xStep - barWidth / 2}
              y={yScale(value)}
              width={barWidth}
              height={dms.boundedHeight - yScale(value)}
              rx={2}
              fill={color}
            />
          ))}
          <Line
            line={distributionLine}
            color={alpha(theme.palette.info.main, 0.1)}
            strokeWidth={20}
          />
          <XAxis xScale={xScale} boundedHeight={dms.boundedHeight} />
          <Line line={barLine} color={theme.palette.info.main} />
        </ChartSvgArea>
        {data.map(({ value }, index) => (
          <ChartTooltip key={index} title={value} yPosition={yScale(value)}>
            <Box
              position='absolute'
              top={dms.marginTop}
              left={index * xStep + dms.marginLeft}
              width={xStep}
              height={dms.height - dms.marginTop}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            >
              <Dot
                top={yScale(value)}
                left={xStep / 2}
                isHover={hover === index}
              />
            </Box>
          </ChartTooltip>
        ))}
      </Chart>
    </div>
  )
}

export default TestChart
