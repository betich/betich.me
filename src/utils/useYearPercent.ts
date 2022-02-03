import { useEffect, useState } from "react"

const currentYear = new Date().getFullYear()
const until = +new Date(currentYear+1, 0, 1)

const calculateTimeLeft: (time: number) => number = (time) => {
    const now = +new Date()
  const difference = time - now

  if (difference > 0) {
    return Math.round((100-(difference * 100 ) / now) * 100)/100
  } else {
    return 100
  }
}

export const useYearPercent = () => {
    const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft(until))

    useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft(until))
        }, 1000)
    
        return function cleanup() {
          clearInterval(timer)
        }
      }, [])

    return `${timeLeft}`
}