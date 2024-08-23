import { createRoot } from "react-dom/client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import * as Sentry from "@sentry/react"
import React from "react"

import Routes from "Routes/index"
import { queryClient } from "config"

import "react-tippy/dist/tippy.css"
import "assets/styles/index.scss"

const root = createRoot(document.getElementById("root"))
Sentry.init({
  dsn:
    process.env.NODE_ENV !== "development"
      ? "https://c292f255d06f4516ae32a0876c7b44ad@o4504859201699840.ingest.sentry.io/4505153630437376"
      : "",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <Toaster position="top-right" toastOptions={{ duration: 1000 * 2 }} />
  </React.StrictMode>,
)
