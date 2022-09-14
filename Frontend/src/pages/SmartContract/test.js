import Web3 from 'web3'

/* return */new Promise((resolve, reject) => {
 // 1
  window.addEventListener('load', async () => {
    let web3, account;
    // 2
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    // 3
    } else if (typeof window.web3 !== 'undefined') {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      // 4
      reject(new Error('No web3 instance injected, using local web3.'))
    }
    if (web3) {
      // 5
      account = await web3.eth.requestAccounts();
    }
    console.log(account) //지워도됨
  })
})
