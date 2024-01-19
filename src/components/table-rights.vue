<template>
  <v-data-table
    density="compact"
    class="table-rights mb-4"
    :headers="headers ?? [
      { key: 'name', sortable: false },
      { key: 'all', title: 'Todos', align: 'center', sortable: false },
      { key: 'group', title: 'Grupo Personalizado', align: 'center', sortable: false },
      { key: 'council', title: 'Council', align: 'center', sortable: false },
    ]"
    :items="items"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td v-for="(data, j) in item.group" :key="j">
          <v-checkbox
            v-model="data.value"
            density="compact"
            class="flex-center"
            true-icon="mdi-checkbox-outline"
            :readonly="readOnly"
            hide-details
          />
        </td>
      </tr>
    </template>

    <!--<template #item.group="{ item }">
      <v-checkbox
        v-model="item.group"
        density="compact"
        class="flex-center"
        true-icon="mdi-checkbox-outline"
        :readonly="readOnly"
        hide-details
      />
    </template>

    <template #item.council="{ item }">
      <v-checkbox
        v-model="item.council"
        density="compact"
        class="flex-center"
        true-icon="mdi-checkbox-outline"
        :readonly="readOnly"
        hide-details
      />
    </template>-->
  </v-data-table>
</template>

<script setup>
defineProps({
  headers: {
    type: Array,
    default: undefined
  },
  items: {
    type: Array,
    default: undefined
  },
  readOnly: Boolean,
})
</script>

<style lang="scss">
.table-rights {
  $border: 1px solid rgba(0, 0, 0, .12);

  *:not(i, .v-checkbox span) { color: #333 !important }
  i { color: rgb(var(--v-theme-tertiary)) !important }
  .v-checkbox span { color: rgb(var(--v-theme-tertiary)) !important }

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

  .v-data-table-footer { display: none !important }
}
</style>
