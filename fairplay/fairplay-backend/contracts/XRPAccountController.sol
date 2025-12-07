// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFairPlay {
    function joinMatchFor(bytes32 _matchHash, address _player) external;
}

interface IMockFDC {
    function verifyPayment(bytes32 _txHash, uint256 _amount, string memory _memo) external view returns (bool, address);
}

contract XRPAccountController {
    IFairPlay public fairPlay;
    IMockFDC public fdc;
    IERC20 public fbtc;

    mapping(bytes32 => bool) public processedTx;

    constructor(address _fairPlay, address _fdc, address _fbtc) {
        fairPlay = IFairPlay(_fairPlay);
        fdc = IMockFDC(_fdc);
        fbtc = IERC20(_fbtc);
    }

    // The "Relayer" calls this function with the XRP Transaction Hash
    function executeXRPAction(bytes32 _xrpTxHash, string memory _gameId) external {
        require(!processedTx[_xrpTxHash], "Tx already used");

        // 1. Ask FDC: "Did this transaction happen?"
        (bool valid, address derivedPlayer) = fdc.verifyPayment(_xrpTxHash, 50 ether, _gameId);
        require(valid, "Invalid XRP Payment");

        // 2. Mark as processed so it can't be replayed
        processedTx[_xrpTxHash] = true;

        // 3. Auto-Join the Tournament
        // We approve FairPlay to spend OUR (The Controller's) FBTC
        fbtc.approve(address(fairPlay), 50 * 10**18);

        // Calculate the match hash (must match FairPlay's logic)
        bytes32 matchHash = keccak256(abi.encodePacked(_gameId, msg.sender)); 
        // NOTE: In a real app, matchHash logic would be more robust. 
        // For this MVP, we assume the specific matchHash is passed or known.

        // For simplicity in this MVP, we are just going to call a specialized join function
        // We need to update FairPlay to accept this.
        fairPlay.joinMatchFor(matchHash, derivedPlayer);
    }
}