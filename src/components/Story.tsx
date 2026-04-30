'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
                            Strike his Gungnir spear upon the blockchain, he declared: <strong className="text-white">&quot;Enough!&quot;</strong>
                        </p>
                        <p>
                            $ODIN was forged not just as a meme, but as a symbol of power, trust, and community. Built on the principles of Bitcoin, but with the speed of BSC.
                        </p>
                        <p className="border-l-4 border-[#F5A623] pl-4 italic text-white">
                            &quot;He who holds $ODIN, holds the power of the Gods.&quot;
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
                            <div className="flex flex-col items-center justify-center p-8 w-full h-full">
                                <Image
                                    src="/logo.png"
                                    alt="ODIN The All-Father"
                                    width={280}
                                    height={280}
                                    style={{
                                        borderRadius: '50%',
                                        filter: 'drop-shadow(0 0 30px rgba(245,166,35,0.8)) drop-shadow(0 0 60px rgba(245,166,35,0.4))',
                                        animation: 'spin-slow 12s linear infinite',
                                    }}
                                />
                                <p className="text-2xl font-bold text-white mt-6">THE ALL-FATHER</p>
                                <style>{`
                                    @keyframes spin-slow {
                                        from { transform: rotateY(0deg); }
                                        to { transform: rotateY(360deg); }
                                    }
                                `}</style>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
