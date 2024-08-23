import axios from "axios"
import qs from "qs"
import { buildWebStorage, setupCache } from "axios-cache-interceptor"
import { get } from "lodash"

import errorHandler from "./errorHandler"

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    let user
    try {
      if (token) {
        user = JSON.parse(sessionStorage.getItem("user")) || {}
      }
    } catch (e) {
      //
    }
    return {
      ...config,
      url: `${config.url ?? ""}?${qs.stringify({
        profile_id: get(user, "id"),
        ...config.params,
      })}`,
      headers: { Authorization: `Bearer ${token}`, Accept: "aplication/json" },
      params: {},
    }
  },
  (error) => error,
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    errorHandler(error)
    return error
  },
)

const headerInterpreter = (headers) => {
  if (headers["x-my-custom-header"]) {
    const seconds = Number(headers["x-my-custom-header"] || "0")
    if (seconds < 1) {
      return "dont cache"
    }

    return seconds
  }

  return "not enough headers"
}

const api = setupCache(axiosInstance, {
  storage: buildWebStorage(localStorage, ""),
  headerInterpreter,
  cachePredicate: ({ config }) => config.cache.ttl > 0,
})

export default api
