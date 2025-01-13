"use client";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggler } from "./ThemeToggler";
import { Menu } from "lucide-react";
import { useContext} from "react";
import { WalletContext } from "@/content/wallet";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { ToastAction } from "@radix-ui/react-toast";
import {ethers} from "ethers"


function Header() {

  const context = useContext(WalletContext);

  if(!context){
    throw new Error("Waller must be used")
  }

  const {
    isConnected,
    setIsConnected,
    userAddress,
    setUserAddress,
    setSigner,
    showToggle,
    toggleShow,
  } = context;
  
  const {toast} = useToast()


  const connectWallet = async () => { 
    if (!window.ethereum) {
      toast({
        variant: "destructive",
        title: "MetaMask Not Found to Connect Your Wallet",
        description: "Please install MetaMask to connect.",
        action: (
          <ToastAction altText="Install MetaMask">
            <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
              Install MetaMask
            </a>
          </ToastAction>
        ),
      });
      return;
    }
  
    try {
      const ethereumProvider = window.ethereum as ethers.Eip1193Provider;
  
      const provider = new ethers.BrowserProvider(ethereumProvider);
  
      // Now `await` works because the function is async
      const signer = await provider.getSigner();
      setSigner(signer);
  
      const accounts = await provider.send("eth_requestAccounts", []);
      setIsConnected(true);
      setUserAddress(accounts[0]);
  
      const network = await provider.getNetwork();
      const chainId = network.chainId;
      const alfajoresNetworkId = "44787";
  
      if (chainId.toString() !== alfajoresNetworkId) {
        toast({
          variant: "destructive",
          title: "Please Switch Your MetaMask to Alfajores",
          description: "Failed to connect.",
        });
        return;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: `${error}`,
      });
    }
  };
  


  return (
    <div className="border-b border-black dark:border-white ">
      <div className="flex mx-5 mr-10  md:mr-0  items-center  md:flex h-auto justify-between ">
        {/* Logo */}

        <Link href="/" className="flex md:justify-center border-black md:border-b-0 lg:border-b-0">
          <Image
            src="/images/sticky.png"
            alt="obri"
            className=" md:py-3 md:mx-5 object-contain md:w-24 h-12 dark:invert"
            width={100}
            height={200}
          />
        </Link>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <Menu onClick={toggleShow} /> {/* Toggle menu on click */}
        </div>

        {/* Navigation Links */}
        <div className="hidden  md:text-[18px]  lg:flex justify-between md:whitespace-nowrap uppercase font-nunito">
          <Link href="/marketPlace" className="py-3 md:py-5 hover:bg-black hover:text-white px-3 border-black border-l border-r dark:border-white">
            [market]
          </Link>
          <Link href="/sellNFT" className="hidden md:py-5 md:px-3 md:hover:bg-black md:block hover:text-white border-black border-r dark:border-white">
            [create]
          </Link>
          <Link href="/profile" className="py-3 px-10 md:px-3 md:py-5 hover:bg-black hover:text-white border-r border-black dark:border-white">
            [profile]
          </Link>

          <div className="flex justify-center p-3 border-r">
          <Button 
          onClick={connectWallet}
           className="py-5 px-10  md:px-3 text-[18px] items-center flex  hover:text-white border-r border-black dark:border-white">
              {isConnected ? (
                <>
                {userAddress?.slice(0,8)}......
                </>
              ) : (
                <>
              [connect wallet]
                </>
              )}
          </Button>

          </div>

          <div className=" translate-y-4 px-3 hover:bg-black hover:text-white">
            <ThemeToggler />
          </div>
        </div> 
      </div>

      {/* Mobile Menu */}
      {showToggle && ( // Render menu only if `showToggle` is true
        <div className="absolute font-nunito z-50 uppercase h-[100vh] dark:bg-[#1A1C29] w-48 border   border-l-0 border-black dark:border-white bg-[#cec8bc] flex flex-col space-y-3  lg:hidden">
          <Link href="/marketPlace" className="pl-2 hover:bg-black py-2 hover:text-white border-b border-black dark:border-white">
            [market]
          </Link>
          <Link href="/sellNFT" className="pl-2 hover:bg-black py-2 hover:text-white border-b border-black dark:border-white">
            [create]
          </Link>
          <Link href="/profile" className="pl-2 hover:bg-black py-2 hover:text-white border-b border-black dark:border-white">
            [profile]
          </Link>
          <Link href="#collections" className="pl-2 md:hover:bg-black md:block hover:text-white border-b pb-1 border-black dark:border-white">
            [collections]
          </Link>

          <Button
           onClick={connectWallet}
           className={"pl-2 hover:text-white"}>
             {isConnected ? (
              <>
               {userAddress?.slice(0,8)}...
              </>
             ):(
              <>
                [Connect Wal]
              </>
             )}
            
          </Button>

          <div className="hover:bg-black pl-2 py-2 border border-b border-r-0 border-l-0 border-black dark:border-white hover:text-white">
            <ThemeToggler />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;