import axios from '@/libs/api.request'

export const queryAllAirport = () => {
  return axios.request({ url: '/queryAllAirport/', method: 'get' })
}

export const queryAllPlaneType = () => {
  return axios.request({ url: '/queryAllPlaneType/', method: 'get' })
}

export const queryAllCompany = () => {
  return axios.request({ url: '/queryAllCompany/', method: 'get' })
}

export const queryAllFlight = () => {
  return axios.request({ url: '/queryAllFlight/', method: 'get' })
}

export const queryAccount = () => {
  return axios.request({ url: '/queryAccount/', method: 'get' })
}

export const queryAllRoute = () => {
  return axios.request({ url: '/queryAllRoute/', method: 'get' })
}

export const queryAllBill = () => {
  return axios.request({ url: '/queryAllBill/', method: 'get' })
}

export const estimateBill = () => {
  return axios.request({ url: '/estimateBill/', method: 'get' })
}
