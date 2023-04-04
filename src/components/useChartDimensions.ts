// https://wattenberger.com/blog/react-and-d3 for understanding

import { RefObject, useEffect, useRef, useState } from 'react'

export interface Dimensions {
  marginBottom: number
  marginTop: number
  marginLeft: number
  marginRight: number
  width: number
  height: number
  boundedHeight: number
  boundedWidth: number
}

export const useChartDimensions = (
  { marginTop = 22, marginRight = 10, marginBottom = 50, marginLeft = 75 } = {
    marginTop: 22,
    marginRight: 10,
    marginBottom: 50,
    marginLeft: 75,
  }
): [RefObject<HTMLDivElement>, Dimensions] => {
  const ref = useRef<HTMLDivElement>(null)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setWidth(width)
      setHeight(height)
    })
    const currentRef = ref.current

    if (currentRef) {
      resizeObserver.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef)
      }
    }
  }, [])

  const newSettings = {
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    width,
    height,
    boundedHeight: Math.max(height - marginTop - marginBottom, 0),
    boundedWidth: Math.max(width - marginLeft - marginRight, 0),
  }

  return [ref, newSettings]
}
