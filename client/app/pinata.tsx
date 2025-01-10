"use server";

const axios = require("axios");
const jwt = process.env.PINATA_JWT;

export const uploadJSONToIPFS = async (JSONBody:any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  try {
    const res = await axios.post(url, JSONBody, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("Pinata response for JSON:", res.data);
    return {
      success: true,
      pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
    };
  } catch (error:any) {
    console.error("Error uploading JSON to Pinata:", error);
    return {
      success: false,
      message: error.message || "Unknown error",
    };
  }
};

export const uploadFileToIPFS = async (data:any) => {
  const pinataMetadata = JSON.stringify({
    name: data.get("file").name,
  });
  data.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  data.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Pinata response for file:", res.data);
    return {
      success: true,
      pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
    };
  } catch (error:any) {
    console.error("Error uploading file to Pinata:", error);
    return {
      success: false,
      message: error.message || "Unknown error",
    };
  }
};
