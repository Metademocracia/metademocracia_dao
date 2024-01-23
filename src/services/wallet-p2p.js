import axios from 'axios';
import graphQl from '@/services/graphQl';
// import { configNear }  from './nearConfig';
//import * as nearAPI from "near-api-js";
//const { KeyPair, keyStores, connect } = nearAPI;
import encryp from './encryp';
import * as nearAPI from "near-api-js";
const { utils, AccountService, NearUtils, KeyPair, keyStores, Near, connect } = nearAPI;
import {configNear} from '../services/nearConfig';
import nearSeedPhrase from 'near-seed-phrase';

const _routeWallet = process.env.ROUTER_WALLET
const _routeRpc = process.env.ROUTER_RPC


function login (contract) {
  const token = /*window.btoa(*/encryp.encryp(JSON.stringify({
    action: "connect-seedphrase",
    domain: window.location.host,
    contract: contract,
    success: window.location.origin + window.location.pathname,
  }))

  const route = _routeWallet+"/execute?token="+token;
  // console.log(route)
  window.open(route, "_self");
}

function call (json, ruta, param_ruta) {
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
 console.log("json: ", json)
  const dataWallet = JSON.parse(localStorage.getItem("session"))
  const wallet = dataWallet ? dataWallet.wallet : undefined;
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("response");
  urlParams.delete("token");

  const token = /*window.btoa(*/encryp.encryp(JSON.stringify({
    action: "call",
    domain: window.location.host,
    contract: json.contractId,
    from: wallet,
    json: json,
    success: ruta ? window.location.origin + process.env.BASE_URL + ruta : window.location.origin + window.location.pathname,
    search: ruta ? param_ruta : urlParams.toString() != "" ? "?"+urlParams.toString() : undefined,
    error: window.location.origin + window.location.pathname,
    searchError: urlParams.toString() != "" ? "?"+urlParams.toString() : undefined,
  })/*)*/);

  // console.log(JSON.parse(window.atob(token)));
  window.open(_routeWallet+"/execute?token="+token, "_self");
}

function getAccount() {
  const dataWallet = JSON.parse(localStorage.getItem("session"))
  const wallet = dataWallet ? dataWallet.wallet : undefined;
  const privateKey = dataWallet ? dataWallet.privateKey : undefined;

  const account = {
    address: wallet,
    publicKey: '',
    privateKey: privateKey,
  };
  // console.log("esta es la session: ", localStorage.getItem("session"))

  return account
}

async function view(json) {
  let privateKey = getAccount().privateKey;
  let address =  getAccount().address;

  if(!privateKey && !address) {
    const {secretKey} = await nearSeedPhrase.generateSeedPhrase();
    const keyPair = KeyPair.fromString(secretKey);
    const implicitAccountId = Buffer.from(keyPair.getPublicKey().data).toString("hex");

    privateKey = secretKey;
    address = implicitAccountId;
  }

  // creates a public / private key pair using the provided private key
  // adds the keyPair you created to keyStore
  const myKeyStore = new keyStores.InMemoryKeyStore();
  const keyPairOld = KeyPair.fromString(privateKey);
  await myKeyStore.setKey(process.env.NETWORK, address, keyPairOld);




  const nearConnection = await connect(configNear(myKeyStore));
  const account = await nearConnection.account(address);

  const response = await account.viewFunction(json);

  return response
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
  view,
  getAccount,
  getTransaction
}
