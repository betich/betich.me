import { CountDown } from "@components/common/Countdown";
import { useYearPercent } from "@utils/useYearPercent";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const percentLeft = useYearPercent()

  return (
    <>
      <main className="bg-gray-900 text-white font-mono w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">betich</h1>
        <div className="flex flex-col space-y-2 my-4 items-center justify-center">
          <p className="text-lg sm:text-sm">
            countdown &apos;til ent
          </p>
          {/* <p>{percentLeft}/100%</p> */}
        </div>
        <CountDown />
      </main>
    </>
  );
};

export default Home;
