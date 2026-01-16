"use client"

import * as React from "react"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import theme from "./theme"

export default function Providers({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo(
    () => createCache({ key: "mui", prepend: true }),
    []
  )

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {mounted && <CssBaseline />}
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
} 