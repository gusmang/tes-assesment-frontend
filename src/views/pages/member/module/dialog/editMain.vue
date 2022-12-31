<template>
  <v-dialog
    v-model="$store.state.newmember.main.dialog.editmain"
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <custom-card :cardShow="true" :cardAction="true" :color="'#fb8c00'">
      <template v-slot:toolbar>
        <v-toolbar-title>
          Edit Main Data {{ $store.state.newmember.main.detail.format_id }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="black"
          small
          text
          @click="$store.commit('newmember/setMainDialog', 'edit main')"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:content>
        <v-text-field
          name="Nama"
          label="Nama"
          id="nama"
          dense
          v-model="$store.state.newmember.main.detail.name"
        ></v-text-field>
        <v-text-field
          name="Email"
          label="Email"
          id="email"
          dense
          v-model="$store.state.newmember.main.detail.email"
        ></v-text-field>
        <v-text-field
          name="Phone"
          label="Phone"
          id="phone"
          dense
          v-model="$store.state.newmember.main.detail.phone"
        ></v-text-field>
      </template>
      <template v-slot:action>
        <v-btn
          color="info"
          small
          depressed
          @click="$store.commit('newmember/setMainDialog', 'edit main')"
        >
          close
        </v-btn>
      </template>
    </custom-card>
  </v-dialog>
</template>

<script>
import CustomCard from "../../../../../components/CustomCard.vue";
export default {
  components: {
    CustomCard,
  },
};
</script>

<style>
</style>