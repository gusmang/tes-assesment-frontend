<template>
  <div>
    <!-- <v-btn color="success" @click="fetch">Detail Member</v-btn> -->
    <p></p>

    

<CustomCard>

<template v-slot:toolbar>

    <v-btn color="success" small outlined @click="showList()">
        <v-icon>mdi-chevron-left</v-icon>
        Back 
    </v-btn>


</template>




<template v-slot:datatable>

<template>
    <v-container>
         
        <v-row
            no-gutters>

            <v-col
                sm="12"
                md="12">

                <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>
                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                md="3"
                                tile>
                                    Name 
                                </v-col>

                                <v-col
                                class="pa-2"
                                outlined
                                md="1"
                                tile>
                                    : 
                                </v-col>

                                <v-col
                                class="pa-2"
                                md="8"
                                outlined
                                tile>
                                {{ detailsEmoney.member.name }}
                                </v-col>
                        </v-row>
                </v-col>
            </v-col>

             <v-col
                sm="12"
                md="12">

                <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>
                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                md="3"
                                tile>
                                    Email 
                                </v-col>

                                <v-col
                                class="pa-2"
                                outlined
                                md="1"
                                tile>
                                    : 
                                </v-col>

                                <v-col
                                class="pa-2"
                                md="8"
                                outlined
                                tile>
                                {{ detailsEmoney.member.email }}
                                </v-col>
                        </v-row>
                </v-col>
            </v-col>

              <v-col
                sm="12"
                md="12">

                <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>
                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                md="3"
                                tile>
                                    Phone 
                                </v-col>

                                <v-col
                                class="pa-2"
                                outlined
                                md="1"
                                tile>
                                    : 
                                </v-col>

                                <v-col
                                class="pa-2"
                                md="8"
                                outlined
                                tile>
                                {{ detailsEmoney.member.phone }}
                                </v-col>
                        </v-row>
                </v-col>
            </v-col>

             <v-col
                sm="12"
                md="12">

                <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>
                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                md="3"
                                tile>
                                    E-Money Tipe 
                                </v-col>

                                <v-col
                                class="pa-2"
                                outlined
                                md="1"
                                tile>
                                    : 
                                </v-col>

                                <v-col
                                class="pa-2"
                                md="8"
                                outlined
                                tile>
                                {{ detailsEmoney.emoney_tipe }}
                                </v-col>
                        </v-row>
                </v-col>
            </v-col>

             <v-col
                sm="12"
                md="12">

                <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>
                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                md="3"
                                tile>
                                    E-Money Number 
                                </v-col>

                                <v-col
                                class="pa-2"
                                outlined
                                md="1"
                                tile>
                                    : 
                                </v-col>

                                <v-col
                                class="pa-2"
                                md="8"
                                outlined
                                tile>
                                {{ detailsEmoney.emoney_number }}
                                </v-col>
                        </v-row>
                </v-col>
            </v-col>

             <v-col
                sm="12"
                md="12">

                <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>
                            <v-col
                            class="pa-2 font-weight-bold"
                            outlined
                            md="3"
                            tile>
                                E-Money Image 
                            </v-col>

                            <v-col
                            class="pa-2"
                            outlined
                            md="1"
                            tile>
                                : 
                            </v-col>

                            <v-col
                            class="pa-2"
                            md="8"
                            outlined
                            tile>
                                <v-dialog
                                v-model="dialog"
                                width="500"
                                >
                                <template v-slot:activator="{ on, attrs }">

                                    <img v-bind:src="detailsEmoney.path_img" style="width:80px; height:120px;"  v-bind="attrs"
                                    v-on="on" />
                                    <!-- </v-btn> -->
                                </template>

                                <v-card>
                                    <v-card-title class="text-h5 primary-colors text-light" style="color:#FFF;">
                                        E-Money Image
                                    </v-card-title>

                                    <v-card-text style="margin-top:20px;">
                                       <img v-bind:src="detailsEmoney.path_img" style="width:100%;" />
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                    <v-spacer></v-spacer>

                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                                </v-col>
                        </v-row>
                </v-col>
            </v-col>

            <v-col
                sm="12"
                md="12">

                <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>
                            
                            <v-textarea
                                outlined
                                label="Notes"
                                v-model="formLock.notes"
                                >
                            </v-textarea>

                        </v-row>
                </v-col>
            </v-col>

            <v-container>

                <div style="float:right; margin-left:10px;">
                    <v-btn
                        small
                        color="success"
                        @click="editVerification(1)"
                        >
                        <v-icon small>mdi-check</v-icon> Approve
                    </v-btn>
                </div>

                <div style="float:right;">
                    <v-btn
                        color="danger" small  
                        @click="editVerification(0)"
                        >
                        <v-icon small >mdi-delete </v-icon>  Reject
                    </v-btn>
                </div>

            </v-container>

    </v-row>

</v-container>


</template>

</template>

</CustomCard>

  </div>
</template>

<script>
import CustomCard from "../../../../components/CustomCard.vue";



export default {
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      panel: null,
      currentPage:1,
      decimals:"10.00",
      icons:"chevron-right",
      dis_kab:true,
      dis_kec:true,
      dis_kel:true,
      curr_dis_kab:true,
      curr_dis_kec:true,
      curr_dis_kel:true,
      curr_dis_prov:true,
      profiles:this.$store.state.auth.profile,
      provinsiList:[],
      kabupatenList:[],
      kecamatanList:[],
      kelurahanList:[],
      IndexKel:"",
      bankList:[],
      detailsEmoney:this.$store.state.member.member.DetailEmoney,
      editAct:this.$store.state.member.member.formStates,
      tipe: [],
      menu: null,
      form: {},
      searchForm: {
        member: ''
        // tipe: 'ALL',
        // status: 'ALL',
        // sponsor: ''
      },
      pagination: {},
      formLock:{
        notes:""
      },
      headers: [
        { text: "Name", value: "name"},
        { text: "Email", value: "new_email" },
        { text: "Phone", value: "phone"},
        { text: "Reg Date", value: "verified_date"},
        { text: "E-Ver", value: "em_verified"},
        { text: "M-Ver", value: "verified"},
        { text: "Action", align: "center", value: "action"},
      ],
      gender: [
            { text: "All Gender", value: "" },
            { text: "Laki-Laki", value: "Laki-Laki" },
            { text: "Perempuan", value: "Perempuan" },
            // { text: "Gagal", value: "2" },
      ],
      religion: [
            { text: "All Religion", value: "" },
            { text: "Hindu", value: "Hindu" },
            { text: "Katolik", value: "Katolik" },
            { text: "Kristen", value: "Kristen" },
            { text: "Buddha", value: "Buddha" },
            { text: "Islam", value: "Islam" },
            { text: "Konghucu", value: "Konghucu" }
            // { text: "Gagal", value: "2" },
      ],
      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
    fetchProv(params){
        this.$store
            .dispatch("wilayah/fetchWilayah", {
                find: params,
            })
            .then(() => {
                this.provinsiList = this.$store.state.wilayah.wilayah.list;
            })
            .catch((res) => {
                console.log("prov" , res.response.data.message);
            });
    },
    getIndexKel(index){
        alert("index = "+index)
    },
    fetchBank(params){
        this.$store
            .dispatch("bank/fetchBank", {
                find: params,
            })
            .then(() => {
                this.bankList = this.$store.state.bank.bank.listBank;
            })
            .catch((res) => {
                console.log("prov" , res.response.data.message);
            });
    },
    fetch() {
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';
      this.$store.commit("main/setLoading", true);
      this.$store
        .dispatch("member/fetchListMemberDetail", {
            id_member:this.$store.state.member.member.detail,
        })
        .then(() => {
          //alert("tes-dd");
          console.log("itemsfetch",this.$store.state.member.member.listDetail[0]);
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = '';
          this.detailsMember = this.$store.state.member.member.listDetail[0];
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    filterToggle() {
      if (this.panel == null)
        this.panel = [...Array(this.items).keys()].map((k, i) => i);
      else this.panel = null;
    },
    showDetail(item) {
      this.$store.commit("member/setMemberPageEmoney", "detail");
      this.$store.commit("member/setMemberDetail", item);
      
      //this.detailsName = "New Member";
    },
    showList() {
      this.$store.commit("member/setMemberPageEmoney", "list");
      this.$store.state.member.member.is_back = 1;
    //   this.$store.commit("transaction/setMemberDetail", item);
    },
    showEdit(){
        //this.editAct = "form";
        // this.$store.state.member.member.formStates = true;
        // alert(this.$store.state.member.member.formStates);s
        this.searchForm.editNik = this.detailsMember.nik;
        this.searchForm.editId = this.detailsMember.id;
        this.searchForm.editProvinsi = this.detailsMember.provinsi;
        this.searchForm.editKabupaten = this.detailsMember.kabupaten;
        this.searchForm.editKecamatan = this.detailsMember.kecamatan; 
        this.searchForm.editKelurahan = this.detailsMember.kelurahan;

        this.searchForm.editBirthPlace = this.detailsMember.birth_place
        this.searchForm.editReligion = this.detailsMember.religion
        this.searchForm.date_of_birth = this.detailsMember.date_of_birth;
        this.searchForm.editGender = this.detailsMember.gender; 
        this.searchForm.editAddress = this.detailsMember.address;
        this.searchForm.editKodePos = this.detailsMember.kode_post;
        this.searchForm.editBankName = this.detailsMember.bank_id;
        this.searchForm.editBankAccNo = this.detailsMember.bank_acc_number;
        this.searchForm.editBankAccHolder = this.detailsMember.bank_acc_holder;
        this.searchForm.editCurrProvinsi = this.detailsMember.current_provinsi;
        this.searchForm.editCurrKecamatan = this.detailsMember.current_kecamatan;
        this.searchForm.editCurrKelurahan = this.detailsMember.current_kelurahan;
        this.searchForm.editBankCurrentAddress = this.detailsMember.current_address;

        if(this.detailsMember.provinsi != ""){
            this.getWilayah("kabupaten");
        }

        if(this.detailsMember.kabupaten != ""){
            this.getWilayah("kecamatan");
        }

        if(this.detailsMember.kecamatan != ""){
            this.getWilayah("kelurahan");
        }

        this.$store.commit("member/setFormSwitch", true);
    },
    showListMember(){
        this.$store.commit("member/setFormSwitch", false);
    },
    editVerification: function(code){
     this.$store.commit("main/setLoading", true);
      this.$store
        .dispatch("member/editMemberVerifEmoney", {
            updateId: this.profiles.id,
            code: code,
            id: this.detailsEmoney.id,
            note: this.formLock.notes
        })
        .then(() => {
            this.$store.commit("main/setLoading", false);
            this.$store.commit("main/setSnackbarSuccess", "Update Data Member Successfull");
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    getWilayah(value) {

        if(value == "kabupaten"){
            this.dis_kab = false;
        }

        if(value == "kecamatan"){
            this.dis_kec = false;
        }

        if(value == "kelurahan"){
            this.dis_kel = false;
        }

        this.$store
        .dispatch("wilayah/fetchAreaWilayah", {
            find: value,
            provinsi: this.searchForm.editProvinsi,
            kabupaten: this.searchForm.editKabupaten,
            kecamatan: this.searchForm.editKecamatan
        })
        .then(() => {
            if(value == "kabupaten"){
                this.kabupatenList =  this.$store.state.wilayah.wilayah.listKabupaten;
                this.dis_kab = false;
                //alert("fetched");
            }

            if(value == "kecamatan"){
                this.kecamatanList =  this.$store.state.wilayah.wilayah.listKecamatan;
                this.dis_kec = false;
                //alert("fetched");
            }

            if(value == "kelurahan"){
                this.kelurahanList =  this.$store.state.wilayah.wilayah.listKelurahan;
                this.dis_kel = false;
                //alert("fetched");
            }

        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    editProfiles: function(dialog){
      this.$store
        .dispatch("member/editProfiles", {
            userId: this.formLock.userId,
            edit_name: this.formLock.edit_name,
            edit_email: this.formLock.edit_email,
            updateId: this.profiles.id,
            edit_phone:this.formLock.edit_phone
        })
        .then(() => {
        //   this.$store.commit("main/setLoading", false);
        //   this.loading = false;
        //   this.loadingtext = '';
            this.fetch();
            dialog.value = false;
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    userUnverify: function(dialog){
      this.$store
        .dispatch("member/userUnverify", {
            userId: this.formLock.userId,
            updateId: this.profiles.id,
        })
        .then(() => {
        //   this.$store.commit("main/setLoading", false);
        //   this.loading = false;
        //   this.loadingtext = '';
            this.fetch();
            dialog.value = false;
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    userSuspend: function(dialog){
      this.$store
        .dispatch("member/userSuspend", {
            userId: this.formLock.userId,
            updateId: this.profiles.id,
            suspend_reason:this.formLock.suspend_reason
        })
        .then(() => {
        //   this.$store.commit("main/setLoading", false);
        //   this.loading = false;
        //   this.loadingtext = '';
            this.formLock.suspend_reason = "";
            this.fetch();
            dialog.value = false;
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    userUnSuspend: function(dialog){
      this.$store
        .dispatch("member/userUnSuspend", {
            userId: this.formLock.userId,
            updateId: this.profiles.id,
            suspend_reason:this.formLock.suspend_reason
        })
        .then(() => {
        //   this.$store.commit("main/setLoading", false);
        //   this.loading = false;
        //   this.loadingtext = '';
            this.fetch();
            this.formLock.suspend_reason = "";
            dialog.value = false;
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    showLock:function(userId,member_name,member_email,member_phone){
      this.formLock.userId     = userId
      this.formLock.edit_name  = member_name
      this.formLock.edit_email = member_email
      this.formLock.edit_phone = member_phone
    },
    showDetailId:function(userId){
        this.formLock.userId     = userId
    },
    showExpand: function (element,index){
        const detailElement = document.getElementById(index);
        if(detailElement.classList.contains('hidden')){
            element.target.classList.remove("mdi-chevron-right");
            element.target.classList.add("mdi-chevron-down");
            detailElement.classList.remove("hidden");
            //this.icons = "chevron-down";
        }
        else{
            element.target.classList.add("mdi-chevron-right");
            element.target.classList.remove("mdi-chevron-down");
            detailElement.classList.add("hidden");
            //this.icons = "chevron-right";
        }   
    },
  },
  mounted() {
    //console.log("tes " , this.detailsEmoney);
    this.$store.commit("member/setFormSwitch", false);
    this.fetch();
  },
//   watch: {
//     pagination() {
//         this.loading = true
//         this.loadingtext = 'Loading... Please wait'
//         this.fetch()
//     },
//     searchSponsor(val) {
//         val && val !== this.searchForm.sponsor && this.getSponsor(val);
//     },
//     searchMember(val) {
//         val && val !== this.searchForm.member && this.getMember(val);
//     }
//   },
  
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
  components: { CustomCard },
};
</script>
