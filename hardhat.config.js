require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Add this line to load .env variables

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    alfajores: {
      url: process.env.API_URL, 
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    }
  }
};
