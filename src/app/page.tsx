'use client'
import TestChart from '@/features/charts/ScaleBandChart'
import { Box, Typography } from '@mui/material'

export default function Home() {
  return (
    <main style={{ height: '100vh' }}>
      <Box height='100%' display='flex' alignItems='center'>
        <Box width='100%' bgcolor='white' m={2}>
          <Typography p={2} variant='h5'>
            ScaleBand chart (with tooltip)
          </Typography>
          <TestChart />
        </Box>
      </Box>
    </main>
  )
}
