'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWriteContract } from 'wagmi';
import { parseEther, keccak256, encodePacked } from 'viem';
import { Calendar, Shield, Zap, Ticket, Wallet, ArrowRight, UserCheck, MapPin, Globe } from 'lucide-react';

// --- 1. PASTE YOUR SAVED ADDRESSES HERE ---
const FBTC_ADDRESS = "0x95A03Eaf0D8CA2371F535D2d0C2186020aa2EFcC";
const FAIRPLAY_ADDRESS = "0x2947F085A5E1eeD5eC352748655F94B2f129F820";
const CONTROLLER_ADDRESS = "0xe79E202b619B901111784026E39E929604784503";

// --- ABIs ---
const FBTC_ABI = [{ "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
const FAIRPLAY_ABI = [{ "inputs": [{ "name": "_gameId", "type": "string" }, { "name": "_amount", "type": "uint256" }], "name": "createMatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const CONTROLLER_ABI = [{ "inputs": [{ "name": "_xrpTxHash", "type": "bytes32" }, { "name": "_gameId", "type": "string" }], "name": "executeXRPAction", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

export default function Home() {
  const [gameId, setGameId] = useState("");
  const [activeTab, setActiveTab] = useState("create"); // 'create' or 'xrp'
  const { writeContract, error: writeError } = useWriteContract();

  // Add this right before the "return (" statement
  if (writeError) {
    console.log("🚨 REAL ERROR FOUND:", writeError);
  }

  // Logic Functions
  const handleApprove = () => {
    writeContract({
      address: FBTC_ADDRESS, abi: FBTC_ABI, functionName: 'approve',
      args: [FAIRPLAY_ADDRESS, parseEther("100")],
    });
  };

  const handleCreate = () => {
    writeContract({
      address: FAIRPLAY_ADDRESS, abi: FAIRPLAY_ABI, functionName: 'createMatch',
      args: [gameId, parseEther("50")],
    });
  };

  const handleXrpJoin = () => {
    // Simulates a random TX hash from XRP Ledger
    const fakeTxHash = keccak256(encodePacked(['string'], [new Date().toISOString()]));
    writeContract({
      address: CONTROLLER_ADDRESS, abi: CONTROLLER_ABI, functionName: 'executeXRPAction',
      args: [fakeTxHash, gameId],
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center">

      {/* --- BACKGROUND ACCENTS --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- NAVBAR --- */}
      <nav className="sticky top-6 z-50 w-full max-w-4xl mx-auto px-4">
        <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              FAIR<span className="text-cyan-400">PLAY</span>
            </span>
          </div>
          <ConnectButton.Custom>
            {({ openConnectModal, account, mounted }) => (
              <button
                onClick={openConnectModal}
                className="glass-button rounded-full px-5 py-2 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/10 active:scale-95 transition-all"
              >
                {mounted && account ? (
                  <><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_limegreen]" /> {account.displayName}</>
                ) : (
                  "Connect Wallet"
                )}
              </button>
            )}
          </ConnectButton.Custom>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center relative z-10">

        {/* Title & Headline */}
        <div className="text-center space-y-6 max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.1)]">
            <Zap className="w-3 h-3" /> Live on Flare Coston2
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Any Event. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
              Verified on Chain.
            </span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto">
            Conferences. Marathons. Hackathons. Concerts.<br className="hidden md:block" />
            We handle the registration. <span className="text-white font-semibold underline decoration-cyan-500/50 underline-offset-4">Flare Data Connector</span> proves attendance.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-4 pt-4">
            <div className="px-6 py-3 rounded-2xl glass-button border border-white/5 flex items-center gap-3">
              <Ticket className="w-4 h-4 text-cyan-400" />
              <div className="text-left">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Registrations</div>
                <div className="text-lg font-bold text-white leading-none">12,500+</div>
              </div>
            </div>
            <div className="px-6 py-3 rounded-2xl glass-button border border-white/5 flex items-center gap-3">
              <UserCheck className="w-4 h-4 text-yellow-400" />
              <div className="text-left">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Events Active</div>
                <div className="text-lg font-bold text-white leading-none">842</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN CARD --- */}
        <div className="w-full max-w-md md:max-w-4xl relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/50 to-purple-600/50 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>

          <div className="relative glass-panel rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">

            {/* Left Side: Illustration / Info */}
            <div className="hidden md:flex flex-col justify-between h-full min-h-[300px] w-1/3 border-r border-white/5 pr-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Universal Access</h3>
                <p className="text-sm text-slate-400">
                  Create an event ID for anything. Attendees stake funds to register. Smart contracts automate the rest.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="w-3 h-3 text-green-400" /> Escrow Secured
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Ticket className="w-3 h-3 text-cyan-400" /> NFT Ticketing Ready
                </div>
              </div>
            </div>

            {/* Right Side: Action */}
            <div className="flex-1 w-full">
              {/* Tabs */}
              <div className="flex gap-2 mb-8 bg-black/20 p-1.5 rounded-xl w-fit border border-white/5">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'create' ? 'bg-slate-800 text-white shadow-lg border border-white/5' : 'text-slate-400 hover:text-white'}`}
                >
                  Register (Native)
                </button>
                <button
                  onClick={() => setActiveTab('xrp')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'xrp' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'text-slate-400 hover:text-yellow-200'}`}
                >
                  <Wallet className="w-4 h-4" /> XRP (No Gas)
                </button>
              </div>

              {/* --- TAB 1: NATIVE DEPOSIT --- */}
              {activeTab === 'create' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Event Code / ID</label>
                    <div className="relative group/input">
                      <input
                        type="text"
                        placeholder="e.g. eth-denver-2024"
                        className="w-full bg-white/5 border border-white/5 focus:border-cyan-500/50 focus:bg-white/10 text-white p-4 rounded-xl outline-none transition-all pl-12 placeholder:text-slate-600 font-mono"
                        onChange={(e) => setGameId(e.target.value)}
                      />
                      <Calendar className="absolute left-4 top-4 text-slate-600 group-focus-within/input:text-cyan-400 transition-colors w-5 h-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleApprove}
                      className="group relative overflow-hidden rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 p-4 transition-all text-left hover:border-cyan-500/30"
                    >
                      <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider font-bold">Step 1</div>
                      <div className="font-bold text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                        One-Time Approve <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                      </div>
                    </button>

                    <button
                      onClick={handleCreate}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 p-4 transition-all text-left hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] border border-transparent hover:border-cyan-400/50"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-[10px] text-cyan-100 mb-1 uppercase tracking-wider font-bold">Step 2</div>
                        <div className="font-bold text-white flex items-center gap-2">
                          Join Event <Zap className="w-4 h-4 fill-white animate-pulse-slow" />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB 2: XRP JOIN --- */}
              {activeTab === 'xrp' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex flex-col gap-6 items-center bg-gradient-to-b from-yellow-900/10 to-transparent border border-yellow-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                      <Ticket className="w-24 h-24 text-yellow-500 -rotate-12" />
                    </div>

                    <div className="w-full flex gap-4">
                      {/* Fake QR Code */}
                      <div className="w-24 h-24 bg-white rounded-lg p-1 shrink-0 shadow-lg">
                        <div className="w-full h-full bg-slate-950 flex items-center justify-center text-slate-500 text-[10px] text-center font-mono border border-dashed border-slate-700">
                          FAKE QR
                        </div>
                      </div>

                      <span className="text-xs font-mono text-yellow-400 animate-pulse flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Listening for Payment...
                      </span>
                    </div>

                    <button
                      onClick={handleXrpJoin}
                      className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-slate-950 font-bold rounded-xl transition-all text-sm shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                    >
                      Simulate Payment Received
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-slate-600 text-xs font-medium uppercase tracking-widest opacity-60">Powered by</div>
            <div className="text-slate-500 text-sm font-semibold mt-1">Flare Network • FAssets • Data Connector</div>
          </div>
        </div>
      </main>
    </div>
  );
}