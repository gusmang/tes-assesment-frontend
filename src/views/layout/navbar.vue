<template>
  <div>

    <v-col md="12" style="background-color:#0B2627; 
        position: fixed;
        min-height:66px;
        width:100%;
        top: 0px;
        left: 0px;
        z-index: 1000;
        margin-top:0!important;
        padding-top:0!important;
        padding-bottom:0!important; 
        margin-bottom:0!important;">

      <v-container
        style="margin-top:0!important; padding-top:0!important; padding-bottom:0!important; margin-bottom:0!important;">

        <v-row style="align-items: center!important; min-height:90px;">

          <v-col md="3" cols="7" style="align-items:center; justify-content: center;">
            <img src="https://yukbelajar.com/tmdesign/logo.png" style="width:100%;" />
          </v-col>

          <v-col v-if="(deviceIsMobile == true)" cols="5" style="justify-content:flex-end; align-items:flex-end;">
            <button @click="expandNav()"
              style="background-color:#0b2e30; border:1px solid #198754; float:right; padding:5px; border-radius:10px; height:45px; width:45px;">
              <v-icon v-if="(showNavs == false)" style="color:#61C7D1; font-size:32px;">mdi-menu</v-icon>
              <v-icon v-if="(showNavs == true)" style="color:#61C7D1; font-size:32px;">mdi-close</v-icon>
            </button>
          </v-col>

          <v-col v-if="deviceIsMobile == false" md="7" cols="12" style="align-items:center; justify-content: center;">

            <!-- <v-text-field
                  class="padding-phone text-green"
                  placeholder="Search"
                  filled
                  rounded
                  dense
                ></v-text-field> -->

          </v-col>

          <v-col v-if="deviceIsMobile == false" md="2" cols="12"
            style="align-items:center; justify-content: center; text-align:center; margin:0!important; padding:0!important;">
            <center>
              <!-- <a class="btn border-0 text-white text-center me-2" style="background-color:#0b2e30;" href="/daftar">
                    <i class="fa-solid fa-clipboard-user fa-xl" style="color:#F7962A"></i><span class="d-block">DAFTAR</span>
                  </a> -->
              <a class="btn border-0 text-white text-center me-2" style="background-color:#0b2e30;" @click="logout">
                <i class="fa-solid fa-clipboard-user fa-xl" style="color:#F7962A"></i><span
                  class="d-block">LOGOUT</span>
              </a>
            </center>
          </v-col>

        </v-row>


        <v-row v-if="(deviceIsMobile == true && showNavs == true)"
          style="width:100%; margin-top:30px; height:90vh; overflow:auto; padding:0 0 30px 0; margin:0;">
          <v-col>

            <v-col cols="12" md="12" style="margin-top:-35px">
              <v-text-field class="padding-phone text-green" placeholder="Search" append-icon="mdi-magnify" filled
                rounded dense>
              </v-text-field>
            </v-col>

            <v-list-item-group v-model="selectedItem" color="primary" style="margin-top:-20px; " id="pmtoplist">
              <v-list-item v-for="(item, i) in items" :key="i" style="color:#81999b;">
                <v-list-item-icon style="color:#81999b;">
                  <v-icon v-text="item.icon" style="color:#81999b;"></v-icon>
                </v-list-item-icon>
                <v-list-item-content style="color:#81999b;">
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>

          </v-col>

          <v-col cols="12" md="12" style="margin-bottom:30px;">
            <v-btn rounded color="#dc3545" dark style="width:100%; ">
              Logout
            </v-btn>
          </v-col>

        </v-row>

      </v-container>

      <div class="navbar-head-bottom" v-if="(deviceIsMobile != true && showNavs != true)">

        <v-card class="d-flex flex-row mb-6" flat tile style="padding:0 140px;">
          <v-card v-for="(item, index) in itemslist" :key="index" class="pa-2" style="height:60px;" outlined tile>
            <div style="margin-top:10px; padding:0 10px; color:#000000; font-size:18px;">
              {{ item.title }} <v-icon v-if="index == 0">mdi-chevron-down</v-icon>
            </div>
          </v-card>
        </v-card>

      </div>


    </v-col>

    <v-container style="margin-top:80px; padding:0 20px;" v-if="(deviceIsMobile == true)">

      <v-row style="align-items: center!important; min-height:90px;">

        <v-col md="3" cols="7" style="align-items:center; justify-content: center;">
          <h2 style="font-size:24px!important;"> Dashboard </h2>
        </v-col>

        <v-col v-if="(deviceIsMobile == true)" cols="5" style="justify-content:flex-end; align-items:flex-end;">
          <button @click="expandBottomNav()"
            style="float:right; padding:5px; border-radius:10px; height:45px; width:45px;">
            <v-icon v-if="(showBottomNavs == false)" style="color:#61C7D1; font-size:32px;">mdi-menu</v-icon>
            <v-icon v-if="(showBottomNavs == true)" style="color:#61C7D1; font-size:32px;">mdi-close</v-icon>
          </button>
        </v-col>

      </v-row>

      <v-list-item-group v-if="(deviceIsMobile == true && showBottomNavs == true)" v-model="selectedBottomItem"
        color="primary" style="margin-top:-20px" id="pmtoplist">

        <v-list-item v-for="(item, i) in bottomitems" :key="i" @click="pindah_halaman(item.to, i)" :id="indexlist + i"
          style="color:#81999b;">
          <v-list-item-icon style="color:#81999b;">
            <v-icon v-text="item.icon" style="color:#81999b;"></v-icon>
          </v-list-item-icon>
          <v-list-item-content style="color:#81999b;">
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>

    </v-container>

  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceIsMobile: false,
      selectedItem: 1,
      showNavs: false,
      showBottomNavs: false,
      indexlist: "indexlists_",
      selectedBottomItem: null,
      itemslist: [
        { title: 'Kategori' },
        { title: 'Management' },
        { title: 'Multimedia' },
        { title: 'Web Programming' },
      ],
      bottomitems: [
        { text: 'Dashboard', icon: 'mdi-folder', to: "Profile_Dash" },
        { text: 'Profil', icon: 'mdi-account-multiple', to: "Profile_Dash" },
        { text: 'Ganti Password', icon: 'mdi-key-variant', to: "Profile_Ganti_Password" },
        { text: 'Kursus Saya Ikuti', icon: 'mdi-school', to: "Profile_Add_Instruktur" },
        { text: 'Materi Kursus', icon: 'mdi-file' },
        { text: 'Transaksi', icon: 'mdi-repeat' },
        { text: 'Penjualan Kursus', icon: 'mdi-trending-up' },
        { text: 'Tarik Tunai', icon: 'mdi-basket-unfill' },
        { text: 'Sertifikat', icon: 'mdi-file-chart' },
        { text: 'Keluar', icon: 'mdi-arrow-right-bold' },
      ],
      items: [
        { text: 'Management', icon: 'mdi-clock' },
        { text: 'Marketing', icon: 'mdi-account' },
        { text: 'Web Development', icon: 'mdi-flag' },
        { text: 'Otomotif', icon: 'mdi-clock' },
        { text: 'Hobi', icon: 'mdi-account' },
        { text: 'MultiMedia', icon: 'mdi-flag' },
        { text: 'Bahasa', icon: 'mdi-flag' },
        { text: 'Bisnis', icon: 'mdi-flag' },
        { text: 'Paket Belajar', icon: 'mdi-flag' },
        { text: 'Tentang Kami', icon: 'mdi-flag' },
      ]
    }
  },
  created() {
    this.$store.dispatch('user/getProfile');
  },
  mounted() {

    if (navigator != undefined && navigator.userAgent != undefined) {
      let user_agent = navigator.userAgent.toLowerCase();

      if (user_agent.indexOf('android') > -1) { // Is Android.
        this.deviceIsMobile = true
      }
      else if (user_agent.indexOf('ios') > -1) { // Is Ios.
        this.deviceIsMobile = true
      }
      else if (user_agent.indexOf('iphone') > -1) { // Is Ios.
        this.deviceIsMobile = true
      }
    }

  },
  methods: {
    logout() {
      alert("logout");
      this.$store.dispatch('auth/logout');
    },
    pindah_halaman(params, no) {
      // document.getElementsByClassName(".list-tables-menu").classList.remove("activelist");

      //document.getElementById("indexlist-"+no).classList.add("activelist");
      //alert("tes" + );
      //indexlist.classList.add("activelist");
      //alert(indexlist);
      // alert(no);
      //document.querySelector(".list-tables-menu").classList.remove("activelist");
      //document.querySelector("#indexlist_2").classList.add("activelist");
      //alert(this.showBottomNavs)
      if (this.showBottomNavs == false) {
        this.showBottomNavs = true
      }
      else {
        this.showBottomNavs = false
      }

      if (params !== null && params !== '') {
        console.log(no);
        // this.activePage = no;
        // this.$store.commit("member/setMemberPage", "list");
        // return "../../dashboard/"+params;
        this.$router.push({ name: params });
      }

    },
    expandNav() {
      if (this.showNavs == false) {
        this.showNavs = true
      }
      else {
        this.showNavs = false
      }
    },
    expandBottomNav() {
      if (this.showBottomNavs == false) {
        this.showBottomNavs = true
      }
      else {
        this.showBottomNavs = false
      }
    }
  },
}
</script>

<style>
.profileStyle {
  text-transform: inherit;
}

.navbar-head-bottom {
  width: 105%;
  background: #EEEEEE;
  margin-left: -10px;
  margin-top: 0;
  height: 60px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.v-input__icon i {
  margin-top: 15px;
  color: #777777 !important;
}

.padding-phone .v-input__slot {
  background-color: #0b2e30 !important;
  color: #FFFFFF !important;
  padding: 15px;
  height: 60px;
  margin-top: 30px;
}

.padding-phone .v-text-field__slot input {
  color: #CCCCCC !important;
}

.padding-phone .v-text-field__slot input::placeholder {
  color: #666666 !important;
}
</style>