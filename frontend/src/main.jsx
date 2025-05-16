import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './Routes/Register.jsx'
import Profile from './Routes/Profile.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'profile:username',
    element: <Profile />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'signup',
    element: <Register />,
  }


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
