import { useMutation } from "@tanstack/react-query"
import { query } from "services"

function useMutate({
  url,
  method = "post",
  urlSearchParams,
  onSuccess = () => {},
  onError = () => {},
  queryKey,
}) {
  const mutation = useMutation({
    mutationKey: queryKey ?? [url, urlSearchParams],
    mutationFn: async (variables) => {
      const res = await query.mutationFn({
        variables,
        url,
        queryKey,
        urlSearchParams,
        method,
        onSuccess,
        onError,
      })
      const { status } = res

      if (status >= 200 && status < 300) onSuccess(res.data)
      else onError(res)

      return res.data
    },
  })
  return mutation
}

export default useMutate
