<!-- TODO componente deprecado, pasar funciones al [create-proposal-new.vue] y renombrar archivos al terminar -->
<template>
  <v-form ref="formdefault" class="form-align">
    <div id="create-proposal">
      <section style="margin-inline: calc(50% - 50vw) !important; width: 100vw!important;">
        <v-carousel cycle color="#DB107C" :show-arrows="false">
          <v-carousel-item>
          <img src="@/assets/sources/images/banner-3.svg" alt="Banner" class="banner-img">
          </v-carousel-item>

          <v-carousel-item>
          <img src="@/assets/sources/images/banner-2.svg" alt="Banner" class="banner-img">
          </v-carousel-item>

          <v-carousel-item>
          <img src="@/assets/sources/images/banner-1.svg" alt="Banner" class="banner-img">
          </v-carousel-item>
        </v-carousel>
      </section>

      <section class="section2-create-proposal">
        <v-card class="card mt-16 card-crear">
          <div class="div-purple">
            <h4>Crear Propuesta</h4>
          </div>

          <v-row class="mt-6">
            <v-col cols="12" class="col-select">
              <v-tooltip content-class="custom-tooltip" location="top end" offset="10" text="Acción requerida en el DAO (transferir fondos o votación)">
                <template v-slot:activator="{ props }">
                  <v-badge v-bind="props" inline content="?" text-color="#fff" color="#DB107C">
                    <label for="tipo_propuesta">Tipo de Propuesta</label>
                  </v-badge>
                </template>
              </v-tooltip>
              <v-select
                v-model="tipo_propuesta"
                id="tipo_propuesta"
                variant="outlined"
                :items="itemsTipoPropuesta"
                item-title="desc"
                item-value="id"
                density="compact"
                :rules="[v => !!v || 'Es requerido']"
                rounded
                menu-icon="mdi-chevron-down"
                class="select-create"
                bg-color="#fff"
                return-object
                required
              ></v-select>
            </v-col>
            <v-col xl="6" lg="6" md="6" cols="12">
              <v-tooltip content-class="custom-tooltip" location="top end" offset="10" text="Identificador de la propuesta">
                <template v-slot:activator="{ props }">
                  <v-badge v-bind="props" inline content="?" text-color="#fff" color="#DB107C">
                    <label for="titulo_propuesta">Titulo de Propuesta</label>
                  </v-badge>
                </template>
              </v-tooltip>
              <v-text-field
              v-model="titulo_propuesta" id="titulo_propuesta" class="input" variant="outlined"
              elevation="1" placeholder="Titulo de Propuesta" :rules="[globalRules.required]" required
              ></v-text-field>
            </v-col>
            <v-col xl="6" lg="6" md="6" cols="12">
              <v-tooltip content-class="custom-tooltip" location="top end" offset="10" text="Persona o Wallet que realiza la propuesta">
                <template v-slot:activator="{ props }">
                  <v-badge v-bind="props" inline content="?" text-color="#fff" color="#DB107C">
                    <label for="proponente">Proponente</label>
                  </v-badge>
                </template>
              </v-tooltip>
              <v-text-field
              v-model="proponente" id="proponente" class="input" variant="outlined" disabled
              elevation="1" :placeholder="'ejemplo.'+network" :rules="[globalRules.required]" required
              ></v-text-field>
            </v-col>
            <v-col xl="6" lg="6" md="6" cols="12">
              <v-tooltip content-class="custom-tooltip" location="top end" offset="10" text="Detalle explicativo de la propuesta a realizar">
                <template v-slot:activator="{ props }">
                  <v-badge v-bind="props" inline content="?" text-color="#fff" color="#DB107C">
                    <label for="descripcion">Descripción</label>
                  </v-badge>
                </template>
              </v-tooltip>
              <v-text-field
              id="descripcion" class="input" variant="outlined"
              elevation="1" placeholder="Descripción" :rules="[globalRules.required]" required
              ></v-text-field>
            </v-col>
            <v-col xl="6" lg="6" md="6" cols="12">
              <v-tooltip content-class="custom-tooltip" location="top end" offset="10" text="Respaldo explicativo en el foro de gobernanza de la propuesta">
                <template v-slot:activator="{ props }">
                  <v-badge v-bind="props" inline content="?" text-color="#fff" color="#DB107C">
                    <label for="link">Link</label>
                  </v-badge>
                </template>
              </v-tooltip>
              <v-text-field
              id="link" class="input" variant="outlined"
              elevation="1" placeholder="Link" :rules="[globalRules.required]" required
              ></v-text-field>
            </v-col>


            <v-col v-if="tipo_propuesta && tipo_propuesta.desc === 'Cambiar política'" xl="6" lg="6" md="6" cols="12">
              <label for="política">Política</label>
              <v-text-field
              id="política" class="input" variant="outlined"
              elevation="1" placeholder="Política"
              ></v-text-field>
            </v-col>

            <template v-if="tipo_propuesta && tipo_propuesta.desc === 'Agregar miembro del grupo'">
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="group_id">ID de Grupo</label>
                <v-text-field
                id="group_id" class="input" variant="outlined"
                elevation="1" placeholder="#123456"
                ></v-text-field>
              </v-col>

              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="member_id">ID de Miembro</label>
                <v-text-field
                id="member_id" class="input" variant="outlined"
                elevation="1" placeholder="#123456"
                ></v-text-field>
              </v-col>
            </template>

            <template v-if="tipo_propuesta && tipo_propuesta.desc === 'Eliminar miembro del grupo'">
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="group_id">ID de Grupo</label>
                <v-text-field
                id="group_id" class="input" variant="outlined"
                elevation="1" placeholder="#123456"
                ></v-text-field>
              </v-col>

              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="member_id">ID de Miembro</label>
                <v-text-field
                id="member_id" class="input" variant="outlined"
                elevation="1" placeholder="#123456"
                ></v-text-field>
              </v-col>
            </template>

            <template v-if="tipo_propuesta && tipo_propuesta.id === 'FunctionCall'">
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="receiver_id">ID contrato</label>
                <v-text-field
                id="receiver_id" class="input" variant="outlined"
                elevation="1" :placeholder="'wallet.' + network" :rules="[globalRules.required]" required
                ></v-text-field>
              </v-col>

              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="method_name">Nombre del método</label>
                <v-text-field
                id="method_name" class="input" variant="outlined"
                elevation="1" placeholder="Nombre del método" :rules="[globalRules.required]" required
                ></v-text-field>
              </v-col>

              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="args">Argumentos</label>
                <v-text-field
                id="args" class="input" variant="outlined"
                elevation="1" placeholder="Argumentos" :rules="[globalRules.required]" required
                ></v-text-field>
              </v-col>

              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="deposit">Deposito</label>
                <v-text-field
                id="deposit" class="input" variant="outlined"
                elevation="1" placeholder="Deposito" :rules="[globalRules.required]" required
                ></v-text-field>
              </v-col>

              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="gas">Gas</label>
                <v-text-field
                id="gas" class="input" variant="outlined"
                elevation="1" placeholder="Gas" :rules="[globalRules.required]" required
                ></v-text-field>
              </v-col>
            </template>

            <template v-if="tipo_propuesta && tipo_propuesta.id === 'Transfer'">
              <v-col xl="6" lg="6" md="6" cols="12">
                <v-tooltip content-class="custom-tooltip" location="top end" offset="10" text="Token o cryptomoneda a transferir">
                  <template v-slot:activator="{ props }">
                    <v-badge v-bind="props" inline content="?" text-color="#fff" color="#DB107C">
                      <label for="token_id">ID de Token</label>
                    </v-badge>
                  </template>
                </v-tooltip>
                <!--<v-text-field
                id="token_id" class="input" variant="outlined"
                elevation="1" placeholder="#123456"
                ></v-text-field>-->
                <v-select
                  v-model="token_id"
                  id="token_id"
                  variant="outlined"
                  :items="itemsTokenId"
                  item-title="desc"
                  item-value="id"
                  density="compact"
                  :selected="token_id"
                  :rules="[v => !!v || 'Es requerido']"
                  rounded
                  menu-icon="mdi-chevron-down"
                  class="select-create"
                  bg-color="#fff"
                  return-object
                  required
                ></v-select>
              </v-col>

              <v-col xl="6" lg="6" md="6" cols="12">
                <v-tooltip content-class="custom-tooltip" location="top end" offset="10" text="Wallet o persona que va a recibir el dinero">
                  <template v-slot:activator="{ props }">
                    <v-badge v-bind="props" inline content="?" text-color="#fff" color="#DB107C">
                      <label for="receiver_id">ID de Receptor</label>
                    </v-badge>
                  </template>
                </v-tooltip>
                <v-text-field
                id="receiver_id" class="input" variant="outlined"
                elevation="1" :placeholder="'ejemplo.'+network" :rules="[globalRules.required]" required
                ></v-text-field>
              </v-col>

              <v-col xl="6" lg="6" md="6" cols="12">
                <v-tooltip content-class="custom-tooltip" location="top end" offset="10" text="Tokens a enviar, ejemplo: 50 USDT">
                  <template v-slot:activator="{ props }">
                    <v-badge v-bind="props" inline content="?" text-color="#fff" color="#DB107C">
                      <label for="amount">Cantidad</label>
                    </v-badge>
                  </template>
                </v-tooltip>

                <v-text-field
                id="amount" class="input" variant="outlined" type="number"
                elevation="1" placeholder="0.00" :rules="[globalRules.required]" required
                ></v-text-field>
              </v-col>

              <v-col xl="6" lg="6" md="6" cols="12">
                <v-tooltip content-class="custom-tooltip" location="top end" offset="10" text="Cualquier mensaje opcional que se desee agrergar">
                  <template v-slot:activator="{ props }">
                    <v-badge v-bind="props" inline content="?" text-color="#fff" color="#DB107C">
                      <label for="msg">Mensaje</label>
                    </v-badge>
                  </template>
                </v-tooltip>
                <v-text-field
                id="msg" class="input" variant="outlined"
                elevation="1" placeholder="Opcional"
                ></v-text-field>
              </v-col>
            </template>

            <template v-if="tipo_propuesta && tipo_propuesta.desc === 'Cambiar política agregar o actualizar rol'">
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="rol_name">Nombre de Rol</label>
                <v-text-field
                id="rol_name" class="input" variant="outlined"
                elevation="1" placeholder="Nombre de Rol"
                ></v-text-field>
              </v-col>
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="rol">Rol</label>
                <v-text-field
                id="rol" class="input" variant="outlined"
                elevation="1" placeholder="Rol"
                ></v-text-field>
              </v-col>
            </template>

            <template v-if="tipo_propuesta && tipo_propuesta.desc === 'Cambiar política eliminar rol'">
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="rol_name">Nombre de Rol</label>
                <v-text-field
                id="rol_name" class="input" variant="outlined"
                elevation="1" placeholder="Nombre de Rol"
                ></v-text-field>
              </v-col>
            </template>

            <template v-if="tipo_propuesta && tipo_propuesta.desc === 'Cambiar política actualizar política de votación'">
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="proposal_kind">Tipo de Propuesta</label>
                <v-text-field
                id="proposal_kind" class="input" variant="outlined"
                elevation="1" placeholder="Tipo de Propuesta"
                ></v-text-field>
              </v-col>
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="vote_policy">Política de voto</label>
                <v-text-field
                id="vote_policy" class="input" variant="outlined"
                elevation="1" placeholder="Tipo de Propuesta"
                ></v-text-field>
              </v-col>
            </template>

            <template v-if="tipo_propuesta && tipo_propuesta.desc === 'Cambiar los parámetros de actualización de políticas'">
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="proposal_kind">Tipo de Propuesta</label>
                <v-text-field
                id="proposal_kind" class="input" variant="outlined"
                elevation="1" placeholder="Tipo de Propuesta"
                ></v-text-field>
              </v-col>
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="parameters">Parámetros</label>
                <v-text-field
                id="parameters" class="input" variant="outlined"
                elevation="1" placeholder="Parámetros"
                ></v-text-field>
              </v-col>
            </template>
          </v-row>

          <div
            v-if="session"
            class="center mt-6"
          >
            <v-btn
              style="max-width: 200px;"
              @click="addProposal()"
            >
              Crear Propuesta
            </v-btn>
          </div>
        </v-card>
      </section>
    </div>
  </v-form>
</template>

<script>
import '@/assets/styles/pages/create-proposals.scss'
import { ref } from 'vue';
import WalletP2p from '../services/wallet-p2p';
import graphQl from '@/services/graphQl';
import variables from '@/mixins/variables';

export default{
  setup(){
    const { globalRules } = variables;
    const regular_expression_email = process.env.NETWORK == "testnet" ? /^[a-z.-0-1-2-3-4-5-6-7-8-9]+\.testnet+$/i : /^[a-z.-0-1-2-3-4-5-6-7-8-9]+\.mainnet+$/i;
    return{
      Transfer: ref(false),
      session: ref(null),
      globalRules,
      rules: {
        address: [
          v => !!v || 'Es requerido',
          v =>  regular_expression_email.test(v) || 'Incorrect format'
        ],
      },
      network: process.env.NETWORK,
      proponente: WalletP2p.getAccount()?.address,
      itemsTipoPropuesta: ref([]),
      titulo_propuesta: ref(null),
      //proponente: ref(null),
      tipo_propuesta: ref(null),
      itemsTokenId: [
        {id: null, desc: "Near"},
        {id: process.env.CONTRACT_USDT, desc: "USDT"},
      ],
      token_id: ref({id: null, desc: "Near"}),
    }
  },
  mounted() {
    this.session = WalletP2p.getAccount().address;
    this.itemsTipoPropuesta = [
      // {id: '', desc: 'Cambiar política'},
      // {id: '', desc: 'Agregar miembro del grupo'},
      // {id: '', desc: 'Eliminar miembro del grupo'},
      {id: 'Transfer', desc: 'Solicitud de fondos', fn: this.addTransfer},
      {id: "Voting", desc: "Votación", fn: this.addVote},
      // {id: 'FunctionCall', desc: 'Llamar funciones de contratos inteligentes usando el DAO', fn: this.addFunctionCall},
      // {id: '', desc: 'Cambiar política agregar o actualizar rol'},
      // {id: '', desc: 'Cambiar política eliminar rol'},
      // {id: 'ChangePolicyUpdateVotePolicy', desc: 'Cambiar política actualizar política de votación'},
      // {id: 'ChangePolicyUpdateParameters', desc: 'Cambiar los parámetros de actualización de políticas'}
    ];

    this.searchBond();
  },
  methods: {
    searchBond(tipo_proposal) {
      const query = `query MyQuery {
        proposaldata(id: "1") {
          proposal_bond
        }
      }`;

      return graphQl.getQuery(query).then(response => {
        const bond_json = JSON.parse(response.data.data.proposaldata.proposal_bond);
        return bond_json[tipo_proposal];
      });
    },

    async addProposal() {
      const { valid } = await this.$refs.formdefault.validate()

      if (valid) {
        if (this.tipo_propuesta.fn) {
          await this.searchBond(this.tipo_propuesta.id).then(item => {
            this.tipo_propuesta.fn(item);
          })
        }
      }
    },

    addTransfer(bond){
      const json = {
        contractId: process.env.CONTRACT_DAO,
        methodName: "set_proposal",
        args: {
          data: {
            title: document.getElementById("titulo_propuesta").value,
            description: document.getElementById("descripcion").value,
            proponent: document.getElementById("proponente").value,
            kind: {
              Transfer: {
                token_id: this.token_id.id, // this.token_id?.id && this.token_id?.id == "near" ? null : this.token_id.id,
                receiver_id: document.getElementById("receiver_id").value,
                amount: this.token_id.id ? BigInt(Number(document.getElementById("amount").value) * 1000000).toString() : BigInt(Number(document.getElementById("amount").value) * 1000000000000000000000000).toString(),
                msg: document.getElementById("msg").value ? document.getElementById("msg").value.lenght > 0 ? document.getElementById("msg").value.length : null : null,
              }
            },
            link: document.getElementById("link").value,
          }
        },
        gas: "300000000000000",
        attachedDeposit: bond.toString()
      };

      WalletP2p.call(json, "proposals");
    },

    addFunctionCall(bond){
      const json = {
        contractId: process.env.CONTRACT_DAO,
        methodName: "set_proposal",
        args: {
          data: {
            title: document.getElementById("titulo_propuesta").value,
            description: document.getElementById("descripcion").value,
            proponent: document.getElementById("proponente").value,
            kind: {
              FunctionCall: {
                receiver_id: document.getElementById("receiver_id").value,
                actions: [
                  {
                    method_name: document.getElementById("method_name").value,
                    args: window.btoa(JSON.stringify(document.getElementById("args").value)),
                    deposit: BigInt(Number(document.getElementById("deposit").value) * 1000000000000000000000000).toString(),
                    gas: document.getElementById("gas").value,
                  }
                ],
              }
            },
            link: document.getElementById("link").value,
          }
        },
        gas: "300000000000000",
        attachedDeposit: bond.toString()
      };

      WalletP2p.call(json, "proposals");
    },

    addVote(bond) {
      console.log("bond", bond)
      const json = {
        contractId: process.env.CONTRACT_DAO,
        methodName: "set_proposal",
        args: {
          data: {
            title: document.getElementById("titulo_propuesta").value,
            description: document.getElementById("descripcion").value,
            proponent: document.getElementById("proponente").value,
            kind: "Voting",
            link: document.getElementById("link").value,
          }
        },
        gas: "300000000000000",
        attachedDeposit: bond.toString()
      };

      WalletP2p.call(json, "proposals");
    }


  },
}

</script>
