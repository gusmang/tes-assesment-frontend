<template>
  <div>
    <v-app>
      <navbar />
      <v-main style="margin-top:150px; padding:0 0 150px 0;">
        <v-container style="margin-top:20px;">

          <v-row v-if="deviceIsMobile == false"
            style="align-items: center!important;  margin-bottom:30px; justify-content: center!important; align-content: center!important;">
            <v-col md="6">
              <v-row
                style="align-items: center!important; justify-content: center!important; align-content: center!important;">
                <v-col md="2">
                  <img v-bind:src="this.$store.state.member.member.memberlist.foto"
                    style="width:90px; height:90px; object-fit:contain; border-radius:50%; margin-right:10px;" />
                </v-col>
                <v-col md="9">
                  <div style="font-size:21px; font-weight:bold;"
                    v-html="this.$store.state.member.member.memberlist.nama"></div>
                </v-col>
              </v-row>

            </v-col>
            <v-col md="6" style="text-align:right;" @click="daftar_instruktur()">
              <div class="btn btn-outline-success rounded-pill"
                v-if="this.$store.state.member.member.memberlist.membership != 'instruktur'">Daftar Instruktur</div>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="3" cols="12">
              <sidebar />
            </v-col>
            <v-col md="9" cols="12">
              <router-view class="mt-5"></router-view>
            </v-col>
          </v-row>

        </v-container>
      </v-main>
      <footbar />
      <v-overlay :value="$store.state.main.loading">
        <lottie-animation path="loading.json" />
      </v-overlay>
    </v-app>
  </div>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import Sidebar from "./layout/sidebar.vue";
import Navbar from "./layout/navbar.vue";
import Footbar from "./layout/footbar.vue";

export default {
  data() {
    return {
      item: [],
      profiles: "",
      deviceIsMobile: false,
    }
  },
  methods: {
    daftar_instruktur() {
      this.$router.push({ name: "Profile_Add_Instruktur" });
      // alert("tes");
      // window.location = "/#/dashboard/add-instruktur";
    },
    fetchProfiles() {

      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';

      //alert("limits "+this.pagination.itemsPerPage);

      this.$store
        .dispatch("member/fetchProfiles", {
          page: 1,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = '';
          //this.item = this.$store.state.member.member.memberlist
          //this.profiles = this.$store.state.member.member.memberlist;
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res);
          this.loading = false;
          this.loadingtext = '';
        });

    },
  },
  components: {
    LottieAnimation,
    Sidebar,
    Navbar,
    Footbar
  },
  mounted() {
    //alert(process.env.VUE_APP_API_URL_DEV);
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
    this.fetchProfiles()
    //console.log("profiles-id" , this.$store.state.auth.profile);
  },
};
</script>

<style>
.v-text-field--filled>.v-input__control>.v-input__slot,
.v-text-field--full-width>.v-input__control>.v-input__slot,
.v-text-field--outlined>.v-input__control>.v-input__slot {
  min-height: 46px !important;
}

.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding: 5px !important;
}

.v-text-field--outlined>.v-input__control>.v-input__slot {
  min-height: 40px !important;
}

.v-select__slot {
  height: 40px !important;
  padding: 0 !important;
}

.v-select__slot .v-input__icon {
  height: 4px !important;
}

.v-select__slot .v-label {
  top: 10px !important;
}

.v-application .inti {
  background-color: rgb(25, 135, 84) !important;
  border-color: rgb(25, 135, 84) !important;
}

.v-list-item {
  height: 40px !important;
}

.v-list-item__icon {
  margin: 4px 0 !important;
}

.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}



@media (min-width:961px) {

  .v-main {
    margin-top: 150px !important;
  }

  h2 {
    font-size: 32px !important;
  }

  h5 {
    font-size: 18px !important;
  }

}

@media (max-width:641px) {

  .v-main {
    margin-top: -20px !important;
  }

  h2 {
    font-size: 16px !important;
  }

  h5 {
    font-size: 14px !important;
  }

}
</style>