import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Logout = () => {

  async function logout() {
    try {
      await axios.post('http://localhost:8000/auth/jwt/logout/', {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    logout()
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    localStorage.removeItem('email')
    localStorage.removeItem('user')
    localStorage.removeItem('user_id')

    localStorage.removeItem('profile')
    localStorage.removeItem('username')
    window.location.href = '/login'
    console.log('logout')
  }, [])
  return (
    <div>Logout</div>
  )
}

export default Logout