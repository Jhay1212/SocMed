import { useState } from 'react'
import axios from 'axios'
import VerticalNav from '../components/VerticalNav'

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.password2) {
      setError('Passwords do not match.')
      return
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/users/', {
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.password2
      })

      setSuccess('Registration successful!')
      setError('')
      setData({
        username: '',
        email: '',
        password: '',
        password2: ''
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Error')
      console.error(err)
    }
  }

  return (
    <main className="max-w-screen h-screen flex justify-center items-center bg-gray-100 text-black">
      <div className="wrapper w-full max-w-xl p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-extrabold text-center text-blue-600 mb-4">Register</h1>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block font-semibold text-blue-600 mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold text-blue-600 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="abc123@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-semibold text-blue-600 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>

          <div>
            <label htmlFor="password2" className="block font-semibold text-blue-600 mb-1">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={data.password2}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-2 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  )
}

export default Register
