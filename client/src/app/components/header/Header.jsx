import { WalletContext } from '@/app/context/wallet'
import { BrowserProvider } from 'ethers';
import React, { useContext } from 'react'

function Header() {

    const {
        isConnected,
        setIsConnected,
        userAddress,
        setUserAddress,
        signer,
        setSigner
    } = useContext(WalletContext);


    const connectWallet = async()=>{
        if(!window.ethereum){
            throw new Error("Metamask is not installed")
        }
        try {
           const provider = new BrowserProvider(window.ethereum);
           const signer = await provider.getSigner(); 
           setSigner(signer)
           const accounts = await provider.send("eth_requestAccounts", []);
           setIsConnected(true)
           setUserAddress(accounts[0]);

           const network = await provider.getNetwork();
           const chainID = network.chainId;
           const sepoliaNetworkId = "11155111"

           if(chainID.toString !== sepoliaNetworkId){
            alert("Please join with sepolia network")
            return;
           }
        } catch (error) {
            console.log("connection error",error)
        }
    } 

  return (
    <div>Header</div>
  )
}

export default Header