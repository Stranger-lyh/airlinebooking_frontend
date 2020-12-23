import axios from '@/libs/api.request'

export const addAirport = (data) => {
  return axios.request({ url: '/addAirport/', data: data, method: 'post' })
}

export const addCompany = (data) => {
  return axios.request({ url: 'addCompany/', data: data, method: 'post' })
}

export const addPlaneType = (data) => {
  return axios.request({ url: 'addPlaneType/', data: data, method: 'post' })
}

export const addRoute = (data) => {
  return axios.request({ url: 'addRoute/', data: data, method: 'post' })
}

export const addPlane = (data) => {
  return axios.request({ url: 'addPlane/', data: data, method: 'post' })
}

export const addFlight = (data) => {
  return axios.request({ url: 'addFlight/', data: data, method: 'post' })
}

export const addAccount = (data) => {
  return axios.request({ url: 'addAccount/', data: data, method: 'post' })
}
