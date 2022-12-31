<template>
  <div>
    <custom-card>
      <template v-slot:toolbar>
        <v-btn color="warning" outlined small @click="refreshData()">
          <v-icon small>mdi-refresh</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" small @click="togglePanel()" depressed>
          <v-icon class="mr-2">mdi-chevron-down</v-icon> Filter
        </v-btn>
        <v-btn color="info" small class="ml-3" depressed>
          <v-icon small class="mr-2"> mdi-file-excel </v-icon> download
        </v-btn>
      </template>
      <template v-slot:expansion>
        <search :panel="toggle"></search>
      </template>
      <template v-slot:datatable>
        <table-data></table-data>
      </template>
    </custom-card>
  </div>
</template>

<script>
import CustomCard from "../../../../components/CustomCard.vue";
import Search from "./component/search.vue";
import TableData from "./component/tableData.vue";
export default {
  components: {
    CustomCard,
    Search,
    TableData,
  },
  data() {
    return {
      toggle: null,
    };
  },
  methods: {
    togglePanel() {
      if (this.toggle == null)
        this.toggle = [...Array(this.items).keys()].map((k, i) => i);
      else this.toggle = null;
    },
  },
};
</script>

<style>
</style>