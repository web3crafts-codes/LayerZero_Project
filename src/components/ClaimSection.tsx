'use client';

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import GatewayABI from '../contracts/GatewayABI.json';
import { useTokenData } from '../hooks/useTokenData';
import { bsc } from 'wagmi/chains';

const CONTRACT_ADDRESS = '0x09c89Ec2a7aB637D2da4b775A88C268761a8d202';

export default function ClaimSection() {
    const { address, isConnected } = useAccount();
    const { symbol } = useTokenData();
    const sym = symbol !== '...' ? symbol : '...';

    const { data: claimFee } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'claimFee',
        chainId: bsc.id,
        query: { staleTime: 300_000, gcTime: 600_000 },
    });

    const { data: claimAmount } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'claimAmount',
        chainId: bsc.id,
        query: { staleTime: 300_000, gcTime: 600_000 },
    });

    const { data: hasClaimed, refetch: refetchClaimStatus } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'hasClaimed',
        args: [address],
        chainId: bsc.id,
        query: {
            enabled: !!address,
        }
    });

    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash
    });

    // Refetch status after success
    useEffect(() => {
        if (isSuccess) {
            refetchClaimStatus();
        }
    }, [isSuccess, refetchClaimStatus]);

    const handleClaim = async () => {
        try {
            writeContract({
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi: GatewayABI,
                functionName: 'claimTokens',
                value: claimFee ? (claimFee as bigint) : parseEther('0.008'),
            });
        } catch (e) {
            console.error(e);
        }
    };

    const formattedClaimAmount = claimAmount ? Number(formatEther(claimAmount as bigint)).toLocaleString() : '500';
    const formattedClaimFee = claimFee ? formatEther(claimFee as bigint) : '0.008';

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
                    Claim your free {formattedClaimAmount} {sym} tokens now! Just pay a small gas fee.
                </p>

                <div className="relative z-20 mb-8">
                    <button
                        onClick={handleClaim}
                        disabled={!isConnected || isPending || isConfirming || !!hasClaimed}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {hasClaimed ? `Already Claimed ✓` : isPending ? 'Confirming...' : isConfirming ? 'Claiming...' : `CLAIM ${formattedClaimAmount} ${sym}`}
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
                        <div className="text-xl font-bold text-white">{formattedClaimAmount} {sym}</div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-xl">
                        <div className="text-sm">Status</div>
                        <div className={`text-xl font-bold ${hasClaimed ? 'text-yellow-400' : 'text-green-400'}`}>
                            {hasClaimed ? 'Claimed' : 'Available'}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
