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
