'use client';

import { motion } from 'framer-motion';

export default function Tokenomics() {
    const stats = [
        { label: 'Total Supply', value: '1,000,000,000', color: 'text-purple-400' },
        { label: 'Circulating Supply', value: '650,000,000', color: 'text-blue-400' },
        { label: 'Liquidity Locked', value: '$500,000', color: 'text-pink-400' },
        { label: 'Holders', value: '12,500+', color: 'text-green-400' },
    ];

    return (
        <section className="py-20 bg-black/70 backdrop-blur-md border-t border-[#F5A623]/20 relative overflow-hidden">
            {/* Background Runes */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/odin_runic_background.png')] bg-cover bg-center" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[1px] w-20 bg-[#F5A623]" />
                        <span className="text-[#F5A623] tracking-widest uppercase">Statistics</span>
                        <div className="h-[1px] w-20 bg-[#F5A623]" />
                    </div>
                    <h2 className="text-5xl font-black text-white mb-6">
                        Tokenomics <span className="text-[#F5A623]">Breakdown</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Total Supply: <span className="text-[#F5A623] font-bold">21 Trillion</span>. No Team/Marketing Wallets. 100% Community Driven.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/80 border border-[#F5A623]/20 p-8 rounded-xl text-center hover:border-[#F5A623]/60 hover:bg-zinc-800 transition-all group shadow-lg"
                        >
                            <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{stat.label}</div>
                            <div className={`text-3xl font-bold ${stat.color === 'text-purple-400' ? 'text-[#F5A623]' : stat.color === 'text-blue-400' ? 'text-white' : 'text-gray-300'} group-hover:scale-110 transition-transform`}>
                                {stat.value}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    {/* Donut Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-80 w-80 mx-auto"
                    >
                        <div className="absolute inset-0 rounded-full border-[2px] border-[#F5A623]/20 animate-pulse" />
                        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                            <circle cx="50" cy="50" r="40" stroke="#F5A623" strokeWidth="20" fill="none" strokeDasharray="251.2" strokeDashoffset="60" className="drop-shadow-[0_0_10px_rgba(245,166,35,0.5)]" />
                            <circle cx="50" cy="50" r="40" stroke="#00C0A3" strokeWidth="20" fill="none" strokeDasharray="251.2" strokeDashoffset="180" className="drop-shadow-lg opacity-80" />
                            <circle cx="50" cy="50" r="40" stroke="#007AFF" strokeWidth="20" fill="none" strokeDasharray="251.2" strokeDashoffset="220" className="drop-shadow-lg opacity-60" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-4xl font-black text-white">21T</span>
                            <span className="text-xs text-[#F5A623] uppercase tracking-widest">Total Supply</span>
                        </div>
                    </motion.div>

                    {/* Legend */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[#F5A623] font-bold text-lg">Public Sale (Fair Launch)</span>
                                <span className="text-white font-mono">65%</span>
                            </div>
                            <div className="h-2 bg-black rounded-full overflow-hidden">
                                <div className="h-full bg-[#F5A623] w-[65%] shadow-[0_0_10px_#F5A623]" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Available for everyone. No private sale.</p>
                        </div>

                        <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[#00C0A3] font-bold text-lg">Liquidity Pool (Locked)</span>
                                <span className="text-white font-mono">25%</span>
                            </div>
                            <div className="h-2 bg-black rounded-full overflow-hidden">
                                <div className="h-full bg-[#00C0A3] w-[25%]" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Locked for 1 year to ensure safety.</p>
                        </div>

                        <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[#007AFF] font-bold text-lg">Marketing & CEX</span>
                                <span className="text-white font-mono">10%</span>
                            </div>
                            <div className="h-2 bg-black rounded-full overflow-hidden">
                                <div className="h-full bg-[#007AFF] w-[10%]" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">For listings and viral campaigns.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
