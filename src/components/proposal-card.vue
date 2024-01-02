<template>
  <v-sheet class="proposal-card" elevation="3">
    <v-card class="vertical-toolbar clear-overlay" @click="onPressProposal">
      <span>Proposals ID:{{ proposal?.id }}</span>
      <img src="@/assets/sources/icons/leave.svg" alt="leave icon" style="width: 20px;">
    </v-card>

    <v-card class="flex-column" elevation="3" color="#FAFAFA">
      <v-card-title class="flex-column pa-0" style="gap: 20px; overflow: visible;">
        <div class="flex-space-center">
          <label>Proposal type: {{ proposal?.type }}</label>
          
          <v-btn icon color="transparent" elevation="0" size="20px" class="relative clear-overlay" :ripple="false">
            <v-icon
              class="text-tertiary"
              icon="mdi-dots-horizontal"
              size="40px"
              style="translate: 0 -10px;"
            />
          </v-btn>
        </div>

        <div class="flex-space-center flex-wrap">
          <v-btn
            :text="proposal?.title"
            append-icon="mdi-link"
            class="title-linked px-0"
          />

          <span class="text-tertiary ml-auto" style="--fs: 0.875em">Approved at: {{ proposal?.date }}</span>
        </div>
      </v-card-title>
      
      <hr class="my-3">

      <v-card-text class="pa-0 pr-1 d-flex flex-column">
        <div class="card__content">
          <img
            :src="proposal?.approved ? ApprovedIcon : FailedIcon"
            :alt="proposal?.approved ? 'proposal approved' : 'proposal failed'"
            class="mr-5"
            style="--w: clamp(4em, 12vw, 6.25em); width: var(--w); height: var(--w); float: right;"
          >

          <p class="label mb-2">Proposer</p>
          <p>{{ proposal?.proposer }}</p>

          <p class="label mb-2">Description</p>
          <p class="ellipsis-box" style="--lines: 6">{{ proposal?.description }}</p>
        </div>

        <a href="" target="_blank" class="mb-4">
          <v-icon icon="mdi-link" size="20" class="text-secondary" style="rotate: -45deg;" />
          gov.near.org
        </a>

        <div class="card__bottom flex-space-center mt-auto" style="gap: clamp(20px, 3vw, 40px);">
          <aside class="flex-grow-1 d-flex flex-wrap flex-spacee justify-start" style="gap: clamp(20px, 3vw, 40px);">
            <div class="flex-column" style="gap: 10px;">
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

            <div class="flex-column" style="gap: 10px;">
              <label>Available Claims</label>
              <span>{{ proposal?.claims }}</span>
            </div>

            <div class="flex-column" style="gap: 10px;">
              <label>Time to Complete</label>
              <span>{{ proposal?.remainingTime }}</span>
            </div>
          </aside>

          <aside class="flex-center" style="gap: 20px;">
            <div class="flex-center" style="gap: 10px;">
              <v-btn icon color="#EEE6F1" elevation="0" size="29">
                <v-icon icon="mdi-thumb-up" color="#DC7AAB" size="15" />
              </v-btn>

              <span>{{ proposal?.likes }}</span>
            </div>

            <div class="flex-center" style="gap: 10px;">
              <v-btn icon color="#EEE6F1" elevation="0" size="29">
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
const
  router = useRouter(),
  props = defineProps({
    proposal: {
      type: Object,
      default: undefined
    }
  })

function onPressProposal() {
  router.push({ name: 'ProposalDetails', query: { id: props.proposal.id } })
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

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
    * { color: #333 !important }
    span { font-size: 1.5625em !important }
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
