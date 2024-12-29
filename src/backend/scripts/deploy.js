import { promises as fs } from "fs";
import hre from 'hardhat';
import { fileURLToPath } from 'url';
import path from 'path';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// async function main() {
//   const [deployer] = await hre.ethers.getSigners();

//   console.log("Deploying contracts with the account:", deployer.address);
//   console.log("Account balance:", (await deployer.getBalance()).toString());

//   // Get the ContractFactories and Signers here.
//   const NFT = await hre.ethers.getContractFactory("NFT");
//   const Marketplace = await hre.ethers.getContractFactory("Marketplace");

//   // Deploy contracts
//   const marketplace = await Marketplace.deploy(1);
//   const nft = await NFT.deploy();

//   // Save copies of each contract's ABI and address to the frontend
//   saveFrontendFiles(marketplace, "Marketplace");
//   saveFrontendFiles(nft, "NFT");
// }


// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });



async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  
  // Get the ContractFactories and Signers here.
  const NFT = await hre.ethers.getContractFactory("NFT");
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  // deploy contracts
  const marketplace = await Marketplace.deploy(1);
  const nft = await NFT.deploy();
  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(marketplace , "Marketplace");
  saveFrontendFiles(nft , "NFT");
}

async function saveFrontendFiles(contract, name) {
  const contractsDir = path.resolve(__dirname, "../../frontend/contractsData");
  console.log("Saving to directory:", contractsDir);

  // Ensure directory exists
  try {
    await fs.mkdir(contractsDir, { recursive: true });
    console.log(`Directory ${contractsDir} created successfully.`);
  } catch (error) {
    console.error(`Error creating directory ${contractsDir}:`, error);
    return;
  }

  // Write the address file
  try {
    await fs.writeFile(
      path.join(contractsDir, `${name}-address.json`),
      JSON.stringify({ address: contract.address }, null, 2)
    );
    console.log(`Address file written for ${name}`);
  } catch (error) {
    console.error(`Error writing address file for ${name}:`, error);
    return;
  }

  // Write the contract artifact
  try {
    const contractArtifact = await hre.artifacts.readArtifact(name);
    await fs.writeFile(
      path.join(contractsDir, `${name}.json`),
      JSON.stringify(contractArtifact, null, 2)
    );
    console.log(`Artifact file written for ${name}`);
  } catch (error) {
    console.error(`Error writing artifact file for ${name}:`, error);
  }
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });