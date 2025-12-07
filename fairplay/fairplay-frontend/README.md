# FairPlay: Universal Event Access Platform

**FairPlay** is a decentralized infrastructure layer that allows any real-world event—from esports tournaments and hackathons to marathons and conferences—to have trustless registration, ticketing, and result settlement.

## 🌟 Core Features

- **Universal Event Ledger**: Create an on-chain "Event ID" for *any* activity (Game Lobby, Conference, Sports Match).
- **Trustless Escrow**: Entry fees and prize pools are held by smart contracts, not organizers.
- **Automated Payouts**: Powered by the **Flare Data Connector**, payouts are triggered automatically when the event result is verified on-chain.
- **Cross-Chain Entry**: Participants can pay with native tokens or non-smart contract assets like **XRP** (via FAssets).
- **Premium UX**: A "Glassmorphism" design system built with Tailwind CSS v4 to ensure a sleek, modern user experience.

## 🛠 Tech Stack

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Blockchain Interaction**: [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/)
- **Wallet Connection**: [RainbowKit](https://www.rainbowkit.com/)
- **Network**: [Flare Network](https://flare.network/) (Coston2 Testnet)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed.
- Value for `FAIRPLAY_ADDRESS` and `CONTROLLER_ADDRESS` deployed on Flare Coston2.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/fairplay-frontend.git
    cd fairplay-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

- `app/page.js`: Main UI logic, contract interactions (Approve, Join, Simulate XRP).
- `app/layout.js`: Global layout, metadata, and font configuration.
- `app/providers.js`: Wagmi & RainbowKit context providers.
- `app/globals.css`: Tailwind v4 theme configuration and custom animations.

## 🛡 Smart Contract Logic (Simplified)

1.  **Event Creation**: Organizer or System creates a `matchId`.
2.  **User Entry**: User calls `approve()` on the token, then `createMatch()` (Join) to stake their entry fee.
3.  **Settlement**: The **Flare Data Connector** attests to the real-world result (e.g., "Player A won" or "User B attended").
4.  **Payout**: The contract releases the locked funds to the verified winner/attendee.

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a Pull Request.

---
*Built during the Flare Network Hackathon.*
