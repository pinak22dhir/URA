import React, { useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { backendUrl } from '../App';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';

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
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-lg m-auto mt-14 gap-6 bg-white shadow-lg p-8 rounded-lg"
    >
      <div className="inline-flex flex-col items-center gap-2 mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">{current}</h1>
        <p className="text-sm text-gray-500">
          {current === 'Login' ? 'Sign in to your account' : 'Create a new account'}
        </p>
        <hr className="border-t-2 w-16 border-blue-500" />
      </div>

      {current === 'Login' ? null : (
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
        {current === 'Login' ? <p className="cursor-pointer hover:underline">Forgot Password?</p> : null}
        <p
          onClick={() => setCurrent(current === 'Login' ? 'Sign Up' : 'Login')}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          {current === 'Login' ? 'Create Account' : 'Login Here'}
        </p>
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
      >
        {current === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
