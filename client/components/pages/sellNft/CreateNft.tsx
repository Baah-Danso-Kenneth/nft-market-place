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
  const [btn, setBtn] = useState(false);
  const [btnContent, setBtnContent] = useState("List NFT");
  const router = useRouter();
  const { isConnected, signer } = useContext(WalletContext)!;


  async function onFileChange(e: any) {
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.set("file", file);
      setBtn(false);
      updateMessage("Uploading image... Please don't click anything!");
      const response = await uploadFileToIPFS(data);
      if (response.success === true) {
        setBtn(true);
        updateMessage("");
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload...", e);
    }
  }

  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    if (!name || !description || !price || !fileURL) {
      updateMessage("Please fill all the fields!");
      return -1;
    }

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      console.log("Error uploading JSON metadata: ", e);
    }
  }

  async function listNFT(e: any) {
    try {
      setBtnContent("Processing...");
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;

      updateMessage("Uploading NFT...Please dont click anything!");

      let contract = new ethers.Contract(
        marketplace.address,
        marketplace.abi,
        signer
      );
      const price = ethers.parseEther(formParams.price);

      let transaction = await contract.createToken(metadataURL, price);
      await transaction.wait();

      setBtnContent("List NFT");
      setBtn(false);
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      alert("Successfully listed your NFT!");
      router.push("/");
    } catch (e) {
      alert("Upload error");
    }
  }

  return (
    <div>
      {isConnected ? (
        <div>
          <div>
            <h2>Upload your NFT</h2>
            <div>
              <div>
                <label>NFT name</label>
                <input
                  type="text"
                  value={formParams.name}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label>NFT description</label>
                <textarea
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Price (in Eth)</label>
                <input
                  type="number"
                  value={formParams.price}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Upload image</label>
                <input
                  type="file"
                  onChange={onFileChange}
                />
              </div>
              <br />
              <div>{message}</div>
              <button onClick={listNFT} type="submit">
                {btnContent}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>Connect Your Wallet to Continue...</div>
        </div>
      )}
    </div>
  );
}
