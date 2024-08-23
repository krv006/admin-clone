import { useEffect } from "react"

const useClearCache = () => {
  useEffect(() => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name))
      })
    }
  }, [])
}

export default useClearCache
