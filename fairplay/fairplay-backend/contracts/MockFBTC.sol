// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockFBTC is ERC20 {
    constructor() ERC20("Mock Flare Bitcoin", "FBTC") {
        _mint(msg.sender, 1000 * 10**18); // Mint 1000 FBTC to deployer
    }
}