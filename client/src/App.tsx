import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import ReportsPage from './pages/ReportsPage';
import EvolutionPage from './pages/EvolutionPage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RequireAuth from './pages/RequireAuth';
import { useGetInfoUserQuery } from './redux/services/authApi';
import { useAppDispatch, useAppSelect } from './redux/hooks';
import { setUserInfo } from './redux/slices/authSlice';
import { useAuth } from '.';

const App = () => {
  const { isAuthorized, token } = useAuth();
  const user = useAppSelect(state => state.auth);
  const dispatch = useAppDispatch();

  const { data: authData } = useGetInfoUserQuery(null);

  useEffect(() => {
    if (authData) {
      dispatch(setUserInfo({ 
        ...authData, 
        token: localStorage.getItem("token") 
      }));
    }
  }, [authData]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<TransactionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/evolution" element={<EvolutionPage />} />
        </Route>
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
