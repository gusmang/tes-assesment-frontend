<template>
  <div>
    <!-- <v-btn color="success" @click="fetch">Add New MemberS New Baru</v-btn> -->

    <CustomCard>

      <template v-slot:toolbar>
        <div style="width:100%;">

          <v-btn color="success" small outlined @click="filterToggle" style="float:right;">
            Tambah Data <v-icon>mdi-chevron-down</v-icon>
          </v-btn>

        </div>

      </template>

      <template v-slot:expansion>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel expand focusable>
            <v-expansion-panel-content>

              <v-layout>

                <v-flex>
                  <v-text-field v-model="searchForm.member" label="Input Name" single-line small clearable
                    style="margin-right:30px;">
                  </v-text-field>
                </v-flex>

                <v-flex>
                  <v-text-field v-model="searchForm.email" label="Input Email" single-line small clearable>
                  </v-text-field>
                </v-flex>

              </v-layout>

              <v-layout>

                <v-flex>
                  <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Upload Images"
                    prepend-icon="mdi-camera" label="Upload Images" v-model="searchForm.upload_files"></v-file-input>
                </v-flex>

              </v-layout>


              <v-layout align-end justify-end>
                <v-spacer></v-spacer>
                <v-btn small depressed color="success" class="m0" @click="submitLock()">
                  <v-icon>mdi-plus</v-icon> Submit Data
                </v-btn>
              </v-layout>

            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>

      <template v-slot:datatable>
        <v-flex md12 style="overflow-x: scroll">
          <v-data-table :headers="headers" :items="$store.state.member.member.list"
            :server-items-length="$store.state.member.member.total" :footer-props="{
              'items-per-page-options': [10, 25, 50, 100],
              'items-per-page-text': 'Baris per Halaman:',
            }" :items-per-page="10" :loading="loading" :loading-text="loadingtext">

            <template v-slot:[`item.images`]="{ item }" style="padding:10px;">

              <v-container>

                <v-row>

                  <v-dialog v-model="dialogImage" width="500">

                    <template v-slot:activator="{ on, attrs }">
                      <!-- <v-btn
                                    color="red lighten-2"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    > -->
                      <img v-bind:src="item.foto" style="width:150px; padding:10px;" v-bind="attrs" v-on="on" />
                      <!-- </v-btn> -->
                    </template>

                    <v-card>
                      <v-card-title class="text-h5 primary-colors text-light" style="color:#FFF;">
                        Image Detail
                      </v-card-title>

                      <v-card-text style="margin-top:20px;">
                        <img v-bind:src="item.foto" style="width:100%;" />
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false"
                                    >
                                        Oke
                                    </v-btn> -->
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-row>

              </v-container>

            </template>
          </v-data-table>
        </v-flex>
      </template>
    </CustomCard>

  </div>
</template>
  
<script>
import CustomCard from "../components/CustomCard.vue";
//import downloadexcel from "vue-json-excel";


export default {
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      panel: null,
      profiles: this.$store.state.auth.profile,
      provinsiList: [],
      bankList: [],
      currentPage: 1,
      decimals: "10.00",
      icons: "chevron-right",
      searchForm: {
        member: ''
        // tipe: 'ALL',
        // status: 'ALL',
        // sponsor: ''
      },
      formLock: {

      },
      tipe: [],
      menu: null,
      form: {},
      pagination: {},
      headers: [
        { text: "Images", align: "left", value: "images" },
        { text: "Name", align: "left", value: "nama" },
        { text: "Email", align: "left", value: "email" },
        { text: "Foto", align: "left", value: "foto" }
      ],
      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
    filterToggle() {
      if (this.panel == null)
        this.panel = [...Array(this.items).keys()].map((k, i) => i);
      else this.panel = null;
    },
    fetch(cari) {
      if (cari == 1) {
        this.pagination.page = 1;
      }
      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';

      //alert("limits "+this.pagination.itemsPerPage);

      this.$store
        .dispatch("member/fetchListMember", {
          page: this.pagination.page,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = '';
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    submitLock: function () {
      //this.$store.commit("main/setLoading", true);
      this.$store
        .dispatch("member/postLockGold", {
          nama: this.searchForm.member,
          email: this.searchForm.email,
          tfile: this.searchForm.upload_files,
        })
        .then(() => {
          //   this.$store.commit("main/setLoading", false);
          //   this.loading = false;
          //   this.loadingtext = '';

          this.fetch(0);
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res);
          this.loading = false;
          this.loadingtext = '';
        });
    },
  },
  mounted() {
    this.fetch(0)
  },
  watch: {
    //   pagination() {

    //     this.fetch(0)

    //   },
    searchSponsor(val) {
      val && val !== this.searchForm.sponsor && this.getSponsor(val);
    },
    searchMember(val) {
      val && val !== this.searchForm.member && this.getMember(val);
    }

  },

  computed: {
    dateRangeText() {
      if (typeof this.form.dates != "undefined") {
        if (this.form.dates.length > 1) {
          return this.form.dates.join(" ~ ");
        } else {
          return this.form.dates[0];
        }
      } else {
        return null;
      }
    },
  },
  //components: { CustomCard , downloadexcel },
  components: { CustomCard },
};
</script>
  
<style>

</style>