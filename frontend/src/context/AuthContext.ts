import { createContext } from "react";
import { User, UserRequest } from "../types/types";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  register: (createRequest: UserRequest) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
