'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ThreeSceneWrapper from './ThreeSceneWrapper';

export default function Hero() {
    const [soldCount, setSoldCount] = useState(12500000);

    useEffect(() => {
        const interval = setInterval(() => {
            setSoldCount(prev => prev + Math.floor(Math.random() * 5000));
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex items-center">
            {/* Live Ticker */}
            <div className="absolute top-24 w-full bg-[#F5A623]/20 border-b border-[#F5A623]/30 backdrop-blur-md z-40 py-2 overflow-hidden flex whitespace-nowrap">
                <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex gap-12 text-[#F5A623] font-mono text-sm uppercase tracking-widest"
                >
                    <span>🚀 $ODIN Live Price: $0.000420 (+5.4%)</span>
                    <span>🔥 Total Burnt: 420,690,000</span>
                    <span>💎 Holders: 12,504</span>
                    <span>🚀 $ODIN Live Price: $0.000420 (+5.4%)</span>
                    <span>🔥 Total Burnt: 420,690,000</span>
                    <span>💎 Holders: 12,504</span>
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
                        $ODIN <br />
                        <span className="text-[#F5A623]">IS HERE</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed border-l-4 border-[#F5A623] pl-6">
                        ODIN is the world's first God memecoin. It is built on Bitcoin mechanics but lives on BSC. Created as a memorial for the Norse God Odin. 100% Community Owned.
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

                {/* Right Column: 3D Scene */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="h-[600px] w-full relative overflow-visible"
                >
                    {/* Glowing Effect representing the Coin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5A623] rounded-full blur-[150px] opacity-20 pointer-events-none" />

                    <ThreeSceneWrapper />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10 pointer-events-none text-[#F5A623]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
