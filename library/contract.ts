import { Contract, ethers } from "ethers"; 
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { env } from "./env"; 
import { getProvider } from "./provider";

export async function getContract(
  name: string,
  hre: HardhatRuntimeEnvironment
): Promise<Contract> {
  
  const WALLET = new ethers.Wallet(env("ETH_PRIVATE_KEY"), getProvider());

  const contract = await hre.ethers.getContractAt(name, env("NFT_CONTRACT_ADDRESS"), WALLET);

  return contract;
}

