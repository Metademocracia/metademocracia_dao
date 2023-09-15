<template>
  <v-footer
    id="footer"
    app absolute
    class="flex-center"
  >
    <div class="jspace divrow acenter" style="width: 100%;">
      <div class="divcol center">
        <img src="@/assets/sources/logos/white-logo.svg" alt="Logo">
        <div class="divrow center mt-8" style="gap: 15px;">
          <img src="@/assets/sources/icons/instagram.svg" alt="Icon" style="max-width: 20px;">
          <img src="@/assets/sources/icons/twitter.svg" alt="Icon" style="max-width: 20px;">
          <img src="@/assets/sources/icons/discord.svg" alt="Icon" style="max-width: 20px;">
          <img src="@/assets/sources/icons/telegram.svg" alt="Icon" style="max-width: 20px;">
        </div>
      </div>

      <div class="divrow center" style="gap: 15px;">
        <a v-for="(item,index) in dataFooter" :key="index" href="" style="color: #fff;">{{ item.name }}</a>
      </div>
    </div>

    <hr class="mt-6 mb-6" style="width: 100%; border-bottom: 1px solid rgba(0,0,0,0.1);">

    <span style="color: #fff;">
      ©2023 Metademocracia. All Rights Reserved. 
    </span>
  </v-footer>
</template>

<script>
export default {
  data(){
    return{
      dataFooter:[
        {
          name: 'Home',
        },
        {
          name: 'Proposals',
        },
        {
          name: "Funds",
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/main.scss' as *;

#footer {
  background: #752ea0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: var(--margin-global);
  position: absolute;
  margin-bottom: -70px;
  padding-block: 30px 10px;
}
</style>
