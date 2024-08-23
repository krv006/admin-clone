const { lazy } = require("react")

const lazyRetry = (componentImport) =>
  new Promise((resolve, reject) => {
    // check if the window has already been refreshed
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem("retry-lazy-refreshed") || "false",
    )
    // try to import the component
    componentImport()
      .then((component) => {
        window.sessionStorage.setItem("retry-lazy-refreshed", "false") // success so reset the refresh
        resolve(component)
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem("retry-lazy-refreshed", "true") // we are now going to refresh
          return window.location.reload() // refresh the page
        }
        reject(error) // Default error behaviour as already tried refresh
        return null
      })
  })

const Pages = {
  Signin2: lazy(() => lazyRetry(() => import("Pages/Auth/Signin2"))),

  Dashboard: lazy(() => lazyRetry(() => import("Pages/Dashboard"))),

  Profil: lazy(() => lazyRetry(() => import("Pages/Profil"))),

  Market: lazy(() => lazyRetry(() => import("Pages/Market"))),

  Stream: lazy(() => lazyRetry(() => import("Pages/Stream"))),

  Statistic: lazy(() => lazyRetry(() => import("Pages/Statistic"))),

  Payment: lazy(() => lazyRetry(() => import("Pages/Payment"))),

  News: lazy(() => lazyRetry(() => import("Pages/News"))),
  NewsView: lazy(() => lazyRetry(() => import("Pages/News/View"))),

  Promocode: lazy(() => lazyRetry(() => import("Pages/Promocode"))),

  Request: lazy(() => lazyRetry(() => import("Pages/Request"))),
  RequestUpdate: lazy(() => lazyRetry(() => import("Pages/Request/Update"))),

  BalanceHistory: lazy(() => lazyRetry(() => import("Pages/BalanceHistory"))),

  PenaltyList: lazy(() => lazyRetry(() => import("Pages/Penalty"))),
  PenaltyChat: lazy(() => lazyRetry(() => import("Pages/Penalty/Chat"))),

  Contest: lazy(() => lazyRetry(() => import("Pages/Contest"))),
  ContestView: lazy(() => lazyRetry(() => import("Pages/Contest/View"))),
  Diagram: lazy(() => lazyRetry(() => import("Pages/Diagram"))),
  Charity: lazy(() => lazyRetry(() => import("Pages/Charity"))),

  Ticket: lazy(() => lazyRetry(() => import("Pages/Ticket"))),
  Chat: lazy(() => lazyRetry(() => import("Pages/Ticket/Chat"))),

  Profile2: lazy(() => lazyRetry(() => import("Pages/Profile2"))),
  Profile2Account: lazy(() => lazyRetry(() => import("Pages/Profile2/Account"))),
  Profile2Phone: lazy(() => lazyRetry(() => import("Pages/Profile2/Phone"))),
  Profile2Password: lazy(() => lazyRetry(() => import("Pages/Profile2/Password"))),
  Profile2Telegram: lazy(() => lazyRetry(() => import("Pages/Profile2/Telegram"))),
  Profile2TargatApi: lazy(() => lazyRetry(() => import("Pages/Profile2/TargetApi"))),
}

export default Pages
