"use client"
import { WalletContext } from '@/content/wallet';
import axios from 'axios';
import { ethers } from 'ethers';
import { ArrowUpToLine, Dot, Ellipsis, Pen,Wallet } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import MarketplaceJson from '../../../app/marketplace.json'
import NftCard from '../marketPlace/NftCard';


type NFTItem = {
  price: string;
  tokenId: number;
  title:string;
  owner: string;
  image: string;
  name: string;
  description: string;
  sumPrice?: number
};


type NftCarouselProp = {
    name: string;
    title: string;
    image: string;
    tokenId: string;
    description: string;
    price?: string;
    date_created?: string;
    category?: string;
    buzz?: string;
    sold?: boolean;
    isVertical?: boolean;
    promo?: boolean;
  };


function ProfileContent() {
  const [items, setItems] = useState<NftCarouselProp[] | undefined>();
  const { isConnected, signer, userAddress } = useContext(WalletContext) ?? {};
  const [sumPrice, setSumPrice]=useState("0");

  async function getNFTitems() {
    const itemsArray: NftCarouselProp[] = [];
    let sumPrice=0;
    if (!signer) {
      console.error("Signer is not available");
      return;
    }

    const contract = new ethers.Contract(
      MarketplaceJson.address,
      MarketplaceJson.abi,
      signer
    );

    const transaction = await contract.getMyNFTs();

    for (const i of transaction) {
      const tokenId = parseInt(i.tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      const meta = (await axios.get(tokenURI)).data as {
        image: string;
        name: string;
        description: string;
      };
      const price = ethers.formatEther(i.price);

      // Create an NFTItem from the raw data
      const item: NFTItem = {
        price,
        tokenId,
        owner: i.owner,
        image: meta.image,
        title: meta.name,
        name: meta.name,
        description: meta.description,
      };

      // Map NFTItem to NftCarouselProp
      const cardItem: NftCarouselProp = {
        name: item.name,
        title: item.title,
        image: item.image,
        tokenId: item.tokenId.toString(),
        description: item.description,
        price: item.price,
        date_created: undefined, // Default values for optional fields
        category: undefined,
        buzz: undefined,
        sold: false,
        isVertical: false,
        promo: false,
      };

      itemsArray.push(cardItem);
      sumPrice += Number(price)
    }
    setSumPrice(sumPrice.toFixed(2))
    return itemsArray;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsArray = await getNFTitems();
        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };

    fetchData();
  }, [isConnected]);


  return (
    <div>
       {isConnected ?
        (
          <div className='w-full  relative   border-black shadow-lg'>
          <Image
           src="/images/carbon-fibre-big.png"
           alt="clean"
           width={1030}
           height={930}
           className='w-full h-[50vh] object-cover object-top'
          />
          
           <div className='absolute top-[5rem] flex gap-[55rem] left-10'>

              <div className='flex gap-5'>
                
                <div>
                <Image src="/images/base2_nft.png"
                 alt="pronto"
                width={1030}
                height={500}
                className='w-40 h-40 rounded-2xl border border-black dark:border-white object-cover'
              />
            </div>


                <div className='space-y-8'>
              <div className='flex gap-5 '>
                <div className='flex px-3 rounded-md uppercase bg-white py-1 w-20 dark:bg-black dark:border'>
                  <Pen className='mr-2'/>
                  <h1>Art</h1>
                </div>

                <div className='flex bg-green-100 px-2  rounded-xl items-center'>
                  <Dot className='text-green-400 space-x-4  font-extrabold'/>
                  <h1 className='text-green-400 font-nunito text-[12px] uppercase font-bold py-1'>public minting</h1>
                </div>
              </div>

              <div><h1 className='text-3xl font-nunito font-bold dark:text-white'>{sumPrice}</h1></div>

              <div className='flex items-center gap-5 text-white'>
           
                <div className='flex space-x-2 text-black dark:text-white'>
                  <h1>N0: of NFTs</h1>
                  <h1 className='font-bold font-nunito text-nowrap'>{items?.length}</h1>
                </div>
                
                <div className='flex space-x-2 dark:text-white'>
                  <Wallet className='text-black dark:text-white'/>
                 
                  <h1 className='text-black dark:text-white'>{userAddress?.slice(0,8)}...</h1>
                </div>

                </div>
            </div> 

              </div>

              <div className='flex space-x-3 dark:text-white '>
                <ArrowUpToLine className=''/>
                <Ellipsis/>
              </div>

            </div>

             {items && items.length > 0 ?
              (<div className='grid grid-cols-2'>
               {items?.map((value)=>(
                <NftCard nft={value} key={value.name}/>
               ))}
              </div>)
              : 
                <div>no nft &apos;s</div>}
             </div>
            )
           :
        (
          <h1>You are not connected</h1>
        )}
    </div>
  )
}

export default ProfileContent