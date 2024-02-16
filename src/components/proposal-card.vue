<template>
  <v-sheet class="proposal-card" elevation="3">
    <v-card class="vertical-toolbar clear-overlay" @click="onPressProposal">
      <span>Propuesta ID:{{ proposal?.id }}</span>
      <img src="@/assets/sources/icons/leave.svg" alt="leave icon" style="width: 20px;">
    </v-card>

    <v-card class="flex-column" elevation="3" color="#FAFAFA">
      <v-card-title class="flex-column pa-0" style="gap: 20px; overflow: visible;">
        <div class="flex-space-center">
          <label>Tipo de propuesta: {{ mapType() }}</label>

          <!--<v-btn icon color="transparent" elevation="0" size="20px" class="relative clear-overlay" :ripple="false">
            <v-icon
              class="text-tertiary"
              icon="mdi-dots-horizontal"
              size="40px"
              style="translate: 0 -10px;"
            />
          </v-btn>-->
          <v-menu>
            <template v-slot:activator="{ props: menu }">
              <v-tooltip location="top">
                <template v-slot:activator="{ props: tooltip }">
                  <v-btn
                    icon
                    color="transparent"
                    elevation="0"
                    size="20px"
                    class="relative clear-overlay"
                    :ripple="false"
                    v-bind="mergeProps2(menu, tooltip)"
                  >
                    <v-icon
                      class="text-tertiary"
                      icon="mdi-dots-horizontal"
                      size="40px"
                      style="translate: 0 -10px;"
                    />
                  </v-btn>
                </template>
                <span>opciones</span>
              </v-tooltip>
            </template>
            <v-list>
              <v-list-item  @click="copy(proposal?.id)">
                <v-list-item-title> Copiar Link</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div class="flex-space-center flex-wrap">
          <v-btn
            v-if="proposal?.title"
            :text="proposal?.title"
            append-icon="mdi-link"
            class="title-linked px-0"
          />

          <span v-if="proposal?.date" class="text-tertiary ml-auto" style="--fs: 0.875em">Aprobado el: {{ proposal?.date }}</span>
        </div>
      </v-card-title>

      <hr class="my-3">

      <v-card-text class="pa-0 pr-1 d-flex flex-column">
        <div class="card__content">
          <img
            v-if="proposal?.approved !==null"
            :src="proposal?.approved ? ApprovedIcon : FailedIcon"
            :alt="proposal?.approved ? 'proposal approved' : 'proposal failed'"
            class="mr-5"
            style="--w: clamp(4em, 12vw, 6.25em); width: var(--w); height: var(--w); float: right;"
          >

          <p class="label mb-2">Proponente</p>
          <p style="word-break: break-all;">{{ proposal?.proposer }}</p>


          <span v-if="proposal?.type == 'ChangeConfig'">
            <p class="label mb-2">Motivo</p>
            <p class="ellipsis-box" style="--lines: 6; color: black !important;"> {{ proposal?.description }}</p>
            <!--<p class="ellipsis-box" style="--lines: 6; color: black !important;"> el motivo es</p>-->

            <span v-if="proposal?.title == 'Cambio de nombre y proposito del dao' || proposal?.title == 'Cambio de nombre y propósito del dao'">
              <p class="label mb-2">Nuevo nombre</p>
              <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.config?.name }}</p>

              <p class="label mb-2">Nuevo propósito</p>
              <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.config?.purpose }}</p>
            </span>

            <span v-if="proposal?.title == 'Cambio Estado legal y Documento'">
              <p class="label mb-2">Nuevo estado legal</p>
              <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.configMetadata?.kyc?.legacyState }}</p>

              <p class="label mb-2">Nuevo documento</p>
              <a :href="proposal?.configMetadata?.kyc?.proposalKyc" class="ellipsis-box" style="--lines: 6;" target="_blank"> {{ proposal?.configMetadata?.kyc?.proposalKyc }}</a>
            </span>

            <span v-if="proposal?.title == 'Cambio de redes sociales'">
              <p class="label mb-2">Nuevas redes sociales</p>
              <span v-if="proposal?.configMetadata?.social"  v-for="(item, i) in proposal?.configMetadata?.social" :key="i">
                <a :href="item" class="ellipsis-box" style="--lines: 6;" target="_blank"> {{ item }}</a>
              </span>
            </span>

            <span v-if="proposal?.title == 'Cambio de logo'">
              <p class="label mb-2">Nuevo logo</p>
              <a :href="proposal?.configMetadata.img" class="ellipsis-box" style="--lines: 6;" target="_blank"> {{ proposal?.configMetadata.img }}</a>
            </span>

          </span>

          <span v-else-if="proposal?.type == 'AddMemberToRole' || proposal?.type == 'RemoveMemberFromRole'">
            <p class="label mb-2">Descripción</p>
            <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.description }} </p>

            <p class="label mb-2">Usuario</p>
            <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.member_id }} </p>

            <p class="label mb-2">Rol</p>
            <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.role }} </p>
          </span>

          <span v-else>
            <p class="label mb-2">Descripción</p>
            <v-div id="description" class="ellipsis-box" style="--lines: 6; color: black !important;" v-html="proposal?.description"></v-div>
          </span>
        </div>

        <a :href="proposal?.link" target="_blank" class="mb-4 mt-5">
          <v-icon icon="mdi-link" size="20" class="text-secondary" style="rotate: -45deg;" />
          {{ proposal?.link }}
        </a>

        <div class="card__bottom flex-space-center mt-auto" style="gap: clamp(20px, 3vw, 40px);">
          <aside class="flex-grow-1 d-flex flex-wrap flex-spacee justify-start" style="gap: clamp(20px, 3vw, 40px);">
            <div v-if="proposal?.claims" class="flex-column" style="gap: 10px;">
              <label>Amount</label>
              <span class="flex-center" style="gap: 4px;">
                {{ proposal?.amount }}
                <img
                  src="@/assets/sources/logos/near-icon.svg"
                  alt="near logo"
                  style="width: 15px; height: 15px; translate: 0 -1px;"
                >
                NEAR
              </span>
            </div>

            <div v-if="proposal?.claims" class="flex-column" style="gap: 10px;">
              <label>Reclamaciones disponibles</label>
              <span>{{ proposal?.claims }}</span>
            </div>

            <div class="flex-column" style="gap: 10px;">
              <label>Tiempo para completar</label>
              <span>{{ proposal?.remainingTime }}</span>
            </div>
          </aside>

          <aside class="flex-center" style="gap: 20px;">
            <div class="flex-center" style="gap: 10px;">
              <v-btn icon color="#EEE6F1" elevation="0" size="29" @click="upvote(proposal?.id, proposal?.contractId)">
                <v-icon icon="mdi-thumb-up" color="#DC7AAB" size="15" />
              </v-btn>

              <span>{{ proposal?.likes }}</span>
            </div>

            <div class="flex-center" style="gap: 10px;">
              <v-btn icon color="#EEE6F1" elevation="0" size="29" @click="downvote(proposal?.id, proposal?.contractId)">
                <v-icon icon="mdi-thumb-down" color="#DC7AAB" size="15" />
              </v-btn>

              <span>{{ proposal?.dislikes }}</span>
            </div>
          </aside>
        </div>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup>
import ApprovedIcon from '@/assets/sources/images/approved.svg'
import FailedIcon from '@/assets/sources/images/failed.svg'
import { useRouter } from 'vue-router';
import WalletP2p from '../services/wallet-p2p';
import utilsDAO from '@/services/utils-dao';
import { mergeProps, computed } from 'vue';


const
  router = useRouter(),
  props = defineProps({
    proposal: {
      type: Object,
      default: undefined
    }
  }),
  mergeProps2 = mergeProps

function copy(id) {
  let route = "proposal-details";
  if(process.env.CONTRACT_DAO == props.proposal.contractId) {
    route = "proposal-details-meta";
  }
  const link = window.location.origin + process.env.BASE_URL + route + "?dao="+props.proposal.contractId+"&id=" + id
  navigator.clipboard.writeText(link);
}

function mapType() {
  const map = [
    {id: "Vote", value: "Votación"},
    {id: "Transfer", value: "Transferencia"},
    {id: "AddMemberToRole", value: "Agregar miembro"},
    {id: "RemoveMemberFromRole", value: "Eliminar miembro"},
  ];
  let typeId = props.proposal?.type;
  typeId = !typeId ? "" : typeId;

  const type = map.find((item) => item.id == typeId)?.value;

  return !type ? typeId : type;
}

function onPressProposal() {
  if(process.env.CONTRACT_DAO == props.proposal.contractId) {
    router.push({ path: 'proposal-details-meta', query: { dao: props.proposal.contractId, id: props.proposal.id } })
  } else {
    router.push({ path: 'proposal-details', query: { dao: props.proposal.contractId, id: props.proposal.id }  })
  }

  //router.push({ name: 'ProposalDetails', query: { dao: props.proposal.contractId, id: props.proposal.id } })
}

async function upvote(id, contractId) {
  if(!id && !contractId) return

  let json = {
    contractId: contractId,
    methodName: "act_proposal",
    args: {
      id: Number(id),
      action: "VoteApprove"
    },
    // gas: "36000000000000",
    // attachedDeposit: "1000000000000000000"
  };

  if(contractId == process.env.CONTRACT_DAO) {
    const isMember = await utilsDAO.isMember();
    if(isMember) {
      json = {
        contractId: process.env.CONTRACT_DAO,
        methodName: "update_proposal",
        args: {
          id: Number(id),
          action: "VoteApprove"
        },
        gas: "36000000000000"
        // attachedDeposit: "100000000000000000000"
      };
    }
  }

  WalletP2p.call(json);

}



async function downvote(id, contractId) {
  if(!id && !contractId) return

  let json = {
    contractId: contractId,
    methodName: "act_proposal",
    args: {
      id: Number(id),
      action: "VoteReject"
    },
    // gas: "36000000000000"
    // attachedDeposit: "100000000000000000000"
  };

  if(contractId == process.env.CONTRACT_DAO) {
    const isMember = await utilsDAO.isMember();
    if(isMember) {
      json = {
        contractId: process.env.CONTRACT_DAO,
        methodName: "update_proposal",
        args: {
          id: Number(id),
          action: "VoteReject"
        },
        gas: "36000000000000"
        // attachedDeposit: "100000000000000000000"
      };
    }
  }

  WalletP2p.call(json);

}

</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

#description {
  b {
    color: black !important;
  }
}

.proposal-card {
  $media: 700px;
  $fontSize: var(--resizer);
  --w-toolbar: 40px;
  --h: 450px;
  --br: 8px;
  position: relative;
  height: var(--h);
  border-radius: var(--br) !important;
  padding: 20px;
  padding-left: calc(var(--w-toolbar) + 20px);

  label, .label { color: #939393 !important }
  p { color: #333333 !important }
  a { color: #61C2D5 !important }
  label, a, p { font-size: 0.875em !important }

  .title-linked {
    font-size: $fontSize !important;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 10px !important;
    height: max-content !important;
    padding: 10px 5px !important;
    margin-inline: -5px;
    * { color: #333 !important }
    span {
      font-size: 1.5625em !important;
      white-space: initial !important;
      text-align: left;
    }
    i { rotate: -45deg }
  }

  .v-card:not(.vertical-toolbar) {
    border-radius: calc(var(--br) - 1px) !important;
    height: 100%;
    padding: 20px;

    span {
      color: #333 !important;
      font-size: var(--fs, 1em) !important;
    }

    .v-card-title { font-size: $fontSize !important }

    .v-card-text { overflow-y: auto !important }

    .card__bottom {
      aside:first-of-type {
        width: 100%;
        max-width: 400px;
      }

      span { font-weight: 500 !important }

      @include media(max, $media) {
        flex-direction: column;
        aside:first-of-type { max-width: 100% }
      }
    }
  }
}


.vertical-toolbar {
  --dif: 20px;
  position: absolute;
  top: calc(var(--h) / 2 - var(--dif));
  left: calc(var(--h) / -2 + var(--dif));
  transform: rotate(-90deg);
  width: var(--h);
  height: var(--w-toolbar);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;

  border-radius: calc(var(--br) - 2px) !important;
  background-color: #8A5FA4;
}
</style>
