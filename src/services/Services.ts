import axios, { AxiosResponse } from "axios"

const Http = axios.create()

Http.defaults.baseURL = "http://localhost:8080"

function getData<T>(response: AxiosResponse<T>){
  return response.data
}

export default class Service{
  protected static Http = Http
  protected static getData = getData
}



