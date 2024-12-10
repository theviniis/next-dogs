"use client";

import { tokenValidate } from "@/action/token-validate";
import { User } from "@/entities/User";
import { useQuery } from "@tanstack/react-query";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [userState, setUser] = useState(() => user);

  useQuery({ queryKey: ["tokenValidate"], queryFn: tokenValidate, enabled: !!userState });

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>{children}</UserContext.Provider>
  );
}

export const useUserStore = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserStore must be used within a UserContextProvider");
  }

  return context;
};
