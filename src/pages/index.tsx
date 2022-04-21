import type { NextPage } from "next"
import { motion } from "framer-motion"
import { WebLink } from "@components/linktree/Link"
import { useEffect, useState } from "react"
import Image from "next/image"

const Home: NextPage = () => {
  const [meowHover, setHover] = useState(false)

  return (
    <motion.main
      variants={{
        initial: { backgroundColor: "#181818", color: "#fff", transition: { duration: 0.2 } },
        meow: { backgroundColor: "#fefefe", color: "#333", transition: { duration: 0.2 } },
      }}
      animate={meowHover ? "meow" : "initial"}
      className="relative font-display"
    >
      <motion.section
        key="main"
        className="relative z-10 flex min-h-screen w-full flex-col items-start justify-center px-12 sm:items-center"
        initial="initial"
        animate="animate"
        variants={{
          initial: { y: 80, opacity: 0 },
          animate: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.7,
              ease: [0.6, -0.05, 0.01, 0.99],
            },
          },
        }}
      >
        <h1 className="mb-4 flex flex-col space-y-4 text-4xl font-semibold sm:flex-row sm:items-end sm:space-y-0 sm:space-x-4">
          <span>hey, i&quot;m</span>{" "}
          <span className="text-5xl text-lilac-400">
            betich{" "}
            <span onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
              🐱
            </span>
          </span>
        </h1>

        <p className="mt-4 text-xl text-gray-400 sm:text-lg">feel free to check out all my links below!</p>

        <div className="mt-8 flex w-full flex-col flex-wrap gap-4 text-lg text-gray-400 sm:flex-row sm:justify-center sm:text-base">
          <WebLink href="https://www.github.com/betich/">GitHub</WebLink>
          <WebLink href="https://www.instagram.com/ttthhheeeeeeeee/">Instagram</WebLink>
          <WebLink href="https://tcas.betich.me">TCAS Schedule Generator</WebLink>
          <WebLink href="https://tucm.cc/u/thee">My TUCMC LinkTree</WebLink>
        </div>
      </motion.section>

      <motion.section
        className="fixed left-1/2 bottom-[10px] -translate-x-1/2"
        variants={{
          initial: {
            opacity: 0,
            x: "-50%",
            y: 500,
          },
          meow: {
            opacity: 1,
            x: "-50%",
            y: 0,
            transition: {
              duration: 0.5,
            },
          },
        }}
        animate={meowHover ? "meow" : "initial"}
        key="bongo"
      >
        <Image src="/assets/bongo-cat-transparent.gif" width={280} height={120} layout="fixed" alt="bongo cat" />
      </motion.section>
    </motion.main>
  )
}

export default Home
