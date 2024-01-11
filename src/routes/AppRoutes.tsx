import { Route, Routes } from "react-router-dom";
import Login from "../views/Login.tsx";
import Register from "../views/Register.tsx";
import Dashboard from "@/views/Dashboard.tsx";
import Company from "@/views/Company.tsx";
import Account from "@/views/Account.tsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
