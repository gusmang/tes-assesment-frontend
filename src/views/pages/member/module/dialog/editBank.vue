<template>
  <v-dialog
    v-model="$store.state.newmember.main.dialog.databank"
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <custom-card :cardShow="true" :cardAction="true">
      <template v-slot:toolbar>
        <v-toolbar-title>
          Edit Data Bank {{ $store.state.newmember.main.detail.format_id }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="black"
          text
          small
          @click="$store.commit('newmember/setMainDialog', 'data bank')"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:content>
        <v-text-field
          name="nik"
          label="NIK"
          id="nik"
          dense
          v-model="$store.state.newmember.main.detail.nik"
        ></v-text-field>
        <v-text-field
          name="tempat"
          label="Tempat Lahir"
          id="tempat"
          dense
          v-model="$store.state.newmember.main.detail.birth_place"
        ></v-text-field>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="$store.state.newmember.main.detail.date_of_birth"
              label="Date of Birth"
              readonly
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="$store.state.newmember.main.detail.date_of_birth"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
        <v-autocomplete
          v-model="$store.state.newmember.main.detail.religion"
          :items="religion"
          item-text="text"
          item-value="value"
          label="Religion"
          dense
        >
        </v-autocomplete>
        <v-autocomplete
          v-model="$store.state.newmember.main.detail.gender"
          :items="gender"
          item-text="text"
          item-value="value"
          label="Gender"
          dense
        >
        </v-autocomplete>
      </template>
      <template v-slot:action>
        <v-btn
          color="info"
          small
          depressed
          @click="$store.commit('newmember/setMainDialog', 'data bank')"
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
  data() {
    return {
      menu: false,
      religion: [
        { text: "Hindu", value: "Hindu" },
        { text: "Katolik", value: "Katolik" },
        { text: "Kristen", value: "Kristen" },
        { text: "Buddha", value: "Buddha" },
        { text: "Islam", value: "Islam" },
        { text: "Konghucu", value: "Konghucu" },
        { text: "Lainnya", value: "Other" },
      ],
      gender: [
        { text: "Laki-Laki", value: "Laki-Laki" },
        { text: "Perempuan", value: "Perempuan" },
      ],
    };
  },
};
</script>

<style>
</style>