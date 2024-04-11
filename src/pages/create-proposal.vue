<template>
  <div id="create-proposal">
    <toolbar title="Crear Propuesta" />

    <v-sheet class="mt-15 flex-grow-1" elevation="3" style="border-radius: 8px; padding: 15px;">
      <v-card class="flex-column pa-4" elevation="3" color="#FAFAFA">
        <v-form v-model="formValid" @submit.prevent="onSubmit">
          <label for="type">Tipo de Propuesta</label>
          <v-select
            v-model="typeSelect"
            id="type"
            :items="proposalTypes"
          />

          <span v-if="typeSelect">
            <div class="d-flex" style="gap: 20px;">
              <div class="flex-grow-1">
                <label for="title">Título de la propuesta</label>
                <v-text-field
                  id="title"
                  variant="solo"
                  placeholder="Nombre de la propuesta"
                  :rules="[globalRules.required]"
                />
              </div>

              <div class="flex-grow-1">
                <label for="proponent">Proponente</label>
                <v-text-field
                  id="proponent"
                  variant="solo"
                  disabled
                  :placeholder="address"
                />
              </div>
            </div>

            <label for="description">Descripción</label>
            <v-textarea
              id="description"
              variant="solo"
              placeholder="Descripción"
              :rules="[globalRules.required]"
            />

            <label for="link">Link</label>
            <v-text-field
              id="link"
              variant="solo"
              placeholder="Link_de_prueba.com"
              :rules="[globalRules.required]"
            />

            <span v-if="typeSelect === 'Agregar miembros'">
              <label for="member">Miembro</label>
              <v-text-field
                id="member"
                variant="solo"
                placeholder="member.near"
                :rules="[globalRules.required]"
              />

              <label for="roles">Grupo</label>
              <v-select
                id="roles"
                :items="roles"
              />
            </span>

            <span v-if="typeSelect === 'Eliminar miembros'">
              <label for="roles">Grupo</label>
              <v-select
                v-model="roleSelect"
                id="roles"
                :items="rolesMembers"
                item-title="group"
                item-value="group"
              />

              <label for="member">Miembro</label>
              <v-select
                id="member"
                :items="menbersForRoles"
              />

            </span>

            <span v-if="typeSelect === 'Solicitud de fondos'">

              <v-select
                id="tokenId"
                :items="itemsTokens"
                item-title="desc"
                item-value="id"
              />

              <label for="receiverId">ID de Receptor</label>
              <v-text-field
                id="receiverId"
                variant="solo"
                placeholder="member.near"
                :rules="[globalRules.required]"
              />

              <label for="amount">Monto</label>
              <v-text-field
                id="amount"
                type="number"
                variant="solo"
                placeholder="0.0"
                :rules="[globalRules.required]"
              />

              <label for="msg">Mensaje (opcional)</label>
              <v-text-field
                id="msg"
                variant="solo"
                placeholder="Mensaje (opcional)"
              />

            </span>

            <v-btn
              class="bg-tertiary"
              :disabled="!formValid || loadingBtn"
              :loading="loadingBtn"
              @click="onSubmit"
            >Crear Propuesta</v-btn>
          </span>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import '@/assets/styles/pages/create-proposal-new.scss'
import { ref } from 'vue';
import WalletP2p from '../services/wallet-p2p';
import graphQl from '@/services/graphQl';
import variables from '@/mixins/variables';
import { useToast } from 'vue-toastification';

export default{
  setup(){
    const { globalRules } = variables;
    //const regular_expression_email = process.env.NETWORK == "testnet" ? /^[a-z.-0-1-2-3-4-5-6-7-8-9]+\.testnet+$/i : /^[a-z.-0-1-2-3-4-5-6-7-8-9]+\.mainnet+$/i;
    return{
      Transfer: ref(false),
      session: ref(null),
      globalRules,
      proposalTypes: ref([
        "Solicitud de fondos",
        "Votación",
      ]),
      typeSelect: ref(null),
      roles: ref([]),
      formValid: ref(false),
      loadingBtn: ref(false),
      address: WalletP2p.getAccount().address,
      walletDao: ref(""),
      roleSelect: ref(null),
      rolesMembers: ref([]),
      menbersForRoles: ref([]),
      itemsTokens: [
        {id: null, desc: "Near"},
        {id: process.env.CONTRACT_USDT, desc: "USDT"},
      ],

      network: process.env.NETWORK,
      proponente: WalletP2p.getAccount()?.address,

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

  watch: {
    roleSelect: function (val) {

      const result = this.rolesMembers.filter((search) => search.group == val);

      if(result.length <= 0) {
        this.menbersForRoles = [];
        return
      }

      this.menbersForRoles = result[0].members;
    }
  },

  mounted() {
    /*const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);*/
    this.walletDao = this.$route.query?.dao
  },
  methods: {
    async onSubmit() {

      if (!this.formValid) return

      const toast = useToast();
      //if (this.loadingBtn.value) return
      this.loadingBtn = true;


      try {
        switch (this.typeSelect) {
          case "Votación": {
            const bound = await this.searchBond("Voting")
            if(!bound) return
            this.addVote(bound)
          }
            break;

          case "Solicitud de fondos": {
            const bound = await this.searchBond("Transfer")
            if(!bound) return
            await this.addTransfer(bound)
          }
            break;
        }

        // <---- await fetch
        // this.addVote();
        // toast('¡Tu propuesta ha sido creada\n con éxito!')
      } catch (error) {
        this.loadingBtn = false;
        toast.error(error.toString())
      }

      this.loadingBtn = false
    },

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

    async addTransfer(bond){
      const tokenId = document.getElementById("tokenId").value;
      const amount = document.getElementById("amount").value;
      const msg = document.getElementById("msg").value;
      const receiverId = document.getElementById("receiverId").value

      let token = this.itemsTokens.find((item) => item.id == tokenId)

      if(!token?.desc){
        token = {desc: "Near"}
      }

      const usdtIsActive = token.desc == "Near" ? true
      : await WalletP2p.view({
        contractId: process.env.CONTRACT_USDT,
        methodName: "storage_balance_of",
        args: { account_id: receiverId }
      });

      // const usdtIsActive = true;

      const setProposal = {
        contractId: process.env.CONTRACT_DAO,
        methodName: "set_proposal",
        args: {
          data: {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            proponent: WalletP2p.getAccount().address,
            kind: {
              Transfer: {
                token_id: tokenId, // this.token_id?.id && this.token_id?.id == "near" ? null : this.token_id.id,
                receiver_id: receiverId,
                amount: tokenId ? BigInt(Number(amount) * 1000000).toString() : BigInt(Number(amount) * 1000000000000000000000000).toString(),
                msg: msg ? msg.lenght > 0 ? msg.length : null : null,
              }
            },
            link: document.getElementById("link").value,
          }
        },
        gas: "300000000000000",
        attachedDeposit: bond.toString()
      };

      let json = setProposal

      if(!usdtIsActive){
        await WalletP2p.activateUsdt(receiverId).catch((error) => {
          console.log("error al activar usdt: ", error)
        })
        /* json = [
          {
            contractId: process.env.CONTRACT_USDT,
            methodName: "storage_deposit",
            args: {
              account_id: receiverId,
            },
            gas: "30000000000000",
            attachedDeposit: "1250000000000000000000"
          },
          setProposal
        ]; */
      }

      WalletP2p.call(json, "proposals-meta", ("?dao="+process.env.CONTRACT_DAO));
    },

    addFunctionCall(bond){
      const json = {
        contractId: process.env.CONTRACT_DAO,
        methodName: "set_proposal",
        args: {
          data: {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            proponent: WalletP2p.getAccount().address,
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

      WalletP2p.call(json, "proposals-meta", ("?dao="+process.env.CONTRACT_DAO));
    },

    addVote(bond) {
      const json = {
        contractId: process.env.CONTRACT_DAO,
        methodName: "set_proposal",
        args: {
          data: {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            proponent: WalletP2p.getAccount().address,
            kind: "Voting",
            link: document.getElementById("link").value,
          }
        },
        gas: "300000000000000",
        attachedDeposit: bond.toString()
      };

      WalletP2p.call(json, "proposals-meta", ("?dao="+process.env.CONTRACT_DAO));
    },


  },
}

</script>
