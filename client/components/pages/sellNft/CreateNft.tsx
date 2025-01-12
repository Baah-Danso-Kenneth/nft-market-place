"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../../app/pinata";
import marketplace from "../../../app/marketplace.json";
import { ethers } from "ethers";
import { WalletContext } from "@/content/wallet";
import { Cloud, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";


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
        <div className="flex justify-between mx-10 gap-20 py-20">

          <div className="w-[40%]">
            <div>
              <h1 className="text-4xl font-extrabold">Create Nft</h1>
              <p>Keep nft created cannot be reverted so please locked that in</p>
            </div>

            <div className="border border-dashed border-blue-500 rounded-md  h-[50vh] flex flex-col justify-center items-center">
                 <Cloud className="w-40 h-28"/>
                 <div><h1>Drag and drop files</h1></div>
  
                 <div className="flex flex-col justify-center items-center mt-5">
                     <label htmlFor="" className="text-[20px] block mb-3">Upload images</label>
                     <input type="file"  className="w-full py-3" value={formParams.name} onChange={onFileChange}/>
                  </div>

            </div>


          </div>

          <div className="w-[60%]">
            <div>
              <h1 className="font-bold mb-3">Create*</h1>
            </div>
              <div className=" flex items-center w-[50%] mb-3 rounded-2xl border space-x-4 h-auto py-6">
                <Plus className="ml-3 bg-black rounded-md text-white "/>
                <h1 className="text-nowrap text-3xl">Create Nft collection</h1>
              </div>

                <form className="space-y-3 uppercase">
                  <div>
                     <label htmlFor="" className="text-[20px] block mb-3">name</label>
                     <input type="text" className="w-full py-3 bg-transparent border border-black rounded-md" value={formParams.name} onChange={(e)=>updateFormParams({...formParams,name:e.target.value})}/>
                  </div>

                  <div>
                     <label htmlFor="" className="text-[20px] block mb-3">price</label>
                     <input type="text" className="w-full py-3" value={formParams.name} onChange={(e)=>updateFormParams({...formParams,name:e.target.value})}/>
                  </div>

                  <div>
                     <label htmlFor="" className="text-[20px] block mb-3">description</label>
                     <input type="text" className="w-full py-3" value={formParams.name} onChange={(e)=>updateFormParams({...formParams,name:e.target.value})}/>
                  </div>

                  <Button className="w-full py-5">Create</Button>
                 
                </form>
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
