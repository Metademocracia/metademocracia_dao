<template>
  <div id="members">
    <h5>
      Miembros Totales: <span class="text-primary">#589</span>
    </h5>

    <section class="container-members mt-4">
      <h6>Grupos</h6>

      <v-tabs slider-color="transparent">
        <v-tab min-width="45" class="pa-0" :class="{ active: true }">
          <v-icon size="30">mdi-account-multiple</v-icon>
        </v-tab>

        <v-tab v-for="(item, i) in dataTabs" :key="i" :class="{ active: i == 0}">
          {{ item.name }}
        </v-tab>
      </v-tabs>

      <v-select
        v-model="filter"
        :items="filters"
        item-title="name"
        item-value="value"
        variant="solo"
        class="filter my-4"
        hide-details
      ></v-select>

      <aside class="grid">
        <v-sheet v-for="(item, i) in dataMembers" :key="i">
          <v-card class="clear-overlay">
            <v-btn
              icon="mdi-open-in-new"
              color="rgba(111, 91, 165, 1)"
              size="18"
            />

            <v-img
              :src="item.avatar"
              cover
              width="50"
              height="50"
              class="elevation-5 flex-grow-0"
            ></v-img>

            <a>{{ item.group }}</a>
            <h6 class="mb-0">{{ item.user }}</h6>

            <div class="mt-auto">
              <v-divider thickness="1.5" color="#8A5FA4" style="opacity: .5 !important;" />
              <span>Votos Emitidos: {{ item.votes }}</span>
            </div>
          </v-card>
        </v-sheet>
      </aside>

      <v-pagination
        v-model="page"
        class="my-16"
        :length="paginatedDataMembers"
      ></v-pagination>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/members.scss'
import avatarIcon from '@/assets/sources/images/avatar.jpg'
import { computed } from 'vue';
import { ref, onBeforeMount } from 'vue'
const
dataTabs = [
  {
    name: "Council",
    value: "council"
  },
  {
    name: "Onboardees",
    value: "onboardees"
  },
  {
    name: "Grifters",
    value: "grifters"
  },
  {
    name: "Sponsors",
    value: "sponsors"
  },
  {
    name: "Partners",
    value: "partners"
  },
  {
    name: "Whitelist Members",
    value: "whitelist"
  },
],
filter = ref('actives'),
filters = [
  {
    name: "Más activos",
    value: "actives"
  }
],
dataMembers = ref([]),
page = ref(1),
paginatedDataMembers = computed(() => (dataMembers.value.length || 12) / 12)


onBeforeMount(getData)

function getData() {
  for (let i = 0; i < 12; i++) {
    dataMembers.value.push({
      avatar: avatarIcon,
      group: "council",
      user: "andresdom.near",
      votes: 23,
    })
  }
}
</script>