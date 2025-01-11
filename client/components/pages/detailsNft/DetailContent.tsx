"use client";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import GetIpfsUrlFromPinata from "@/app/utils";
import Image from "next/image";
import { WalletContext } from "@/content/wallet";
import MarketPlaceJson from "../../../app/marketplace.json";

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
            <>
              <div>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="object-cover"
                />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Price: {item.price} ETH</p>
                <p>Seller: {item.seller}</p>
                <button onClick={buyNFT}>{btnContent}</button>
                {msg && <p>{msg}</p>}
              </div>
            </>
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
