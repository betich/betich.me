import { motion } from 'framer-motion'

const animationState = {
  initial: {
    scale: 1,
    rotate: 0,
    borderRadius: "20%",
    boxShadow: "0px 0px 0px 0px",
  },
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, 360, 0],
    borderRadius: ["20%", "50%", "20%"],
    boxShadow: ["0px 0px 0px 0px", "0px 0px 20px 10px", "0px 0px"],
  },
}

export default function Profile() {
  return (
    <motion.img
     initial={animationState.initial}
     animate={animationState.animate}
     whileHover={animationState.animate}
     src="/images/doll.jpg" alt="Thee" className="mt-4 w-full rounded-lg border-[0.5px] border-white" />
  )
}