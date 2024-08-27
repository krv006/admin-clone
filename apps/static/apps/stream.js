window.addEventListener("load", () => {
  const mainScript = document.querySelector("[defer]")

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(() => {
      caches.keys().then((keys) => {
        keys.forEach((key) => {
          caches.delete(key)
        })
      })
    })
  }

  if (mainScript) {
    fetch(mainScript.src)
      .then((res) => {
        if (
          res.headers.get("content-type").includes("text/html") &&
          window.localStorage.getItem("refeshed") !== "true"
        ) {
          window.localStorage.setItem("refeshed", true)
          window.location.reload()
        } else if (window.localStorage.getItem("refeshed") === "true") {
          window.localStorage.setItem("refeshed", false)
        }
      })
      .catch(() => {
        window.location.reload()
      })
  }
})
