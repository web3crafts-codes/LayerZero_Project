'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import GatewayABI from '../contracts/GatewayABI.json';

const CONTRACT_ADDRESS = '0x10641bacc05e84E122E578f1Dc94F00edf6F5e4A';

export default function AdminDashboard() {
    const { address } = useAccount();
    const [depositAmount, setDepositAmount] = useState('');

    // Check if user is owner
    const { data: owner } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'owner',
    });

    // Get Contract Balances
    const { data: bnbBalance } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'getBNBBalance',
    });

    const { data: tokenBalance } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'getTokenBalance',
    });

    const { writeContract, data: hash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    if (!address || !owner || address !== owner) return null;

    const handleWithdrawBNB = () => {
        writeContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi: GatewayABI,
            functionName: 'withdrawBNB',
        });
    };

    const handleRealDeposit = () => {
        writeContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi: GatewayABI,
            functionName: 'depositTokens',
            args: [parseEther(depositAmount)],
        });
    }

    return (
        <section className="py-10 bg-zinc-900 border-t border-red-900/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-red-500 mb-6">Admin Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-black/40 p-6 rounded-xl border border-zinc-700">
                        <h3 className="text-gray-400 mb-2">Contract BNB Balance</h3>
                        <div className="text-2xl font-bold">{bnbBalance ? formatEther(bnbBalance as bigint) : '0'} BNB</div>
                        <button
                            onClick={handleWithdrawBNB}
                            disabled={isPending || isConfirming}
                            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            {isPending ? 'Withdrawing...' : 'Withdraw All BNB'}
                        </button>
                    </div>

                    <div className="bg-black/40 p-6 rounded-xl border border-zinc-700">
                        <h3 className="text-gray-400 mb-2">Contract Token Balance</h3>
                        <div className="text-2xl font-bold">{tokenBalance ? formatEther(tokenBalance as bigint) : '0'} MEME</div>
                        <div className="mt-4 flex gap-2">
                            <input
                                type="number"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                placeholder="Amount"
                                className="bg-zinc-800 rounded-lg px-3 py-2 text-white w-full"
                            />
                            <button
                                onClick={handleRealDeposit}
                                disabled={isPending || isConfirming}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                            >
                                Deposit
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Make sure to Approve tokens first!</p>
                    </div>
                </div>
                {isSuccess && <div className="text-green-500">Transaction Successful</div>}
            </div>
        </section>
    );
}
