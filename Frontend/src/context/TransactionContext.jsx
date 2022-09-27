import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.geetSigner();

  console.log({
    provider,
    signer,
  });
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("메타마스크를 설치해 주세요!");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No etheruem object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("메타마스크를 설치해주세요.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No etheruem object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider
      value={{ connectWallet, currentAccount, setImgUrl, imgUrl }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
