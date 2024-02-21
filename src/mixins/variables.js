import axios from "axios"
import store from "@/store"
import { useStorage } from "vue3-storage-secure"
import { useTheme } from "vuetify/lib/framework.mjs"


const groupAllDefault = "Publico General";
const groupAlls = [
  "All",
  "all",
  "Publico General",
  "Todos",
  "todos"
];

const mapGroupAlls = (text) => {
  const result = groupAlls.find((item) => item == text)
  return !result ? text : groupAllDefault
};

export default {
  // ? custom defines

  groupAllDefault,
  groupAlls,
  mapGroupAlls,
  groupsDefaults: [
    "Fundador",
    "Concejal",
    "Ciudadano",
    "Miembro",
    "Socio",
    "Asociado",
    "Voluntario",
    "Activista",
    "Vocero",
    "Asesor",
    "Invitado",
    "Colaborador",
    "Agremiado",
    "Representante",
    "Consejero",
  ],
  globalRules: {
    required: (v) => !!v || "Es requerido",
    listRequired: (v) => !!v?.length || "Es requerido",
    numberAndCharacter: [(v) => !!v || "Es requerido", (v) => /[^a-zA-Z0-9]/.test(v) || "Solo se permiten numeros y letras"],
    email: (v) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(v) || 'Invalid email.'
    },
  },
  isProduction: process.env.NODE_ENV === 'production',

  isLogged() {
    return !!useStorage().getStorageSync('tokenAuth')
  },
  profile() {
    return store.state.profile
  },
  appIsLaunched() {
    return useStorage().getStorageSync('appIsLaunched')
  },
  baseDomainPath() {
    return axios.defaults.baseURL
  },
  getTheme() {
    return useTheme().name
  },
  getThemeSrc() {
    return `@/assets/sources/themes/${useTheme().name}/`
  },
  basePath(url, prefix = "/app") {
    return `${this.appIsLaunched() ? prefix : ''}${url}`
  },

  //?  life cycle
  // mounted() {},
}
