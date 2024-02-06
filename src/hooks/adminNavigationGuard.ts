import { useJwtStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

export const adminNavigationGuard = () => {
  const navigate = useNavigate();
  const { jwt } = useJwtStore();
  const token = useJwt(jwt) || null;

  useEffect(() => {
    if (!jwt || jwt === "" || jwt === "noToken") {
      navigate("/login");
      return;
    }
    if (token.decodedToken && !token?.decodedToken?.isAdmin) {
      navigate("/dashboard");
    }
  }, [token.decodedToken, navigate]);

  return { token };
};

export default adminNavigationGuard;
