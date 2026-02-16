'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle, Copy } from 'lucide-react';
import { useState } from 'react';

const CONTRACT_ADDRESS = '0x2C85d93d6a8043764525b2792CC38e7a92bD0791';

export default function Security() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-20 bg-black/70 backdrop-blur-md border-t border-[#F5A623]/20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Left: Security Cards */}
                    <div className="flex-1 space-y-6 w-full">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/50 p-6 rounded-2xl border border-green-500/30 flex items-center gap-4"
                        >
                            <div className="bg-green-500/20 p-4 rounded-full">
                                <Shield className="w-8 h-8 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Contract Audited</h3>
                                <p className="text-gray-400 text-sm">Passed with 100% score. No vulnerabilities.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/50 p-6 rounded-2xl border border-blue-500/30 flex items-center gap-4"
                        >
                            <div className="bg-blue-500/20 p-4 rounded-full">
                                <Lock className="w-8 h-8 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Liquidity Locked</h3>
                                <p className="text-gray-400 text-sm">Locked for 1 year on PinkSale.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/50 p-6 rounded-2xl border border-[#F5A623]/30 flex items-center gap-4"
                        >
                            <div className="bg-[#F5A623]/20 p-4 rounded-full">
                                <CheckCircle className="w-8 h-8 text-[#F5A623]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Ownership Renounced</h3>
                                <p className="text-gray-400 text-sm">Contract is fully decentralized.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Contract Address */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="flex-1 w-full text-center md:text-left"
                    >
                        <h2 className="text-4xl font-black text-white mb-6">
                            Safety is our <span className="text-[#F5A623]">Priority</span>
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Verify the contract yourself on BscScan. Don't trust, verify.
                        </p>

                        <div className="bg-black border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Official Token Contract (BSC)</p>
                            <div className="font-mono text-white/80 break-all text-sm md:text-lg mb-4">
                                {CONTRACT_ADDRESS}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="bg-[#F5A623] hover:bg-[#D48806] text-black font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all mx-auto md:mx-0"
                            >
                                <Copy className="w-4 h-4" />
                                {copied ? 'Copied!' : 'Copy Address'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
