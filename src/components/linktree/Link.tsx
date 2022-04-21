import { FC } from "react"

export const WebLink: FC<{ href: string }> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="rounded-md border border-gray-400 px-8 py-2 text-center transition-colors hover:border-lilac-100 hover:text-lilac-100"
    >
      {children}
    </a>
  )
}
