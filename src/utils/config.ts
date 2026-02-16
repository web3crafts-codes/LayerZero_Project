import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc, bscTestnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Meme Coin Marketplace',
  projectId: '944d6fd0168fb4cec9d7d40697a66373', // Get one from https://cloud.walletconnect.com
  chains: [bsc, bscTestnet],
  ssr: true,
});
