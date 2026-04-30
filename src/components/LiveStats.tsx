'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Flame, Coins } from 'lucide-react';
import { useTokenData } from '../hooks/useTokenData';

export default function LiveStats() {
    const { totalSupply, circulatingSupply, totalBurnt, isLoading } = useTokenData();

    const stats = [
        {
            label: 'Total Supply',
            value: isLoading ? '...' : totalSupply,
            icon: Coins,
            color: 'text-[#F5A623]',
        },
        {
            label: 'Circulating Supply',
            value: isLoading ? '...' : circulatingSupply,
            icon: TrendingUp,
            color: 'text-green-400',
        },
        {
            label: 'Total Burnt 🔥',
            value: isLoading ? '...' : totalBurnt,
            icon: Flame,
            color: 'text-red-400',
        },
        {
            label: 'Holders',
            value: '12,500+',
            icon: Users,
            color: 'text-blue-400',
        },
    ];

    return (
        <section className="py-12 bg-black/50 backdrop-blur-sm border-y border-[#F5A623]/20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-zinc-800/50 transition-colors"
                        >
                            <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
                            <div className="text-2xl md:text-3xl font-black text-white font-mono">
                                {stat.value}
                            </div>
                            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest text-center">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
