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
                placeholder="member.testnet"
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

            <span v-if="typeSelect === 'Transferencia'">

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
                placeholder="member.testnet"
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
import { useToast } from 'vue-toastification';
import WalletP2p from '../services/wallet-p2p';
import variables from '@/mixins/variables';

export default {
  setup() {
    const  { globalRules } = variables
    return {
      globalRules,
      proposalTypes: ref([
        "Encuestas",
        "Agregar miembros",
        "Eliminar miembros",
        "Transferencia"
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
      ]
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

  mounted(){
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    this.walletDao = urlParams.get('dao');

    WalletP2p.view({
      contractId: this.walletDao,
      methodName: "get_policy"
    }).then((response) => {
      const indexDelete = response.roles.indexOf(response.roles.find((element) => element.name === "all"))
      if(indexDelete >= 0) {
        response.roles.splice(indexDelete, 1);
      }

      this.rolesMembers = response.roles.map((items) => {return { group: items.name, members: items.kind.Group }});
      this.roles = response.roles.map((items) => {return items.name});

    });
  },

  methods: {
    async onSubmit() {

      if (!this.formValid) return

      const toast = useToast();
      //if (this.loadingBtn.value) return
      this.loadingBtn = true;


      try {
        const responsePolicy = await WalletP2p.view({
          contractId: this.walletDao,
          methodName: "get_policy"
        });

        const response = await WalletP2p.view({
          contractId: this.walletDao,
          methodName: "get_fee_metadao",
        });

        const bounty_bond = (BigInt(responsePolicy?.bounty_bond.toString()) + BigInt(response)).toString()

        switch (this.typeSelect) {
          case "Encuestas": this.addVote(bounty_bond);
            break;

          case "Agregar miembros": this.addMembers(bounty_bond);
            break;

          case "Eliminar miembros": this.deleteMembers(bounty_bond);
            break;

          case "Transferencia": this.addTransfer(bounty_bond);
            break;
        }

        // <---- await fetch
        // this.addVote();
        // toast('¡Tu propuesta ha sido creada\n con éxito!')
      } catch (error) {
        loadingBtn.value = false;
        toast.error(error.toString())
      }

      this.loadingBtn = false
    },

    addVote(bounty_bond) {
      const json = {
        contractId: this.walletDao,
        methodName: "add_proposal",
        args: {
          proposal: {
            title: btoa(document.getElementById("title").value),
            description: btoa(document.getElementById("description").value),
            kind: "Vote",
            link: document.getElementById("link").value,
          }
        },
        gas: "200000000000000",
        attachedDeposit: bounty_bond
      };

      WalletP2p.call(json, "proposals", ("?dao="+this.walletDao));
    },

    addMembers(bounty_bond) {
      const json = {
        contractId: this.walletDao,
        methodName: "add_proposal",
        args: {
          proposal: {
            title: btoa(document.getElementById("title").value),
            description: btoa(document.getElementById("description").value),
            kind: {
              AddMemberToRole: {
                member_id: document.getElementById("member").value,
                role: document.getElementById("roles").value,
              }
            },
            link: document.getElementById("link").value,
          }
        },
        gas: "200000000000000",
        attachedDeposit: bounty_bond
      };

      WalletP2p.call(json, "proposals", ("?dao="+this.walletDao));
    },

    deleteMembers(bounty_bond) {
      const json = {
        contractId: this.walletDao,
        methodName: "add_proposal",
        args: {
          proposal: {
            title: btoa(document.getElementById("title").value),
            description: btoa(document.getElementById("description").value),
            kind: {
              RemoveMemberFromRole: {
                member_id: document.getElementById("member").value,
                role: document.getElementById("roles").value,
              }
            },
            link: document.getElementById("link").value,
          }
        },
        gas: "200000000000000",
        attachedDeposit: bounty_bond
      };

      WalletP2p.call(json, "proposals", ("?dao="+this.walletDao));
    },

    addTransfer(bounty_bond) {
      const tokenId = document.getElementById("tokenId").value;
      const amount = document.getElementById("amount").value;
      const msg = document.getElementById("msg").value;

      const json = {
        contractId: this.walletDao,
        methodName: "add_proposal",
        args: {
          proposal: {
            title: btoa(document.getElementById("title").value),
            description: btoa(document.getElementById("description").value),
            kind: {
              Transfer: {
                token_id: tokenId,
                receiver_id: document.getElementById("receiverId").value,
                amount: tokenId ? BigInt(Number(amount) * 1000000).toString() : BigInt(Number(amount) * 1000000000000000000000000).toString(),
                msg: msg ? msg.lenght > 0 ? msg.length : null : null,
              }
            },
            link: document.getElementById("link").value,
          }
        },
        gas: "200000000000000",
        attachedDeposit: bounty_bond
      };

      WalletP2p.call(json, "proposals", ("?dao="+this.walletDao));
    },


  },
}
</script>
