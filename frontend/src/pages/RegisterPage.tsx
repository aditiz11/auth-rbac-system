import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

type FormData = {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
};

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/auth/register', data);
      alert('Registration successful!');
      navigate('/login');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('name')}
            placeholder="Name"
            className="mb-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="mb-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="mb-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <select
            {...register('role')}
            className="mb-6 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;