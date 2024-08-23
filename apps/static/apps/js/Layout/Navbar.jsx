import { DropdownMenu, Icons } from "components"
import useGlobalState from "hooks/useGlobalState"
import { get } from "lodash"
import { NavLink, useLocation } from "react-router-dom"
import { Emitter } from "services"

import avatarPlaceholder from "assets/images/user.png"

const navs = [
  {
    to: "/",
    text: "Dashboard",
    icon: <Icons.Tachometer />,
    onClick: () => {
      Emitter.emit("profile:refresh")
    },
  },
  {
    to: "/market",
    text: "Market",
    icon: <Icons.StoreFilled />,
  },
  {
    to: "/stream",
    text: "Oqim",
    icon: <Icons.Link />,
  },
  {
    to: "/statistic",
    text: "Statistika",
    icon: <Icons.Chart />,
  },
  {
    to: "/payment",
    text: "To'lov",
    icon: <Icons.CashFilled />,
    onClick: () => Emitter.emit("profile:refresh"),
  },
]

export const dropdownList = [
  {
    text: "Profil",
    to: "/profile",
  },
]

const innerPages = [
  "request",
  "balance-history",
  "coin-market",
  "diagram",
  "charity",
  "promocode",
  "orders",
  "ticket",
  "news",
  "contest",
  "penalty",
  "mail",
]

function Navbar() {
  const [state] = useGlobalState()
  useLocation() // for re-render when location changes
  const avatar = get(state, "user.avatar")

  return (
    <div className="navbar">
      <div
        className="container"
        style={{
          "--inner-page-navbar": innerPages.includes(window.location.pathname.split("/")[1])
            ? "none"
            : "block",
        }}
      >
        <div className="space-b">
          <div>
            <a href="https://100k.uz">
              <Icons.Logo className="logo" />
            </a>
          </div>
          <ul className="navigation">
            {navs.map(({ to, text, icon, onClick = () => {} }) => (
              <li key={text} onClick={onClick}>
                <NavLink to={to}>
                  <div className="dashboard-icon">{icon}</div>
                  <p>{text}</p>
                  <span> </span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex" }} className="navbar-menu">
            <DropdownMenu
              button={
                avatar ? (
                  <img src={avatar || avatarPlaceholder} alt="" className="avatar" />
                ) : (
                  <Icons.Profile />
                )
              }
              list={dropdownList}
            />
          </div>
        </div>
      </div>
      <div className="navbar__mobile">
        <div className="navbar__mobile-content">
          {navs.map(({ to, text, icon, onClick = () => {} }) => (
            <li key={text} onClick={onClick}>
              <NavLink to={to}>
                <div className="dashboard-icon">{icon}</div>
                <p>{text}</p>
              </NavLink>
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
