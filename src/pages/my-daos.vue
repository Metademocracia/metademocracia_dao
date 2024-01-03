<template>
  <div id="my-daos">
    <toolbar-search />

    <toolbar title="Mis DAOs" content-class="flex-spaceb">
      <v-btn class="bg-tertiary px-2 ml-auto" style="font-size: 12px;" @click="router.push({ name: 'CreateDao' })">
        <v-icon icon="mdi-plus" class="text-white" />
        Crear Dao
      </v-btn>
    </toolbar>

    <section id="my-daos__content" class="mt-10">
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

page = ref(1),
daos = ref([]),
paginatedDaos = computed(() => (daos.value.length || 3) / 3)


onBeforeMount(getData)


function getData() {
  for (let i = 0; i < 3; i++) {
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
