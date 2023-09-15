<template>
  <v-app id="layout">
    <v-main>
      <Navbar></Navbar>
      <router-view />
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script setup>
import '@/assets/styles/layouts/default-layout.scss'
import Footer from '@/components/footer.vue'
import Navbar from '@/components/navbar.vue'
</script>
