<template>
  <div>
    <!-- <v-btn color="success" @click="fetch">Add New MemberS New Baru</v-btn> -->
    <CustomCard>

        <template v-slot:toolbar>
            <v-btn color="success" small outlined @click="filterToggle">
            filter <v-icon>mdi-chevron-down</v-icon>
            </v-btn>

            <!-- <v-btn color="success" small outlined style="margin-left:20px;">
            Export By Filter <v-icon>mdi-download</v-icon> -->
                <!-- <download-excel 
                :data="$store.state.member.member.listAll" 
                worksheet="My Worksheet"
                name="filename.xls">
                    Export By Filter <v-icon>mdi-download</v-icon>
                </download-excel> -->
                    <!-- <downloadexcel
                        :fetch           = "fetchAll"
                        :fields          = "json_fields"
                        :before-generate = "startDownload"
                        :before-finish   = "finishDownload">
                        Export By Filter <v-icon>mdi-download</v-icon>
                    </downloadexcel> 
            </v-btn> -->

        </template>

        <template v-slot:expansion>
            <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel expand focusable>
                <v-expansion-panel-content>
                    
                <v-layout>

                        <v-flex>
                            <v-text-field
                                v-model="searchForm.member"
                                label="Search By Name Or Email "
                                single-line
                                small
                                clearable
                                @keyup.13="fetch(1)"
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex>
                            <v-autocomplete
                                v-model="searchForm.gender"
                                :items="jenis_kelamin"
                                item-text="text"
                                item-value="value"
                                label="Gender"
                            >
                            </v-autocomplete>
                        </v-flex>

                        <v-flex>
                            <v-autocomplete
                                v-model="searchForm.bank_name"
                                :items="bankList"
                                item-text="bank_name"
                                item-value="bank_id"
                                label="Bank Name"
                            >
                            </v-autocomplete>
                        </v-flex>

                </v-layout>

                <v-layout>

                        <v-flex>
                            <v-text-field
                                v-model="searchForm.bank_acc_holder"
                                label="Bank Acc Holder"
                                single-line
                                small
                                clearable
                                @keyup.13="fetch(1)"
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex>
                            <v-text-field
                                v-model="searchForm.bank_acc_number"
                                label="Bank Acc Number"
                                single-line
                                small
                                clearable
                                @keyup.13="fetch(1)"
                            >
                            </v-text-field>
                        </v-flex>

                </v-layout>

                <v-layout>

                        <v-flex>
                            <v-autocomplete
                                v-model="searchForm.bank_status"
                                :items="status_verifikasi"
                                item-text="text"
                                item-value="value"
                                label="Status">
                            </v-autocomplete>
                        </v-flex>

                        <v-flex>

                                <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                clearable
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="searchForm.date"
                                        label="Tanggal"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        clearable
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="searchForm.date"
                                no-title
                                scrollable
                                clearable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu.save(date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>

                        </v-flex>
                </v-layout>

               
                <v-layout align-end justify-end>
                    <v-spacer></v-spacer>
                    <v-btn
                    small
                    depressed
                    color="success"
                    class="m0"
                    @click="fetch(1)"
                    >
                    <v-icon>mdi-magnify</v-icon> Search
                    </v-btn>
                </v-layout>
                </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>
        </template>

        <template v-slot:datatable>
            <v-flex md12 style="overflow-x: scroll">
            <v-data-table
                :headers="headers"
                :items="$store.state.member.member.listVerify"
                :options.sync="pagination"
                :server-items-length="$store.state.member.member.totalVerify"
                :footer-props="{
                'items-per-page-options': [10, 25, 50, 100],
                'items-per-page-text': 'Baris per Halaman:',
                }"
                :items-per-page="10"
                :loading="loading"
                :loading-text="loadingtext"
            >

            <template v-slot:[`item.name`]="{ item }">
                    <div> <b> {{ item.name }} </b> <br /> <div>  {{ item.gender }} </div> </div>
                    
            </template>

            <template v-slot:[`item.trxCount`]="{ item }">
                    <div>  <b> {{ item.trxCount }} </b> <br /> </div>
                    <div> <small> TRX </small> </div>
            </template>

            <template v-slot:[`item.real_gramasi`]="{ item }">
                    <div>  <small> {{ item.real_gramasi }} </small>  </div>
            </template>

            <template v-slot:[`item.bank_account`]="{ item }">
                    <div> <small> {{ item.bank_name }} </small> </div>
                    <div> <small> <b> {{ item.bank_acc_holder }} </b> </small> </div>
                    <div> <small> {{ item.bank_acc_number }} </small> </div>
            </template>

            <template v-slot:[`item.status_verified`]="{ item }">
                    <div v-if="item.status_verified == -2">
                        <span style="color:red;">Verifikasi Ditolak</span>
                        <br/><small>{{ item.created_at }}</small>	
                    </div>
                    <div v-if="item.status_verified == 1">
                        <span class="text-info" style="color:green;">Terverifikasi</span>
                        <br/><small>{{ item.created_at }}</small>	
                    </div>
                    <div v-if="item.status_verified == 0">
                        <span class="text-info">Request Verifikasi</span>
                        <br/><small>{{ item.created_at }}</small>	
                    </div>
            </template>

            

                <template v-slot:[`item.action`]="{ item }">
                    
                <!-- <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="info"
                        icon
                        @click="showDetail(item)"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon small>mdi-lock</v-icon>
                    </v-btn>
                    </template>
                    <span>Lock</span>
                </v-tooltip> -->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="success"
                        icon
                        @click="showDetail(item)"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon small>mdi-eye</v-icon>
                    </v-btn>
                    </template>
                    <span>Detail</span>
                </v-tooltip>
                <!-- <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="error"
                        icon
                        @click="cancelTrx(item)"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon small>mdi-block-helper</v-icon>
                    </v-btn>
                    </template>
                    <span>Cancel</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn color="success" icon v-bind="attrs" v-on="on">
                        <v-icon small>mdi-thumb-up-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Success</span>
                </v-tooltip> -->
                </template>
                <template v-slot:[`item.email`]="{ item }">
                <div v-if="item.type_code == 1 || item.type_code == 10">
                    {{ item.receiver_email }}
                </div>
                <div v-else>
                    {{ item.sender_email }}
                </div>
                </template>
            </v-data-table>
            </v-flex>
        </template>
    </CustomCard>

  </div>
</template>

<script>
import CustomCard from "../../../../components/CustomCard.vue";
//import downloadexcel from "vue-json-excel";


  
export default {
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      panel: null,
      profiles:this.$store.state.auth.profile,
      bankList:[],
      currentPage:1,
      decimals:"10.00",
      icons:"chevron-right",
      jenis_kelamin:[
        { text: "All", value: "" },
        { text: "Laki - Laki", value: "Laki-Laki" },
        { text: "Perempuan", value: "Perempuan" },
      ],
      status_verifikasi:[
        { text: "All", value: "all" },
        { text: "Request Verifikasi", value: "0" },
        { text: "Terverifikasi", value: "1" },
        { text: "Ditolak", value: "-2" }
      ],
      status: [
            { text: "All Status", value: "" },
            { text: "Email Verified", value: "email_verified" },
            { text: "Email Not Verified", value: "email_not_verified" },
            { text: "User Verified", value: "user_verified" },
            { text: "User Not Verified", value: "user_not_verified" },
            { text: "User Suspend", value: "user_suspend" }
            // { text: "Gagal", value: "2" },
      ],
      json_fields: {
        'Id': 'id',
        'Name': 'name',
        'Email': 'email',
      },
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
      bulan: [
        { text: "Januari", value: "01" },
        { text: "Februari", value: "02" },
        { text: "Maret", value: "03" },
        { text: "April", value: "04" },
        { text: "Mei", value: "05" },
        { text: "Juni", value: "06" },
        { text: "Juli", value: "07" },
        { text: "Agustus", value: "08" },
        { text: "September", value: "09" },
        { text: "Oktober", value: "10" },
        { text: "November", value: "11" },
        { text: "Desember", value: "12" },
        // { text: "Gagal", value: "2" },
      ],
      searchForm: {
        member: ''
        // tipe: 'ALL',
        // status: 'ALL',
        // sponsor: ''
      },
      formLock:{

      },
      tipe: [],
      menu: null,
      form: {},
      pagination: {},
      headers: [
        { text: "Member", value: "name"},
        { text: "Bank Account", align: "left", value: "bank_account" },
        { text: "Trx Count", align: "center", value: "trxCount"},
        { text: "Balance (gr)", align: "center" , value: "real_gramasi"},
        { text: "Status", value: "status_verified"},
        { text: "Updt By", align: "center", value: "tukangupdate"},
        { text: "Action", align: "center", value: "action"},
      ],
      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
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
    fetchAll() {
    //   if(cari == 1){
    //       this.pagination.page = 1;
    //   }
    //   this.loading = true;
    //   this.loadingtext = 'Loading... Please wait';
    //   this.$store.commit("main/setLoading", true);
      this.$store
        .dispatch("member/fetchListMemberAll", {
            page: this.pagination.page,
            name:this.searchForm.member,
            // religion:this.searchForm.religion,
            // status_verified:this.searchForm.status_verified,
            // provinsi:this.searchForm.provinsiList,
            // gender:this.searchForm.gender,
            // date:this.searchForm.date,
            // date2:this.searchForm.date2,
            // monthDate:this.searchForm.monthDate
        })
        .then((res) => {
        //   this.$store.commit("main/setLoading", false);
        //   this.loading = false;
        //   this.loadingtext = '';
              console.log("tesData" , res);
              return res;
        })
        .catch((res) => {
           console.log("fetchdata" , res.response.data.message);
        //   this.$store.commit("main/setLoading", false);
        //   this.$store.commit("main/setSnackbarFail", res.response.data.message);
        //   this.loading = false;
        //   this.loadingtext = '';
        });
    },
    startDownload(){
        alert('show loading');
    },
    finishDownload(){
        alert('hide loading');
    },
    fetch(cari) {
      if(cari == 1){
          this.pagination.page = 1;
      }
      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';

      //alert("limits "+this.pagination.itemsPerPage);
      
      this.$store
        .dispatch("member/fetchListMemberReqVerify", {
            page: this.pagination.page,
            itemsPerPage: this.pagination.itemsPerPage,
            name:this.searchForm.member,
            gender:this.searchForm.gender,
            bankname:this.searchForm.bank_name,
            bank_acc_holder:this.searchForm.bank_acc_holder,
            bank_acc_number:this.searchForm.bank_acc_number,
            statusverify:this.searchForm.bank_status,
            // provinsi:this.searchForm.provinsiList,
            // gender:this.searchForm.gender,
            date:this.searchForm.date,
            // date2:this.searchForm.date2,
            // monthDate:this.searchForm.monthDate
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
    filterToggle() {
      if (this.panel == null)
        this.panel = [...Array(this.items).keys()].map((k, i) => i);
      else this.panel = null;
    },
    showDetail(item) {
        //this.$store.commit("main/setLoading", false);
        //this.$store.commit("main/setSnackbarFail", res.response.data.message);
        this.$store.state.member.member.paging_page = this.pagination.page;
        this.$store.commit("member/setMemberPageReqVer", "detail");
        this.$store.commit("member/setMemberListDetailVerify", item.id);
        this.loading = false;
        this.loadingtext = '';
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
    showLock:function(userId,real_gramasi,lock_user,lock_dinaran){
      this.formLock.userId = userId
      this.formLock.last_balance = real_gramasi
      this.formLock.lock_user = lock_user
      this.formLock.lock_dinaran = lock_dinaran
    },
    submitLock: function(dialog){
    //this.$store.commit("main/setLoading", true);
      this.$store
        .dispatch("member/postLockGold", {
            userId: this.formLock.userId,
            lockdinaran: this.formLock.lock_dinaran,
            lockuser: this.formLock.lock_user,
            updateId:this.profiles.id,
            page:this.pagination.page
        })
        .then(() => {
        //   this.$store.commit("main/setLoading", false);
        //   this.loading = false;
        //   this.loadingtext = '';
          
          this.fetch(0);
          
          
          dialog.value = false;
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
  },
  mounted() {
    this.fetchBank("bank");
    //this.fetchTotal("");
    this.$store.commit("member/setMemberPageReqVer", "list");
  },
  watch: {
    pagination() {
        //alert(this.$store.state.member.member.is_back);
        if(this.$store.state.member.member.is_back != 1){
            this.loading = true
            this.loadingtext = 'Loading... Please wait'
            // alert("tes");
            //console.log("user_con" , "nils "+this.profiles.id);
            //alert("tes");
            this.fetch(0)
        }

        if(this.$store.state.member.member.is_back == 1){
            this.pagination.page = this.$store.state.member.member.paging_page;
        }

        this.$store.state.member.member.is_back = 0;
    },
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
  components: { CustomCard },
};
</script>

<style>
</style>