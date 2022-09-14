import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";

function Contact() {
    const [account, setAccount] = useState();

    useEffect(() => {
        async function load() {
            const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
            const accounts = await web3.eth.requestAccounts();

            setAccount(accounts[0]);
        }

        load();
    }, []);

    return (
      <div>
        your account is: {account}
      </div>
    );
  }
  
  export default Contact;