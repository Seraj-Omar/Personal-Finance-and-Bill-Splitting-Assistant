"use client"

import * as React from "react"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import theme from "./theme"

function createEmotionCache() {
  return createCache({ key: "mui", prepend: true })
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => createEmotionCache())

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
