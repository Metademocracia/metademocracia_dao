<template>
  <v-sheet class="form-card pa-4" elevation="6">
    <v-card class="px-7 py-5" elevation="3">
      <v-card-title class="pa-0 pb-2 d-flex flex-space-center">
        <h6 v-html="title" class="mb-0" />

        <slot name="append-title">
          <h6 v-if="windowStep && steps.length" class="mb-0">{{ windowStep + 1 }} / {{ steps.length }}</h6>
        </slot>
      </v-card-title>

      <v-card-text class="pa-0 pt-3">
        <v-form v-model="formValid" @submit.prevent="onNext">
          <slot />
        </v-form>

        <aside class="d-flex flex-wrap align-center justify-start mt-2" style="column-gap: 20px; row-gap: 10px;">
          <v-btn v-if="hasPrevEmit" class="bg-secondary" @click="emit('prev')">
            {{ prevText }}
            <v-icon icon="mdi-chevron-right" />
          </v-btn>

          <v-btn
            v-if="hasNextEmit" class="bg-tertiary"
            :loading="loadingBtn"
            :disabled="disabledBtn || !formValid"
            @click="onNext"
          >
            {{ nextText }}
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </aside>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { getCurrentInstance } from 'vue';

const
  props = defineProps({
    title: String,
    windowStep: Number,
    steps: Array,
    required: Boolean,
    loadingBtn: Boolean,
    disabledBtn: Boolean,
    prevText: {
      type: String,
      default: 'Anterior'
    },
    nextText: {
      type: String,
      default: 'Siguiente'
    },
  }),
  emit = defineEmits(['prev', 'next']),
  instance = getCurrentInstance(),

formValid = ref(!props.required),
hasPrevEmit = !!instance?.vnode.props?.onPrev,
hasNextEmit = !!instance?.vnode.props?.onNext


const onNext = () => emit('next', formValid.value)
</script>

<style lang="scss">
@use "@/assets/styles/main.scss" as *;

.form-card {
  border-radius: 8px !important;
  .v-card {
    border-radius: 7px !important;

    &-title {
      border-bottom: 1px solid #939393;

      h6 + h6 {
        color: $tertiary !important;
        font-size: 16px !important;
      }
    }

    &-text {
      display: flex;
      flex-direction: column;

      label {
        color: #939393 !important;
      }

      input, textarea, .v-select__selection-text { color: #333 !important }
      label, p { font-size: 14px !important }
      input, textarea, .v-btn { font-size: 13px !important }
      .v-select__selection-text { font-size: 17px !important }

      .v-messages__message {
        margin-block: 0 10px;
      }

      .v-input {
        .mdi-menu-down { color: rgb(var(--v-theme-primary)) }

        &.v-select .v-field {
          &__field {
            height: 42px;
          }

          &__input {
            padding: 0;
            min-height: 100% !important;
            height: 100% !important;
          }
        }

        &.v-autocomplete .v-field {
          &__field {
            height: 42px;
          }

          &__input {
            padding: 0;
            padding-left: 17px;
            min-height: 100% !important;
            height: 100% !important;
          }
        }

        .v-field--variant-solo {
          border-radius: 8px;
          border: 1px solid hsla(0, 0%, 66%, 0.4);
          box-shadow: none !important;
        }

        &:not(.v-textarea) .v-field__field {
          height: 42px;

          input {
            min-height: 100% !important;
            height: 100% !important;
          }
        }
      }

      .v-data-table {
        $border: 1px solid rgba(0, 0, 0, .12);

        th:nth-child(3) {
          max-width: 90px;
          border-inline: $border;
        }

        td:nth-child(3) {
          border-inline: $border;
        }

        tr:last-child td {
          border-bottom: $border;
        }

        &-footer { display: none !important }
      }
    }
  }
}
</style>
