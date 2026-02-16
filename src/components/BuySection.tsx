'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import GatewayABI from '../contracts/GatewayABI.json';

const CONTRACT_ADDRESS = '0xc6128c37E38b2721B7002481Ca43f80BF9eC40da';

export default function BuySection() {
    const [bnbAmount, setBnbAmount] = useState('');
    const { isConnected } = useAccount();

    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash
    });

    useEffect(() => {
        if (isSuccess) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F5A623', '#FFD700', '#ffffff']
            });
        }
    }, [isSuccess]);

    const { data: tokensPerBNB } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'tokensPerBNB',
    });

    const rate = tokensPerBNB ? Number(formatEther(tokensPerBNB as bigint)) : 10000;
    const tokensToReceive = bnbAmount ? parseFloat(bnbAmount) * rate : 0;

    const handleBuy = async () => {
        if (!bnbAmount) return;
        try {
            writeContract({
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi: GatewayABI,
                functionName: 'buyTokens',
                value: parseEther(bnbAmount),
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full h-full bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-center"
        >
            <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Buy Tokens
            </h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-gray-400 mb-2">BNB Amount</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={bnbAmount}
                            onChange={(e) => setBnbAmount(e.target.value)}
                            placeholder="0.1"
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 font-bold text-yellow-500">
                            BNB
                        </span>
                    </div>
                </div>

                <div className="flex justify-center text-2xl text-gray-500">
                    ↓
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">You Receive</label>
                    <div className="relative">
                        <input
                            type="text"
                            readOnly
                            value={tokensToReceive.toLocaleString('en-US')}
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-4 px-4 text-white font-mono"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 font-bold text-[#F5A623]">
                            ODIN
                        </span>
                    </div>
                </div>

                {/* Gas & Slippage Info */}
                <div className="flex justify-between text-xs text-gray-500 px-2">
                    <span>⛽ Est. Gas: <span className="text-gray-300">~0.002 BNB</span></span>
                    <span>⚠️ Slippage: <span className="text-gray-300">Auto (0.5%)</span></span>
                </div>

                {isSuccess && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center font-bold">
                        🚀 Transaction Successful! Welcome to Valhalla!
                        <a href={`https://testnet.bscscan.com/tx/${hash}`} target="_blank" className="block text-xs underline mt-1">View on BscScan</a>
                    </div>
                )}

                <button
                    onClick={handleBuy}
                    disabled={!isConnected || isPending || isConfirming || !bnbAmount}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${!isConnected
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-purple-900/50'
                        }`}
                >
                    {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : !isConnected ? 'Connect Wallet First' : 'Buy Now'}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                    1 BNB = {rate.toLocaleString('en-US')} MEME
                </p>
            </div>
        </motion.div>
    );
}
