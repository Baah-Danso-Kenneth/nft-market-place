require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test",
  },
  networks: {
    hardhat: {}, // Default Hardhat network
    local: { // Alias for the same Hardhat node
      url: "http://127.0.0.1:8545",
    },
  },
};
