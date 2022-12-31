<template>
  <v-dialog
    v-model="$store.state.newmember.main.dialog.lock"
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <custom-card :cardShow="true" :cardAction="true">
      <template v-slot:toolbar>
        Lock Balance User {{ $store.state.newmember.main.detail.format_id }}
        <v-spacer></v-spacer>
        <v-btn
          color="black"
          small
          text
          @click="$store.commit('newmember/setMainDialog', 'lock balance')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:content>
        <v-simple-table class="pb-3">
          <tbody>
            <tr>
              <th>Nama</th>
              <td>:</td>
              <td>{{ $store.state.newmember.main.detail.name }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>:</td>
              <td>{{ $store.state.newmember.main.detail.email }}</td>
            </tr>
            <tr>
              <th>Balance</th>
              <td>:</td>
              <td>
                {{
                  $store.state.newmember.main.detail.bal_gramasi +
                  " (" +
                  $store.state.newmember.main.detail.real_gramasi +
                  ")"
                }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-container grid-list-xs>
          <v-flex xs12 class="pr-2 pl-2 pb-1">
            <v-text-field
              v-model="$store.state.newmember.main.detail.lock_user"
              label="Lock Balance by User"
              dense
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12 class="pr-2 pl-2 pt-1">
            <v-text-field
              v-model="$store.state.newmember.main.detail.lock_dinaran"
              label="Lock Balance by Dinaran"
              dense
            >
            </v-text-field>
          </v-flex>
        </v-container>
      </template>
      <template v-slot:action>
        <v-btn
          color="warning"
          small
          depressed
          @click="$store.commit('newmember/setMainDialog', 'lock balance')"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" small depressed>Submit</v-btn>
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