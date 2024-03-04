import { Route, Routes } from "react-router-dom";
import Login from "../views/Login.tsx";
import Register from "../views/Register.tsx";
import Dashboard from "@/views/Dashboard.tsx";
import Company from "@/views/Company.tsx";
import Profile from "@/views/Profile.tsx";
import Admin from "@/views/Admin.tsx";
import ResetPassword from "@/views/ResetPassword.tsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company/:companyId" element={<Company />} />
        <Route path="/profile/:userId?" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
