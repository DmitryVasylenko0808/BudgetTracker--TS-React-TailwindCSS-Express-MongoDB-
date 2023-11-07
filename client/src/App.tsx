import React from 'react';
import { HiOutlineCurrencyDollar, HiUser, HiLogout, HiOutlineSearch } from "react-icons/hi";
import Header from './components/Header';
import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import ReportsPage from './pages/ReportsPage';
import EvolutionPage from './pages/EvolutionPage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<TransactionsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/evolution" element={<EvolutionPage />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
