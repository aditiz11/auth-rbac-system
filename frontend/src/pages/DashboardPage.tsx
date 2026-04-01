import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

type JwtPayload = {
  sub: string;
  role: 'USER' | 'ADMIN';
  exp: number;
};

const DashboardPage = () => {
  const [userContent, setUserContent] = useState('');
  const [adminContent, setAdminContent] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN' | null>(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    let decoded: JwtPayload;

    try {
      decoded = jwt_decode(token);
    } catch {
      return logout();
    }

    if (decoded.exp < Date.now() / 1000) return logout();

    const normalizedRole = decoded.role.replace('ROLE_', '');
    setRole(normalizedRole as 'USER' | 'ADMIN');

    if (normalizedRole === 'USER') {
      api.get('/user').then(res => setUserContent(res.data.message));
    }

    if (normalizedRole === 'ADMIN') {
      api.get('/admin').then(res => setAdminContent(res.data.message));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl mb-4">
        Logged in as: <span className="font-bold">{role}</span>
      </h2>

      {role === 'USER' && (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">User Content</h3>
          <p>{userContent || 'Loading...'}</p>
        </div>
      )}

      {role === 'ADMIN' && (
        <div className="bg-yellow-100 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Admin Panel</h3>
          <p>{adminContent || 'Loading...'}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;