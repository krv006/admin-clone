import { QueryClient } from "@tanstack/react-query"

export const defaultApiRoute = "advertiser"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export const globalState = {
  language: "en",
  user: null,
  isAuth: !!localStorage.getItem("token"),
}

export const freeDeliveryStartsFrom = 30000

export const defaultMeta = {
  currentPage: 1,
  pageCount: 1,
  perPage: 1,
  totalCount: 1,
}
