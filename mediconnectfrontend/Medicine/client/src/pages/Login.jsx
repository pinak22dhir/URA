import React, { useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { backendUrl } from '../App';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import bgImage from "./imgggg.webp";

const Login = () => {
  const [current, setCurrent] = useState('Login');
  const { token, setToken, navigate } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (current === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{  backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-lg p-8 w-[90%] sm:max-w-lg transition-all duration-500"
      >
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 transition-colors duration-300">
              {current}
            </h1>
            <p className="text-sm text-gray-600">
              {current === 'Login' ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </div>

          {current === 'Sign Up' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              required
            />
          )}
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            required
          />
          <input
            id="pass"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            required
          />

          <div className="w-full flex justify-between items-center text-sm mt-[-8px] text-gray-500">
            {current === 'Login' && (
              <p className="cursor-pointer hover:underline">Forgot Password?</p>
            )}
            <p
              onClick={() => setCurrent(current === 'Login' ? 'Sign Up' : 'Login')}
              className="cursor-pointer text-blue-500 hover:underline"
            >
              {current === 'Login' ? 'Create Account' : 'Login Here'}
            </p>
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
          >
            {current === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
