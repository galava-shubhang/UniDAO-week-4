import { task } from 'hardhat/config';
import { Contract } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';


task('deploy', 'Deploys the NFT contract').setAction(async (_, hre) => {
  try {
    const NFT = await hre.ethers.getContractFactory('MyNFT');
    const nft = await NFT.deploy();
    await nft.waitForDeployment(); 

    const address = await nft.getAddress(); 
    console.log('NFT deployed to:', address);


    return address;
  } catch (error) {
    console.error('Error deploying contract:', error);
    throw error;
  }
});


task('mint', 'Mints an NFT')
  .addParam('contract', 'The address of the NFT contract')
  .addParam('recipient', 'The address of the recipient')
  .setAction(async (taskArgs, hre) => {
    try {
      const [signer] = await hre.ethers.getSigners();
      console.log('Minting from account:', signer.address);

      const nft = await hre.ethers.getContractAt('MyNFT', taskArgs.contract);

      const owner = await nft.owner();
      if (owner.toLowerCase() !== signer.address.toLowerCase()) {
        throw new Error(
          `Only the contract owner can mint. Owner: ${owner}, Signer: ${signer.address}`,
        );
      }

      console.log('Minting NFT...');
      const tx = await nft.mintNFT(taskArgs.recipient);
      console.log('Transaction hash:', tx.hash);

      console.log('Waiting for transaction confirmation...');
      const receipt = await tx.wait();

      const tokenId = await nft.getCurrentCounter();

      console.log('\nMinting successful!');
      console.log('Transaction receipt:', receipt.hash);
      console.log('Token ID:', tokenId.toString());
      console.log('Recipient:', taskArgs.recipient);
      console.log('Contract:', taskArgs.contract);

      return tokenId;
    } catch (error) {
      if (error.message?.includes('execution reverted')) {
        console.error('Transaction reverted. Common causes:');
        console.error('- Sender is not the contract owner');
        console.error('- Invalid recipient address');
      }
      console.error('\nError details:', error);
      throw error;
    }
  });
