import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

applyCaseMiddleware(instance, {
  ignoreHeaders: true,
})

export { axios }
export default instance
