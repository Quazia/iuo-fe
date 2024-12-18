import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useWriteContract, useWaitForTransactionReceipt, useConfig, useAccount } from 'wagmi';
import { governanceTokenAbi } from '../abi/governanceToken';
import { myNFTCollectionAbi } from '../abi/myNFTCollection';
import { GOVERNANCE_TOKEN_ADDRESS, MY_NFT_COLLECTION_ADDRESS } from '../constants/addresses';
import { parseEther, toHex } from 'viem';

const Home: NextPage = () => {
  const { address } = useAccount();
  const config = useConfig();
  console.log(config);
  const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();

  console.log("mounting");
  console.log("isWritePending: ", isWritePending);


  const handleMint = async () => {
    if (!address) return;
    console.log("inside handleMint");
    console.log("isWritePending: ", isWritePending);
    console.log("abi: ", myNFTCollectionAbi);
    console.log("address: ", MY_NFT_COLLECTION_ADDRESS);

    try {
      writeContract({
        address: MY_NFT_COLLECTION_ADDRESS,
        abi: myNFTCollectionAbi,
        functionName: 'mint',
        args: [
          BigInt(1)// amount (1 token with 18 decimals)
        ],
        value: parseEther('0.005'),
      })
      console.log('Transaction initiated:');
      console.log("hash: ", hash);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const buttonText = isWritePending 
    ? 'Confirm in Wallet...' 
    : (hash && isWritePending) 
      ? 'Minting...' 
      : 'Mint NFT';

  return (
    <div className={styles.container}>
      <Head>
        <title>Initial Usage Offering</title>
        <meta
          content="IUO - Distribute fees to early users"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <button 
          onClick={handleMint}
          disabled={isWritePending}
          className={styles.button}
        >
          {buttonText}
        </button>


        <h1 className={styles.title}>
          Welcome to Initial Usage Offering
        </h1>

        <p className={styles.description}>
          Grow your protocol by distributing fees to early users
        </p>

        <div className={styles.grid}>
          <a className={styles.card} href="#">
            <h2>What is IUO? &rarr;</h2>
            <p>Learn how to incentivize early adoption through fee distribution.</p>
          </a>

          <a className={styles.card} href="#">
            <h2>For Projects &rarr;</h2>
            <p>Discover how to implement IUO in your protocol.</p>
          </a>

          <a className={styles.card} href="#">
            <h2>For Users &rarr;</h2>
            <p>Learn how to participate and earn fees as an early user.</p>
          </a>

          <a className={styles.card} href="#">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about IUO implementation and benefits.</p>
          </a>

          <a className={styles.card} href="#">
            <h2>Case Studies &rarr;</h2>
            <p>See how other protocols have successfully used IUO.</p>
          </a>

          <a className={styles.card} href="#">
            <h2>Get Started &rarr;</h2>
            <p>
              Launch your IUO today and start growing your user base.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="#" rel="noopener noreferrer" target="_blank">
          Powered by Initial Usage Offering
        </a>
      </footer>
    </div>
  );
};

export default Home;
