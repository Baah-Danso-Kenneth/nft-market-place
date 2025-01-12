"use client";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import GetIpfsUrlFromPinata from "@/app/utils";
import Image from "next/image";
import { WalletContext } from "@/content/wallet";
import MarketPlaceJson from "../../../app/marketplace.json";
import { Book, Brush, Clock, Eye, Heart, Menu, Send, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

type Item = {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

function DetailContent() {
  const params = useParams();
  const tokenId = params.tokenId as string;
  const [item, setItem] = useState<Item | null>(null);
  const [msg, setMsg] = useState("");
  const [btnContent, setBtnContent] = useState("BUY NFT");
  const { isConnected, userAddress, signer } = useContext(WalletContext)!;
  const router = useRouter();

  async function getNFTData() {
    if (!signer) return null;

    const contract = new ethers.Contract(
      MarketPlaceJson.address,
      MarketPlaceJson.abi,
      signer
    );

    let tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getNFTListing(tokenId);

    tokenURI = GetIpfsUrlFromPinata(tokenURI);
    const meta = (await axios.get(tokenURI)).data;

    return {
      price: ethers.formatEther(listedToken.price),
      tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    } as Item;
  }

  useEffect(() => {
    async function fetchData() {
      if (!signer) return;
      try {
        const itemTemp = await getNFTData();
        setItem(itemTemp);
      } catch (error: any) {
        console.error("Error fetching item:", error);
        setItem(null);
      }
    }
    fetchData();
  }, [isConnected]);

  async function buyNFT() {
    try {
      if (!signer) return;
      const contract = new ethers.Contract(
        MarketPlaceJson.address,
        MarketPlaceJson.abi,
        signer
      );

      const salePrice = ethers.parseUnits(item!.price, "ether").toString();
      setBtnContent("Processing....");
      setMsg("Buying NFT.... Please wait (Up to 5 mins)");

      const transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });

      await transaction.wait();
      alert("You successfully bought the NFT!");
      setMsg("");
      setBtnContent("Buy NFT");
      router.push("/");
    } catch (e) {
      console.error("Error buying NFT:", e);
    }
  }

  return (
    <div>
      {isConnected ? (
        <>
          {item ? (
            <div className="mx-10 py-10 flex gap-10">

        <div className='w-[40%]'>
            <div className="h-14 rounded-tl-2xl rounded-tr-2xl bg-[#202020] w-full" />
              <Image
              src={item.image}
              alt={item.name}
              width={1080}
              height={250}
              className='w-full h-[80vh] object-cover rounded-bl-2xl rounded-br-2xl'
            />
          </div>


          <div className='w-[60%]'>
            <div className='text-start font-nunito text-[15px] text-nowrap'>
              <h1>{item.name}</h1>
            </div>

            <div className='text-start font-nunito text-[2rem] font-extrabold text-nowrap'>
              <h1>{item.name}</h1>
            </div>

            <div className='text-start font-nunito text-[15px] text-nowrap'>
              <p className='text-[1.8rem]'>Owned by <span className='text-[16px] '>{item.owner}</span></p>
            </div>

            <div className="flex space-x-5 items-center mb-7" >
              <div className='flex space-x-3'>
                <Eye/>
                <h1>1.2k view</h1>
              </div>
              <div className='flex space-x-3'>
                <Heart/>
                <h1>Likes</h1>
              </div>
              <div className='flex space-x-3'>
                <Brush/>
                <h1>view</h1>
              </div>
            </div>

            <div className='w-full rounded-2xl h-[30vh] border border-[#202020]'>

              <div className='flex space-x-5 py-3 border-b border-[#202020] font-nunito'>
                <Clock className='ml-3'/>
                <p>Sales ends june 21, 2025 at 1:06pm</p>
              </div>

              <div className='ml-3 mt-2 font-nunito font-bold'>
                <h1>Current price</h1>

                <div className='flex space-x-3 items-center'>
                  <div>
                    <h1 className='text-[2rem]'>{item.price}ETH</h1>
                  </div>
                  <div>
                  <p>$362.00</p>
                  </div>
                </div>
              </div>


              <div className='flex gap-10'>

              <div className='w-[50%] h-auto flex ml-5'>
  <Button 
    onClick={buyNFT} 
    className="w-full bg-blue-700 rounded-md flex justify-between items-center"
  >
    <div className="w-[80%] mx-3 border-r border-white ">
      <h1 className="text-center font-nunito text-white uppercase text-2xl">Buy Nft</h1>
    </div>
    <div className="py-3">
      <ShoppingCart className="text-white" />
    </div>
  </Button>
</div>;

                
<div className='w-[50%] h-auto flex ml-5'>
  <Button 
    onClick={buyNFT} 
    className="w-full bg-red-700 rounded-md flex justify-between items-center"
  >
    <div className="w-[80%] mx-3 border-r border-white">
      <h1 className="text-center font-nunito text-white uppercase text-2xl">cancel</h1>
    </div>
    <div className="py-3">
      <ShoppingCart className="text-white" />
    </div>
  </Button>
</div>;

              </div>


            </div>

            <div className='w-full rounded-2xl h-auto border mt-7 border-[#202020]'>

             <div className='flex  space-x-3 border-b border-[#202020] py-2 font-nunito'>
              <Menu className='ml-3'/>
              <h1>Description</h1>
             </div>

             <div className='mt-2 font-nunito border-b border-[#202020] '>
               <h1 className='ml-3 text-[20px]'>By <span className='font-bold'>lilyillo</span></h1>
               <p className='mx-3 mb-2'>{item.description}</p>
             </div>

             <div className='flex  space-x-3 border-b border-[#202020] py-2 font-nunito'>
              <Book className='ml-3'/>
              <h1>Details</h1>
             </div>

             <div className='flex justify-between mx-3 font-nunito text-[18px] mt-3  mb-3'>
              <div className='space-y-3'>
                <h1>Contract Address</h1>
                <h1>Token ID</h1>
                <h1>Token Standard</h1>
                <h1>Metadata</h1>
                <h1>Creator Earnings</h1>
              </div>

              <div className='space-y-3  flex flex-col justify-end'>
              <h1>0x498a........</h1>
              <h1>{item.tokenId}</h1>
              <h1>ERC-7200</h1>
              <h1>Frozen</h1>
              <h1>10%</h1>
              </div>

             </div>


            </div>

          </div>
              
            </div>
          ) : (
            <p>Loading item details...</p>
          )}
        </>
      ) : (
        <h1>You are not connected</h1>
      )}
    </div>
  );
}

export default DetailContent;
