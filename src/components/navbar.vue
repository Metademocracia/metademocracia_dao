<template>
  <nav id="navbar" class="flex-center">
    <div id="menu-navbar">
      <v-menu
        v-model="menuToggle" content-class="menu-toggle"
        :close-on-content-click="false" transition="slide-x-transition"
        height="100vh"

      >
        <div class="divcol center relative">
          <v-icon
          color="#fff" large
          style="position:absolute;top: 0px; right: 0px; border-radius: 50%; border: 3px solid var(--primary);"
          @click="menuToggle = false"
          >
            mdi-close
          </v-icon>
          <img src="@/assets/sources/logos/white-logo.svg" @click="$router.push('/'), menuToggle = false" alt="Logo" class="logo mt-14" style="cursor: pointer; width: 200px;">

          <div class="divcol center mt-8 pt-6" style="gap: 40px;">
            <a
              v-for="(item, i) in dataNavbar" :key="i"
              class="text-a-menu"
              :href="item.ref" target="_blank"
              @click="$router.push(item.link), menuToggle = false">
              {{item.name}}
            </a>
          </div>

          <v-btn class="btn mt-10" @click="dialogConnect = true">Conectar Wallet</v-btn>

        </div>
      </v-menu>
    </div>

    <div class="absolute-img">
      <img src="@/assets/sources/logos/white-logo.svg" alt="Logo" @click="$router.push('/')" style="cursor: pointer;">
    </div>


    <div class="center divrow delete-mobile" style="gap: 15px; margin-left: 140px">
      <a v-for="(item, index) in dataNavbar" :key="index" style="color: #fff; cursor: pointer; font-weight: 700!important;" @click="$router.push(item.link)" :href="item.ref" target="_blank">
        <v-icon color="white mr-1">{{ item.icon }}</v-icon> {{ item.name }}
      </a>
    </div>

    <div class="center divrow delete-mobile" style="gap: 10px;">
      <!--<v-select
        v-model="selectedLang"
        :items="['ENG', 'ES']"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select"
        bg-color="transparent"
        hide-details
        style="color: white;"
      ></v-select>-->
      <v-btn class="btn" @click="openDialog()">{{ titleBtnLogin }}</v-btn>
      <!--<v-btn class="btn" @click="dialogConnect = true">Conectar Wallet</v-btn>-->
    </div>

    <v-btn class="btn show-mobile" style="width: 50px!important; height: 50px!important;" @click="menuToggle = true">
      <v-icon style="font-size: 25px;">mdi-menu</v-icon>
    </v-btn>

    <v-dialog v-model="dialogConnect" persistent content-class="dialog-connect">
      <v-card class="card-dialog">
        <div class="div-card">
          <v-icon @click="dialogConnect = false, obtenWallet = false" style="cursor: pointer;position: absolute; top: 10px; right: 10px;">mdi-close</v-icon>

          <h5>Cerrar sessión</h5>

          <!--<div class="divrow center wrap mt-8 mb-8" style="gap: 15px;">
            <v-sheet class="sheet-dialog" @click="login('near')">
              <img src="@/assets/sources/icons/near-wallet-icon.svg" alt="Near" style="max-width: 25px;">
              <span>
                NEAR Wallet
              </span>
            </v-sheet>

            <v-sheet class="sheet-dialog" @click="login('near')">
              <img src="@/assets/sources/icons/my-near-wallet-icon.svg" alt="My Near" style="max-width: 25px;">
              <span>
                MyNear Wallet
              </span>
            </v-sheet>

            <v-sheet class="sheet-dialog">
              <img src="@/assets/sources/icons/here-wallet.svg" alt="Here" style="max-width: 25px;">
              <span>
                Here Wallet
              </span>
            </v-sheet>

            <v-sheet class="sheet-dialog" @click="login('near')">
              <img src="@/assets/sources/icons/meteor-wallet-icon.svg" alt="Meteor" style="max-width: 25px;">
              <span>
                Meteor Wallet
              </span>
            </v-sheet>
          </div>

          <hr style="width: 80%; background-color: rgba(255,255,255, 0.6); height: 2px;">-->

          <v-btn class="btn mt-8 mb-8" @click="logout">Logout</v-btn>

          <!--<template v-if="obtenWallet == true">
            <div class="divrow center wrap mt-8 mb-8" style="gap: 15px;">
              <v-sheet class="sheet-dialog">
                <v-icon class="icon">mdi-link</v-icon>
                <img src="@/assets/sources/icons/near-icon.svg" alt="Near" style="max-width: 25px;">
                <span>
                  NEAR Wallet
                </span>
                <span style="color: rgba(255,255,255, 0.4); font-size: 12;">
                  Web Wallet
                </span>
              </v-sheet>

              <v-sheet class="sheet-dialog">
                <v-icon class="icon">mdi-link</v-icon>
                <img src="@/assets/sources/icons/my-near-wallet-icon.svg" alt="My Near" style="max-width: 25px;">
                <span>
                  MyNear Wallet
                </span>
                <span style="color: rgba(255,255,255, 0.4); font-size: 12;">
                  Web Wallet
                </span>
              </v-sheet>

              <v-sheet class="sheet-dialog">
                <v-icon class="icon">mdi-link</v-icon>
                <img src="@/assets/sources/icons/here-wallet.svg" alt="Here" style="max-width: 25px;">
                <span>
                  Here Wallet
                </span>
                <span style="color: rgba(255,255,255, 0.4); font-size: 12;">
                  Web Wallet
                </span>
              </v-sheet>

              <v-sheet class="sheet-dialog">
                <v-icon class="icon">mdi-link</v-icon>
                <img src="@/assets/sources/icons/meteor-wallet-icon.svg" alt="Meteor" style="max-width: 25px;">
                <span>
                  Meteor Wallet
                </span>
                <span style="color: rgba(255,255,255, 0.4); font-size: 12;">
                  Web Wallet
                </span>
              </v-sheet>
            </div>
          </template>-->
        </div>
      </v-card>
    </v-dialog>
  </nav>
  <v-alert
    v-model="alert"
    :type="colorAlert"
    elevation="3"
    closable
    close-label="Close Alert"
    :title="titleAlert"
  >
    <p class="mt-5">Hash: <a :href="hashRouteAlert" target="_blank"> {{ hashAlert }}</a></p>

    <p v-if="errorAlert"> {{ errorAlert }} </p>
  </v-alert>

  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
      content-class="dialog-dao"
    >
      <v-card>
        <v-card-title class="text-h5">
          Estás saliendo de METADEMOCRACIA
        </v-card-title>
        <v-card-text>Luego de crear tu wallet o conectar una ya existente puedes volver a esta página para vincularla a tu perfil.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            class="btn"
            @click="dialog = false"
          >
            Negar
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            class="btn"
            @click="login('near')"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>

import { useWindowScroll } from '@vueuse/core';
import { ref } from 'vue';
import WalletP2p from '../services/wallet-p2p';
import moment from 'moment';

export default {
  setup(){
    return{
      alert: ref(false),
      dialog: ref(false),
      colorAlert: ref("success"),
      titleAlert: ref("Success"),
      hashAlert: ref(""),
      hashRouteAlert: ref(""),
      errorAlert: ref(null),
      menuToggle: ref(false),
      selectedLang: 'ES',
      dialogConnect: ref(false),
      obtenWallet: false,
      dataNavbar: [
       { icon: "mdi-home-variant-outline", name: 'Home', link: '/' },
       { icon: 'mdi-file-edit-outline', name: 'Propuestas', link: 'proposals' },
       { icon: 'mdi-circle-multiple-outline', name: 'Fondos', link: 'funds' },
       { icon: 'mdi-account-group-outline', name: 'Foro', ref: 'https://forum.metademocracia.social/'},
       { icon: 'mdi-information-outline', name: 'Metainfo', ref: 'https://metademocracia.com/' }
      ],
      titleBtnLogin: ref("Conectar Wallet"),
    }
  },

  mounted() {
    this.verifySession();
    this.verifyResponse();
  },

  methods: {
    verifyResponse(){
      try {
        const valores = window.location.search;
        const urlParams = new URLSearchParams(valores);
        var response = urlParams.get('response');

        if(!response) return

        const response_json = JSON.parse(window.atob(response));

        if(!response_json?.hash || !response_json?.date_time) return

        const now = moment(new Date()); //todays date
        const end = moment(response_json.date_time*1000); // another date
        const duration = moment.duration(now.diff(end));
        const minutes = duration.asMinutes();

        if(minutes > 0.7) return

        WalletP2p.getTransaction(response_json?.hash).then(response => {
          const response_json = response.data.result;
          const hash = response_json?.transaction.hash;
          const status_json = response_json?.receipts_outcome[3]?.outcome?.status;
          const status = status_json?.Failure != undefined ? "Failure" : status_json?.SuccessValue  != undefined ? "Success" : "";

          this.alert = true;
          this.colorAlert = status == "Failure" ? "error" : this.colorAlert;
          this.titleAlert = status == "Failure" ? "Failure" : this.titleAlert;
          this.hashAlert = hash;
          this.hashRouteAlert = process.env.ROUTER_EXPLORER_NEAR_HASH + hash;
          this.errorAlert = status_json?.Failure?.ActionError?.kind?.FunctionCallError?.ExecutionError;
        });


        // location.href = 'http://127.0.0.1:3002/metademocracia/proposals';

      } catch (error) {
       console.log("error al cargar mensaje", error.toString());
      }


    },
    verifySession(){
      let dataSession = localStorage.getItem("session");


      if(dataSession) {
        console.log("por aca: ", dataSession)
        const dataSessionJson = JSON.parse(dataSession);
        const wallet = dataSessionJson.email || dataSessionJson.wallet
        this.initSession(wallet)
        return
      }

      const valores = window.location.search;
      const urlParams = new URLSearchParams(valores);
      var token = urlParams.get('token');

      if(!token) return

      console.log("token aqui: ", JSON.parse(window.atob(token)))

      dataSession = window.atob(token)

      localStorage.setItem("session", dataSession)
      const dataSessionJson = JSON.parse(dataSession);
      const wallet = dataSessionJson.email || dataSessionJson.wallet
      this.initSession(wallet)
    },

    initSession(wallet) {
      const wallet_final = wallet.length > 20 ? wallet.substring(0,6)+"..."+wallet.substring((wallet.length - process.env.NETWORK.length - 7), wallet.length) : wallet;
      this.titleBtnLogin = wallet_final;
    },

    openDialog() {
      if(localStorage.getItem("session")) {
        this.dialogConnect = true

        return
      }

      this.dialog = true
    },

    login() {
      WalletP2p.login(process.env.CONTRACT_NFT);
    },

    logout() {
      localStorage.removeItem("session")
      this.titleBtnLogin = "Conectar Wallet";
      this.dialogConnect = false;

      window.open(window.location.origin + window.location.pathname, "_self");
    }
  }
}

</script>


<style lang="scss">
@use '@/assets/styles/main.scss' as *;

#navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-inline: var(--margin-global);
  background: transparent;
  padding-block: 20px;
  position: relative;

  .absolute-img{
    position: absolute;
  }

  .delete-mobile{
    @include media(max, 960px){
      display: none;
    }
  }

  .show-mobile{
    display: none;

    @include media(max, 960px){
      display: block;
    }
  }

  .select{
    .v-field__input{
      padding-left: 0px;
    }

    i{
      color: $primary;
    }
  }
}

.dialog-dao{
  .v-card{
    background-image: linear-gradient(45deg, #7b48ad 30%, #5577c1 80%);

    .v-card-title{
      color: #fff;
    }

    .v-card-text{
      color: #fff;
    }
  }
}

.v-alert{
  background: linear-gradient(45deg, #7b48ad 30%, #5577c1 60%)!important;
  width: 40%;
  margin-inline: auto;
  @include media(max, 900px){
    width: 90%;
  }

  a{
    color: #fff;
    text-decoration: underline;
  }
  .mdi-close{
    font-size: 20px;
  }
}

.dialog-connect{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;

    .card-dialog{
      padding: 25px;
      padding-block: 20px!important;
      background-image: linear-gradient(135deg, #8A5FA4 30%, #62C3D7 80%)!important;
      width: 60%;

      @include media(max, 1400px){
        width: 80%;
      }

      .div-card{
        background-image: linear-gradient(45deg, #8a347d 30%, #4f80ac 80%)!important;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
        padding-block: 30px;
        color: #fff;
        border-radius: 10px;
        position: relative;
        max-height: 80%;
        overflow-y: scroll;

        .sheet-dialog{
          background-color: rgba(0,0,0,0.5);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          padding: 10px 20px 10px 20px;
          min-width: 150px;
          position: relative;

          span{
            color: #fff;
            font-size: 14px;
          }

          .icon{
            transform: rotate(135deg);
            position: absolute;
            top: 5px;
            right: 5px;
            color: #61C2D5;
            font-size: 20px;
          }
        }
      }
    }
  }

.menu-toggle{
  height: 400vh!important;
  min-height: 100%!important;
  width: 100vw;
  max-width: 100%;
  padding-inline: 30px;
  padding-block: 30px;
  background-image: linear-gradient(45deg, #8A5FA4 30%, #62C3D7 80%);
  top: 0!important;
  left: 0;
  z-index: 100;

  .text-a-menu{
    --fs: 20px!important;
    --fw: 700;
    font-weight: 700!important;
    color: #fff;
  }
}
</style>
