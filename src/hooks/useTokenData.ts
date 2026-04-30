'use client';

import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { bsc } from 'wagmi/chains';
import TokenABI from '../contracts/TokenABI.json';

const TOKEN_CONTRACT = '0xC26662E318403AD17be771a51da54460A9f444Da' as `0x${string}`;
// Dead/burn address — tokens sent here are considered burnt
const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD' as `0x${string}`;

// Cache RPC responses for 60s, keep in memory for 5 minutes
const QUERY_CONFIG = {
    staleTime: 60_000,
    gcTime: 300_000,
};

export function useTokenData() {
    // Fetch token name
    const { data: tokenName, isLoading: nameLoading } = useReadContract({
        address: TOKEN_CONTRACT,
        abi: TokenABI,
        functionName: 'name',
        chainId: bsc.id,
        query: QUERY_CONFIG,
    });

    // Fetch token symbol
    const { data: tokenSymbol, isLoading: symbolLoading } = useReadContract({
        address: TOKEN_CONTRACT,
        abi: TokenABI,
        functionName: 'symbol',
        chainId: bsc.id,
        query: QUERY_CONFIG,
    });

    // Fetch token decimals (rarely changes — 5 min stale)
    const { data: decimals } = useReadContract({
        address: TOKEN_CONTRACT,
        abi: TokenABI,
        functionName: 'decimals',
        chainId: bsc.id,
        query: { staleTime: 300_000, gcTime: 600_000 },
    });

    // Fetch total supply (raw bigint)
    const { data: rawTotalSupply, isLoading: supplyLoading } = useReadContract({
        address: TOKEN_CONTRACT,
        abi: TokenABI,
        functionName: 'totalSupply',
        chainId: bsc.id,
        query: QUERY_CONFIG,
    });

    // Fetch burnt tokens (balance of dead address)
    const { data: rawBurnt, isLoading: burntLoading } = useReadContract({
        address: TOKEN_CONTRACT,
        abi: TokenABI,
        functionName: 'balanceOf',
        args: [DEAD_ADDRESS],
        chainId: bsc.id,
        query: QUERY_CONFIG,
    });

    const dec = Number(decimals ?? 18);

    // Format a bigint token amount to a human-readable string
    const fmt = (val: bigint | undefined): string => {
        if (!val) return '—';
        const num = parseFloat(formatUnits(val, dec));
        if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(2) + 'T';
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
        return num.toLocaleString('en-US');
    };

    const totalSupplyRaw = rawTotalSupply as bigint | undefined;
    const burntRaw = rawBurnt as bigint | undefined;

    // Circulating = total - burnt
    const circulatingRaw =
        totalSupplyRaw !== undefined && burntRaw !== undefined
            ? totalSupplyRaw - burntRaw
            : undefined;

    return {
        isLoading: supplyLoading || burntLoading || nameLoading || symbolLoading,
        name: (tokenName as string | undefined) ?? '...',
        symbol: (tokenSymbol as string | undefined) ?? '...',
        decimals: dec,
        totalSupply: fmt(totalSupplyRaw),
        totalSupplyRaw,
        circulatingSupply: fmt(circulatingRaw),
        circulatingSupplyRaw: circulatingRaw,
        totalBurnt: fmt(burntRaw),
        totalBurntRaw: burntRaw,
    };
}
