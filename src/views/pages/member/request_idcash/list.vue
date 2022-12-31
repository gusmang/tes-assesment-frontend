<template>
    <div>
        <!-- <v-btn color="success" @click="fetch">Add New MemberS New Baru</v-btn> -->
    
    <CustomCard>
    
        <template v-slot:toolbar>
    
            <div style="width:100%;">
            
                <v-btn color="success" small outlined @click="filterToggle" style="float:left;">
                filter <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
    
    
            </div>
    
            <!-- <v-dialog persistent
                v-model="sendlockdialog"
                transition="dialog-transition">
                <v-card>
                <v-card-title primary-title>
                    Add a comment
                </v-card-title>
                <v-card-text>
                    <v-flex xs12 sm6 md4>
                    <v-text-field label="Legal first name*" required></v-text-field>
                    </v-flex>
                </v-card-text>
                </v-card>
            </v-dialog> -->
    
    
            <v-dialog
                transition="dialog-top-transition"
                max-width="600"
                v-model="approvelockdialog">
                        <!-- <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="warning"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                v-bind:class="item.verified == false ? '' : 'hidden'">
                                <v-icon small color="green">mdi-check</v-icon>
                            </v-btn>
                        </template> -->
                        <!-- <span>Unverified User</span> -->
                        <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="success"
                            dark
                            >Approve Verifikasi</v-toolbar>
    
                            <v-container>
    
                                <v-layout>
                                    <v-flex>
                                        Yakin akan approve verifikasi IDCash akun ini ?
                                    </v-flex>
                                </v-layout>
                                
                            </v-container>
    
                            <v-card-actions class="justify-end">
                            <v-btn
                                text
                                @click="dialog.value = false"
                            >Close</v-btn>
                            <v-btn
                                color="success"
                                @click="editVerification(sendlockdialog , selectedId , 1)"
                            >Submit</v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
            </v-dialog>
    
            <v-dialog
            transition="dialog-transition"
            max-width="600"
            v-model="sendlockdialog">

                <template>
                    <v-card>
                        <v-toolbar
                        color="success"
                        dark
                        >Add New IdCash Card</v-toolbar>

                        <v-container>

                            <v-layout>
                                
                                <v-flex>
                                   <small> Name <v-icon>mdi-chevron-right</v-icon> {{ selectedName }} </small> 
                                </v-flex>

                                <v-flex>
                                    <small> Email <v-icon>mdi-chevron-right</v-icon> {{ selectedEmail }} </small>
                                </v-flex>

                            </v-layout>

                            <v-layout>
                                <v-flex>
                                    <v-text-field
                                        v-model="searchForm.cardnumber"
                                        label="Card Number"
                                        clearable>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout>
                                <v-textarea
                                v-model="searchForm.noteslock"
                                outlined
                                label="Notes"
                                ></v-textarea>
                            </v-layout>
                            
                        </v-container>

                        <v-card-actions class="justify-end">
                        <v-btn
                            text
                            @click="sendlockdialog = false"
                        >Close</v-btn>
                        <v-btn
                            color="success"
                            @click="userLock()"
                        >Submit</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>

            </v-dialog>
    
            <v-dialog
                transition="dialog-top-transition"
                max-width="600"
                v-model="rejectlockdialog">
                        <!-- <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="red"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                v-bind:class="item.verified == true && (item.locked == 0 && item.activated == 0) || item.verified == false ? '' : 'hidden'">
                                <v-icon small color="red">mdi-delete</v-icon>
                            </v-btn>
                        </template> -->
                        <!-- <span>Unverified User</span> -->
                <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="red"
                            dark
                            >Reject</v-toolbar>
    
                            <v-container>
    
                                <v-layout>
                                    <v-flex>
                                        Yakin anda akan melakukan reject untuk user ini ?
                                    </v-flex>
                                </v-layout>
                                
                            </v-container>
    
                            <v-card-actions class="justify-end">
                            <v-btn
                                text
                                @click="dialog.value = false"
                            >Close</v-btn>
                            <v-btn
                                color="red"
                                style="color:white;"
                                @click="editVerification(sendlockdialog , selectedId , 0)"
                            >Submit</v-btn>
                            </v-card-actions>
                        </v-card>
                </template>
            </v-dialog>
    
        </template>
    
            <template v-slot:expansion>
                <v-expansion-panels v-model="panel" multiple>
                <v-expansion-panel expand focusable>
                    <v-expansion-panel-content>
                        
                        <v-layout>

                            <v-flex>
                                <v-text-field
                                    v-model="searchForm.member"
                                    label="Search By Name"
                                    small
                                    clearable
                                >
                                </v-text-field>
                            </v-flex>

                            <v-flex>
                                <v-text-field
                                    v-model="searchForm.email"
                                    label="Search By Email "
                                    small
                                    clearable
                                >
                                </v-text-field>
                            </v-flex>

                            <v-flex>
                                <v-text-field
                                    v-model="searchForm.phone"
                                    label="Search By Phone"
                                    small
                                    clearable
                                >
                                </v-text-field>
                            </v-flex>

                        </v-layout>


                    </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>
            </template>
    
            <template v-slot:datatable>
                <v-flex md12 style="overflow-x: scroll">
                <v-data-table
                    :headers="headers"
                    :items="$store.state.member.member.listReqIdCash"
                    :options.sync="pagination"
                    :server-items-length="$store.state.member.member.total"
                    :footer-props="{
                    'items-per-page-options': [10, 25, 50, 100],
                    'items-per-page-text': 'Baris per Halaman:',
                    }"
                    :items-per-page="10"
                    :loading="loading"
                    :loading-text="loadingtext">
    
                <template v-slot:[`item.members`]="{ item }">
                    <div>  <small> <b>Name <v-icon small>mdi-chevron-right</v-icon> </b>{{ item.user.name }}  </small> </div>
                    <div style="margin-top:-5px;"> <small><b>Email  <v-icon small>mdi-chevron-right</v-icon>  </b>  {{ item.user.email }}</small> </div>
                    <div style="margin-top:-5px;"> <small><b>Phone <v-icon small>mdi-chevron-right</v-icon> </b> {{ item.user.phone }}</small> </div>
                </template>

                <template v-slot:[`item.status_ver`]="{ item }">

                    <div style="text-align:center;">

                        <div v-if="item.approved == -1" style="color:red;"> 
                            <v-icon small color="red">mdi-block-helper</v-icon> 
                            <div style="margin-top:-5px;"> <small> Not Verified </small> </div>
                        </div>

                        <div v-if="item.approved == 1" style="color:green;"> 
                            <v-icon small color="green">mdi-check</v-icon> 
                            <div style="margin-top:-5px;"> <small>  Verified </small> </div>
                        </div>

                        <div v-if="item.approved != 1 && item.approved != -1" style="color:blue;"> 
                            <v-icon small color="green">mdi-block-helper</v-icon> 
                            <div style="margin-top:-5px;"> <small>  Pending </small> </div>
                        </div>
                        
                    </div>

                </template>
    
                 <template v-slot:[`item.aksi`]="{ item }">
                    <!-- {{ item.verified }} {{ item.activated }} {{ item.locked }} <br /> -->
                    <!-- v-bind:class="['{{content['cravings']}}' ? 'fa-checkbox-marked' : 'fa-checkbox-blank-outline']" -->
                    
                    <v-dialog
                            transition="dialog-top-transition"
                            max-width="600">
                            
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="info"
                            icon
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small>mdi-check</v-icon>
                        </v-btn>
                        </template>
                        <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="success"
                            dark
                            >Verifikasi Request Kartu IDCash</v-toolbar>
                            
                            <v-layout>
                                <v-row>

                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                        style="padding:20px;">
                                    
                                        Anda yakin akan verifikasi Request Kartu ID Cash ini ? Setelah Verifikasi maka akan dilanjutkan untuk proses pembuatan Kartu Baru IDCash.

                                    </v-col>
                                    
                                </v-row>
                            </v-layout>

                            <v-card-actions class="justify-end">
                            <v-btn
                                text
                                @click="dialog.value = false"
                            >Close</v-btn>
                            <v-btn
                                color="success"
                                @click="verifikasiIdCash(item.id , dialog)"
                            >Submit</v-btn>
                            </v-card-actions>
                        </v-card>
                        </template>

                    </v-dialog>
    
                    <v-tooltip 
                    bottom  
                    v-if="item.approved == 1">
                        <template v-slot:activator="{ on, attrs }">

                            <v-btn
                                color="warning"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="openlockdialog(item)"
                               
                            >
                                <v-icon small color="green">mdi-plus</v-icon>
                            </v-btn>

                        </template>
                        <span>Add New IdCash Card</span>
                    </v-tooltip>
                            
                </template>
    
                </v-data-table>
                </v-flex>
        </template>
    
        <v-dialog
            transition="dialog-top-transition"
            max-width="600"
            v-model="sendlockdialog">
            
                <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="info"
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon small>mdi-check</v-icon>
                    </v-btn>
                    </template>
                    <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar
                        color="success"
                        dark
                        >Verifikasi Request Kartu IDCash</v-toolbar>
                        
                        <v-layout>
                            <v-row>

                                <v-col
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    style="padding:20px;">
                                
                                    Anda yakin akan verifikasi Request Kartu ID Cash ini ? Setelah Verifikasi maka akan dilanjutkan untuk proses pembuatan Kartu Baru IDCash.
                                </v-col>
                                
                            </v-row>
                        </v-layout>

                        <v-card-actions class="justify-end">
                        <v-btn
                            text
                            @click="dialog.value = false"
                        >Close</v-btn>
                        <v-btn
                            color="success"
                            @click="verifikasiIdCash(item.id , dialog)"
                        >Submit</v-btn>
                        </v-card-actions>
                    </v-card>
                    </template>
                </v-dialog>

        </v-dialog>
    
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
          profiles:this.$store.state.auth.profile,
          selectedId:"",
          sendlockdialog:false,
          rejectlockdialog:false,
          approvelockdialog:false,
          selectedName:"",
          selectedEmail:"",
          selectedIdReq:"",
          provinsiList:[],
          currentPage:1,
          decimals:"10.00",
          icons:"chevron-right",
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
          thirdparty: [
                { text: "All", value: "all" },
                { text: "IDCASH", value: "idcash" }
                // { text: "Gagal", value: "2" },
          ],
          statusver: [
                { text: "All", value: "all" },
                { text: "Request Verfikasi", value: "false" },
                { text: "Terverifikasi", value: "true" }
                // { text: "Gagal", value: "2" },
          ],
          statusaddr: [
                { text: "All", value: "all" },
                { text: "Address + Current Address", value: "1" },
                { text: "Address", value: "2" },
                { text: "No Address", value: "3" }
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
            { text: "Request Date", value: "created_at"},
        //  { text: "Trx", align: "center", value: "trxCount" },
            { text: "Data Member", align: "left", value: "members"},
            { text: "New Card Num", align: "left", value: "cardno"},
            { text: "Notes", align: "left", value: "note"},
            { text: "Reason", align: "left", value: "reason"},
        //  { text: "Lock Bal (gr)", align: "center" , value: "lock_balance" , width: "150"},
        //  { text: "Reg Date", value: "verified_date"},
            { text: "Status", value: "status_ver"},
        //  { text: "M-Ver", value: "verified"},
            { text: "Action", align: "center", value: "aksi" },
            //{ text: "Action", align: "center", value: "action" , width: "120"},
        ],
          loading: false,
          loadingText: "Loading Data...",
        };
      },
      methods: {
        fetch(cari) {
            if(cari == 1){
                this.pagination.page = 1;
            }
            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = 'Loading... Please wait';

            //alert("limits "+this.pagination.itemsPerPage);
            
            this.$store
                .dispatch("member/fetchListMemberReqAllIdCash", {
                    page: this.pagination.page,
                    itemsPerPage: this.pagination.itemsPerPage,
                    name:this.searchForm.member,
                    email:this.searchForm.email,
                    phone:this.searchForm.phone,
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
        openlockdialog(items){
            this.sendlockdialog = true;
            this.selectedName = items.user.name;
            this.selectedEmail = items.user.email
            this.selectedIdReq = items.id

            console.log("itemsall" , items.user.email);
            //alert(this.sendlockdialog);
            // this.searchForm.cardnumber = "";
            // this.selectedId = index
        },
        verifikasiIdCash:function(index , dialog){
            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = 'Loading... Please wait';

            //alert("limits "+this.pagination.itemsPerPage);
            
            this.$store
                .dispatch("member/approveIdCash", {
                    page: this.pagination.page,
                    itemsPerPage: this.pagination.itemsPerPage,
                    id:index,
                    userId:this.profiles.id
                })
                .then(() => {
                    this.fetch(0);
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarSuccess", "Verifikasi kartu IDCash Berhasil");
                    this.loading = false;
                    this.loadingtext = '';
                    dialog.value = false;
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
            });

        },
        openrejectdialog(index){
            this.rejectlockdialog = true;
            //alert(this.sendlockdialog);
            this.selectedId = index
        },
        approverejectdialog(index){
            this.approvelockdialog = true;
            //alert(this.sendlockdialog);
            this.selectedId = index
        },
        downloadExcels(typeId){
            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = 'Downloading Report ... Please wait';
    
            // let startsdate = this.searchForm.date;
            // let endssdate = this.searchForm.date2;
    
            var today= new Date().toLocaleDateString();
            this.$store.state.member.exports.filename = "Trx-Export-ThirdParty-Member-List-"+today+".xls";
    
            this.$store
                .dispatch("member/exportThMemberExcel", {
                    member:this.searchForm.member,
                    religion:this.searchForm.religion,
                    filterMemberStatus:this.searchForm.status_verified,
                    provinsi:this.searchForm.provinsiList,
                    gender:this.searchForm.gender,
                    filterMemberStartdate:this.searchForm.date,
                    filterMemberEnddate:this.searchForm.date2,
                    monthDate:this.searchForm.monthDate,
                    typeId:typeId
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.loading = false;
                })
                .catch((res) => {
                    this.$store.commit("main/setSnackbarFail", res);
                });
        },
        filterToggle() {
          if (this.panel == null)
            this.panel = [...Array(this.items).keys()].map((k, i) => i);
          else this.panel = null;
        },
        editVerification: function(dialog , id , code){
         this.$store.commit("main/setLoading", true);
          this.$store
            .dispatch("member/editMemberThirdParty", {
                updateId: this.profiles.id,
                code: code,
                id: id
            })
            .then(() => {
                this.fetch(this.pagination.page);
                this.rejectlockdialog = false;
                this.approvelockdialog = false;
                //dialog.value = false;
                this.$store.commit("main/setLoading", false);
                this.$store.commit("main/setSnackbarSuccess", "Verify Data Successfully");
            })
            .catch((res) => {
              this.fetch(this.pagination.page);
              this.rejectlockdialog = false;
              this.approvelockdialog = false;
              //dialog.value = false;
              this.$store.commit("main/setLoading", false);
              this.$store.commit("main/setSnackbarFail", res);
              this.loading = false;
              this.loadingtext = '';
            });
        },
        userLock: function(){

            this.$store.commit("main/setLoading", true);
    
            this.$store
                .dispatch("member/addCardNewIdCash", {
                    updateId: this.profiles.id,
                    notes:this.searchForm.noteslock,
                    reqId:this.selectedIdReq,
                    card_number:this.searchForm.cardnumber
                })
            .then(() => {
                this.fetch(this.pagination.page);
                this.sendlockdialog = false;
                this.$store.commit("main/setLoading", false);
                this.$store.commit("main/setSnackbarSuccess", "Send Lock Data Successfully");
            })
            .catch((res) => {
                console.log("reslongerror" , res);
                this.fetch(this.pagination.page);
                this.sendlockdialog = false;
                this.$store.commit("main/setLoading", false);
                this.$store.commit("main/setSnackbarFail", res);
            });
    
        },
        showDetail(item) {
            //this.$store.commit("main/setLoading", false);
            //this.$store.commit("main/setSnackbarFail", res.response.data.message);
            this.$store.state.member.member.paging_page = this.pagination.page;
            this.$store.commit("member/setMemberPage", "detail");
            this.$store.commit("member/setMemberDetail", item.id);
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
      },
      mounted() {
      },
      watch: {
        pagination() {
            //alert(this.$store.state.member.member.is_back);
            //if(this.$store.state.member.member.is_back != 1){
                this.loading = true
                this.loadingtext = 'Loading... Please wait'
                // alert("tes");
                //console.log("user_con" , "nils "+this.profiles.id);
                //alert("tes");
                
                this.fetch(0)
            //}
    
            //if(this.$store.state.member.member.is_back == 1){
            //this.pagination.page = this.$store.state.member.member.paging_page;
            //}
    
           // this.$store.state.member.member.is_back = 0;
    
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