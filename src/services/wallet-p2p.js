import axios from 'axios';

const _routeWallet = process.env.ROUTER_WALLET


function login (contract) {
  const token = window.btoa(JSON.stringify({
    action: "connect",
    domain: window.location.host,
    contract: contract,
    success: window.location.origin + window.location.pathname,
  }))

  window.open(_routeWallet+"/execute?token="+token, "_self");
}

function call (json, ruta) {
  /*
    JSON EXAMPLE:
      {
        contractId: "contract_id",
        methodName: "create_account",
        args: {
          new_account_id: nickname,
          new_public_key: publicKey,
        },
        gas: "300000000000000",
        attachedDeposit: "10000000000000000000",
      }
  */
  const token = window.btoa(JSON.stringify({
    action: "call",
    domain: window.location.host,
    contract: json.contractId,
    from: localStorage.getItem("session"),
    json: json,
    success: ruta ? window.location.origin + ruta : window.location.origin + window.location.pathname,
    error: window.location.origin + window.location.pathname,
  }))
  // console.log(JSON.parse(window.atob(token)));
  window.open(_routeWallet+"/execute?token="+token, "_self");
}

function getAccount() {
  const account = {
    address: localStorage.getItem("session"),
    publicKey: '',
    privateKey: '',
  };
  // console.log("esta es la session: ", localStorage.getItem("session"))

  return account
}


function getTransaction(hash, account_id) {
  const account = account_id ? account_id : getAccount().address;
  const json = {
    "jsonrpc": "2.0",
    "id": "dontcare",
    "method": "tx",
    "params": [hash, account]
  }

  return axios.post('https://archival-rpc.testnet.near.org',
    json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
}


export default {
  login,
  call,
  getAccount,
  getTransaction
}
