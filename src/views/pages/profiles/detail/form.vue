<template>
  <v-container style="margin-top:-10px!important; padding:0 0 0 40px; ">

    <v-col style="padding:0 20px; margin:0;" md="12">
      <h2 style="color:#61C7D1; font-size:32px;"><v-icon
          style="color:#61C7D1; font-size:48px;">mdi-account-circle</v-icon> &nbsp;Profile</h2>
    </v-col>
    <hr style="border-top:1px solid #CED4DA; margin:20px 0 40px 0;" />

    <v-col md="12" class="mt-6" style="padding:0 20px; margin:0;">


      <v-col md="12" class="mt-2" style="padding:0!important; margin:0!important;  min-height:80px;">
        <v-row>

          <v-col md="3" cols="12" style="padding:15px 0;">
            <h5 style="font-size:16px!important; font-weight:normal;"> Nama Lengkap </h5>
          </v-col>

          <v-col md="9" cols="12">
            <v-text-field placeholder="Nama Lengkap" :value="item.nama" v-model="searchForm.namaLengkap"
              outlined></v-text-field>
          </v-col>

        </v-row>

      </v-col>

      <v-col md="12" class="mt-2" style="padding:0!important; margin:0!important;  min-height:80px;">
        <v-row>

          <v-col md="3" cols="12" style="padding:15px 0;">
            <h5 style="font-size:16px!important; font-weight:normal;"> Nomor Hp / Whatsapp. </h5>
          </v-col>

          <v-col md="9" cols="12">
            <v-text-field placeholder="Phone" :value="item.telepon" v-model="searchForm.telepon"
              outlined></v-text-field>
          </v-col>

        </v-row>

      </v-col>

      <v-col md="12" class="mt-2" style="padding:0!important; margin:0!important;  min-height:80px;">

        <v-row>

          <v-col md="3" cols="12" style="padding:15px 0;">
            <h5 style="font-size:16px!important; font-weight:normal;"> Status </h5>
          </v-col>

          <v-col md="9" cols="12" v-html="item.status_member">
          </v-col>

        </v-row>

      </v-col>

      <v-col md="12" class="mt-2" style="padding:0!important; margin:0!important;  min-height:80px;">
        <v-row>

          <v-col md="3" cols="12" style="padding:15px 0;">
            <h5 style="font-size:16px!important; font-weight:normal;"> Email </h5>
          </v-col>

          <v-col md="9" cols="12">
            <v-text-field placeholder="Email" :value="item.email" v-model="searchForm.namaEmail" disabled
              outlined></v-text-field>
          </v-col>

        </v-row>

      </v-col>

      <v-col md="12" class="mt-2" style="padding:0!important; margin:0!important; min-height:80px;">
        <v-row>

          <v-col md="3" cols="12" style="padding:15px 0;">
            <h5 style="font-size:16px!important; font-weight:normal;"> Foto </h5>
          </v-col>

          <v-col md="9" cols="12">
            <v-file-input accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar"
              prepend-icon="mdi-camera" v-model="searchForm.upload_files"></v-file-input>
          </v-col>

        </v-row>

      </v-col>

      <v-btn block color="#198754" style="color:white" @click="updateProfiles()" class="mt-6">
        Submit Data
      </v-btn>

    </v-col>


  </v-container>
</template>



<script>
//import CustomCard from "../components/CustomCard.vue";
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
      item: [],
      decimals: "10.00",
      listitemsclass: "list-tables-menu",
      listitemsclassactive: "list-tables-menu activelist",
      icons: "chevron-right",
      selectedItem: 0,
      items: [
        { text: 'Dashboard', icon: 'mdi-folder' },
        { text: 'Profil', icon: 'mdi-account-multiple' },
        { text: 'Ganti Password', icon: 'mdi-key-variant' },
        { text: 'Kursus Saya Ikuti', icon: 'mdi-school' },
        { text: 'Materi Kursus', icon: 'mdi-file' },
        { text: 'Transaksi', icon: 'mdi-repeat' },
        { text: 'Penjualan Kursus', icon: 'mdi-trending-up' },
        { text: 'Tarik Tunai', icon: 'mdi-basket-unfill' },
        { text: 'Sertifikat', icon: 'mdi-file-chart' },
        { text: 'Keluar', icon: 'mdi-arrow-right-bold' },
      ],
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
    updateProfiles() {

      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';

      this.$store
        .dispatch("member/updateProfiles", {
          tname: this.searchForm.namaLengkap,
          tphone: this.searchForm.telepon,
          tfile: this.searchForm.upload_files,
          todo: "updateProfilMember"
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarSuccess", "Sukses Update Profile");
          this.loading = false;
          this.loadingtext = '';
          // this.item = this.$store.state.member.member.memberlist
          // console.log("profiles list" , this.$store.state.member.member.memberlist);
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res);
          this.loading = false;
          this.loadingtext = '';
        });

    },
    fetchProfiles() {

      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';

      //alert("limits "+this.pagination.itemsPerPage);

      this.$store
        .dispatch("member/fetchProfiles", {
          page: this.pagination.page,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = '';
          this.item = this.$store.state.member.member.memberlist
          console.log("profiles list", this.$store.state.member.member.memberlist);
          this.searchForm.namaEmail = this.item.email
          this.searchForm.telepon = this.item.telepon
          this.searchForm.namaLengkap = this.item.nama
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res);
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
    //this.fetch(0)
    this.fetchProfiles();
    console.log("members_profile", this.$store.state.auth.profile);
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
};
</script>

<style>
.list-tables-menu:nth-child(odd) {
  background: #4ab9c4;
  margin-top: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.list-tables-menu:nth-child(even) {
  margin-top: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.list-tables-menu .iconlist {
  font-size: 24px;
  color: #FFFFFF;
}


.activelist {
  background: #048692 !important;
}


.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 2px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.btn-outline-success {
  color: #198754;
  border-color: #198754;
}

.rounded-pill {
  border-radius: 50rem !important;
}

a.btn-outline-success {
  color: #198754 !important;
}

a.btn:hover {
  background: #198754 !important;
  color: #FFFFFF !important;
}
</style>