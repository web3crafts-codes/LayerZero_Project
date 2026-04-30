'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTokenData } from '../hooks/useTokenData';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { name } = useTokenData();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', href: '#' },
        { name: 'Buy', href: '#buy-section' },
        { name: 'Tokenomics', href: '#tokenomics' },
        { name: 'Roadmap', href: '#roadmap' },
        { name: 'Community', href: '#community' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-[#F5A623]/20 py-4' : 'bg-transparent py-6'}`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Site Logo"
                        width={40}
                        height={40}
                        loading="lazy"
                        style={{
                            borderRadius: '50%',
                            filter: 'drop-shadow(0 0 6px rgba(245,166,35,0.8))',
                        }}
                    />
                    {name}
                </div>

                {/* Desktop Links */}
                <nav className="hidden md:flex gap-8 items-center">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-[#F5A623] font-bold text-sm uppercase tracking-wide transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Desktop Connect Button */}
                <div className="hidden md:block">
                    <ConnectButton showBalance={false} />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-zinc-900 border-b border-[#F5A623]/20 overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 gap-4">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-white font-bold text-lg py-2 border-b border-white/5"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="my-4">
                                <ConnectButton />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
