import { ethers } from "ethers";

export function getProvider(): ethers.Provider {
  return ethers.getDefaultProvider("ropsten", {
    alchemy: process.env.ALCHEMY_API_KEY,
  });
}