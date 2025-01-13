"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../../app/pinata";
import marketplace from "../../../app/marketplace.json";
import { ethers } from "ethers";
import { WalletContext } from "@/content/wallet";

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState<string | undefined>(undefined);
  const [message, updateMessage] = useState("");
  const [btnContent, setBtnContent] = useState("List NFT");
  const router = useRouter();
  const { isConnected, signer } = useContext(WalletContext)!;

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const data = new FormData();
      data.set("file", file);
      updateMessage("Uploading image... Please don't click anything!");
      const response = await uploadFileToIPFS(data);
      if (response.success) {
        updateMessage("");
        setFileURL(response.pinataURL);
      }
    } catch (err) {
      console.error("Error during file upload...", err);
    }
  }

  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    if (!name || !description || !price || !fileURL) {
      updateMessage("Please fill all the fields!");
      return null;
    }

    const nftJSON = { name, description, price, image: fileURL };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      return response.success ? response.pinataURL : null;
    } catch (err) {
      console.error("Error uploading JSON metadata: ", err);
      return null;
    }
  }

  async function listNFT(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setBtnContent("Processing...");
      const metadataURL = await uploadMetadataToIPFS();
      if (!metadataURL) return;

      updateMessage("Uploading NFT... Please don't click anything!");

      const contract = new ethers.Contract(
        marketplace.address,
        marketplace.abi,
        signer
      );
      const price = ethers.parseEther(formParams.price);
      const transaction = await contract.createToken(metadataURL, price);
      await transaction.wait();

      setBtnContent("List NFT");
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      alert("Successfully listed your NFT!");
      router.push("/");
    } catch (err:unknown) {
      alert(err);
    }
  }

  return (
    <div>
      {isConnected ? (
        <div>
          <h2>Upload your NFT</h2>
          <div>
            <label>NFT name</label>
            <input
              type="text"
              value={formParams.name}
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
            />
            <label>NFT description</label>
            <textarea
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
            />
            <label>Price (in Eth)</label>
            <input
              type="number"
              value={formParams.price}
              onChange={(e) =>
                updateFormParams({ ...formParams, price: e.target.value })
              }
            />
            <label>Upload image</label>
            <input type="file" onChange={onFileChange} />
            <div>{message}</div>
            <button onClick={listNFT}>{btnContent}</button>
          </div>
        </div>
      ) : (
        <div>Connect Your Wallet to Continue...</div>
      )}
    </div>
  );
}
