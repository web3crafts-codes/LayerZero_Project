'use client';

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { motion } from 'framer-motion';
import GatewayABI from '../contracts/GatewayABI.json';

const CONTRACT_ADDRESS = '0xc6128c37E38b2721B7002481Ca43f80BF9eC40da';

export default function ClaimSection() {
    const { address, isConnected } = useAccount();

    const { data: claimFee } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'claimFee',
    });

    const { data: claimAmount } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'claimAmount',
    });

    const { data: hasClaimed, refetch: refetchClaimStatus } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'hasClaimed',
        args: [address],
        query: {
            enabled: !!address,
        }
    });

    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash
    });

    // Refetch status after success
    if (isSuccess) {
        refetchClaimStatus();
    }

    const handleClaim = async () => {
        try {
            writeContract({
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi: GatewayABI,
                functionName: 'claimTokens',
                value: claimFee ? (claimFee as bigint) : parseEther('0.01'),
            });
        } catch (e) {
            console.error(e);
        }
    };

    const formattedClaimAmount = claimAmount ? Number(formatEther(claimAmount as bigint)).toLocaleString() : '1,000';
    const formattedClaimFee = claimFee ? formatEther(claimFee as bigint) : '0.01';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
        >
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black border border-pink-500/30 rounded-3xl p-10 text-center relative overflow-hidden group flex flex-col justify-center">
                <div className="absolute inset-0 bg-pink-600/5 group-hover:bg-pink-600/10 transition-all duration-500" />

                <h2 className="text-5xl font-black text-white mb-6 relative z-10">
                    AIRDROP <span className="text-pink-500">LIVE</span>
                </h2>

                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
                    Claim your free {formattedClaimAmount} MEME tokens now! Just pay a small gas fee.
                </p>

                <div className="relative z-20 mb-8">
                    <button
                        onClick={handleClaim}
                        disabled={!isConnected || isPending || isConfirming}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Confirming...' : isConfirming ? 'Claiming...' : `CLAIM ${formattedClaimAmount} MEME`}
                    </button>
                    {isSuccess && (
                        <div className="mt-6 text-green-400 font-bold">
                            Successfully Claimed!
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400 relative z-10">
                    <div className="bg-black/40 p-4 rounded-xl">
                        <div className="text-sm">Claim Amount</div>
                        <div className="text-xl font-bold text-white">{formattedClaimAmount} MEME</div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-xl">
                        <div className="text-sm">Status</div>
                        <div className="text-xl font-bold text-green-400">Available</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
