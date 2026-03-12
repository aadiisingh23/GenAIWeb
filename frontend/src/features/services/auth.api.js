import axios from 'axios'

// creating axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post('/api/auth/register', { username, email, password })

    return response.data
  } catch (error) {
    console.log("Error in Register", error);
  }
}


export const login = async ({ email, password }) => {
  try {
    const response = await api.post('/api/auth/login', { email, password })

    return response.data
  } catch (error) {
    console.log("Error in Login", error);
  }
}



export const logout = async () => {
  try {
  
    const response = await api.get('/api/auth/logout') 
    return response.data
  } catch (error) {
    console.log("Error in Logout", error);
    throw error; 
  }
}

export const getMe = async () => {
  try {
  
    const response = await api.get('/api/auth/get-me')
    return response.data
  } catch (error) {
    console.log("Error in Get Me", error);
    throw error;
  }
}
