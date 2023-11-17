import React, { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import RequireAuth from './pages/RequireAuth';
import { useGetInfoUserQuery } from './redux/services/authApi';
import { useAppDispatch } from './redux/hooks';
import { setUserInfo } from './redux/slices/authSlice';
import { useAuth } from './hooks/auth';

const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const AddTransactionPage = lazy(() => import("./pages/AddTransactionPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const EvolutionPage = lazy(() => import("./pages/EvolutionPage"));
const SearchTransactionsPage = lazy(() => import("./pages/SearchTransactionsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const App = () => {
  const { token } = useAuth();
  const dispatch = useAppDispatch();

  const { data: authData } = useGetInfoUserQuery(null);

  useEffect(() => {
    if (authData) {
      dispatch(setUserInfo({ 
        ...authData, 
        token 
      }));
    }
  }, [authData]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<TransactionsPage />} />
          <Route path="/add_transaction" element={<AddTransactionPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/evolution" element={<EvolutionPage />} />
          <Route path="/search/:value" element={<SearchTransactionsPage />} />
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
