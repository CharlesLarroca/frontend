import axios from 'axios'

// configuração para chamar a api
const api = axios.create({
  baseURL: 'https://getapet-backend.vercel.app/',
}) 

export default api