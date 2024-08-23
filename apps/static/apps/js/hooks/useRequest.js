import { get, isObject } from "lodash"
import { useQuery } from "@tanstack/react-query"
import { query as q } from "services"

function useRequest({
  url,
  urlSearchParams,
  method = "get",
  select = (data) => data.data,
  onSuccess = () => {},
  onError = () => {},
  queryKey,
  dataKey = "data",
  metaKey = "meta",
  route = "advertiser",
  ttl = 0 /* cache time in minutes */,
  cacheId,
  ...attr
}) {
  const option = {
    ...attr,
    queryKey: queryKey || (isObject(urlSearchParams) ? [url, urlSearchParams] : [url]),
    queryFn: async (context) => {
      const res = await q.queryFn({
        context,
        url,
        urlSearchParams,
        dataKey,
        metaKey,
        route,
        method,
        ttl,
        cacheId,
        onSuccess,
        onError,
      })

      if (get(res, "status") >= 200 && get(res, "status") < 300) onSuccess(res.data)
      else onError(res)

      return res
    },
    select,
  }

  const query = useQuery(option)

  return query
}

export default useRequest
