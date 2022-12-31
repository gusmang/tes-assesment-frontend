<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.newmember.reqVerify.list"
    :options.sync="pagination"
    :server-items-length="$store.state.newmember.reqVerify.total"
    :footer-props="{
      'items-per-page-options': [10, 25, 50, 100],
      'items-per-page-text': 'Baris per Halaman:',
    }"
    :items-per-page="10"
    :loading="loading"
  >
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      headers: [
        { text: "Member", value: "name" },
        { text: "Bank Account", align: "left", value: "bank_account" },
        { text: "Trx Count", align: "center", value: "trxCount" },
        { text: "Balance (gr)", align: "center", value: "real_gramasi" },
        { text: "Status", value: "status_verified" },
        { text: "Updt By", align: "center", value: "tukangupdate" },
        { text: "Action", align: "center", value: "action" },
      ],
    };
  },
  methods: {
    fetch() {
      this.loading = true;
      this.$store.commit("main/setLoading", true);
      this.$store.commit(
        "memberRequestVerify/setPaginationSetting",
        this.pagination
      );
      this.$store
        .dispatch("memberRequestVerify/fetch")
        .then(() => {
          this.loading = false;
          this.$store.commit("main/setLoading", false);
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
        });
    },
  },
  watch: {
    pagination() {
      this.fetch();
    },
  },
};
</script>

<style>
</style>