<template>
  <div id="settings">
    <h5 class="mt-4 mb-8">DAO Settings</h5>

    <section id="settings__content">
      <v-sheet v-for="(item, i) in settings" :key="i">
        <v-card class="clear-overlay" @click="redirect(item.to)">
          <v-img
            :src="item.img"
            cover
            width="50"
            height="50"
            class="elevation-5 flex-grow-0"
          ></v-img>

          <p class="text-center mb-0">{{ item.text }}</p>
        </v-card>
      </v-sheet>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/settings.scss';
import GeneralSettingsIcon from '@/assets/sources/icons/general-settings-icon.svg';
import PolicySettingsIcon from '@/assets/sources/icons/policy-settings-icon.svg';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(),
router = useRouter(),
settings = [
  {
    img: GeneralSettingsIcon,
    text: "Configuraciones Generales",
    to: "general-settings"
  },
  {
    img: PolicySettingsIcon,
    text: "Configuración de las Políticas",
    to: "policy-settings"
  },
]

function redirect(to) {
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  const dao = urlParams.get('dao');

  if(!dao) return

  router.push({ path: to, query: {dao: dao}  })
}
</script>
