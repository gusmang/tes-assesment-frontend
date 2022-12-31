<template>
  <v-dialog
    v-model="$store.state.newmember.main.dialog.suspend"
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <custom-card :cardShow="true" :cardAction="true" :color="'#a72833'">
      <template v-slot:toolbar>
        <v-toolbar-title>
          Suspend User {{ $store.state.newmember.main.detail.format_id }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="black" text small @click="close()">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:content>
        Yakin anda akan melakukan <b>SUSPEND</b> atas user
        <b>
          {{ $store.state.newmember.main.detail.name }} ({{
            $store.state.newmember.main.detail.email
          }})
        </b>
        ?
        <v-text-field
          name="reason"
          label="Alasan"
          id="reason"
          v-model="reason"
        ></v-text-field>
      </template>
      <template v-slot:action>
        <v-btn color="info" small depressed @click="close()"> close </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="#a72833" small depressed dark :disabled="disableButton">
          unverify user
        </v-btn>
      </template>
    </custom-card>
  </v-dialog>
</template>

<script>
import CustomCard from "../../../../../components/CustomCard.vue";
export default {
  components: { CustomCard },
  data() {
    return {
      reason: null,
    };
  },
  methods: {
    close() {
      this.reason = null;
      this.$store.commit("newmember/setMainDialog", "suspend");
    },
  },
  computed: {
    disableButton() {
      if (this.reason == null || this.reason == "") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
</style>