import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
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
