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
  typesDao: [{desc: "Publico", value: "0"}, {desc: "Privado", value: "1"}],
  typesDaoDefault: {desc: "Publico", value: "0"},
  groupAllDefault,
  groupAlls,
  itemsTokens: [
    {id: null, desc: "Near"},
    {id: process.env.CONTRACT_USDT, desc: "USDT"},
    {id: process.env.CONTRACT_ARP, desc: "ARP"},
    {id: process.env.CONTRACT_WBTC, desc: "WBTC"},
  ],
  mapGroupAlls,
  groupDefault: "Fundador",
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
  proposalKind: [
    {key: "ChangeConfig", value: "config"},
    {key: "ChangePolicy", value: "policy"},
    {key: "AddMemberToRole", value: "add_member_to_role"},
    {key: "RemoveMemberFromRole", value: "remove_member_from_role"},
    {key: "FunctionCall", value: "call"},
    {key: "UpgradeSelf", value: "upgrade_self"},
    {key: "UpgradeRemote", value: "upgrade_remote"},
    {key: "Transfer", value: "transfer"},
    {key: "SetStakingContract", value: "set_vote_token"},
    {key: "AddBounty", value: "add_bounty"},
    {key: "BountyDone", value: "bounty_done"},
    {key: "Vote", value: "vote"},
    {key: "FactoryInfoUpdate", value: "factory_info_update"},
    {key: "ChangePolicyAddOrUpdateRole", value: "policy_add_or_update_role"},
    {key: "ChangePolicyRemoveRole", value: "policy_remove_role"},
    {key: "ChangePolicyUpdateDefaultVotePolicy", value: "policy_update_default_vote_policy"},
    {key: "ChangePolicyUpdateParameters", value: "policy_update_parameters"},
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
