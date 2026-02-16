'use client';

import { motion } from 'framer-motion';

export default function Roadmap() {
    const phases = [
        {
            title: "Phase 1: The Awakening",
            items: ["Meme Takeover", "Website Launch", "Community Building", "1,000 Holders"],
            status: "active"
        },
        {
            title: "Phase 2: Use The Force",
            items: ["CoinGecko/CMC Listing", "Marketing Blitz", "CEX Listings", "5,000 Holders"],
            status: "upcoming"
        },
        {
            title: "Phase 3: Valhalla",
            items: ["NFT Collection", "Odin Swap", "DAO Governance", "50,000 Holders"],
            status: "upcoming"
        },
        {
            title: "Phase 4: Ragnarok",
            items: ["Global Domination", "Merch Store", "Tier 1 Exchange", "To The Moon"],
            status: "upcoming"
        }
    ];

    return (
        <section className="py-20 bg-black/70 backdrop-blur-md relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-black text-white mb-4">
                        The <span className="text-[#F5A623]">Path to Valhalla</span>
                    </h2>
                    <p className="text-gray-400">Our battle plan for global domination.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`p-8 rounded-2xl border ${phase.status === 'active' ? 'bg-zinc-900 border-[#F5A623] shadow-[0_0_20px_rgba(245,166,35,0.2)]' : 'bg-black border-zinc-800 opacity-70 hover:opacity-100 transition-opacity'}`}
                        >
                            <div className="text-[#F5A623] text-sm font-bold uppercase tracking-widest mb-4">
                                {phase.status === 'active' ? '⚡ CURRENT PHASE' : '🔒 LOCKED'}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6">{phase.title}</h3>
                            <ul className="space-y-3">
                                {phase.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-400">
                                        <div className={`w-2 h-2 rounded-full ${phase.status === 'active' ? 'bg-[#F5A623]' : 'bg-zinc-700'}`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
