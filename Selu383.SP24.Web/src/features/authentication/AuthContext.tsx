import { createContext } from "react";
import type UserDto from "./UserDto";

export interface AuthContextProps {
  user: null | UserDto | undefined;
  setUser: (newUser: null | UserDto) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);
export default AuthContext;
