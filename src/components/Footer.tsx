'use client';

import { Twitter, Send, Github } from 'lucide-react';
import Image from 'next/image';
import { useTokenData } from '../hooks/useTokenData';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { name, symbol } = useTokenData();
    const ticker = symbol !== '...' ? `$${symbol}` : '$...';

    return (
        <footer className="bg-black/90 backdrop-blur-xl border-t border-zinc-900 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/logo.png"
                                alt="ODIN Logo"
                                width={48}
                                height={48}
                                style={{
                                    borderRadius: '50%',
                                    filter: 'drop-shadow(0 0 8px rgba(245,166,35,0.7))',
                                }}
                            />
                            <h2 className="text-2xl font-black text-white">
                                {ticker}
                            </h2>
                        </div>
                        <p className="text-gray-400 max-w-sm">
                            The God of Bitcoin on BSC. Built for the community, by the community. Join the revolution today.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-[#F5A623] transition-colors">Home</a></li>
                            <li><a href="#buy-section" className="hover:text-[#F5A623] transition-colors">Buy Token</a></li>
                            <li><a href="#claim-section" className="hover:text-[#F5A623] transition-colors">Claim Airdrop</a></li>
                            <li><a href="#" className="hover:text-[#F5A623] transition-colors">Whitepaper</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Socials</h3>
                        <div className="flex gap-4">
                            <a href="#" className="bg-zinc-900 p-2 rounded-lg hover:bg-[#F5A623] hover:text-black transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-zinc-900 p-2 rounded-lg hover:bg-[#F5A623] hover:text-black transition-all">
                                <Send className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-zinc-900 p-2 rounded-lg hover:bg-[#F5A623] hover:text-black transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© {currentYear} {name} Meme Coin. All rights reserved.</p>
                    <p>Cryptocurrency may be unregulated in your jurisdiction. Invest responsibly.</p>
                </div>
            </div>
        </footer>
    );
}
