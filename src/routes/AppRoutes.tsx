import { Route, Routes } from "react-router-dom";
import Login from "../views/Login.tsx";
import Register from "../views/Register.tsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
