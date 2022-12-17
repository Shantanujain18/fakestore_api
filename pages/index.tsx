import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "./components/Layout";

import HomePage from "./HomePage";

import { AppProps } from "next/app";
import React from "react";


export default function Home({ Component, pageProps }:AppProps) {

  return (
  
        <div className={styles.container}>
          <Head>
            <title>Shantanu' Store</title>
            <meta
              name="description"
              content="Portfolio of Shantanu Ashok Jain (shantanujainx, shantanujain18, shantanu jain pict)"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          
            <HomePage />
           
            
        </div>
    
  );
}
