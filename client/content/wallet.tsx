"use client";

import React, { createContext, useState, ReactNode } from "react";

interface WalletContextProps {
    isConnected: boolean;
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
    userAddress: string | null;
    setUserAddress: React.Dispatch<React.SetStateAction<string | null>>;
    signer: any;
    setSigner: React.Dispatch<React.SetStateAction<any>>;
    showToggle: boolean;
    toggleShow: () => void;
  }
  

export const WalletContext = createContext<WalletContextProps | undefined>(undefined);

interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<any>(null);
  const [showToggle, setShowToggle] = useState(false);
  const toggleShow=()=>{
    setShowToggle((prev)=>!prev)
  }

  return (
    <WalletContext.Provider
    value={{
        isConnected,
        setIsConnected,
        userAddress,
        setUserAddress,
        signer,
        setSigner,
        showToggle,
        toggleShow,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
