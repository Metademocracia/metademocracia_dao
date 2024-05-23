<template>
  <span class="format-html" v-html="html"></span>
</template>

<script setup>
defineProps({
  html: {
    type: String,
    default: undefined
  }
})
</script>

<style lang="scss">
.format-html {
  font-size: var(--resizer-mobile)
}
</style>
