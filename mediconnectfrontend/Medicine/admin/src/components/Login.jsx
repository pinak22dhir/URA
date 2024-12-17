import React from 'react'
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred, please try again.');
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full' style={{ background: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEX///8AAAAzzMzX19fw8PDr6+vb29v5+fkoy8v0/Pzr+vqsrKy/7e1g1dVBQUG26uq2trbi9/dxcXHi4uKL39+YmJhJSUloaGgICAjOzs6Ojo4yMjJ8fHxu2NhS0tLN8fGp5+d+3NzCwsIkJCSr6Oib4+MRERGEhITAwMAuLi7W8/O97e3l+Ph529tFRUU6OjobGxuenp4powBYAAAGH0l...` }}>
      <div className='bg-white bg-opacity-80 shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-3xl font-extrabold mb-4 text-center text-gray-800'>
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="email"
              placeholder='Your@email.com'
              required
            />
          </div>

          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="password"
              placeholder='Your Password'
              required
            />
          </div>

          <button className='mt-4 w-full py-2 px-4 rounded-md text-white bg-red-500 font-bold text-lg hover:bg-red-600 transition duration-200'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;
