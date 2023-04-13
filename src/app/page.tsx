'use client'
import ChartSurface from '@/components/ChartSurface'
import PieChart from '@/features/charts/PieChart'
import TestChart from '@/features/charts/ScaleBandChart'
import ScaleTimeChart from '@/features/charts/ScaleTimeChart'
import ScatterPlot from '@/features/charts/ScatterPlot'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export default function Home() {
  return (
    <main>
      <h1>Charts D3 - React</h1>
      <Typography variant='body1' py={2}>
        D3 for the maths, React for rendering elements
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <ChartSurface>
            <h3>ScaleBand chart (with tooltip)</h3>
            <TestChart />
          </ChartSurface>
        </Grid>
        <Grid xs={12} md={6}>
          <ChartSurface>
            <h3>ScaleTime chart - Area Gradient</h3>
            <ScaleTimeChart />
          </ChartSurface>
        </Grid>
        <Grid xs={12} md={6}>
          <ChartSurface>
            <h3>Scatter Plot chart</h3>
            <ScatterPlot />
          </ChartSurface>
        </Grid>
        <Grid xs={12} md={6}>
          <ChartSurface>
            <h3>Pie Chart (with tooltip)</h3>
            <PieChart />
          </ChartSurface>
        </Grid>
      </Grid>
    </main>
  )
}
