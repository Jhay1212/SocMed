import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './Routes/Authentication/Register.jsx'
import Post from './components/Post.jsx'
import Profile from './Routes/Profile.jsx'
import Logout from './Routes/Authentication/Logout.jsx'
import Login from './Routes/Authentication/Login.jsx'
import Community from './Routes/Community/Community.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './Routes/NotFound.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },

  {
    path: 'profile/:username?',
    element: <Profile />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'signup',
    element: <Register />,
  },
  {
    path: 'logout',
    element: <Logout />,
  },
  {
    path: 'login',
    element: <Login />,
  },

  {
    path: 'post/:id',
    element: <Post />,
  },
  {
    path: 'post/:title/edit',
    element: <Post />,
  },

  {
    path: 'community/:name?',
    element: <Community />,
  }



])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
