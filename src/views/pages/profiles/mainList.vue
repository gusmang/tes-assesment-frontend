<template>
  <div>
    <v-container grid-list-xs fluid>
      <List></List>
    </v-container>
  </div>
</template>

<script>
import List from "./detail/form.vue";
export default {
  data() {
    return {
      pages: "list",
      profiles: JSON.parse(localStorage.getItem("din-dashboard-profile")),
    }
  },
  mounted() {
  },
  components: { List }
};
</script>

<style>

</style>