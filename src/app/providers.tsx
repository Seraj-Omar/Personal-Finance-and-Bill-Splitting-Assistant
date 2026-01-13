"use client"

import { ThemeProvider, CssBaseline } from "@mui/material"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import theme from "./theme"

const cache = createCache({
  key: "css",
  prepend: true,
})

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
