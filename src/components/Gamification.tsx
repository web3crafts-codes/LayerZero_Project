'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Gamification() {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setResult(null);

        setTimeout(() => {
            setSpinning(false);
            const rewards = ['100 ODIN', 'Try Again', '500 ODIN', 'Jackpot!'];
            setResult(rewards[Math.floor(Math.random() * rewards.length)]);
        }, 3000);
    };

    return (
        <section className="py-20 bg-black/60 backdrop-blur-md relative overflow-hidden flex flex-col items-center">
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl font-black text-white mb-8">
                    Spin & <span className="text-[#F5A623]">Win</span>
                </h2>
                <p className="text-gray-400 mb-12">Connect wallet to spin daily for free $ODIN rewards!</p>

                <div className="relative w-80 h-80 mx-auto mb-8">
                    {/* Simplified Wheel Visual */}
                    <motion.div
                        className="w-full h-full rounded-full border-4 border-[#F5A623] bg-zinc-900 relative overflow-hidden"
                        animate={{ rotate: spinning ? 3600 : 0 }}
                        transition={{ duration: 3, ease: "circOut" }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl">🎁</div>
                        </div>
                        <div className="absolute w-full h-1 bg-[#F5A623]/20 top-1/2 left-0" />
                        <div className="absolute w-1 h-full bg-[#F5A623]/20 top-0 left-1/2" />
                    </motion.div>

                    {/* Indicator */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-red-500 text-4xl">
                        ▼
                    </div>
                </div>

                {result && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-[#F5A623] mb-8"
                    >
                        {result}
                    </motion.div>
                )}

                <button
                    onClick={spin}
                    disabled={spinning}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-10 rounded-full shadow-lg disabled:opacity-50"
                >
                    {spinning ? 'Spinning...' : 'Spin the Wheel'}
                </button>
            </div>
        </section>
    );
}
