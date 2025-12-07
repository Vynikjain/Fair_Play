// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FairPlay {
    struct Match {
        address player1;
        address player2;
        uint256 wagerAmount;
        bool isActive;
        string gameId;
    }

    IERC20 public paymentToken;
    address public fdcVerifier;
    mapping(bytes32 => Match) public matches;

    // NEW: Allow a specific controller to bypass checks
    address public smartAccountController;

    constructor(address _tokenAddress, address _verifier) {
        paymentToken = IERC20(_tokenAddress);
        fdcVerifier = _verifier;
    }

    function setController(address _controller) external {
        smartAccountController = _controller;
    }

    function createMatch(string memory _gameId, uint256 _amount) external {
        require(_amount > 0, "Zero wager");
        require(paymentToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        bytes32 matchHash = keccak256(abi.encodePacked(_gameId, msg.sender));
        matches[matchHash] = Match(msg.sender, address(0), _amount, true, _gameId);
    }

    // NEW: The Controller calls this
    function joinMatchFor(bytes32 _matchHash, address _player) external {
        require(msg.sender == smartAccountController, "Unauthorized");

        Match storage game = matches[_matchHash];
        require(game.isActive, "Inactive match");
        require(game.player2 == address(0), "Match full");

        // The Controller pays the entry fee
        require(paymentToken.transferFrom(msg.sender, address(this), game.wagerAmount), "Transfer failed");

        game.player2 = _player;
    }

    function joinMatch(bytes32 _matchHash) external {
        Match storage game = matches[_matchHash];
        require(game.isActive, "Inactive match");
        require(game.player2 == address(0), "Match full");
        require(paymentToken.transferFrom(msg.sender, address(this), game.wagerAmount), "Transfer failed");
        game.player2 = msg.sender;
    }

    // ... (payoutWinner remains the same)
}