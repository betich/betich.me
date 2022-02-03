import { MetaData } from "@components/common/Meta"
import "@styles/tailwind.css"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetaData />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
