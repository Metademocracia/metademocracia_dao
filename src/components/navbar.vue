<template>
  <nav id="navbar" class="flex-center">
    <div>
      <img src="@/assets/sources/logos/white-logo.svg" alt="Logo">
    </div>

    
    <div class="center divrow delete-mobile" style="gap: 15px;">
      <span v-for="(item, index) in dataNavbar" :key="index" style="color: #fff; cursor: pointer;" @click="$router.push(item.link)">
        <v-icon color="white mr-1">{{ item.icon }}</v-icon> {{ item.name }}
      </span>
    </div>

    <div class="center divrow delete-mobile" style="gap: 10px;">
      <v-select
        v-model="selectedLang"
        :items="['ENG', 'ES']"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select"
        bg-color="transparent"
        hide-details
        style="color: white;"
      ></v-select>
      <v-btn class="btn" @click="dialogConnect = true">Connect Wallet</v-btn>
    </div>

    <v-btn class="btn show-mobile" style="width: 50px!important; height: 50px!important;">
      <v-icon style="font-size: 25px;">mdi-menu</v-icon>
    </v-btn>

    <v-dialog v-model="dialogConnect" persistent content-class="dialog-connect">
      <v-card class="card-dialog">
        <div class="div-card">
          <v-icon @click="dialogConnect = false, obtenWallet = false" style="cursor: pointer;position: absolute; top: 10px; right: 10px;">mdi-close</v-icon>

          <h5>Conecta tu Wallet</h5>

          <div class="divrow center mt-8 mb-8" style="gap: 15px;">
            <v-sheet class="sheet-dialog">
              <img src="@/assets/sources/icons/near-wallet-icon.svg" alt="Near" style="max-width: 25px;">
              <span>
                NEAR Wallet
              </span>
            </v-sheet>

            <v-sheet class="sheet-dialog">
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

            <v-sheet class="sheet-dialog">
              <img src="@/assets/sources/icons/meteor-wallet-icon.svg" alt="Meteor" style="max-width: 25px;">
              <span>
                Meteor Wallet
              </span>
            </v-sheet>
          </div>

          <hr style="width: 80%; background-color: rgba(255,255,255, 0.6); height: 2px;">

          <v-btn class="btn mt-8 mb-8" @click="obtenWallet = true">Obtén tu Wallet</v-btn>

          <template v-if="obtenWallet == true">
            <div class="divrow center mt-8 mb-8" style="gap: 15px;">
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
          </template>
        </div>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  data(){
    return{
      selectedLang: 'ENG',
      dialogConnect: false,
      obtenWallet: false,
      dataNavbar: [
       { icon: "mdi-home-variant-outline", name: 'Home', link: '/' },
       { icon: 'mdi-file-edit-outline', name: 'Proposals', link: 'proposals' },
       { icon: 'mdi-circle-multiple-outline', name: 'Funds', link: 'funds' }
      ]
    }
  },
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

.dialog-connect{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;

    .card-dialog{
      padding: 25px;
      background-image: linear-gradient(135deg, #8A5FA4 30%, #62C3D7 80%)!important;
      width: 60%;

      .div-card{
        background-image: linear-gradient(45deg, #8a347d 30%, #4f80ac 80%)!important;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
        color: #fff;
        border-radius: 10px;
        position: relative;

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
</style>
