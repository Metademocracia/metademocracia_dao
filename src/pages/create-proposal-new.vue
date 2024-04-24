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
            />

            <span v-if="typeSelect === 'Agregar miembro'">
              <label for="member">Miembro</label>
              <v-text-field
                v-model="memberItem.member"
                id="member"
                variant="solo"
                placeholder="member.near"
                :rules="[globalRules.required]"
                :error-messages="memberItem.memberErrror"
                :success-messages="memberItem.memberSuccess"
                @keyup="validMember(memberItem)"
                @change="validMember(memberItem)"
              />

              <label for="roles">Grupo</label>
              <v-select
                v-model="memberItem.type"
                id="roles"
                :items="roles"
                @update:modelValue="validMember(memberItem)"
              />
            </span>

            <span v-if="typeSelect === 'Agregar miembros'">
              <label>Agregue miembros al DAO.</label>
              <div style="gap: 20px; display: grid; grid-template-columns: repeat(2, 1fr);">

                <template v-for="(item, i) in daoMembers" :key="i">
                  <v-text-field
                    v-model="item.member"
                    placeholder="ap6ay7auhan6a78ahah8gfcvbay77a9a0han5"
                    variant="solo"
                    :error-messages="item.memberErrror"
                    :success-messages="item.memberSuccess"
                    @keyup="validMember(item, true)"
                    @change="validMember(item, true)"
                  />

                  <v-select
                    v-model="item.type"
                    :items="roles"
                    variant="solo"
                    placeholder="Seleccione un grupo"
                    :rules="[(v) => !!v || 'Seleccione un grupo']"
                    required
                    @update:modelValue="validMember(item, true)"
                  >
                    <template #append>
                      <v-btn
                        min-width="70"
                        height="42"
                        :color="i == daoMembers.length - 1 && i <= 7 ? '#61C2D5' : '#505050'"
                        style="border-radius: 8px !important;"
                        @click="() => {
                          if (i == daoMembers.length - 1 && i <= 7) return daoMembers.push({  member: undefined, type: undefined, memberErrror: undefined, memberSuccess: undefined })
                          daoMembers.splice(i, 1)
                        }"
                      >
                        <v-icon :icon="i == daoMembers.length - 1  && i <= 7 ? 'mdi-plus' : 'mdi-minus'" size="25" class="text-white" />
                      </v-btn>
                    </template>
                  </v-select>
                </template>
              </div>
            </span>

            <span v-if="typeSelect === 'Eliminar miembro'">
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
import { useToast } from 'vue-toastification';
import WalletP2p from '../services/wallet-p2p';
import graphQl from '@/services/graphQl';
import variables from '@/mixins/variables';
import * as nearAPI from "near-api-js";
const { utils, Account, NearUtils, KeyPair, keyStores, Near, connect, transactions } = nearAPI;
import {configNear} from '../services/nearConfig';


export default {
  setup() {
    const  { globalRules, groupAllDefault } = variables
    return {
      groupAllDefault,
      globalRules,
      proposalTypes: ref([
        "Votación",
        "Agregar miembro",
        "Agregar miembros",
        "Eliminar miembro",
        "Transferencia"
      ]),
      typeSelect: ref(null),
      roles: ref([]),
      formValid: ref(false),
      loadingBtn: ref(false),
      address: ref(null), // WalletP2p.getAcc ount().address,
      walletDao: ref(""),
      roleSelect: ref(null),
      rolesMembers: ref([]),
      menbersForRoles: ref([]),
      itemsTokens: [
        {id: null, desc: "Near"},
        {id: process.env.CONTRACT_USDT, desc: "USDT"},
      ],
      daoMembers: ref([ { member: undefined, type: undefined, memberErrror: undefined, memberSuccess: undefined } ]),
      memberItem: ref([ { member: undefined, type: undefined, memberErrror: undefined, memberSuccess: undefined } ])
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
    this.getAddress();
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    this.walletDao = urlParams.get('dao');

    WalletP2p.view({
      contractId: this.walletDao,
      methodName: "get_policy"
    }).then((response) => {
      const indexDelete = response.roles.indexOf(response.roles.find((element) => element.name === this.groupAllDefault))
      if(indexDelete >= 0) {
        response.roles.splice(indexDelete, 1);
      }

      this.rolesMembers = response.roles.map((items) => {return { group: items.name, members: items.kind.Group }});
      this.roles = response.roles.map((items) => {return items.name});

    });
  },

  methods: {
    async getAddress() {
      const account_id = await WalletP2p.getAccountId();
      this.address = account_id;
    },

    async validMember(item, validDuplicateMembers = false) {

      if(validDuplicateMembers) {
        const duplicateMember = this.validUniqueMember(item, this.daoMembers);
        if(duplicateMember){
          item.memberSuccess = null
          item.memberErrror = "No puede repetir el usuario en un mismo grupo"
          return
        }
      }

      const keyStore = new keyStores.InMemoryKeyStore()
      const near = new Near(configNear(keyStore))
      const account = new Account(near.connection, item.member)

      const resultState = await account.state().catch(() => {
        item.memberSuccess = null
        item.memberErrror = "Wallet no válida"
      });

      if(!resultState) {
        item.memberSuccess = null
        item.memberErrror = "Wallet no válida"
      } else {
        if(item?.type) {
          const exist = await this.isMember(item.member, item.type);

          if(exist) {
            item.memberSuccess = null
            item.memberErrror = "El usuario ya pertenece al grupo donde lo quiere agregar"
            return
          }
        }
        item.memberErrror = null
        item.memberSuccess = "Wallet válido"
      }
    },

    async isMember(member, rol) {
      const query = `query MyQuery {
        members(
          where: {dao: "${this.walletDao}", group_: {group: "${rol}"}, member: "${member}"}
        ) {
          member
          group {
            group
          }
        }
      }`;

      const result = await graphQl.getQueryDaoV2(query).catch((error) => {
        console.log("error isMember: ", error)
        return true
      });

      if(!result) return true;

      const memberResult = result.data?.data?.members;

      if(!memberResult) return true;
      if(memberResult.length <= 0) return false;

      return true;
    },

    validUniqueMember(item, data) {
      if(!item || !data) return false
      if(!item?.member || !item?.type) return false

      const array = [].concat((!data[0].member ? [] : data))

      const search = array.filter((elem) =>
        (!elem?.member ? "undefined" : elem?.member.toUpperCase()) == item?.member.toUpperCase()
        &&
        ( !elem?.type ? "undefined" : elem?.type.toUpperCase()) == item?.type.toUpperCase()
      )

      return (search.length > 1)
    },

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
          case "Votación": await this.addVote(bounty_bond);
            break;

          case "Agregar miembro": await this.addMember(bounty_bond);
            break;

          case "Agregar miembros": await this.addMembers(bounty_bond);
            break;

          case "Eliminar miembro": await this.deleteMembers(bounty_bond);
            break;

          case "Transferencia": await this.addTransfer(bounty_bond);
            break;
        }

        // <---- await fetch
        // this.addVote();
        // toast('¡Tu propuesta ha sido creada\n con éxito!')
      } catch (error) {
        this.loadingBtn = false;
        console.log("error: ", error)
        toast.error(error.toString())
      }

      this.loadingBtn = false
    },

    async addVote(bounty_bond) {
      const json = {
        contractId: this.walletDao,
        methodName: "add_proposal",
        args: {
          proposal: {
            title: btoa(document.getElementById("title").value),
            description: btoa(document.getElementById("description").value),
            kind: "Vote",
            link: !document.getElementById("link").value ? "" : document.getElementById("link").value,
          }
        },
        gas: "200000000000000",
        attachedDeposit: bounty_bond
      };

      await WalletP2p.call(json, "proposals", ("?dao="+this.walletDao));
    },

    async addMember(bounty_bond) {
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
            link: !document.getElementById("link").value ? "" : document.getElementById("link").value,
          }
        },
        gas: "200000000000000",
        attachedDeposit: bounty_bond
      };

      await WalletP2p.call(json, "proposals", ("?dao="+this.walletDao));
    },

    async addMembers(bounty_bond) {
      const json = {
        contractId: this.walletDao,
        methodName: "add_proposal",
        args: {
          proposal: {
            title: btoa(document.getElementById("title").value),
            description: btoa(document.getElementById("description").value),
            kind: {
              AddMembersToRole: {
                members_id: this.daoMembers.map((item) => { return `${item.type}|${item.member}` }),
              }
            },
            link: !document.getElementById("link").value ? "" : document.getElementById("link").value,
          }
        },
        gas: "200000000000000",
        attachedDeposit: bounty_bond
      };
      // console.log("json: ", json)
      await WalletP2p.call(json, "proposals", ("?dao="+this.walletDao));
    },

    async deleteMembers(bounty_bond) {
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
            link: !document.getElementById("link").value ? "" : document.getElementById("link").value,
          }
        },
        gas: "200000000000000",
        attachedDeposit: bounty_bond
      };

      await WalletP2p.call(json, "proposals", ("?dao="+this.walletDao));
    },

    async addTransfer(bounty_bond) {
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

      if(!usdtIsActive){
        const transactions = [
          {
            receiverId: process.env.CONTRACT_USDT,
            functionCalls: [
              {
                methodName: "storage_deposit",
                args: {
                  account_id: receiverId,
                },
                gas: "30000000000000",
                attachedDeposit: "1250000000000000000000"
              }
            ]
          },
          {
            receiverId: this.walletDao,
            functionCalls: [
              {
                methodName: "add_proposal",
                args: {
                  proposal: {
                    title: btoa(document.getElementById("title").value),
                    description: btoa(document.getElementById("description").value),
                    kind: {
                      Transfer: {
                        token_id: tokenId,
                        receiver_id: receiverId,
                        amount: tokenId ? BigInt(Number(amount) * 1000000).toString() : BigInt(Number(amount) * 1000000000000000000000000).toString(),
                        msg: msg ? msg.lenght > 0 ? msg.length : null : null,
                      }
                    },
                    link: !document.getElementById("link").value ? "" : document.getElementById("link").value,
                  }
                },
                gas: "200000000000000",
                attachedDeposit: bounty_bond
              }
            ]
          }
        ];

        await WalletP2p.callBatchTransactions(transactions, "proposals", ("?dao="+this.walletDao));
      } else {
        const action = {
          contractId: this.walletDao,
          methodName: "add_proposal",
          args: {
            proposal: {
              title: btoa(document.getElementById("title").value),
              description: btoa(document.getElementById("description").value),
              kind: {
                Transfer: {
                  token_id: tokenId,
                  receiver_id: receiverId,
                  amount: tokenId ? BigInt(Number(amount) * 1000000).toString() : BigInt(Number(amount) * 1000000000000000000000000).toString(),
                  msg: msg ? msg.lenght > 0 ? msg.length : null : null,
                }
              },
              link: !document.getElementById("link").value ? "" : document.getElementById("link").value,
            }
          },
          gas: "200000000000000",
          attachedDeposit: bounty_bond
        };

        await WalletP2p.call(action, "proposals", ("?dao="+this.walletDao));
      }


    },


  },
}
</script>
