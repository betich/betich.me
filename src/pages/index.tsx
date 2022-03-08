import { CountDown } from "@components/common/Countdown"
import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 font-mono text-white">
        <h1 className="2xl:text-6xl mb-4 text-4xl font-semibold">betich</h1>
        <CountDown />
        <div className="2xl:text-4xl mt-4 text-lg sm:text-sm">
          <p>until tcas3</p>
        </div>
      </main>
    </>
  )
}

export default Home
