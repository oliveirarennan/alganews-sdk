import axios, { AxiosResponse } from "axios"
import handleAxiosResponseSuccess from "../utils/handleAxiosResponseSuccess"
import handleAxiosResponseError from "../utils/handleAxiosResponseError"
const Http = axios.create()

Http.defaults.baseURL = "http://localhost:8080"
Http.interceptors.response.use(
  handleAxiosResponseSuccess,
  handleAxiosResponseError
)

function getData<T>(response: AxiosResponse<T>){
  return response.data
}

export default class Service{
  protected static Http = Http
  protected static getData = getData
}



