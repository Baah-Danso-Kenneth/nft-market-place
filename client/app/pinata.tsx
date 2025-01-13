"use server";

import axios from "axios";

const jwt = process.env.NEW_JWT;

export const uploadJSONToIPFS = async (JSONBody: Record<string, unknown>) => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error uploading JSON to Pinata:", error.response?.data);
      return {
        success: false,
        message: error.response?.data || "Unknown error",
      };
    }
    console.error("An unexpected error occurred:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export const uploadFileToIPFS = async (data: FormData) => {
  const file = data.get("file");
  const pinataMetadata = JSON.stringify({
    name: file instanceof File ? file.name : "unknown",
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
        maxBodyLength: Infinity, // Fixed to a numeric value
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error uploading file to Pinata:", error.response?.data);
      return {
        success: false,
        message: error.response?.data || "Unknown error",
      };
    }
    console.error("An unexpected error occurred:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};
