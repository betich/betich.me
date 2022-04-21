import { motion, Variants } from "framer-motion"
import { useRouter } from "next/router"
import { FC } from "react"

const variants: Variants = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const PageContainer: FC = ({ children, ...props }) => {
  const router = useRouter()

  return (
    <motion.div
      className="font-mono"
      initial="initial"
      animate="animate"
      variants={variants}
      key={router.pathname}
      {...props}
    >
      {children}
    </motion.div>
  )
}
