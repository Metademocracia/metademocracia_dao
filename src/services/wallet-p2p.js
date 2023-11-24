import axios from 'axios';
import graphQl from '@/services/graphQl';
// import { configNear }  from './nearConfig';
//import * as nearAPI from "near-api-js";
//const { KeyPair, keyStores, connect } = nearAPI;
import encryp from './encryp';

const _routeWallet = process.env.ROUTER_WALLET
const _routeRpc = process.env.ROUTER_RPC


function login (contract) {
  const token = window.btoa(JSON.stringify({
    action: "connect",
    domain: window.location.host,
    contract: contract,
    success: window.location.origin + window.location.pathname,
  }))

  const route = _routeWallet+"/execute?token="+token;
  // console.log(route)
  window.open(route, "_self");
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
  const dataWallet = JSON.parse(localStorage.getItem("session"))
  const wallet = dataWallet ? dataWallet.wallet : undefined;
  const token = /*window.btoa(*/encryp.encryp(JSON.stringify({
    action: "call",
    domain: window.location.host,
    contract: json.contractId,
    from: wallet,
    json: json,
    success: ruta ? window.location.origin + process.env.BASE_URL + ruta : window.location.origin + window.location.pathname,
    error: window.location.origin + window.location.pathname,
  })/*)*/);

  // console.log(JSON.parse(window.atob(token)));
  window.open(_routeWallet+"/execute?token="+token, "_self");
}

function getAccount() {
  const dataWallet = JSON.parse(localStorage.getItem("session"))
  const wallet = dataWallet ? dataWallet.wallet : undefined;

  const account = {
    address: wallet,
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

  return axios.post(_routeRpc,
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
