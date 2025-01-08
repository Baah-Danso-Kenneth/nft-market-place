"use client";

import React, { createContext, useState, ReactNode } from "react";

interface WalletContextProps {
  isConnected: boolean;
  setisConnected: React.Dispatch<React.SetStateAction<boolean>>;
  userAddress: string | null;
  setUserAddress: React.Dispatch<React.SetStateAction<string | null>>;
  signer: any;
  setSigner: React.Dispatch<React.SetStateAction<any>>;
}

export const WalletContext = createContext<WalletContextProps | undefined>(undefined);

interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  const [isConnected, setisConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<any>(null);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        setisConnected,
        userAddress,
        setUserAddress,
        signer,
        setSigner,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
