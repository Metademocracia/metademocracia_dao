<template>
  <div id="create-proposal">
    <section style="margin-inline: calc(50% - 50vw) !important; width: 100vw!important;">
      <v-carousel cycle color="#DB107C" :show-arrows="false">
        <v-carousel-item>
        <img src="@/assets/sources/images/banner-3.svg" alt="Banner" class="banner-img">
        </v-carousel-item>

        <v-carousel-item>
        <img src="@/assets/sources/images/banner-2.svg" alt="Banner" class="banner-img">
        </v-carousel-item>

        <v-carousel-item>
        <img src="@/assets/sources/images/banner-1.svg" alt="Banner" class="banner-img">
        </v-carousel-item>
      </v-carousel>
    </section>

    <section class="section2-create-proposal">
      <v-card class="card mt-16 card-crear">
        <div class="div-purple">
          <h4>Crear Propuesta</h4>
        </div>

        <v-row class="mt-6">
          <v-col cols="12" class="col-select">
            <label for="tipo_propuesta">Tipo de Propuesta</label>
            <v-select
              v-model="tipo_propuesta"
              id="tipo_propuesta"
              variant="outlined"
              :items="itemsTipoPropuesta"
              item-title="desc"
              item-value="id"
              density="compact"
              rounded
              menu-icon="mdi-chevron-down"
              class="select-create"
              bg-color="#fff"
              return-object
              hide-details
            ></v-select>
          </v-col>
          <v-col xl="6" lg="6" md="6" cols="12">
            <label for="titulo_propuesta">Titulo de Propuesta</label>
            <v-text-field
            id="titulo_propuesta" class="input" variant="outlined"
            elevation="1" placeholder="Titulo de Propuesta"
            ></v-text-field>
          </v-col>
          <v-col xl="6" lg="6" md="6" cols="12">
            <label for="proponente">Proponente</label>
            <v-text-field
            id="proponente" class="input" variant="outlined"
            elevation="1" :placeholder="'ejemplo.'+network"
            ></v-text-field>
          </v-col>
          <v-col xl="6" lg="6" md="6" cols="12">
            <label for="descripcion">Descripción</label>
            <v-text-field
            id="descripcion" class="input" variant="outlined"
            elevation="1" placeholder="Descripción"
            ></v-text-field>
          </v-col>
          <v-col xl="6" lg="6" md="6" cols="12">
            <label for="link">Link</label>
            <v-text-field
            id="link" class="input" variant="outlined"
            elevation="1" placeholder="Descripción"
            ></v-text-field>
          </v-col>
          <v-col v-if="tipo_propuesta.desc === 'Cambiar política'" xl="6" lg="6" md="6" cols="12">
            <label for="política">Política</label>
            <v-text-field
            id="política" class="input" variant="outlined"
            elevation="1" placeholder="Política"
            ></v-text-field>
          </v-col>

          <template v-if="tipo_propuesta.desc === 'Agregar miembro del grupo'">
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="group_id">ID de Grupo</label>
              <v-text-field
              id="group_id" class="input" variant="outlined"
              elevation="1" placeholder="#123456"
              ></v-text-field>
            </v-col>

            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="member_id">ID de Miembro</label>
              <v-text-field
              id="member_id" class="input" variant="outlined"
              elevation="1" placeholder="#123456"
              ></v-text-field>
            </v-col>
          </template>

          <template v-if="tipo_propuesta.desc === 'Eliminar miembro del grupo'">
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="group_id">ID de Grupo</label>
              <v-text-field
              id="group_id" class="input" variant="outlined"
              elevation="1" placeholder="#123456"
              ></v-text-field>
            </v-col>

            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="member_id">ID de Miembro</label>
              <v-text-field
              id="member_id" class="input" variant="outlined"
              elevation="1" placeholder="#123456"
              ></v-text-field>
            </v-col>
          </template>

          <template v-if="tipo_propuesta.desc === 'Llamada de función'">
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="receiver_id">ID de Receptor</label>
              <v-text-field
              id="receiver_id" class="input" variant="outlined"
              elevation="1" placeholder="#123456"
              ></v-text-field>
            </v-col>

            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="actions">Accion</label>
              <v-text-field
              id="actions" class="input" variant="outlined"
              elevation="1" placeholder="actions"
              ></v-text-field>
            </v-col>
          </template>

          <template v-if="tipo_propuesta.id === 'Transfer'">
            <v-form ref="Transfer" v-model="Transfer" class="form-align">
              <v-row>
                <v-col xl="6" lg="6" md="6" cols="12">
                <label for="token_id">ID de Token</label>
                <!--<v-text-field
                id="token_id" class="input" variant="outlined"
                elevation="1" placeholder="#123456"
                ></v-text-field>-->
                <v-select
                  v-model="token_id"
                  id="token_id"
                  variant="outlined"
                  :items="itemsTokenId"
                  item-title="desc"
                  item-value="id"
                  density="compact"
                  rounded
                  menu-icon="mdi-chevron-down"
                  class="select-create"
                  bg-color="#fff"
                  return-object
                  hide-details
                ></v-select>
                </v-col>

                <v-col xl="6" lg="6" md="6" cols="12">
                  <label for="receiver_id">ID de Receptor</label>
                  <v-text-field
                  id="receiver_id" class="input" variant="outlined"
                  elevation="1" :placeholder="'ejemplo.'+network"
                  ></v-text-field>
                </v-col>

                <v-col xl="6" lg="6" md="6" cols="12">
                  <label for="amount">Cantidad</label>
                  <v-text-field
                  id="amount" class="input" variant="outlined"
                  elevation="1" placeholder="0.00"
                  ></v-text-field>
                </v-col>

                <v-col xl="6" lg="6" md="6" cols="12">
                  <label for="msg">Mensaje</label>
                  <v-text-field
                  id="msg" class="input" variant="outlined"
                  elevation="1" placeholder="Opcional"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </template>

          <template v-if="tipo_propuesta.desc === 'Cambiar política agregar o actualizar rol'">
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="rol_name">Nombre de Rol</label>
              <v-text-field
              id="rol_name" class="input" variant="outlined"
              elevation="1" placeholder="Nombre de Rol"
              ></v-text-field>
            </v-col>
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="rol">Rol</label>
              <v-text-field
              id="rol" class="input" variant="outlined"
              elevation="1" placeholder="Rol"
              ></v-text-field>
            </v-col>
          </template>

          <template v-if="tipo_propuesta.desc === 'Cambiar política eliminar rol'">
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="rol_name">Nombre de Rol</label>
              <v-text-field
              id="rol_name" class="input" variant="outlined"
              elevation="1" placeholder="Nombre de Rol"
              ></v-text-field>
            </v-col>
          </template>

          <template v-if="tipo_propuesta.desc === 'Cambiar política actualizar política de votación'">
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="proposal_kind">Tipo de Propuesta</label>
              <v-text-field
              id="proposal_kind" class="input" variant="outlined"
              elevation="1" placeholder="Tipo de Propuesta"
              ></v-text-field>
            </v-col>
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="vote_policy">Política de voto</label>
              <v-text-field
              id="vote_policy" class="input" variant="outlined"
              elevation="1" placeholder="Tipo de Propuesta"
              ></v-text-field>
            </v-col>
          </template>

          <template v-if="tipo_propuesta.desc === 'Cambiar los parámetros de actualización de políticas'">
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="proposal_kind">Tipo de Propuesta</label>
              <v-text-field
              id="proposal_kind" class="input" variant="outlined"
              elevation="1" placeholder="Tipo de Propuesta"
              ></v-text-field>
            </v-col>
            <v-col xl="6" lg="6" md="6" cols="12">
              <label for="parameters">Parámetros</label>
              <v-text-field
              id="parameters" class="input" variant="outlined"
              elevation="1" placeholder="Parámetros"
              ></v-text-field>
            </v-col>
          </template>
        </v-row>

        <div class="center mt-6">
          <v-btn style="max-width: 200px;">
            Crear Propuesta
          </v-btn>
        </div>
      </v-card>
    </section>
  </div>
</template>

<script>
import '@/assets/styles/pages/create-proposals.scss'
import { ref } from 'vue';

export default{
  setup(){
    return{
      Transfer: false,
      network: process.env.NETWORK,
      itemsTipoPropuesta:[
        // {id: '', desc: 'Cambiar política'},
        // {id: '', desc: 'Agregar miembro del grupo'},
        // {id: '', desc: 'Eliminar miembro del grupo'},
        // {id: '', desc: 'Llamada de función'},
        {id: 'Transfer', desc: 'Transferencia'},
        // {id: '', desc: 'Cambiar política agregar o actualizar rol'},
        // {id: '', desc: 'Cambiar política eliminar rol'},
        // {id: '', desc: 'Cambiar política actualizar política de votación'},
        // {id: '', desc: 'Cambiar los parámetros de actualización de políticas'}
      ],
      tipo_propuesta: ref({id: '', desc: ''}),
      itemsTokenId: [
        {id: null, desc: "Near"},
        {id: "usdc", desc: "USDC"},
      ],
      token_id: ref({id: '', desc: ''}),
    }
  },
  methods: {
    itemProps (item) {
      this.$refs.formStep1
      return {
        title: item.desc,
        subtitle: item.id,
      }
    },
  },
}

</script>
