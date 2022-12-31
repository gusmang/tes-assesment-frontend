<template>
  <v-dialog
    v-model="$store.state.newmember.main.dialog.unverify"
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <custom-card :cardShow="true" :cardAction="true" :color="'#a72833'">
      <template v-slot:toolbar>
        <v-toolbar-title
          >Unverify User {{ $store.state.newmember.main.detail.format_id }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="black"
          text
          small
          @click="$store.commit('newmember/setMainDialog', 'unverify')"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:content>
        Yakin anda akan melakukan <b>UNVERIFIED</b> atas user
        <b>
          {{ $store.state.newmember.main.detail.name }} ({{
            $store.state.newmember.main.detail.email
          }})
        </b>
        ? Request Verifikasi sebelumnya akan di unverified
      </template>
      <template v-slot:action>
        <v-btn
          color="info"
          small
          depressed
          @click="$store.commit('newmember/setMainDialog', 'unverify')"
        >
          close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="#a72833" small depressed dark>unverify user</v-btn>
      </template>
    </custom-card>
  </v-dialog>
</template>

<script>
import CustomCard from "../../../../../components/CustomCard.vue";
export default {
  components: { CustomCard },
};
</script>

<style>
</style>