import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="m-0 flex items-center justify-center flex-col h-screen">
      <Head>
        <title>PWA demo</title>
        <meta name="description" content="PWA app made with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto text-center px-4 mb-10">
        <h1 className="text-4xl font-bold mb-4">PWA demo</h1>
        <p className="text-gray-500">This is demo page made by next.js</p>
      </main>

      <footer className="container mx-auto text-center">
        &copy; Created by{" "}
        <a
          href="https://mrmarsaoli.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Mrmarsaoli
        </a>
      </footer>
    </div>
  );
};

export default Home;
