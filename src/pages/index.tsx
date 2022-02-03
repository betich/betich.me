import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <h1>Next.js App</h1>
        <p className="text-white font-bold mt-2 text-sm mb-4">
          Generated using{" "}
          <a href="https://github.com/betich/next-boilerplate" target="_blank" rel="noreferrer">
            {"betich's"}
          </a>{" "}
          Next.js boilerplate template
        </p>
      </main>
    </>
  );
};

export default Home;
