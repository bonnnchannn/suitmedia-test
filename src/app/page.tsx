// src/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import PostList from '@/components/PostList';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Website Modern | Next.js & Tailwind</title>
        <meta name="description" content="Halaman website dengan fitur modern." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <main>
        <Banner />
        <PostList />
        {/* Tambahkan section lainnya di sini jika perlu */}
      </main>
    </>
  );
};

export default HomePage;