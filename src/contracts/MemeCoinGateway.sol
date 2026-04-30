// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MemeCoinGateway is Ownable, ReentrancyGuard, Pausable {

    using SafeERC20 for IERC20;

    IERC20 public immutable token;

    uint256 public tokensPerBNB = 62500 * 1e18;
    uint256 public claimAmount = 500 * 1e18;
    uint256 public claimFee = 0.008 ether;
    uint256 public maxBuyPerTx = 5 ether;

    address public taxWallet = 0x4BB80987086B4366a695f8AcE5b0c8Da10896a99;

    mapping(address => bool) public hasClaimed;

    event TokensPurchased(address indexed buyer, uint256 bnbAmount, uint256 tokenAmount);
    event TokensClaimed(address indexed user, uint256 tokenAmount);
    event BNBWithdrawn(uint256 amount);
    event TokensDeposited(uint256 amount);
    event TokensPerBNBUpdated(uint256 newRate);
    event ClaimFeeUpdated(uint256 newFee);
    event ClaimAmountUpdated(uint256 newAmount);
    event MaxBuyUpdated(uint256 newLimit);
    event TaxDistributed(uint256 amount);
    event TaxWalletUpdated(address newWallet);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Invalid token");
        token = IERC20(_tokenAddress);
    }

    receive() external payable {
        buyTokens(0);
    }

    function buyTokens(uint256 minExpectedTokens) public payable nonReentrant whenNotPaused {
        require(msg.value > 0, "Send BNB");
        require(msg.value <= maxBuyPerTx, "Exceeds max buy");

        uint256 tokenAmount = (msg.value * tokensPerBNB) / 1 ether;
        require(tokenAmount > 0, "Zero tokens expected");
        require(tokenAmount >= minExpectedTokens, "Slippage: Too few tokens");
        require(token.balanceOf(address(this)) >= tokenAmount, "Insufficient liquidity");

        // 15% Tax Logic
        uint256 tax = msg.value * 15 / 100;
        if (tax > 0) {
            (bool success, ) = payable(taxWallet).call{value: tax}("");
            require(success, "Tax transfer failed");
            emit TaxDistributed(tax);
        }

        token.safeTransfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    function claimTokens() external payable nonReentrant whenNotPaused {
        require(msg.value >= claimFee, "Insufficient claim fee");
        require(token.balanceOf(address(this)) >= claimAmount, "Insufficient tokens");
        require(!hasClaimed[msg.sender], "Already claimed");

        hasClaimed[msg.sender] = true;

        // 15% Tax Logic
        uint256 tax = msg.value * 15 / 100;
        if (tax > 0) {
            (bool success, ) = payable(taxWallet).call{value: tax}("");
            require(success, "Tax transfer failed");
            emit TaxDistributed(tax);
        }

        token.safeTransfer(msg.sender, claimAmount);

        emit TokensClaimed(msg.sender, claimAmount);
    }

    function withdrawBNB() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No BNB");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "BNB transfer failed");

        emit BNBWithdrawn(balance);
    }

    function depositTokens(uint256 amount) external onlyOwner {
        require(amount > 0, "Invalid amount");

        token.safeTransferFrom(msg.sender, address(this), amount);

        emit TokensDeposited(amount);
    }

    function setTokensPerBNB(uint256 newRate) external onlyOwner {
        require(newRate > 0, "Invalid rate");
        tokensPerBNB = newRate;
        emit TokensPerBNBUpdated(newRate);
    }

    function setClaimFee(uint256 newFee) external onlyOwner {
        claimFee = newFee;
        emit ClaimFeeUpdated(newFee);
    }

    function setClaimAmount(uint256 newAmount) external onlyOwner {
        require(newAmount > 0, "Invalid amount");
        claimAmount = newAmount;
        emit ClaimAmountUpdated(newAmount);
    }

    function setMaxBuyPerTx(uint256 newLimit) external onlyOwner {
        require(newLimit > 0, "Invalid limit");
        maxBuyPerTx = newLimit;
        emit MaxBuyUpdated(newLimit);
    }

    function setTaxWallet(address _newWallet) external onlyOwner {
        require(_newWallet != address(0), "Invalid address");
        taxWallet = _newWallet;
        emit TaxWalletUpdated(_newWallet);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function getTokenBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function getBNBBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function emergencyWithdrawForeignToken(address _token, uint256 amount) external onlyOwner {
        require(_token != address(0), "Invalid token address");
        require(_token != address(token), "Cannot withdraw main token");
        IERC20(_token).safeTransfer(owner(), amount);
    }
}
