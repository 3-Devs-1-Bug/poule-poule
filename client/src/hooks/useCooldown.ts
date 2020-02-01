import { useState, useEffect } from 'react'

const useCooldown = (delayMs: number): [boolean, () => void] => {
  const [isCoolingDown, setIsCoolingDown] = useState(false)
  useEffect(() => {
    if (isCoolingDown) {
      setTimeout(() => {
        setIsCoolingDown(false)
      }, delayMs)
    }
  }, [isCoolingDown, delayMs])

  return [isCoolingDown, () => setIsCoolingDown(true)]
}

export default useCooldown
