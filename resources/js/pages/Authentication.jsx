import React, { useState } from 'react';
import  Login  from '../components/Login';
import Register  from '../components/Register';
import {useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Authentication = () => {
  const [currentView, setCurrentView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('a.elmoslmany@invadems.com');
  const [loginPassword, setLoginPassword] = useState('password');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
            navigate('/');

        } else {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [navigate, isAuthenticated]); 

    if (!isAuthenticated) {
         (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full" role="status"/>
            </div>
        );
    }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (registerPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log(registerUsername, registerEmail, registerPassword);

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerUsername,
          email: registerEmail,
          password: registerPassword
        })
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token in localStorage instead of cookies
      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    if (isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-8">
            <h2 className="text-2xl text-center font-bold">Dashboard</h2>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      );
    }

    if (currentView === 'login') {
      return <Login error={error} setLoginEmail={setLoginEmail} setLoginPassword={setLoginPassword} setCurrentView={setCurrentView} handleLogin={handleLogin} loginPassword={loginPassword} loginEmail={loginEmail}/>
      
    }

    return (
      <Register error={error} setRegisterUsername={setRegisterUsername} setConfirmPassword={setConfirmPassword} setCurrentView={setCurrentView} handleRegister={handleRegister} registerUsername={registerUsername} registerEmail={registerEmail} setRegisterEmail={setRegisterEmail} setRegisterPassword={setRegisterPassword} registerPassword={registerPassword} confirmPassword={confirmPassword}/>
    );
  };

  return renderContent();
};

export default Authentication;