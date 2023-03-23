import React, { forwardRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  height: number
  isReady?: boolean
}
type Ref = HTMLDivElement

const Chart = forwardRef<Ref, Props>(
  ({ children, height, isReady = true }, ref) => (
    <div
      ref={ref}
      style={{
        backgroundColor: 'white',
        height: `${height}px`,
        position: 'relative',
      }}
    >
      {isReady && children}
    </div>
  )
)

Chart.displayName = 'Chart'
export default Chart
