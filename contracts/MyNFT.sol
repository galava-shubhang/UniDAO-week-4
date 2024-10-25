// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {
        _tokenIdCounter = 0;
    }

    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        require(recipient != address(0), "Cannot mint to zero address");
        
        uint256 newItemId = _tokenIdCounter + 1;
        _tokenIdCounter = newItemId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    function getCurrentCounter() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
