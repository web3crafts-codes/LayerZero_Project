# ⚡ ODIN - The God of Bitcoin (Meme Coin Marketplace)

> *“Built on Bitcoin mechanics, lives on BSC. The first God Meme Coin.”*

A decentralized application (dApp) for the ODIN meme coin ecosystem, built with **Next.js 14**, **TailwindCSS**, and **Wagmi/Viem**. This project features a high-performance landing page with 3D elements, real-time blockchain interactions, and a fully functional presale & airdrop system.

![ODIN Banner](public/globe.svg) *Add a banner image here if available*

## 🌟 Features

### Core Functionality
-   **🚀 Presale/Buy System:** Users can purchase ODIN tokens directly with BNB. Includes real-time price calculation, gas estimation, and success confetti!
-   **🎁 Airdrop Claim:** Eligibility-based airdrop system where users pay a small gas fee to claim free tokens.
-   **💼 Waller Connection:** Seamless integration with **RainbowKit** (MetaMask, Trust Wallet, WalletConnect).
-   **📊 Tokenomics Dashboard:** Interactive charts displaying token distribution (Liquidity, Marketing, Team, etc.).
-   **👑 Admin Dashboard:** Protected route for the contract owner to withdraw BNB raised and deposit tokens for the airdrop.

### UX/UI & Immersion
-   **🌌 "Odin" Design Theme:** Dark mode with gold accents, runic textures, and glassmorphism.
-   **🧊 3D Hero Element:** Interactive 3D Coin rendered with **Three.js** / **React Three Fiber**.
-   **✨ Animations:** Smooth scroll reveals and micro-interactions using **Framer Motion**.
-   **📱 Fully Responsive:** Optimized for both desktop and mobile (including mobile navigation).

---

## 🛠️ Tech Stack

-   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling:** [TailwindCSS](https://tailwindcss.com/)
-   **Blockchain:** [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/)
-   **Wallet UI:** [RainbowKit](https://www.rainbowkit.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **3D Graphics:** [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
-   **Icons:** [Lucide React](https://lucide.dev/)

---

## 📜 Smart Contracts & Support

The smart contract code driving this project is highly specialized. **For access to the core smart contract code, custom blockchain development, or any smart contract related inquiries, please reach out directly to me.**

Current deployed contracts (BSC Testnet):

| Contract | Address | Description |
| :--- | :--- | :--- |
| **ODIN Token** | `0x2C85d93d6a8043764525b2792CC38e7a92bD0791` | The main ERC20/BEP20 token. |
| **Presale Guarantee** | `0xc6128c37E38b2721B7002481Ca43f80BF9eC40da` | Handles the buy logic, airdrop claims, and taxes. |

> **Note:** Always verify contracts on [BscScan](https://testnet.bscscan.com/) before interacting with real funds.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/ankit-gupta77/memecoin_projects.git
cd meme-marketplace
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Main Landing Page
│   ├── layout.tsx      # Root Layout & Providers
│   └── globals.css     # Tailwind & Global Styles
├── components/         # React Components
│   ├── Hero.tsx        # Only Header & 3D Scene
│   ├── BuySection.tsx  # Buy Card Logic
│   ├── ClaimSection.tsx# Airdrop Card Logic
│   ├── AdminDashboard.tsx # Admin Only Controls
│   └── ...             # Other UI sections
├── contracts/          # ABIs and Solidity Files
│   ├── MemeCoinGateway.sol # Source Contract
│   ├── GatewayABI.json     # ABI for Presale
│   └── TokenABI.json       # ABI for Token
└── utils/
    └── config.ts       # Wagmi & RainbowKit Config
```

## 🛡️ Security

-   **Audit:** The contract has passed initial security checks (Mention audit firm if any).
-   **Liquidity:** Initial liquidity is locked on PinkSale.
-   **Ownership:** Contract ownership is renounced to ensure decentralization.

## 🤝 Contributing

We warmly welcome anyone who wants to contribute and improve the project! Whether you want to fix bugs, enhance the UI, or build new features, your help is greatly appreciated. 

To contribute, please follow these steps:
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ for the ODIN Community.**
