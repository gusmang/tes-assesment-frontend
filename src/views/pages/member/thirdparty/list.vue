<template>
<div>
    <!-- <v-btn color="success" @click="fetch">Add New MemberS New Baru</v-btn> -->

<CustomCard>

    <template v-slot:toolbar>

        <div style="width:100%;">
        
            <v-btn color="success" small outlined @click="filterToggle" style="float:left;">
            filter <v-icon>mdi-chevron-down</v-icon>
            </v-btn>

            <v-btn color="success" small outlined @click="downloadExcels(1)" style="float:right;">
            Export By Filter <v-icon>mdi-download</v-icon>
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
            <!-- <v-tooltip bottom> -->
                <!-- <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="warning"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="openlockdialog()"
                                v-bind:class="item.verified == true && item.activated != 1 ? '' : 'hidden'">
                                    <v-icon small color="green">mdi-lock</v-icon>
                            </v-btn>
                    </template>
                </v-tooltip>     -->
                <!-- </v-tooltip> -->
                <!-- <span>Unverified User</span> -->
                <template>
                    <v-card>
                        <v-toolbar
                        color="success"
                        dark
                        >Send Card & Lock</v-toolbar>

                        <v-container>

                            <v-layout>
                                <v-flex>
                                    Yakin anda akan melakukan send card & lock untuk user ini ? 
                                </v-flex>
                            </v-layout>

                            <v-layout>
                                <v-flex>
                                    <v-text-field
                                        v-model="searchForm.cardnumber"
                                        label="New Card Number"
                                        clearable>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            
                        </v-container>

                        <v-card-actions class="justify-end">
                        <v-btn
                            text
                            @click="sendlockdialog = false"
                        >Close</v-btn>
                        <v-btn
                            color="success"
                            @click="userLock(sendlockdialog , selectedId , 0)"
                        >Send & Lock</v-btn>
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
                                label="Search By Email / Nama / Phone"
                                single-line
                                small
                                @keyup.13="fetch(1)"
                                clearable>
                            </v-text-field>
                        </v-flex>

                        <v-flex>
                           <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="searchForm.date"
                                label="Tanggal Request Verifikasi"
                                prepend-icon="mdi-calendar"
                                clearable
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="searchForm.date"
                            no-title
                            scrollable
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

                        <v-flex>
                            <v-autocomplete
                                v-model="searchForm.thirdparty"
                                :items="thirdparty"
                                item-text="text"
                                item-value="value"
                                label="ThirdParty Tipe"
                            >
                            </v-autocomplete>
                        </v-flex>
                    
                </v-layout>

                <v-layout>

                    <v-flex>
                        <v-autocomplete
                            v-model="searchForm.statusver"
                            :items="statusver"
                            item-text="text"
                            item-value="value"
                            label="Status Verifikasi"
                        >
                        </v-autocomplete>
                    </v-flex>

                    <v-flex>
                        <v-autocomplete
                            v-model="searchForm.statusaddr"
                            :items="statusaddr"
                            item-text="text"
                            item-value="value"
                            label="Address">
                        </v-autocomplete>
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
                :items="$store.state.member.member.listMemberThirdParty"
                :options.sync="pagination"
                :server-items-length="$store.state.member.member.total"
                :footer-props="{
                'items-per-page-options': [10, 25, 50, 100],
                'items-per-page-text': 'Baris per Halaman:',
                }"
                :items-per-page="10"
                :loading="loading"
                :loading-text="loadingtext"
            >

            <template v-slot:[`item.name`]="{ item }">
                    <div> <v-icon small @click="showExpand($event,item.id)">mdi-{{ icons }}</v-icon> <b> {{ item.member.name }} </b> <br /> <div class="sub-items-tables">  {{ item.member.email }} </div> </div>
                        <div v-bind:id="item.id" class="hidden sub-items-tables">  {{ item.member.phone }} <br /> addr &raquo;  {{ item.detail.address }} {{ item.detail.kode_post }} <br />
                        <div> curaddr &raquo; {{ item.detail.currentaddress }} {{ item.detail.current_kodepost }}  </div>
                    </div>
            </template>

            <template v-slot:[`item.updated_by`]="{ item }">
                <div>  <b> {{ item.tukangupdate }} </b> </div>
                <div > <small> {{ item.updated_at }} </small> </div>
            </template>

            <!-- <template v-slot:[`item.trxCount`]="{ item }">
                    <div>  <b> {{ item.trxCount }} </b> <br /> </div>
                    <div> <small> TRX </small> </div>
            </template> -->

            <template v-slot:[`item.bal_gramasi`]="{ item }">
                    <div>  <b> {{ item.bal_gramasi }} GR </b> <br /> </div>
                    <div style="margin-top:-5px;"> <small>Rp.  {{ item.realidr }}</small> </div>
                    <div style="margin-top:-5px;"> <small>  </small> </div>
            </template>

            <template v-slot:[`item.api_detail`]="{ item }">
                <div>  
                    <small> 
                        <b>Emas Impian <v-icon small>mdi-chevron-right</v-icon> </b>{{ item.lock_emasimpian }}  gr
                    </small> 
                </div>
                <div style="margin-top:-5px;"> <small><b>Dinaran  <v-icon small>mdi-chevron-right</v-icon>  </b>  {{ item.lock_dinaran }} gr </small> </div>
                <div style="margin-top:-5px;"> <small><b>User <v-icon small>mdi-chevron-right</v-icon> </b> {{ item.lock_user }} gr</small> </div>
            </template>

            <template v-slot:[`item.status`]="{ item }">

                <div style="text-align:center;">

                    <div v-if="item.verified == 0" style="color:blue;"> 
                        <v-icon small color="blue">mdi-clock</v-icon> 
                        <div style="margin-top:-5px;"> <small> Request Verifikasi</small> </div>
                    </div>

                    <div v-if="item.verified == 1" style="color:green;"> 
                        <v-icon small color="green">mdi-check</v-icon> 
                        <div style="margin-top:-5px;"> <small>  Verified </small> </div>
                    </div>

               </div>

            </template>

             <template v-slot:[`item.aksi`]="{ item }">

                <div v-if="item.card.length > 0" style="font-size:12px;">
                    <div> <b>Card Number </b> <v-icon style="font-size:12px;">mdi-chevron-right</v-icon> {{ item.card[0].card_num }}  </div>
                    <div v-if="item.card[0].activated == '0'"> <b>Card Active</b> <v-icon style="font-size:12px;"> mdi-chevron-right</v-icon> <span style="color:#FF0000;"> NOT ACTIVATED </span> <br /></div>
                    <div v-if="item.card[0].activated == '1'"> <b>Card Active</b> <v-icon style="font-size:12px;"> mdi-chevron-right</v-icon>  ACTIVATED </div>
                </div>

                <!-- {{ item.verified }} {{ item.activated }} {{ item.locked }} <br /> -->
                <!-- v-bind:class="['{{content['cravings']}}' ? 'fa-checkbox-marked' : 'fa-checkbox-blank-outline']" -->
                <v-tooltip bottom>

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="warning"
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="approverejectdialog(item.id)"
                            v-bind:class="item.verified == false ? '' : 'hidden'">
                            <v-icon small color="green">mdi-check</v-icon>
                        </v-btn>
                    </template>
                    <span>Approve Verifikasi</span>
                    
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="red"
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="openrejectdialog(item.id)"
                            v-bind:class="item.card.length == 0 && item.verified == true && (item.locked == 0 && item.activated == 0) || item.verified == false ? '' : 'hidden'"
                        >
                        <v-icon small color="red">mdi-delete</v-icon>
                    </v-btn>
                    </template>
                    <span>Reject User</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="warning"
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="openlockdialog(item.id)"
                            v-bind:class="item.card.length == 0 && item.verified == true && item.activated != 1 ? '' : 'hidden'">
                                <v-icon small color="green">mdi-lock</v-icon>
                        </v-btn>
                    </template>
                    <span>Send Card & Lock Member</span>
                </v-tooltip>
                        
            </template>

                <template v-slot:[`item.action`]="{ item }">
                
                  
                    <v-btn
                        color="red"
                        icon
                        v-if="item.card[0].card_num == null && item.verified == true && (item.locked == 0 && item.activated == 0) || item.verified == false"
                        @click="showDetail(item)">
                        <v-icon small>mdi-delete</v-icon>
                    </v-btn>

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
                                @click="showLock(item.id,item.real_gramasi , item.lock_user , item.lock_dinaran)"
                            >
                                <v-icon small>mdi-lock</v-icon>
                            </v-btn>
                            </template>
                            <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar
                                color="success"
                                dark
                                >Lock Member Balance</v-toolbar>

                                <v-text-field
                                    v-model="formLock.userId"
                                    hidden
                                    label=""
                                    >
                                </v-text-field>

                                <v-container>

                                    <v-layout>
                                        <v-flex>
                                            <v-text-field
                                                v-model="formLock.last_balance"
                                                label="Last Balance"
                                                disabled
                                                >
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>

                                     <v-layout>
                                        <v-flex>
                                            <v-text-field
                                                v-model="formLock.lock_user"
                                                label="Lock Balance by User"
                                                value="0"
                                                >
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>

                                     <v-layout>
                                        <v-flex>
                                            <v-text-field
                                                v-model="formLock.lock_dinaran"
                                                label="Lock Balance by Dinaran"
                                                value="0"
                                                >
                                            </v-text-field>
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
                                    @click="submitLock(dialog)"
                                >Submit</v-btn>
                                </v-card-actions>
                            </v-card>
                            </template>
                        </v-dialog>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="success"
                        v-if="item.verified == true && (item.locked == 0 && item.activated == 0) || item.verified == false"
                        icon
                        @click="showDetail(item)"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon small>mdi-check</v-icon>
                    </v-btn>
                    </template>
                </v-tooltip>
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

    <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="sendlockdialog">
                    <!-- <v-tooltip bottom> -->
                        <!-- <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="warning"
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="openlockdialog()"
                                        v-bind:class="item.verified == true && item.activated != 1 ? '' : 'hidden'">
                                            <v-icon small color="green">mdi-lock</v-icon>
                                    </v-btn>
                            </template>
                        </v-tooltip>     -->
                        <!-- </v-tooltip> -->
                        <!-- <span>Unverified User</span> -->
                        <template>
                            <v-card>
                                <v-toolbar
                                color="success"
                                dark
                                >Send Card & Lock</v-toolbar>

                                <v-container>

                                    <v-layout>
                                        <v-flex>
                                            Yakin anda akan melakukan send card & lock untuk user ini ?
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
                                    @click="userLock(dialog , item.id , 0)"
                                >Send & Lock</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
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
        { text: "Request Date", value: "created_at" , width:105},
        { text: "Member", value: "name" , width:80},
        { text: "Balance", align: "right", value: "bal_gramasi" , width:110},
        { text: "ThirdParty", align: "right", value: "agent" , width:80},
        { text: "Lock Emas", align: "left", value: "api_detail" , width:160},
        { text: "Status Verifikasi", value: "status" , align: "center" , width:60},
        { text: "Updated By", align: "center", value: "updated_by" , width:100 },
        { text: "Action", align: "left", value: "aksi" , width:250 }
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
        .dispatch("member/fetchMemberThirdParty", {
            page: this.pagination.page,
            itemsPerPage: this.pagination.itemsPerPage,
            name:this.searchForm.member,
            thirdparty:this.searchForm.thirdparty,
            statusver:this.searchForm.statusver,
            date:this.searchForm.date,
            addr:this.searchForm.statusaddr
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
    openlockdialog(index){
        this.sendlockdialog = true;
        //alert(this.sendlockdialog);
        this.searchForm.cardnumber = "";
        this.selectedId = index
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
    userLock: function(dialog , id , code){

        this.$store.commit("main/setLoading", true);

        this.$store
            .dispatch("member/editUserLockMember", {
                updateId: this.profiles.id,
                code: code,
                id: id,
                card_num:this.searchForm.cardnumber
            })
        .then(() => {
            this.fetch(this.pagination.page);
            this.sendlockdialog = false;
            this.$store.commit("main/setLoading", false);
            this.$store.commit("main/setSnackbarSuccess", "Send Lock Data Successfully");
        })
        .catch((res) => {
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