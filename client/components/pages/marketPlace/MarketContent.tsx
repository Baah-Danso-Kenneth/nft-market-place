"use client";

import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceJson from "../../../app/marketplace.json";
import axios from "axios";
import { WalletContext } from "@/content/wallet";
import NftCard from "./NftCard";

type NFTItem = {
  price: string;
  tokenId: number;
  title:string;
  owner: string;
  image: string;
  name: string;
  description: string;
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


  export default function MarketContent() {
    const [items, setItems] = useState<NftCarouselProp[] | undefined>();
    const { isConnected, signer } = useContext(WalletContext) ?? {};
  
    async function getNFTitems() {
      const itemsArray: NftCarouselProp[] = [];
      if (!signer) {
        console.error("Signer is not available");
        return;
      }
  
      const contract = new ethers.Contract(
        MarketplaceJson.address,
        MarketplaceJson.abi,
        signer
      );
  
      const transaction = await contract.getAllListedNFTs();
  
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
      }
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
        {isConnected ? (
          items && items.length > 0 ? (
            <div>
              {items.map((value, index) => (
                <NftCard nft={value} key={index} />
              ))}
            </div>
          ) : (
            <div>No NFT Listed Now...</div>
          )
        ) : (
          <div>You are not connected...</div>
        )}
      </div>
    );
  }