# 🏆 FairPlay: Universal Event Infrastructure

![License](https://img.shields.io/badge/License-MIT-green.svg)
![Network](https://img.shields.io/badge/Network-Flare_Coston2-orange.svg)
![Stack](https://img.shields.io/badge/Stack-Next.js_|_Tailwind_|_Wagmi-blue.svg)

> **"Any Event. Verified on Chain. Settled without Trust."**

FairPlay is a decentralized infrastructure layer that allows **any real-world activity**—esports lobbies, hackathons, marathons, or meetups—to have trustless registration, verified attendance, and automated payout settlement.

---

## 🚩 The Problem
1.  **The Trust Paradox**: To join a tournament or event, you currently send money to an organizer's private wallet. You have to *trust* them to pay out.
2.  **Siloed Access**: If you hold XRP, BTC, or Doge, you are locked out of EVM-based event economies.
3.  **Manual Settlement**: Winners wait days for "admins" to verify results and send prizes.

## ✅ The FairPlay Solution
FairPlay replaces the "Trusted Organizer" with **Code**.

| Feature | How it works |
| :--- | :--- |
| **Trustless Escrow** | Entry fees go into a Smart Contract, not a user wallet. Funds are locked until the event concludes. |
| **Universal Access** | Powered by **FAssets**, users can join events using **XRP** or **BTC** without needing a smart-contract wallet. |
| **Automated Truth** | The **Flare Data Connector (FDC)** reads real-world APIs (Strava, Github, Game Servers) and proves the result on-chain. |
| **Instant Payout** | Once the FDC proves the result, the contract *automatically* pushes funds to the winner. Zero human intervention. |

---

## 🛠️ The Tech Stack (Flare Stack)

We utilized the full power of the Flare Network to make this possible:

### 1. ⚡ Flare Data Connector (FDC)
*   **Role**: The "Referee".
*   **Implementation**: We query off-chain APIs (e.g., verifying a "Payment Received" tx on XRP Ledger or a "Game Win" status). The FDC attests this data so our `FairPlay.sol` contract can act on it trustlessly.

### 2. 🌊 FAssets (Cross-Chain Identity)
*   **Role**: The "Bridge".
*   **Implementation**: Allows users to interact with our EVM contracts using native **XRP**. The app detects the off-chain payment and mints a representative stake in the event pool.

### 3. 🎨 Frontend
*   **Next.js 16 (App Router)**: For high-performance, server-side rendering.
*   **Tailwind CSS v4**: Implementing a premium "Glassmorphism" design system (blur filters, gradients, mesh backgrounds).
*   **RainbowKit + Wagmi**: For seamless EVM wallet connection.

---

## 📸 Screenshots

*(Add your screenshots here)*

| Landing Page | Universal Access |
| :---: | :---: |
| ![Hero](https://via.placeholder.com/400x200?text=Hero+Section) | ![Dashboard](https://via.placeholder.com/400x200?text=Event+Dashboard) |

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+
*   Metamask (configured for Flare Coston2)

### Installation

```bash
# Clone the repository
git clone https://github.com/Vynikjain/Fair_Play.git

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🗺️ Roadmap

*   **Q1 2025**: **NFT Ticketing** (Turn your event entry into a dynamic Soulbound Token).
*   **Q2 2025**: **More Data Providers** (Integration with Strava for sports betting & GitHub for Hackathon auto-payments).
*   **Q3 2025**: **Mainnet Launch** on Flare.

---

## 👥 The Team: Code Boyz

Built with ❤️ at the Flare Hackathon.

*   **Vynik** - Full Stack & Smart Contract Engineer
*   **Yashas** - Frontend & Design Architect
