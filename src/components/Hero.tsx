'use client';

import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useTokenData } from '../hooks/useTokenData';

export default function Hero() {
    const { totalSupply, totalBurnt, isLoading, name, symbol } = useTokenData();
    const ticker = symbol !== '...' ? `$${symbol}` : '$...';

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex items-center">
            {/* Animated background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(245,166,35,0.18) 0%, rgba(212,136,6,0.08) 50%, transparent 80%)',
                        filter: 'blur(40px)',
                        animation: 'pulse-glow 4s ease-in-out infinite',
                    }}
                />
            </div>

            {/* Live Ticker */}
            <div className="absolute top-24 w-full bg-[#F5A623]/20 border-b border-[#F5A623]/30 backdrop-blur-md z-40 py-2 overflow-hidden flex whitespace-nowrap">
                <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex gap-12 text-[#F5A623] font-mono text-sm uppercase tracking-widest"
                >
                    <span>🚀 {ticker} Live Price: $0.000420 (+5.4%)</span>
                    <span>🔥 Total Burnt: {isLoading ? '...' : totalBurnt}</span>
                    <span>💎 Total Supply: {isLoading ? '...' : totalSupply}</span>
                    <span>🚀 {ticker} Live Price: $0.000420 (+5.4%)</span>
                    <span>🔥 Total Burnt: {isLoading ? '...' : totalBurnt}</span>
                    <span>💎 Total Supply: {isLoading ? '...' : totalSupply}</span>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 h-full pt-40">

                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-1 w-20 bg-[#F5A623]" />
                        <span className="text-[#F5A623] font-bold tracking-widest uppercase">The God of Bitcoin</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
                        {ticker} <br />
                        <span className="text-[#F5A623]">IS HERE</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed border-l-4 border-[#F5A623] pl-6">
                        {name} is the world&apos;s first God memecoin. It is built on Bitcoin mechanics but lives on BSC. Created as a memorial for the Norse God Odin. 100% Community Owned.
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <button
                            onClick={() => document.getElementById('buy-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-gradient-to-r from-[#F5A623] to-[#D48806] hover:from-[#D48806] hover:to-[#B37004] text-black font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_30px_rgba(245,166,35,0.4)] hover:shadow-[0_0_50px_rgba(245,166,35,0.6)] transform hover:scale-105 active:scale-95 text-lg"
                        >
                            BUY TOKEN NOW
                        </button>
                        <ConnectButton />
                    </div>
                </motion.div>

                {/* Right Column: 3D Coin Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="flex items-center justify-center h-[600px] w-full relative"
                    style={{ perspective: '1000px' }}
                >
                    {/* Outer glow rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                            className="w-[420px] h-[420px] rounded-full border border-[#F5A623]/10"
                            style={{ animation: 'spin-slow 20s linear infinite' }}
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                            className="w-[380px] h-[380px] rounded-full border border-[#F5A623]/20"
                            style={{ animation: 'spin-slow 15s linear infinite reverse' }}
                        />
                    </div>

                    {/* Glow behind coin */}
                    <div
                        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(245,166,35,0.35) 0%, rgba(212,136,6,0.15) 50%, transparent 75%)',
                            filter: 'blur(30px)',
                            animation: 'pulse-glow 3s ease-in-out infinite',
                        }}
                    />

                    {/* The floating image (3D spinning removed to keep text readable) */}
                    <div
                        style={{
                            animation: 'float-image 4s ease-in-out infinite',
                            filter: 'drop-shadow(0 0 40px rgba(245,166,35,0.7)) drop-shadow(0 20px 60px rgba(245,166,35,0.4))',
                        }}
                    >
                        <Image
                            src="/herosection.png"
                            alt="LayerZero Airdrop"
                            width={500}
                            height={380}
                            priority
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                    </div>

                    {/* Light reflection streak */}
                    <div
                        className="absolute w-[140px] h-[20px] rounded-full pointer-events-none"
                        style={{
                            background: 'rgba(255,255,255,0.18)',
                            filter: 'blur(8px)',
                            top: '30%',
                            left: '50%',
                            transform: 'translateX(-60%) rotate(-30deg)',
                            animation: 'shimmer 4s ease-in-out infinite',
                        }}
                    />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10 pointer-events-none text-[#F5A623]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            {/* CSS Keyframes */}
            <style>{`
                @keyframes float-image {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes coin-rotate-y {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.7; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.08); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes shimmer {
                    0%, 100% { opacity: 0.3; transform: translateX(-60%) rotate(-30deg) scaleX(1); }
                    50% { opacity: 0.7; transform: translateX(-50%) rotate(-30deg) scaleX(1.3); }
                }
            `}</style>
        </section>
    );
}
