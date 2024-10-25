import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";

describe("MyNFT Contract", function () {
  let myNFT: Contract;
  let owner: Signer;
  let addr1: Signer;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy();
  });

  it("Should deploy the contract and set the correct owner", async function () {
    const contractOwner = await myNFT.owner();
    expect(contractOwner).to.equal(await owner.getAddress());
  });

  it("Should mint an NFT and increment the token counter", async function () {
    const recipient = await addr1.getAddress();

    await myNFT.mintNFT(recipient);

    const currentCounter = await myNFT.getCurrentCounter();
    expect(currentCounter).to.equal(1);

    const tokenOwner = await myNFT.ownerOf(currentCounter);
    expect(tokenOwner).to.equal(recipient);
  });

  it("Should not allow non-owner to mint NFTs", async function () {
    const recipient = await addr1.getAddress();

    await expect(
      myNFT.connect(addr1).mintNFT(recipient)
    ).to.be.reverted; 
  });
});


