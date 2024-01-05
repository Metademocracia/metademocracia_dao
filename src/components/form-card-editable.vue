<template>
  <v-sheet class="form-card-editable pa-4 pb-0" elevation="6">
    <v-card class="px-7 py-5" elevation="3">
      <img class="form-card-editable__close-btn" src="@/assets/sources/icons/close-icon.svg" alt="close icon" @click="emit('close')">

      <v-card-title class="pa-0 pb-2">
        <label for="proposal-type">Tipo de Propuesta</label>
        <h6 class="mb-0">{{ proposal }}</h6>
      </v-card-title>

      <v-card-text class="pa-0 pt-3">
        <v-form v-model="formValid" @submit.prevent="onCompleted">
          <slot />
        </v-form>
      </v-card-text>
    </v-card>

    <aside class="form-card-editable__footer d-flex flex-space-center mt-6">
      <div class="flex-center" style="gap: 20px;">
        <div class="flex-column" style="gap: 5px;">
          <label for="tgas">TGas</label>
          <v-text-field
            id="tgas"
            v-model="tgas"
            type="number"
            variant="solo"
            style="max-width: 80px;"
          />
        </div>

        <div class="flex-column" style="gap: 5px;">
          <label for="bond">Bond</label>
          <v-text-field
            id="bond"
            v-model="bond"
            type="number"
            variant="solo"
            style="max-width: 100px;"
          >
            <template #append-inner>
              <span style="color: #333 !important; font-size: 11px !important;">NEAR</span>
            </template>
          </v-text-field>
        </div>
      </div>

      <v-btn
        v-if="hasCompletedEmit" class="bg-tertiary"
        :loading="loadingBtn"
        :disabled="disabledBtn || !formValid"
        @click="onCompleted"
      >
        {{ completedText }}
        <v-icon icon="mdi-chevron-right" />
      </v-btn>
    </aside>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { getCurrentInstance } from 'vue';

const
  props = defineProps({
    proposal: String,
    required: Boolean,
    loadingBtn: Boolean,
    disabledBtn: Boolean,
    completedText: {
      type: String,
      default: 'Proponer'
    },
  }),
  emit = defineEmits(['completed', 'close']),
  instance = getCurrentInstance(),

formValid = ref(!props.required),
hasCompletedEmit = !!instance?.vnode.props?.onCompleted,
tgas = ref(150),
bond = ref(0.1)


const onCompleted = () => emit('completed', {
  formValid: formValid.value,
  bond: bond.value,
  tgas: tgas.value
})
</script>

<style lang="scss">
@use "@/assets/styles/main.scss" as *;

.form-card-editable {
  background-color: hsl(0, 0%, 100%, .8) !important;
  border-radius: 8px !important;

  &__footer {
    .v-field {
      transition: .2s ease;
      border: 1px solid hsla(0, 0%, 66%, 0.8) !important;
    }

    .v-input:has(input:focus) .v-field { background-color: #A8A8A8 !important }
  }

  &__close-btn {
    $size: 12px;
    position: absolute;
    top: $size;
    right: $size;
    width: $size !important;
    height: $size !important;
    cursor: pointer;
  }

  .v-card {
    position: relative;
    border-radius: 7px !important;

    &-title {
      border-bottom: 1px solid #939393;

      h6 {
        color: #333 !important;

        + h6 {
          color: $tertiary !important;
          font-size: 16px !important;
        }
      }
    }

    &-text {
      display: flex;
      flex-direction: column;
    }
  }


  h6, label, input, p, textarea, .v-select__selection-text { color: #333 !important }
  label, p { font-size: 12px !important }
  input, textarea, .v-btn { font-size: 13px !important }
  .v-select__selection-text { font-size: 17px !important }

  .v-messages__message { margin-block: 0 10px }

  .v-input {
    .mdi-menu-down { color: rgb(var(--v-theme-primary)) }

    &.v-select .v-field {
      &__field { height: 42px }

      &__input {
        padding: 0;
        min-height: 100% !important;
        height: 100% !important;
      }
    }

    &.v-autocomplete .v-field {
      &__field { height: 42px }

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
}
</style>
