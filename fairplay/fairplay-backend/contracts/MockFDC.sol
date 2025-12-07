// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MockFDC {
    // Simulates verifying a payment. 
    // In reality, this would check a Merkle Proof.
    // Here, we just return TRUE and derive a fake address from the "sender" string.
    function verifyPayment(bytes32 _txHash, uint256 _amount, string memory _memo) 
        external 
        pure 
        returns (bool, address) 
    {
        // We simulate that the "sender" string (e.g., "rMyXrpWallet...") 
        // maps to a specific Flare address.
        // For testing, we just return a random hardcoded address or hash the string.
        address derivedAddress = address(uint160(uint256(keccak256(abi.encodePacked(_txHash)))));
        return (true, derivedAddress);
    }
}