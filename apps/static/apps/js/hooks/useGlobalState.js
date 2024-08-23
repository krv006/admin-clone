import { useQuery, useQueryClient } from "@tanstack/react-query"

const globalStateKey = ["globalState"]

function useGlobalState() {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: globalStateKey,
    queryFn: async () => {},
    enabled: false,
  })

  function setGlobalState(newState) {
    if (typeof newState === "object") {
      queryClient.setQueryData(globalStateKey, (old) => {
        if (typeof old === "object") {
          return { ...old, ...newState }
        }
        return null
      })
    }

    if (typeof newState === "function") {
      queryClient.setQueryData(globalStateKey, (old) => {
        if (typeof old === "object") {
          return { ...newState(old) }
        }
        return null
      })
    }
  }
  return [data, setGlobalState]
}
export default useGlobalState
