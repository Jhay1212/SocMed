
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../../assets/avatars/avatar.png';

const Register = () => {
  const [data, setData] = useState({
    profile: null,
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    setData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (data.password !== data.password2) {
    setError('Passwords do not match.');
    return;
  }

  if (!data.username || !data.email || !data.password || !data.password2) {
    setError('Please fill in all fields.');
    return;
  }

  const formData = new FormData();

  if (data.profile) {
    formData.append('profile', data.profile);
  }

  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('password2', data.password2);

  try {
    await axios.post('http://localhost:8000/api/register/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setSuccess('Registration successful!');
    setError('');
    setData({
      profile: null,
      username: '',
      email: '',
      password: '',
      password2: ''
    });
  } catch (err) {
    setError(err.response?.data?.detail || "Registration failed.");
    console.error(err);
  }
};

  return (
  <main className="min-h-screen flex justify-center items-center bg-[#1e2a3a] p-4">
      <div className="w-full max-w-md bg-[#384a53] rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">Register</h1>

        {error && <p className="bg-red-700 text-white text-center py-2 rounded mb-4">{error}</p>}
        {success && <p className="bg-green-700 text-white text-center py-2 rounded mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label htmlFor="username" className="block mb-2 font-semibold text-[#fff]">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={handleChange}
              className="w-full bg-[#1e2a3a] text-white rounded-md border border-[#2f3d4a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="username"
            />
                      <div>
            <label htmlFor="profile" className="block mb-2 font-semibold text-[#fff]">Profile</label>
            <input
              type="file"
              id="profile"
              name="profile"
              onChange={handleChange}
              className="w-1/2 text-[#fff] bg-[#1e2a3a] rounded-md border border-[#2f3d4a] px-auto py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="png,jpg,jpeg, jpg, gif"
            />
          </div>
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-[#fff]">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full bg-[#1e2a3a] text-white rounded-md border border-[#2f3d4a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-[#fff]">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full bg-[#1e2a3a] text-white rounded-md border border-[#2f3d4a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="password2" className="block mb-2 font-semibold text-[#fff]">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={data.password2}
              onChange={handleChange}
              className="w-full bg-[#1e2a3a] text-white rounded-md border border-[#2f3d4a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-[#ccc] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
