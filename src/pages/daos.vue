<template>
  <div id="daos">
    <toolbar-search />

    <toolbar title="DAOs" content-class="flex-spaceb">
      <v-tabs v-model="tab" slider-color="transparent">
        <v-tab v-for="(item, i) in tabs" :key="i">
          <div class="custom-checkbox mr-2" :class="{ active: tab == i }" />
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-btn class="bg-tertiary px-2 ml-auto" style="font-size: 12px;" @click="router.push({ name: 'CreateDao' })">
        <v-icon icon="mdi-plus" class="text-white" />
        Crear Dao
      </v-btn>
    </toolbar>

    <v-divider thickness="1.5" color="#fff" class="my-8" style="opacity: .5 !important;" />

    <section id="daos__content">
      <div class="daos">
        <dao-card
          v-for="(item, i) in daos"
          :key="i"
          :dao="item"
        />
      </div>

      <v-pagination
        v-model="page"
        class="mt-10 mb-16"
        :length="paginatedDaos"
      ></v-pagination>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/daos.scss'
import DaoCard from '@/components/dao-card.vue'
import MetademocraciaImage from '@/assets/sources/images/metademocracia-image.png'
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const
  router = useRouter(),

tab = ref(0),
tabs = ["Más Activos", "Más Nuevos", "Más Viejos", "N° Miembros", "Con mayores fondos"],
page = ref(1),
daos = ref([]),
paginatedDaos = computed(() => (daos.value.length || 9) / 9)


onBeforeMount(getData)


function getData() {
  for (let i = 0; i < 9; i++) {
    daos.value.push({
      image: MetademocraciaImage,
      name: "Metademocracia",
      account: "nombredeldao.sputnik-dao.near",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu lacus vel urna aliquam malesuada. Suspendisse fermentum enim in urna porta cursus. Nunc eget imperdiet arcu",
      funds: 125972.35,
      members: 3,
      groups: 1,
      activeProposals: 5,
      totalProposals: 11,
    })
  }
}
</script>
