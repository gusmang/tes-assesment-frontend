<template>
  <v-dialog
    v-model="$store.state.newmember.main.dialog.image"
    persistent
    width="700px"
    height="900px"
    :overlay="false"
    transition="dialog-transition"
  >
    <custom-card :cardShow="true">
      <template v-slot:toolbar>
        <v-toolbar-title>Image Data</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="black"
          small
          text
          @click="$store.commit('newmember/setMainDialog', 'image')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:content>
        <v-carousel v-model="model" height="700px">
          <v-carousel-item v-for="(image, i) in images" :key="i">
            <img :src="image" style="max-width: 600px; max-height: 800px" />
          </v-carousel-item>
        </v-carousel>
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
      model: 0,
    };
  },
  computed: {
    images() {
      return [
        this.$store.state.newmember.main.detail.ktp_image,
        this.$store.state.newmember.main.detail.tab_image,
        this.$store.state.newmember.main.detail.slf_image,
      ];
    },
  },
};
</script>

<style>
</style>