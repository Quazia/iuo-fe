import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useWriteContract, useAccount, useReadContract } from 'wagmi';
import { myNFTCollectionAbi } from '../abi/myNFTCollection';
import { revTokenAbi } from '../abi/revToken';
import { MY_NFT_COLLECTION_ADDRESS, REV_TOKEN_ADDRESS } from '../constants/addresses';
import { parseEther, formatEther } from 'viem';
import { useEffect, useState } from 'react';

const ActionCard = ({ title, children, price, info, balance }: { 
  title: string; 
  children: React.ReactNode;
  price?: string;
  info?: string;
  balance?: string;
}) => (
  <div className={styles.actionCard}>
    <h2>{title}</h2>
    {children}
    <div className={styles.priceContainer}>
      {price && <p className={styles.price}>{price}</p>}
      {balance && <p className={styles.balance}>Balance: {balance}</p>}
    </div>
    {info && <p className={styles.info}>{info}</p>}
  </div>
);

const Home: NextPage = () => {
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [rewards, setRewards] = useState<string>('0');

  const { data: nftBalance } = useReadContract({
    address: MY_NFT_COLLECTION_ADDRESS,
    abi: myNFTCollectionAbi,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(1)] : undefined,
    enabled: !!address,
    watch: true,
  });

  const { data: withdrawableRewards } = useReadContract({
    address: REV_TOKEN_ADDRESS,
    abi: revTokenAbi,
    functionName: 'withdrawableDividendOf',
    args: address ? [address] : undefined,
    enabled: !!address,
    watch: true,
  });

  useEffect(() => {
    console.log('withdrawableRewards', withdrawableRewards);
    console.log('address', address);
    console.log('nft balance', nftBalance);
    if (withdrawableRewards) {
      const formattedRewards = Number(formatEther(withdrawableRewards)).toFixed(4);
      setRewards(formattedRewards);
    }
  }, [withdrawableRewards]);

  const handleMint = async () => {
    if (!address) return;
    try {
      writeContract({
        address: MY_NFT_COLLECTION_ADDRESS,
        abi: myNFTCollectionAbi,
        functionName: 'mint',
        args: [BigInt(1)],
        value: parseEther('0.005'),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>IUO NFT Sale</title>
        <meta content="Initial Usage Offering" name="description" />
      </Head>

      <main className={styles.main}>
        <div className={styles.walletContainer}>
          <ConnectButton />
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>IUO NFT Sale</h1>
          <p className={styles.subtitle}>
            Initial usage offering - distribute your token in the form of protocol revenues
          </p>
        </div>

        <div className={styles.cardGrid}>
          <ActionCard 
            title="Mint IOU NFT" 
            price="0.005 eth"
            balance={nftBalance ? nftBalance.toString() : '0'}
          >
            <button 
              onClick={handleMint}
              disabled={isPending}
              className={styles.button}
            >
              MINT
            </button>
          </ActionCard>

          <ActionCard 
            title="IUO Gov tokens" 
            info="Free - receive 10 Gov tokens"
          >
            <button className={styles.button}>
              CLAIM BOOST
            </button>
          </ActionCard>

          <ActionCard 
            title="See Rewards"
            info={`Accruing ${rewards} ETH Rewards`}
          >
            <button 
              className={styles.button}
              disabled={!address || rewards === '0'}
            >
              CLAIM DIVIDENDS
            </button>
          </ActionCard>
        </div>
      </main>
    </div>
  );
};

export default Home;
