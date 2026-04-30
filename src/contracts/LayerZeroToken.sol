// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LayerZeroToken is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    
    // Security: Blacklist mapping for malicious actors
    mapping(address => bool) public isBlacklisted;
    
    // Security: Emergency pause state
    bool public isPaused;
    
    // Security: Max transaction amount (Anti-whale). Set to 0 to disable.
    uint256 public maxTxAmount;
    
    // Events for security actions
    event Blacklisted(address indexed account, bool isBlacklisted);
    event Paused(bool isPaused);
    event MaxTxAmountUpdated(uint256 maxTxAmount);

    constructor() 
        ERC20("LayerZero", "ZRO") 
        ERC20Permit("LayerZero") 
        Ownable(msg.sender) 
    {
        // Mint 1 billion tokens to the deployer by default
        _mint(msg.sender, 1000000000 * 10 ** decimals());
        
        // Example: Set max tx to 1% of total supply (10,000,000 tokens)
        maxTxAmount = 10000000 * 10 ** decimals();
    }

    // --- Security Admin Functions ---

    function setBlacklist(address account, bool value) external onlyOwner {
        isBlacklisted[account] = value;
        emit Blacklisted(account, value);
    }

    function setPaused(bool value) external onlyOwner {
        isPaused = value;
        emit Paused(value);
    }

    function setMaxTxAmount(uint256 amount) external onlyOwner {
        maxTxAmount = amount;
        emit MaxTxAmountUpdated(amount);
    }

    // --- Security Overrides ---

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(!isPaused, "Token is paused");
        require(!isBlacklisted[msg.sender], "Sender is blacklisted");
        require(!isBlacklisted[to], "Receiver is blacklisted");
        
        if (msg.sender != owner() && to != owner() && maxTxAmount > 0) {
            require(amount <= maxTxAmount, "Transfer exceeds max transaction amount");
        }
        
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(!isPaused, "Token is paused");
        require(!isBlacklisted[from], "Sender is blacklisted");
        require(!isBlacklisted[to], "Receiver is blacklisted");
        require(!isBlacklisted[msg.sender], "Caller is blacklisted");
        
        if (from != owner() && to != owner() && msg.sender != owner() && maxTxAmount > 0) {
            require(amount <= maxTxAmount, "Transfer exceeds max transaction amount");
        }
        
        return super.transferFrom(from, to, amount);
    }

    // Allow the owner to mint more tokens if needed
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

