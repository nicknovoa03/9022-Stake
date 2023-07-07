import React from 'react';
import Head from 'next/head';
import 'aos/dist/aos.css';
import '../theme/globals.css';
import Page from '../components/Page';
import { Web3Modal } from '@web3modal/react';
import { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { sepolia, mainnet } from 'wagmi/chains';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = '72e247ee043a24a6e5ecfa195061a9fd';

// 2. Configure wagmi client
const chains = [mainnet];
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider
});

// 3. Configure modal ethereum client
export const ethereumClient = new EthereumClient(wagmiClient, chains);

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>9022 Rewards</title>
        <meta name="description" content="Decentralized Staking Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </React.Fragment>
  );
}
