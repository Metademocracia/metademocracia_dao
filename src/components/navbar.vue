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
              @click="$router.push(item.link), menuToggle = false">
              {{item.name}}
            </a>
          </div>

          <v-btn class="btn mt-10" @click="dialogConnect = true">Conectar Wallet</v-btn>

        </div>
      </v-menu>
    </div>

    <div class="absolute-img">
      <img src="@/assets/sources/logos/white-logo.svg" alt="Logo">
    </div>

    
    <div class="center divrow delete-mobile" style="gap: 15px; margin-left: 140px">
      <span v-for="(item, index) in dataNavbar" :key="index" style="color: #fff; cursor: pointer; font-weight: 700!important;" @click="$router.push(item.link)">
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
      <v-btn class="btn" @click="dialogConnect = true">Conectar Wallet</v-btn>
    </div>

    <v-btn class="btn show-mobile" style="width: 50px!important; height: 50px!important;" @click="menuToggle = true">
      <v-icon style="font-size: 25px;">mdi-menu</v-icon>
    </v-btn>

    <v-dialog v-model="dialogConnect" persistent content-class="dialog-connect">
      <v-card class="card-dialog">
        <div class="div-card">
          <v-icon @click="dialogConnect = false, obtenWallet = false" style="cursor: pointer;position: absolute; top: 10px; right: 10px;">mdi-close</v-icon>

          <h5>Conecta tu Wallet</h5>

          <div class="divrow center wrap mt-8 mb-8" style="gap: 15px;">
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
      menuToggle: false,
      selectedLang: 'ES',
      dialogConnect: false,
      obtenWallet: false,
      dataNavbar: [
       { icon: "mdi-home-variant-outline", name: 'Home', link: '/' },
       { icon: 'mdi-file-edit-outline', name: 'Propuestas', link: 'proposals' },
       { icon: 'mdi-circle-multiple-outline', name: 'Fondos', link: 'funds' }
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
  height: 100vh!important;
  min-height: 100%;
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
