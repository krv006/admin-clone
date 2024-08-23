import cacheControl from "services/cacheControl"
import { toFormData } from "axios"
import api from "../api"
import helpers from "../helpers"

const putRequest = async (args, request) => {
  const { url, id, urlSearchParams, queryKey, data, baseURL } = args
  const res = await request({
    baseURL,
    url,
    method: "PUT",
    params: urlSearchParams,
    data,
  })

  if (helpers.checkStatus(res.status) === "ok")
    cacheControl.updateItemFromCache({
      id,
      queryKey: queryKey.length > 0 ? queryKey : [url],
      res: res.data,
    })

  return res
}

const postRequest = async (args, request) => {
  const { url, urlSearchParams, data, baseURL, responseType } = args

  const options = {
    baseURL,
    url,
    method: "POST",
    params: urlSearchParams,
    data,
  }

  if (responseType) {
    options.responseType = responseType
  }

  const res = await request(options)

  return res
}

const patchRequest = async (args, request) => {
  const { url, urlSearchParams, data, baseURL } = args

  const options = {
    baseURL,
    url,
    method: "PATCH",
    params: urlSearchParams,
    data,
  }

  const res = await request(options)

  return res
}

const deleteRequest = async (args, request) => {
  const { url, urlSearchParams, id, queryKey, baseURL, data } = args

  const options = {
    baseURL,
    url: id ? `${url}/${id}` : `${url}`,
    method: "delete",
    params: urlSearchParams,
    data,
  }
  const res = await request(options)

  if (helpers.checkStatus(res.status) === "ok")
    cacheControl.deleteItemFromCache({
      id,
      queryKey: queryKey.length > 0 ? queryKey : [url],
      res: res.data,
    })

  return res
}

const mutationFn = async (args) => {
  const {
    url,
    queryKey = [],
    method = "post",
    urlSearchParams = {},
    variables,
    onSuccess,
    onError,
    responseType,
  } = args
  const reqUrl = typeof url === "function" ? url(variables) : url
  const request = api

  const { data = {}, id = null, route = "advertiser", extraUrl = "", isFormData } = variables
  const baseURL = `${process.env.REACT_APP_API_BASE_URL}${route}`
  const reqData = isFormData ? toFormData(data) : data

  let res

  if (method === "put")
    res = await putRequest(
      {
        url: reqUrl + extraUrl,
        baseURL,
        urlSearchParams,
        id,
        queryKey,
        data: reqData,
        onSuccess,
        onError,
      },
      request,
    )
  if (method === "post")
    res = await postRequest(
      {
        url: reqUrl + extraUrl,
        baseURL,
        urlSearchParams,
        data: reqData,
        onSuccess,
        onError,
        responseType,
      },
      request,
    )
  if (method === "patch")
    res = await patchRequest(
      { url: reqUrl + extraUrl, baseURL, urlSearchParams, data: reqData, onSuccess, onError },
      request,
    )
  if (method === "delete")
    res = await deleteRequest(
      { url: reqUrl + extraUrl, baseURL, urlSearchParams, id, queryKey, data: reqData },
      request,
    )

  return res
}

export default mutationFn
