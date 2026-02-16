'use client';

import { motion } from 'framer-motion';
import { Twitter, MessageCircle, Send } from 'lucide-react';

export default function Community() {
    return (
        <section className="py-20 bg-black/80 backdrop-blur-md border-t border-[#F5A623]/20 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h2 className="text-5xl font-black text-white mb-6">
                        Join the <span className="text-[#F5A623]">Horde</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We are stronger together. Join thousands of Vikings in our community channels. Memes, raids, and gains await.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-[#1DA1F2] p-6 rounded-2xl shadow-[0_0_20px_#1DA1F250] flex flex-col items-center gap-2 min-w-[200px]"
                    >
                        <Twitter className="w-12 h-12 text-white" />
                        <span className="text-white font-bold text-xl">Twitter</span>
                    </motion.a>

                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-[#229ED9] p-6 rounded-2xl shadow-[0_0_20px_#229ED950] flex flex-col items-center gap-2 min-w-[200px]"
                    >
                        <Send className="w-12 h-12 text-white" />
                        <span className="text-white font-bold text-xl">Telegram</span>
                    </motion.a>

                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-[#5865F2] p-6 rounded-2xl shadow-[0_0_20px_#5865F250] flex flex-col items-center gap-2 min-w-[200px]"
                    >
                        <MessageCircle className="w-12 h-12 text-white" />
                        <span className="text-white font-bold text-xl">Discord</span>
                    </motion.a>
                </div>

            </div>
        </section>
    );
}
