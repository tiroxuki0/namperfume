import { useState, useEffect } from 'react'

interface Dimensions {
  width: number
  height: number
}

export const useWindowSize = (): Dimensions => {
  const hasWindow = typeof window !== 'undefined'

  const getWindowDimensions = (): Dimensions => {
    const width = hasWindow ? window.innerWidth : 0
    const height = hasWindow ? window.innerHeight : 0
    return {
      width,
      height,
    }
  }

  const [windowDimensions, setWindowDimensions] = useState<Dimensions>(getWindowDimensions())

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => setWindowDimensions(getWindowDimensions())
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }

    return () => {}
  }, [hasWindow])

  return {
    width: windowDimensions?.width === null ? 0 : (windowDimensions.width ?? 0),
    height: windowDimensions?.height === null ? 0 : (windowDimensions.height ?? 0),
  }
}
