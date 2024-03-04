import { useJwtStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

export const userNavigationGuard = () => {
  const navigate = useNavigate();
  const { jwt } = useJwtStore();
  const token = useJwt(jwt) || null;

  useEffect(() => {
    if (
      !jwt ||
      jwt === "" ||
      jwt === "noToken" ||
      token.isExpired === true ||
      token?.decodedToken?.isAdmitted === false
    ) {
      navigate("/login");
      return;
    }
  }, [token?.decodedToken, navigate]);

  return { jwt, token };
};

export default userNavigationGuard;
