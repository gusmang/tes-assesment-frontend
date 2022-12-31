<template>
  <v-expansion-panels v-model="panel" multiple>
    <v-expansion-panel expand focusable>
      <v-expansion-panel-content>
        <v-layout>
          <v-flex>
            <v-text-field
              v-model="form.member"
              label="Search By Email / Nama / Phone"
              single-line
              small
              clearable
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-autocomplete
              v-model="form.bank_status"
              :items="status_verifikasi"
              item-text="text"
              item-value="value"
              label="Status"
            >
            </v-autocomplete>
          </v-flex>
          <v-flex>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              clearable
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.date"
                  label="Tanggal"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.date"
                no-title
                scrollable
                clearable
                @input="menu = false"
              >
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-autocomplete
              v-model="form.bank_name"
              :items="$store.state.bank.bank.listBank"
              item-text="bank_name"
              item-value="bank_id"
              label="Bank Name"
            >
            </v-autocomplete>
          </v-flex>
          <v-flex>
            <v-text-field
              v-model="form.bank_acc_holder"
              label="Bank Acc Holder"
              single-line
              small
              clearable
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              v-model="form.bank_acc_number"
              label="Bank Acc Number"
              single-line
              small
              clearable
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-autocomplete
              v-model="form.gender"
              :items="gender"
              item-text="text"
              item-value="value"
              label="Gender"
            >
            </v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout align-end justify-end>
          <v-btn color="warning" @click="clearForm()" small depressed>
            Clear
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn small depressed color="success" class="m0" @click="search()">
            <v-icon>mdi-magnify</v-icon> Search
          </v-btn>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    panel: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      menu: false,
      form: {},
      status_verifikasi: [
        { text: "All", value: null },
        { text: "Request Verifikasi", value: "0" },
        { text: "Terverifikasi", value: "1" },
        { text: "Ditolak", value: "-2" },
      ],
      gender: [
        { text: "All Gender", value: null },
        { text: "Laki-Laki", value: "Laki-Laki" },
        { text: "Perempuan", value: "Perempuan" },
        // { text: "Gagal", value: "2" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("bank/fetchBank", { find: "bank" });
  },
  methods: {
    search() {},
    clearForm() {
      this.form = {};
    },
  },
};
</script>

<style>
</style>