<template>
  <v-sheet class="form-card pa-4" elevation="6">
    <v-card class="px-7 py-5" elevation="3">
      <v-card-title class="pa-0 pb-2 d-flex flex-space-center">
        <h6 v-html="title" class="mb-0" />

        <h6 class="mb-0">{{ windowStep + 1 }} / {{ steps.length }}</h6>
      </v-card-title>

      <v-card-text class="pa-0 pt-3">
        <v-form v-model="formValid" @submit.prevent="onNext">
          <slot />
        </v-form>

        <aside class="d-flex flex-wrap align-center justify-start mt-2" style="gap: 20px;">
          <v-btn v-if="hasPrevEmit" class="bg-tertiary" @click="emit('prev')">
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
    }
  }
}
</style>
