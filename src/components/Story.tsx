'use client';

import { motion } from 'framer-motion';

export default function Story() {
    return (
        <section className="py-24 bg-transparent flex items-center relative overflow-hidden">
            {/* Background Element */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5A623] rounded-full blur-[150px] opacity-10 pointer-events-none" />

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                        THE LEGEND OF <br />
                        <span className="text-[#F5A623]">$ODIN</span>
                    </h2>
                    <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                        <p>
                            In the digital realm of Valhalla, ODIN watched as mere mortals traded dog coins and frog tokens. He saw the chaos, the rugs, and the fear.
                        </p>
                        <p>
                            Strike his Gungnir spear upon the blockchain, he declared: <strong className="text-white">"Enough!"</strong>
                        </p>
                        <p>
                            $ODIN was forged not just as a meme, but as a symbol of power, trust, and community. Built on the principles of Bitcoin, but with the speed of BSC.
                        </p>
                        <p className="border-l-4 border-[#F5A623] pl-4 italic text-white">
                            "He who holds $ODIN, holds the power of the Gods."
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="aspect-square bg-gradient-to-br from-[#F5A623] to-purple-900 rounded-3xl p-1 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center overflow-hidden">
                            {/* Placeholder for Meme/Mascot Image - Using text for now if image not avail */}
                            <div className="text-center p-10">
                                <h3 className="text-9xl">⚡</h3>
                                <p className="text-2xl font-bold text-white mt-4">THE ALL-FATHER</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
