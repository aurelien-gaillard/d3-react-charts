import { darken } from '@mui/material'

export const theme = {
  palette: {
    d3: {
      backgroundBand: '#fafafa',
      lineBand: 'rgba(221, 221, 221, 0.3)',
      blue: '#00A3FF',
      deepRed: '#960000',
      red: '#FE0000',
      yellow: '#FFF506',
      green: '#00FF00',
      darkGreen: '#367E22',
    },
    info: {
      main: '#2391D0',
      dark: '#0476B7',
      darkText: darken('#2391D0', 0.6),
    },
  },
}
