const {expect} = require("chai");
const { ethers } = require("hardhat");
const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)



describe("NFTMarketplace",  function(){
    let deployer, addr1, addr2, nft, marketplace;
    let feePercent = 1;
    let feeAccount=0;
    let URI= "same URI"

    beforeEach(async ()=>{
        const NFT = await ethers.getContractFactory("NFT");
        const Marketplace = await ethers.getContractFactory("Marketplace");
        [deployer, addr1, addr2] = await ethers.getSigners();
    
        nft = await NFT.deploy();
        marketplace = await Marketplace.deploy(feePercent);
    });

    describe("Deployment", ()=>{
        it("Should track name and symbol of nft collection", async function(){
            expect(await nft.name()).to.equal("DApp NFT")
            expect(await nft.symbol()).to.equal("DAPP")

        });
        it("Should track feeAccount and feePercent of the marketplace", async function(){
            expect(await marketplace.feeAccount()).to.equal(deployer.address)
            expect(await marketplace.feePercent()).to.equal(feePercent)

        })
    });

    describe("Minting NFTs", ()=>{
        it("should track each minted NFT", async function(){
            await nft.connect(addr1).mint(URI)
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);

            await nft.connect(addr2).mint(URI)
            expect(await nft.tokenCount()).to.equal(2);
            expect(await nft.balanceOf(addr2.address)).to.equal(1);
            expect(await nft.tokenURI(2)).to.equal(URI);
        })
    });


    describe("Making a marketplace items", () => {
        beforeEach(async function () {
            await nft.connect(addr1).mint(URI);
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
        });
    
        it("Should track newly created item, transfer NFT from seller to marketplace and emit offered", async () => {
            const price = ethers.utils.parseEther("1"); // Convert price to wei
            await expect(marketplace.connect(addr1).makeItem(nft.address, 1, price))
                .to.emit(marketplace, "Offerred")
                .withArgs(1, nft.address, price, 1, addr1.address);
    
            expect(await nft.ownerOf(1)).to.equal(marketplace.address);
            expect(await marketplace.itemCount()).to.equal(1);
    
            const item = await marketplace.items(1);
            expect(item.itemId).to.equal(1);
            expect(item.nft).to.equal(nft.address);
            expect(item.price).to.equal(price);
            expect(item.sold).to.equal(false);
        });
    
        it("should fail if price is set to zero", async () => {
            await expect(
                marketplace.connect(addr1).makeItem(nft.address, 1, 0)
            ).to.be.revertedWith("Price must be greater than zero");
        });
    });
    
})