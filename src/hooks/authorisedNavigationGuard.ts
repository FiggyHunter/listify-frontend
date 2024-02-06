import { useJwtStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

export const authorisedNavigationGuard = () => {
  const navigate = useNavigate();
  const { jwt } = useJwtStore();
  const token = useJwt(jwt) || null;
  useEffect(() => {
    if (token.decodedToken && !token.isExpired) {
      navigate("/dashboard");
      return;
    }
  }, [token.decodedToken, navigate]);

  return { token };
};

export default authorisedNavigationGuard;
