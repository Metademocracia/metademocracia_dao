<template>
  <aside>
    <center><v-btn class="btn mt-10" @click="openDialog()">{{ validSession() }}</v-btn></center>
  </aside>

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

    <v-dialog v-model="dialogConnect" persistent content-class="dialog-connect">
      <v-card class="card-dialog">
        <div class="div-card">
          <v-icon @click="dialogConnect = false, obtenWallet = false" style="cursor: pointer;position: absolute; top: 10px; right: 10px;">mdi-close</v-icon>

          <h5>Cerrar sessión</h5>

          <v-btn class="btn mt-8 mb-8" @click="logout()">Logout</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script setup>
import { mergeProps, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import WalletP2p from '../services/wallet-p2p';

const router = useRouter(),
props = defineProps({
  title: String,
}),
dialog = ref(false),
dialogConnect = ref(false)


function validSession() {
  if(localStorage.getItem("session")) {
    const wallet = WalletP2p.getAccount()?.address;
    const wallet_final = wallet.length > 20 ? wallet.substring(0,6)+"..."+wallet.substring((wallet.length - process.env.NETWORK.length - 7), wallet.length) : wallet;
    return wallet_final;
  } else {
    return "Conectar Billetera";
  }
}

function openDialog() {
  if(localStorage.getItem("session")) {
    dialogConnect.value = true

    return
  }

  dialog.value = true
}

function login() {
  WalletP2p.login(process.env.CONTRACT_DAO);
}

function  logout() {
  localStorage.removeItem("session")
  dialogConnect.value = false;

  router.push({path: '/'})

  // window.open(window.location.origin + window.location.pathname, "_self");
}

</script>
