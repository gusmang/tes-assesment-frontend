<template>
  <div>

    <v-card width="100%" tile v-if="deviceIsMobile == false">
      <v-navigation-drawer permanent width="100%" style="background:#61C7D1;">

        <v-list nav dense>
          <v-list-item-group v-model="selectedItem" id="list-sidebar-menu" color="primary">

            <!-- <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :class="i == 0 ? listitemsclassactive : listitemsclass"
                :id="indexlist+i"
                :to="pindah_halaman(item.to,i)"
              > -->

            <v-list-item v-for="(item, i) in items" :key="i" :class="listitemsclass" :id="indexlist + i"
              :to="pindah_halaman(item.to, i)">

              <v-list-item-icon style="font-size:24px!important; color:#FFFFFF;">
                <v-icon v-text="item.icon" class="iconlist"></v-icon>
              </v-list-item-icon>

              <v-list-item-content style="font-size:24px!important; color:#FFFFFF;">
                <v-list-item-title v-text="item.text"
                  style="font-size:15px!important; color:#FFFFFF;"></v-list-item-title>
              </v-list-item-content>

            </v-list-item>

          </v-list-item-group>
        </v-list>

      </v-navigation-drawer>

    </v-card>

    <v-card width="100%" tile style="margin-top:40px;  background:rgb(97, 199, 209);"
      v-if="deviceIsMobile == false && this.$store.state.member.member.memberlist.membership == 'instruktur'">

      <v-container>
        <h5 style="font-size:22px; text-align:left; color:#ffffff;"> Instruktur </h5>
      </v-container>

      <v-navigation-drawer permanent width="100%" style="background:#61C7D1;">

        <v-list nav dense>
          <v-list-item-group v-model="selectedItem" id="list-sidebar-menu" color="primary">

            <!-- <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :class="i == 0 ? listitemsclassactive : listitemsclass"
                :id="indexlist+i"
                :to="pindah_halaman(item.to,i)"
              > -->

            <v-list-item v-for="(item, i) in insitems" :key="i" :class="listitemsclass" :id="indexlistall + i"
              :to="pindah_halaman(item.to, i)">

              <v-list-item-icon style="font-size:24px!important; color:#FFFFFF;">
                <v-icon v-text="item.icon" class="iconlist"></v-icon>
              </v-list-item-icon>

              <v-list-item-content style="font-size:24px!important; color:#FFFFFF;">
                <v-list-item-title v-text="item.text"
                  style="font-size:15px!important; color:#FFFFFF;"></v-list-item-title>
              </v-list-item-content>

            </v-list-item>

          </v-list-item-group>
        </v-list>

      </v-navigation-drawer>

    </v-card>

  </div>
</template>

<script>
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
      deviceIsMobile: false,
      item: [],
      decimals: "10.00",
      listitemsclass: "list-tables-menu",
      listitemsclassactive: "list-tables-menu activelist",
      indexlist: "indexlist_",
      icons: "chevron-right",
      selectedItem: 0,
      items: [
        { text: 'Dashboard', icon: 'mdi-folder', to: "homepage" },
        { text: 'Profil', icon: 'mdi-account-multiple', to: "profile" },
        { text: 'Ganti Password', icon: 'mdi-key-variant', to: "ganti-password" },
        { text: 'Kursus Saya Ikuti', icon: 'mdi-school' },
        { text: 'Materi Kursus', icon: 'mdi-file' },
        { text: 'Transaksi', icon: 'mdi-repeat' },
        { text: 'Penjualan Kursus', icon: 'mdi-trending-up' },
        { text: 'Tarik Tunai', icon: 'mdi-basket-unfill' },
        { text: 'Sertifikat', icon: 'mdi-file-chart' },
        { text: 'Keluar', icon: 'mdi-arrow-right-bold' },
      ],
      insitems: [
        { text: 'Jual Kursus', icon: 'mdi-folder', to: "kursus-saya-ikuti" },
        { text: 'Kuis Kursus', icon: 'mdi-account-multiple', to: "profile" },
        { text: 'Penjualan', icon: 'mdi-key-variant', to: "ganti-password" },
        { text: 'Rekening Bank', icon: 'mdi-school', to: "kursus-saya-ikuti" },
        { text: 'Tarik Tunai', icon: 'mdi-file' },
        { text: 'Pengumuman', icon: 'mdi-repeat' }
      ],
      searchForm: {
        member: ''
        // tipe: 'ALL',
        // status: 'ALL',
        // sponsor: ''
      },
      formLock: {

      },
      activePage: 1,
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

    let segments = window.location.toString();
    segments = segments.replace("http://", "");
    segments = segments.replace("https://", "");

    let segmentakhir = segments.split("/");

    let lastSegment = segmentakhir[(segmentakhir.length) - 1];

    this.$store
      .dispatch("user/cekAkses", {
        segment: lastSegment,
        user: this.profiles.id,
      })
      .then(() => {
        if (this.$store.state.user.cekAkses <= 0) {
          //  window.location = "/";
          alert("Not Checked");
        }

      })
      .catch((res) => {
        //  window.location = "/";
        console.log(res);
      });

    let sidebars = new Object();
    let sidebarArray = new Array();

    let childSidebars = new Object();
    let childSidebarsArray = new Array();

    childSidebars.id = 4
    childSidebars.parent = 1
    childSidebars.module = "Transaksi"
    childSidebars.icon = "mdi-chart-line"
    childSidebars.active = false
    childSidebars.to = "chart-trx"
    childSidebars.counts = 0

    childSidebarsArray.push(childSidebars);

    sidebars.id = 99;
    sidebars.parent = 0;
    sidebars.module = "Dashboard"
    sidebars.icon = "mdi-view-dashboard"
    sidebars.active = false
    sidebars.to = "principale"
    sidebars.children = childSidebarsArray

    sidebarArray.push(sidebars);

    let sidebars2 = new Object();

    let childSidebars2 = new Object();
    let childSidebarsArray2 = new Array();

    childSidebars2.id = 3
    childSidebars2.parent = 1
    childSidebars2.module = "List"
    childSidebars2.icon = "mdi-format-list-bulleted-square"
    childSidebars2.active = false
    childSidebars2.to = "trx-member"
    childSidebars2.counts = 0

    childSidebarsArray2.push(childSidebars2);

    sidebars2.id = 1;
    sidebars2.parent = 0;
    sidebars2.module = "Transaksi"
    sidebars2.icon = "mdi-history"
    sidebars2.active = false
    sidebars2.to = ""
    sidebars2.children = childSidebarsArray2

    sidebars2.id = 1;
    sidebars2.parent = 0;
    sidebars2.module = "Transaksi"
    sidebars2.icon = "mdi-history"
    sidebars2.active = false
    sidebars2.to = "principale"
    sidebars2.children = childSidebarsArray2

    sidebarArray.push(sidebars2);

    let sidebars3 = new Object();

    let childSidebars3 = new Object();
    let childSidebarsArray3 = new Array();

    childSidebars3.id = 10
    childSidebars3.parent = 1
    childSidebars3.module = "List"
    childSidebars3.icon = "mdi-format-list-bulleted-square"
    childSidebars3.active = false
    childSidebars3.to = "trx-member"
    childSidebars3.counts = 0

    childSidebarsArray3.push(childSidebars3);

    let childSidebars4 = new Object();

    childSidebars4.id = 11
    childSidebars4.parent = 1
    childSidebars4.module = "Transaksi"
    childSidebars4.icon = "mdi-format-list-bulleted-square"
    childSidebars4.active = false
    childSidebars4.to = "trx-member"
    childSidebars4.counts = 0

    childSidebarsArray3.push(childSidebars4);

    sidebars3.id = 9;
    sidebars3.parent = 0;
    sidebars3.module = "Referral"
    sidebars3.icon = "mdi-account-group-outline"
    sidebars3.active = false
    sidebars3.to = ""
    sidebars3.children = childSidebarsArray3

    sidebarArray.push(sidebars3);

    this.$store.state.user.sidebar = sidebarArray
    //this.$store.commit("main/setLoading", false);
  },
  methods: {
    checkChild(value) {
      if (typeof value != "undefined") {
        return true;
      } else {
        return false;
      }
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

      if (params !== null && params !== '') {
        //console.log(params);
        this.activePage = no;
        this.$store.commit("member/setMemberPage", "list");
        return "../../dashboard/" + params;
      }

    },
    link_to(params) {
      //console.log(params);
      if (params !== null && params !== '') {
        //console.log(params);
        this.$store.commit("member/setMemberPage", "list");
        return "../../dashboard/" + params;
      }
    }
  },
};
</script>

<style type="text/css">
.barheight {
  height: 64px;
}

.active-group {
  background-color: #ffffff54;
}

.tile:hover {
  background-color: #ffffff30;
}

.v-list-group__items .v-list-item__icon {
  padding-left: 20px !important;
}

.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 12px !important;
}
</style>