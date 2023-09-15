import LoginAppShell from '@/layouts/AppShells/LoginAppShell';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const LoginRoute = () => {
  let isAuthenticated = true;
  if (secureLocalStorage.getItem('access_token') == null) {
    isAuthenticated = false;
  }
  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <LoginAppShell>
      <Outlet />
    </LoginAppShell>
  );
};

export default LoginRoute;
