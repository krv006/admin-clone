const { queryClient } = require("config")
const { isArray, get } = require("lodash")

function deleteModifier({ id, oldData }) {
  let newData = oldData
  if (isArray(oldData)) {
    if (typeof id === "number") newData = oldData.filter((curr) => get(curr, "id") !== id)
    if (isArray(id)) newData = oldData.filter((curr) => !id.includes(get(curr, "id")))
  }
  return newData
}

function updateModifier({ id, oldData, res }) {
  let newData = oldData
  if (isArray(oldData)) {
    newData = oldData.map((curr) => (get(curr, "id") === id ? res : curr))
  }
  return newData
}

function modifyCacheCreator(modifier) {
  return (args) => {
    const { queryKey } = args
    // Cancel any outgoing refetches
    queryClient
      .cancelQueries({ queryKey })
      .then()
      .catch(() => {})

    // Update cache
    queryClient.setQueryData(queryKey, (oldData) => {
      const newData = modifier({ oldData, ...args })
      return newData
    })
    // Always refetch after error or success
    queryClient
      .invalidateQueries({ queryKey })
      .then()
      .catch(() => {})
  }
}

const deleteItemFromCache = modifyCacheCreator(deleteModifier)

const updateItemFromCache = modifyCacheCreator(updateModifier)

export default {
  deleteItemFromCache,
  updateItemFromCache,
}
