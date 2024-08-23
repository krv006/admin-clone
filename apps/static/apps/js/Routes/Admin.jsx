import Layout from "Layout"
import { Navigate } from "react-router-dom"
import ErrorBoundary from "components/ErrorBoundary"
import Pages from "./Pages"

const AdminRoutes = [
  {
    path: "",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Pages.Dashboard />,
      },

      {
        path: "/market",
        element: <Pages.Market />,
      },

      {
        path: "/stream",
        element: <Pages.Stream />,
      },

      {
        path: "/statistic",
        element: <Pages.Statistic />,
      },

      {
        path: "/payment",
        element: <Pages.Payment />,
      },

      {
        path: "/promocode",
        element: <Pages.Promocode />,
      },

      {
        path: "/request",
        element: <Pages.Request />,
      },
      {
        path: "/request/update/:id",
        element: <Pages.RequestUpdate />,
      },

      {
        path: "/balance-history",
        element: <Pages.BalanceHistory />,
      },
      {
        path: "/penalty",
        element: <Pages.PenaltyList />,
      },
      {
        path: "/penalty/:id",
        element: <Pages.PenaltyChat />,
      },
      {
        path: "/contest",
        element: <Pages.Contest />,
      },
      {
        path: "/contest/:id",
        element: <Pages.ContestView />,
      },
      {
        path: "/charity",
        element: <Pages.Charity />,
      },
      {
        path: "/diagram",
        element: <Pages.Diagram />,
      },

      {
        path: "/ticket",
        element: <Pages.Ticket />,
      },
      {
        path: "/ticket/:id",
        element: <Pages.Chat />,
      },

      {
        path: "/news",
        element: <Pages.News />,
      },
      {
        path: "/news/:id",
        element: <Pages.NewsView />,
      },

      {
        path: "/profile",
        element: <Pages.Profile2 />,
        children: [
          {
            index: true,
            element: <Pages.Profile2Account />,
          },
          {
            path: "phone/:step",
            element: <Pages.Profile2Phone />,
          },
          {
            path: "password/:step",
            element: <Pages.Profile2Password />,
          },
          {
            path: "telegram",
            element: <Pages.Profile2Telegram />,
          },
          {
            path: "targat-api",
            element: <Pages.Profile2TargatApi />,
          },
        ],
      },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  // {
  //   path: "/signin2",
  //   element: <Pages.Signin2 />,
  // },
]

export default AdminRoutes
