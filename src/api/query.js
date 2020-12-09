import axios from '@/libs/api.request'

export const queryAllAirport = () => {
  return axios.request({ url: '/queryAllAirport/', method: 'get' })
}
