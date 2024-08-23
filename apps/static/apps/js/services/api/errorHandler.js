import { get } from "lodash"
import notification from "services/notification"

function errorHandler(err) {
  switch (get(err, "response.status")) {
    case 401:
      window.location.href = "/signin"
      localStorage.removeItem("token")
      localStorage.removeItem("profile")
      break

    default:
      break
  }

  if (get(err, "response.status") >= 400 && get(err, "response.status") < 500) {
    const message = get(err, "response.data.message")
    if (message) notification.error(message)
    else notification.error()
  }
  if (get(err, "response.status") >= 500) {
    notification.error("Serverda xatolik")
  }

  return null
}

export default errorHandler
