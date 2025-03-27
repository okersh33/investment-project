import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("UserAuth hook must be used within an AuthProvider");
  }
  return context;
};
