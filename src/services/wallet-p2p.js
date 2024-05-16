import axios from 'axios';
import graphQl from '@/services/graphQl';
import encryp from './encryp';
import * as nearAPI from "near-api-js";
const { utils, AccountService, NearUtils, KeyPair, keyStores, Near, connect, WalletConnection } = nearAPI;
import {configNear} from '../services/nearConfig';

import {/*Action,*/ createTransaction, functionCall} from 'near-api-js/lib/transaction'
import { base_decode } from 'near-api-js/lib/utils/serialize'
import { PublicKey } from 'near-api-js/lib/utils'
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupArepaWallet } from "@near-wallet-selector/arepa-wallet";

const _routeRpc = process.env.ROUTER_RPC;

const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();


async function nearConnect() {
  let walletSelect = localStorage.getItem('near-wallet-selector:select-wallet');
  if(!walletSelect || walletSelect === "null" || walletSelect === "undefined" || walletSelect === null || walletSelect === undefined) {
    walletSelect = '"arepa-wallet"';
  }

  const selector = await setupWalletSelector({
    network: process.env.NETWORK,
    modules: [setupArepaWallet(), setupMyNearWallet()],
  });

  const wallet = await selector.wallet(walletSelect.replaceAll('"', ""));

  const nearConnection = await connect(configNear(myKeyStore, wallet.metadata.walletUrl));
  const walletConnection = new WalletConnection(nearConnection, "metaDao");

  return {nearConnection, walletConnection};
}

async function login(contract) {
  // connect to NEAR
  const {walletConnection} = await nearConnect(); // new WalletConnection(nearConnection, "metaDao");

  if (!walletConnection.isSignedIn()) {
    walletConnection.requestSignIn({
      // contractId: "factoryv4.metademocracia.testnet",
      // methodNames: [], // optional
      // successUrl: "REPLACE_ME://.com/success", // optional redirect URL on success
      // failureUrl: "REPLACE_ME://.com/failure", // optional redirect URL on failure
    });
  } /* else {
    // Si el usuario ya está conectado, puedes obtener la información de la cuenta
    const accountId = walletConnection.getAccountId();
    console.log(accountId);
  } */

}

async function logout() {
  const {walletConnection} = await nearConnect();
  walletConnection.signOut();

  localStorage.removeItem("session");
}


async function getAccountId() {
  /* const {walletConnection} = await nearConnect();
  return walletConnection.getAccountId();*/

  let walletSelect = localStorage.getItem('wallet-selector:select-wallet');
  if(!walletSelect || walletSelect === "null" || walletSelect === "undefined" || walletSelect === null || walletSelect === undefined) {
    walletSelect = '"arepa-wallet"';
  }

  const selector = await setupWalletSelector({
    network: process.env.NETWORK,
    modules: [setupArepaWallet(), setupMyNearWallet()],
  });

  const wallet = await selector.wallet(walletSelect.replaceAll('"', ""));
  const accounts = await wallet.getAccounts();

  if(accounts.length === 0) return undefined;

  return accounts[0].accountId;
}

async function call (json, ruta, param_ruta) {

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("response");
  urlParams.delete("token");
  urlParams.delete("transactionHashes");

  const route = ruta ? window.location.origin + (!process.env.BASE_URL ? "/" : process.env.BASE_URL) + ruta : window.location.origin + window.location.pathname;
  const query = param_ruta ? param_ruta : urlParams.toString() != "" ? "?"+urlParams.toString() : "";
  const callBack = route + query;

  let walletSelect = localStorage.getItem('wallet-selector:select-wallet');
  console.log("wallet: ", walletSelect.replaceAll('"', ""))

  const selector = await setupWalletSelector({
    network: process.env.NETWORK,
    modules: [setupArepaWallet({
      walletUrl: process.env.NETWORK === "mainnet" ? "https://mi.arepa.digital" : "https://develop.globaldv.tech/wallet-arepa",
    }), setupMyNearWallet()],
  });


  const wallet = await selector.wallet(walletSelect.replaceAll('"', ""));
  // console.log("wallet: ", wallet)

  await wallet.signAndSendTransaction({
    receiverId: json.contractId,
    actions: [
      {
        type: "FunctionCall",
        params: {
          methodName: json.methodName,
          args: json.args,
          gas: json.gas,
          deposit: json.attachedDeposit,
        },
      },
    ],
  }, callBack);

  return true
}

async function call2 (json, ruta, param_ruta) {

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("response");
  urlParams.delete("token");
  urlParams.delete("transactionHashes");

  const route = ruta ? window.location.origin + (!process.env.BASE_URL ? "/" : process.env.BASE_URL) + ruta : window.location.origin + window.location.pathname;
  const query = param_ruta ? param_ruta : urlParams.toString() != "" ? "?"+urlParams.toString() : "";
  const callBack = route + query;

  json.walletCallbackUrl = callBack;

  const {walletConnection} = await nearConnect();
  const response = await walletConnection.account().functionCall(json);


  return response
}


/**
 * Call multiple transactions in a batch
 * @param transactions Array of \{receiverId, functionCalls: [ { methodName, args, gas, attachedDeposit } ] \} items
 * @param ruta String
 * @param param_ruta String
 */
async function callBatchTransactions(transactions, ruta, param_ruta) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("response");
  urlParams.delete("token");
  urlParams.delete("transactionHashes");

  const route = ruta ? window.location.origin + (!process.env.BASE_URL ? "/" : process.env.BASE_URL) + ruta : window.location.origin + window.location.pathname;
  const query = ruta ? param_ruta : urlParams.toString() != "" ? "?"+urlParams.toString() : "";
  const callBack = route + query;

  let walletSelect = localStorage.getItem('wallet-selector:select-wallet');

  const selector = await setupWalletSelector({
    network: process.env.NETWORK,
    modules: [setupArepaWallet(), setupMyNearWallet()],
  });

  const wallet = await selector.wallet(walletSelect.replaceAll('"', ""));
  await wallet.signAndSendTransactions( { transactions, callbackUrl: callBack} );
}


/**
 * Call multiple transactions in a batch
 * @param transactions Array of \{receiverId, functionCalls: [ { methodName, args, gas, attachedDeposit } ] \} items
 * @param ruta String
 * @param param_ruta String
 */
async function callBatchTransactions3(transactions, ruta, param_ruta) {
  /*const transaction = [{
    receiverId: item.contract_market,
    functionCalls: [
      {
        methodName: "buy",
        gas: "300000000000000",
        args: {
          nft_contract_id: item.contract_id ,
          token_id: item.token_id,
          ft_token_id: 'near',
          price: item.price
        },
        deposit: item.price,
      },
    ],
  }]*/

  const options = { meta: "list" };
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("response");
  urlParams.delete("token");
  urlParams.delete("transactionHashes");

  const route = ruta ? window.location.origin + (!process.env.BASE_URL ? "/" : process.env.BASE_URL) + ruta : window.location.origin + window.location.pathname;
  const query = ruta ? param_ruta : urlParams.toString() != "" ? "?"+urlParams.toString() : "";
  const callBack = route + query;


  const { walletConnection } = await nearConnect();

  const nearTransactions = await Promise.all(
    transactions.map(async (tx) => {
      return await createTransactionFn(
        tx.receiverId,
        tx.functionCalls.map((fc) => {
          return functionCall(fc.methodName, (!fc?.args ? {} : fc.args), (!fc?.gas ? '3000000000000' : fc.gas), (!fc?.attachedDeposit ? "0" : fc.attachedDeposit) ) //new BN((!fc?.gas ? '3000000000000' : fc.gas)), new BN((!fc?.deposit ? "0" : fc.deposit)) )
        })
      )
    })
  )

  walletConnection.requestSignTransactions({
    transactions: nearTransactions,
    callbackUrl: callBack, // options?.callbackUrl,
    meta: options?.meta,
  }).then(res => {
    console.log(res)
  }).catch(err => console.log(err))
}


/* function callOld (json, ruta, param_ruta) {
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
  *

  const dataWallet = JSON.parse(localStorage.getItem("session"))
  const wallet = dataWallet ? dataWallet.wallet : undefined;
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("response");
  urlParams.delete("token");

  const token = /*window.btoa(*encryp.encryp(JSON.stringify({
    action: "call",
    domain: window.location.host,
    contract: json.contractId,
    from: wallet,
    json: json,
    success: ruta ? window.location.origin + (!process.env.BASE_URL ? "/" : process.env.BASE_URL) + ruta : window.location.origin + window.location.pathname,
    search: ruta ? param_ruta : urlParams.toString() != "" ? "?"+urlParams.toString() : undefined,
    error: window.location.origin + window.location.pathname,
    searchError: urlParams.toString() != "" ? "?"+urlParams.toString() : undefined,
  })/*)*);

  // console.log(JSON.parse(window.atob(token)));
  window.open(_routeWallet+"/sign?token="+token, "_self");
} */


async function view(json) {
  const {walletConnection} = await nearConnect();
  const response = await walletConnection.account().viewFunction(json);

  return response
}


async function getTransaction(hash, account_id) {
  const account = account_id ? account_id : await getAccountId();
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


function parseNearAmount(amount) {
  return utils.format.parseNearAmount(amount)
}


export default {
  login,
  logout,
  getAccountId,
  call,
  callBatchTransactions,
  view,
  getTransaction,
  parseNearAmount,
}








////////////////////////////////////////////////////////////////////////
/// crear bache de transaccion /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
async function createTransactionFn(
  receiverId,
  actions
){
  // const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()));
  // const wallet = new WalletConnection(near);
  const { walletConnection, nearConnection } = await nearConnect();

  if (!walletConnection || !nearConnection) {
    throw new Error(`No active wallet or NEAR connection.`)
  }

  const localKey =
    await nearConnection?.connection.signer.getPublicKey(
      walletConnection?.account().accountId,
      nearConnection.connection.networkId
    )

  const accessKey = await walletConnection
    ?.account()
    .accessKeyForTransaction(receiverId, actions, localKey)

  if (!accessKey) {
    throw new Error(
      `Cannot find matching key for transaction sent to ${receiverId}`
    )
  }

  const block = await nearConnection?.connection.provider.block({
    finality: 'final',
  })

  if (!block) {
    throw new Error(`Cannot find block for transaction sent to ${receiverId}`)
  }

  const blockHash = base_decode(block?.header?.hash)
  //const blockHash = nearAPI.utils.serialize.base_decode(accessKey.block_hash);

  const publicKey = PublicKey.from(accessKey.public_key)
  //const nonce = accessKey.access_key.nonce + nonceOffset
  const nonce = ++accessKey.access_key.nonce;

  return createTransaction(
    walletConnection?.account().accountId,
    publicKey,
    receiverId,
    nonce,
    actions,
    blockHash
  )
}
