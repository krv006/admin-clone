/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import { Icons, Modal } from "components"
import useGlobalState from "hooks/useGlobalState"
import { get } from "lodash"
import React, { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { helpers, time } from "services"

import avatarPlaceholder from "assets/images/user.png"

import "./styles.scss"
import { useRequest } from "hooks"
import NewsView from "Pages/News/View"

const cards = [
  {
    href: "https://telegra.ph/100kuz-Adminlar-uchun-qollanma-11-15",
    icon: <i className="fa-solid fa-circle-exclamation" />,
    text: "Dastur haqida",
  },
  {
    to: "/promocode",
    icon: <i className="fa-solid fa-users" />,
    text: "Doimiy mijozlar",
  },
  {
    to: "/request",
    icon: <i className="fa-solid fa-list-ul" />,
    text: "So'rovlar",
  },
  {
    to: "/contest",
    icon: <Icons.Trophy className="icon-trophy" />,
    text: "Konkurslar",
  },
  {
    to: "/balance-history",
    icon: <i className="fa-solid fa-money-bill-1" />,
    text: "Balans tarixi",
  },
  {
    to: "/penalty",
    icon: <i className="fa-solid fa-triangle-exclamation" />,
    text: "Jarimalar",
  },
  {
    to: "/diagram",
    icon: <i className="fa-solid fa-chart-simple" />,
    text: "Diagrammalar",
  },
  {
    to: "/charity",
    icon: <i className="fa-solid fa-box" />,
    text: "Hayriya qutisi",
  },
  {
    to: "/ticket",
    icon: <Icons.Message />,
    text: "Murojatlar",
  },
  {
    href: "https://t.me/changelog_100k",
    icon: (
      <div className="telegram-icon">
        <i className="fa-brands fa-telegram" />
      </div>
    ),
    text: "Reklama postlari",
  },
  // {
  //   to: "/mail",
  //   icon: <Icons.Message />,
  //   text: "Pochta xizmati",
  // },
]

const statusBgColors = {
  delivered: "#11740F",
  accepted: "#11740F",
  sent: "#11740F",
  cancelled: "#830D29",
  spam: "#830D29",
  archived: "#830D29",
}

function Dashboard() {
  const [state] = useGlobalState()
  const navigate = useNavigate()
  const [selectedNews, setSelectedNews] = useState()

  const firstCame = get(state, "user.created_at")
    ? time.to(get(state, "user.created_at"), "YYYY-MM-DD")
    : ""

  const orderStats = useRequest({
    url: "charts/order-count-by-status",
    ttl: 5,
  })
  const holdBalance = get(orderStats.data, "hold_balance")

  const sortedStats = (get(orderStats.data, "data") || []).sort((a, b) => a.count - b.count)
  const orderCount = (get(orderStats.data, "data") || []).reduce((a, b) => {
    if (get(b, "status") === "defected") return a
    return a + get(b, "count")
  }, 0)

  const news = useRequest({
    url: "news",
    route: "",
    ttl: 2,
  })

  const list = get(news, "data.data") || []

  const balance = helpers.getAccountFromAccounts({ attribute: "balance" })

  return (
    <div className="dashboard">
      <div className="container">
        <div className="top">
          {get(state, "user.avatar") ? (
            <img
              className="avatar-img"
              src={get(state, "user.avatar") || avatarPlaceholder}
              alt=""
            />
          ) : (
            <Icons.Profile className="profile-img" />
          )}
          <p className="">
            {get(state, "user.name")} {get(state, "user.surname")}
          </p>
          <p className="subtitle" style={{ paddingTop: "10px" }}>
            {" "}
            Saytda &quot;{firstCame}&quot; chi sanadan{" "}
          </p>
        </div>
        <div className="balance-card">
          <p>Hisobingizda</p>
          <h2>{balance} bonus</h2>
          <div className="space-b">
            <p>Tahminiy balans: {helpers.toReadeable(holdBalance)} bonus</p>
            <h4>100k</h4>
          </div>
        </div>
        <div className="statistics">
          {sortedStats.map(({ status_label: label, count, status }, i) => (
            <Link to={`/request?status=${status}`} className="statistics-card" key={i}>
              <div className="bg-shape" style={{ "--shape-color": get(statusBgColors, status) }}>
                {" "}
              </div>
              <div className="statistics-card__content">
                <p className="count">{count}</p>
                <p className="title">{label}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="category__cards">
          {cards.map(({ icon, text, to, href }, i) =>
            href ? (
              <a href={href} className="category__card" target="_blank" rel="noreferrer" key={i}>
                <div className="category__card-icon">{icon}</div>
                <p className="category__card-text">{text}</p>
              </a>
            ) : (
              <NavLink to={to} className="category__card" key={i}>
                <div className="category__card-icon">{icon}</div>
                <p className="category__card-text">
                  {text}
                  {i === 2 ? ` (${orderCount})` : null}
                </p>
              </NavLink>
            ),
          )}
          {get(state, "user.advertiser_group_link") ? (
            <a
              href={get(state, "user.advertiser_group_link")}
              className="category__card"
              target="_blank"
              rel="noreferrer"
            >
              <div className="category__card-icon">
                <div className="telegram-icon">
                  <i className="fa-brands fa-telegram" />
                </div>
              </div>
              <p className="category__card-text">Telegram guruh</p>
            </a>
          ) : null}
        </div>
        {list.length > 0 ? (
          <div className="dashboard-news">
            {list.slice(0, 3).map((item, i) => {
              const { id, title, description, created_at: createdAt, image } = item
              return (
                <div
                  key={i}
                  className="news__item p-10 mb-10"
                  onClick={() => {
                    if (window.innerWidth > 768) setSelectedNews(item)
                    else navigate(`/news/${id}`)
                  }}
                >
                  <img src={image} alt="" />
                  <div className="news__content">
                    <h2 className="title">{title}</h2>
                    <div className="subtitle" dangerouslySetInnerHTML={{ __html: description }} />
                    {createdAt ? (
                      <p className="release_date caption-l">
                        <span className="date">{time.to(createdAt, "DD.MM.YYYY")}</span>
                        <span className="time">{time.to(createdAt, "HH:mm")}</span>
                      </p>
                    ) : null}
                  </div>
                </div>
              )
            })}
            <Link to="/news" className="show-all">
              Barchasini ko‘rish
            </Link>
          </div>
        ) : null}
      </div>

      <Modal
        isOpen={!!selectedNews}
        handleClose={() => setSelectedNews(false)}
        className="modal-news"
      >
        <>
          <NewsView selected={selectedNews} />
          <div className="close-icon" onClick={() => setSelectedNews(false)}>
            <Icons.XIcon />
          </div>
        </>
      </Modal>
    </div>
  )
}

export default Dashboard
