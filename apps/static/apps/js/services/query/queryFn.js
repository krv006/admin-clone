import api from "../api"

async function queryFn({ url, method = "get", route, urlSearchParams = {}, ttl = 0, cacheId }) {
  const options = {
    url: `${route}/${url}`,
    method,
    params: urlSearchParams,
    cache: {
      ttl: 1000 * 60 * ttl,
    },
  }
  if (cacheId) options.id = cacheId

  const response = await api(options)

  return response
}

export default queryFn
