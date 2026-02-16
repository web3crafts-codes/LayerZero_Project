'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
    const faqs = [
        {
            question: "How to buy $ODIN?",
            answer: "Connect your MetaMask or Trust Wallet, enter the BNB amount you wish to spend, and click Buy. Ensure you are on the BSC network."
        },
        {
            question: "Is the contract audited?",
            answer: "Yes, our smart contract has been audited by a top-tier firm to ensure security and safety for all investors."
        },
        {
            question: "When is the launch?",
            answer: "We are currently in the Fair Launch phase. The token will be listed on PancakeSwap immediately after the presale concludes."
        },
        {
            question: "What is the tax?",
            answer: "There is a 10% tax on all buys and sells. This goes towards marketing, development, and the 'Gods Pool' for rewards."
        }
    ];

    return (
        <section className="py-20 bg-black/80 backdrop-blur-md">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-5xl font-black text-center text-white mb-12">
                    Frequently Asked <span className="text-[#F5A623]">Questions</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ faq }: { faq: { question: string, answer: string } }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900/30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
            >
                <span className="text-lg font-bold text-white">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#F5A623] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 text-gray-400 border-t border-white/5">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
