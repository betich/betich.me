// import { useEffect, useState } from "react"

// const currentYear = new Date().getFullYear()
// const until = +new Date(currentYear+1, 0, 1)

// const calculateTimeLeft: (time: number) => number = (time) => {
//   const now = +new Date()

//   if (time - now > 0) {
//     return Math.round(((time - now) / time) * 100 * 100)/100
//   } else {
//     return 100
//   }
// }

// export const useYearPercent = () => {
//     const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft(until))

//     useEffect(() => {
//         const timer = setInterval(() => {
//           setTimeLeft(calculateTimeLeft(until))
//         }, 1000)
    
//         return function cleanup() {
//           clearInterval(timer)
//         }
//       }, [])

//     return `${timeLeft}`
// }

const isLeapYear = function(date: Date) {
    var year = date.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};

// Get Day of Year
const getDOY = function(date: Date) {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = date.getMonth();
    var dn = date.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if(mn > 1 && isLeapYear(date)) dayOfYear++;
    return dayOfYear;
};

export const useYearPercent = () => {
    const now = new Date()
    return Math.round((getDOY(now) / (isLeapYear(now) ? 366 : 365)) * 100 * 100) / 100
}