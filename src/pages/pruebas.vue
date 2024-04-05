<template>
  <div id="daos">
    <span v-if="!accounId"><connectWallet></connectWallet></span>
    <span v-if="accounId">
      <aside class="toolbar-search">
      <div class="toolbar-search__wrapper">
        <v-text-field
          v-model="likeWalletDao"
          placeholder="Buscar"
          variant="solo"
          hide-details
        >
          <template #prepend-inner>
            <v-icon icon="mdi-magnify" size="23" class="text-primary" />
          </template>

          <template #append-inner>
            <v-btn
              height="38"
              class="bg-secondary px-7"
              @click="getData()"
            >Buscar</v-btn>
          </template>
        </v-text-field>
      </div>
    </aside>



      <toolbar title="DAOs" content-class="flex-spaceb">
        <v-tabs v-model="tab" slider-color="transparent">
          <v-tab v-for="(item, i) in tabs" :key="i">
            <div class="custom-checkbox mr-2" :class="{ active: tab == i }" />
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-btn class="bg-tertiary px-2 ml-auto" style="font-size: 12px;" @click="loginNear()">
          <v-icon icon="mdi-plus" class="text-white" />
          login near
        </v-btn>

        <v-btn class="bg-tertiary px-2 ml-auto" style="font-size: 12px;" @click="logout()">
          <v-icon icon="mdi-plus" class="text-white" />
          logout near
        </v-btn>

        <v-btn class="bg-tertiary px-2 ml-auto" style="font-size: 12px;" @click="call()">
          <v-icon icon="mdi-plus" class="text-white" />
          call near
        </v-btn>
      </toolbar>




    </span>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/daos.scss'
import DaoCard from '@/components/dao-card.vue'
import MetademocraciaImage from '@/assets/sources/images/metademocracia-image.png'
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useRouter } from 'vue-router';
import graphQl from '@/services/graphQl';
import WalletP2p from '../services/wallet-p2p';
import axios from 'axios';
import connectWallet from '@/components/connect-wallet.vue';
import {configNear} from '../services/nearConfig';
import * as nearAPI from "near-api-js";
const { utils, AccountService, NearUtils, KeyPair, keyStores, Near, connect, WalletConnection, Contract  } = nearAPI;
const
  router = useRouter(),

tab = ref(0),
tabs = [/*"Más Activos",*/ "Más Nuevos", "Más Viejos", "N° Miembros"],
page = ref(1),
daos = ref([]),
paginatedDaos = computed(() => (daos.value.length || 9) / 9),
likeWalletDao = ref(undefined),
listDaos = ref([]),
accounId = WalletP2p.getAccount()?.address
const loading = ref(true);



// onBeforeMount(getData)
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

// const nearConnection = await connect(configNear(myKeyStore));
const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "http://localhost:8000/wallet-p2p",
  // walletUrl: "https://testnet.mynearwallet.com",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://testnet.nearblocks.io",
};


async function loginNear() {
  // connect to NEAR
  const nearConnection = await connect(connectionConfig);

  const walletConnection = new WalletConnection(nearConnection, "metaDao");

  if (!walletConnection.isSignedIn()) {
    console.log(walletConnection.isSignedIn())
    walletConnection.requestSignIn({
      // contractId: "factoryv4.metademocracia.testnet",
      // methodNames: [], // optional
      // successUrl: "REPLACE_ME://.com/success", // optional redirect URL on success
      // failureUrl: "REPLACE_ME://.com/failure", // optional redirect URL on failure
    });
  } else {
    // Si el usuario ya está conectado, puedes obtener la información de la cuenta
    const accountId = walletConnection.getAccountId();
    console.log(accountId);
  }

}

async function logout() {
  // connect to NEAR
  const nearConnection = await connect(connectionConfig);

  const walletConnection = new WalletConnection(nearConnection, "metaDao");
  walletConnection.signOut();

}

async function call(){
  const nearConnection = await connect(connectionConfig);

  const walletConnection = new WalletConnection(nearConnection, "metaDao");

  const account = walletConnection.account().functionCall()
  console.log(account)

  const contract = new Contract(account, "pruebas12.factoryv4.metademocracia.testnet", {
    changeMethods: ["add_proposal"],
  });
  await contract.add_proposal(
    {
      proposal: {
        title: btoa("pruebassss"),
        description: btoa("pruebasss"),
        kind: "Vote",
        link: "",
      }
    },
    "200000000000000", // attached GAS (optional)
    "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
  );
}


</script>
<style lang="scss">
@import '@/assets/styles/main.scss';

.full-width {
      width: 550px !important;
      align-content: center;
      color: white !important;
 }

.toolbar-search {
  // position: sticky;
  // top: 20px;

  position: relative;
  isolation: isolate;
  background: $primary !important;
  width: 100vw !important;
  min-height: 120px;
  display: flex;
  align-items: center;
  margin-inline: calc(50% - 50vw) !important;
  z-index: 2;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgb(#62C3D7, .58);
    translate: 20px 0px;
    scale: 1 2;
    filter: blur(50px);
    z-index: -1;
  }


  &__wrapper {
    max-width: calc(880px + var(--margin-global));
    width: 100%;
    margin-inline: auto;
    padding-inline: var(--margin-global);
    padding-block: 10px;
    display: flex;
    align-items: center;
  }

  .v-input {
    .v-field {
      padding-right: 0;
      border-radius: 30px;

      &__field {
        height: 38px;
      }

      input {
        min-height: 100% !important;
        height: 100% !important;
        font-size: 14px;
      }
    }

    i { color: $primary }
  }
}
</style>
