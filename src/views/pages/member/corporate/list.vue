<template>
    <div>
        <!-- <v-btn color="success" @click="fetch">Add New MemberS New Baru</v-btn> -->

        <v-container class="no-pad-left">

            <v-row no-gutters>

                <v-col sm="3" md="3">
                    <v-card elevation="2" style="border-top: 3px solid rgb(40, 167, 69);">
                        <v-col cols="12" sm="12" md="12" class="text-center">
                            <v-icon medium color="green">mdi-clipboard-account</v-icon>
                            <!-- <v-icon>mdi-account-card-details</v-icon> -->
                            <h5 style="font-size:28px; color:#888;"> {{ $store.state.member.member.totalusercorpreg }}
                            </h5>
                            <small> Total User Corporate </small>
                        </v-col>
                    </v-card>
                </v-col>

            </v-row>

        </v-container>



        <CustomCard>

            <template v-slot:toolbar>
                <div style="width:100%;">

                    <v-btn color="success" small outlined @click="filterToggle" style="float:left;">
                        filter <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>

                    <!-- <v-btn color="success" small outlined @click="downloadExcels(1)" style="float:left; margin-left:20px;">
                    Export <v-icon>mdi-download</v-icon>
                </v-btn> -->

                    <v-btn color="success" small outlined @click="showForm()" style="float:right;">
                        <v-icon>mdi-plus</v-icon> Tambah
                    </v-btn>

                </div>


                <v-btn color="success" small outlined style="margin-left:20px;" @click="downloadExcels(1)">
                    <!-- Export By Filter <v-icon>mdi-download</v-icon> -->
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
                    </downloadexcel> -->
                    Export By Filter <v-icon>mdi-download</v-icon>
                </v-btn>

            </template>

            <template v-slot:expansion>
                <v-expansion-panels v-model="panel" multiple>
                    <v-expansion-panel expand focusable>
                        <v-expansion-panel-content>

                            <v-layout>

                                <v-flex>
                                    <v-text-field v-model="searchForm.member" label="Search By Email / Nama / Phone"
                                        single-line small clearable @keyup.13="searchMember(1)">
                                    </v-text-field>
                                </v-flex>

                                <v-flex>
                                    <v-autocomplete v-model="searchForm.monthDate" :items="bulan" item-text="text"
                                        item-value="value" label="Month BirthDate">
                                    </v-autocomplete>
                                </v-flex>

                                <v-flex>
                                    <v-autocomplete v-model="searchForm.religion" :items="religion" item-text="text"
                                        item-value="value" label="Religion">
                                    </v-autocomplete>
                                </v-flex>

                            </v-layout>

                            <v-layout>
                                <v-flex>
                                    <v-autocomplete v-model="searchForm.gender" :items="gender" item-text="text"
                                        item-value="value" label="Gender">
                                    </v-autocomplete>
                                </v-flex>

                                <v-flex>
                                    <v-autocomplete v-model="searchForm.provinsiList" :items="provinsiList"
                                        item-text="provinsi" item-value="provinsi" label="Provinsi">
                                    </v-autocomplete>
                                </v-flex>

                                <v-flex>
                                    <v-autocomplete v-model="searchForm.status_verified" :items="status"
                                        item-text="text" item-value="value" label="Status Verified">
                                    </v-autocomplete>
                                </v-flex>

                            </v-layout>

                            <v-layout>

                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                            :return-value.sync="date" transition="scale-transition" offset-y
                                            min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="searchForm.date" label="Register FromDate"
                                                    prepend-icon="mdi-calendar" clearable readonly v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="searchForm.date" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu = false">
                                                    Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                    OK
                                                </v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-spacer></v-spacer>

                                    <v-col cols="12" sm="6" md="6">

                                        <v-menu :close-on-content-click="false" :return-value.sync="date2"
                                            transition="scale-transition" offset-y min-width="auto">

                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="searchForm.date2" label="Register EndDate"
                                                    prepend-icon="mdi-calendar" clearable readonly v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="searchForm.date2" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu = false">
                                                    Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                    OK
                                                </v-btn>
                                            </v-date-picker>
                                        </v-menu>

                                    </v-col>

                                    <v-spacer></v-spacer>
                                </v-row>

                            </v-layout>


                            <v-layout align-end justify-end>
                                <v-spacer></v-spacer>
                                <v-btn small depressed color="success" class="m0" @click="fetch(1)">
                                    <v-icon>mdi-magnify</v-icon> Search
                                </v-btn>
                            </v-layout>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </template>

            <template v-slot:datatable>
                <v-flex md12 style="overflow-x: scroll">
                    <v-data-table :headers="headers" :items="$store.state.member.member.list" :options.sync="pagination"
                        :server-items-length="$store.state.member.member.total" :footer-props="{
                            'items-per-page-options': [10, 25, 50, 100],
                            'items-per-page-text': 'Baris per Halaman:',
                        }" :items-per-page="10" :loading="loading" :loading-text="loadingtext">

                        <template v-slot:[`item.name`]="{ item }">
                            <div> <v-icon small @click="showExpand($event, item.id)">mdi-{{ icons }}</v-icon> <b> {{
                                    item.name
                            }} </b> <br />
                                <div class="sub-items-tables"> {{ item.email }} </div>
                            </div>
                            <div v-bind:id="item.id" class="hidden sub-items-tables"> {{ item.format_id }} <br /> {{
                                    item.phone
                            }} <br /> {{ item.religion }} <br /> Birthdate : {{ item.date_of_birth }}
                            </div>
                        </template>

                        <template v-slot:[`item.trxCount`]="{ item }">
                            <div> <b> {{ item.trxCount }} </b> <br /> </div>
                            <div> <small> TRX </small> </div>
                        </template>

                        <template v-slot:[`item.bal_gramasi`]="{ item }">
                            <div> <b> {{ item.bal_gramasi }} </b> <br /> </div>
                            <div style="margin-top:-5px;"> <small> {{ item.real_gramasi }} </small> </div>
                            <div style="margin-top:-5px;"> <small> GR </small> </div>
                        </template>

                        <template v-slot:[`item.lock_balance`]="{ item }">
                            <div style="text-align:right;">
                                <div> <small> Emas Impian <v-icon small
                                            @click="showExpand($event, item.id)">mdi-chevron-right</v-icon> <b> {{
                                                    item.lock_emasimpian
                                            }} </b> </small> </div>
                                <div style="margin-top:-5px;"> <small> Dinaran <v-icon small
                                            @click="showExpand($event, item.id)">mdi-chevron-right</v-icon> <b> {{
                                                    item.lock_dinaran
                                            }} </b> </small> </div>
                                <div style="margin-top:-5px;"> <small> User <v-icon small
                                            @click="showExpand($event, item.id)">mdi-chevron-right</v-icon> <b> {{
                                                    item.lock_user
                                            }} </b> </small> </div>
                            </div>
                        </template>

                        <template v-slot:[`item.verified_date`]="{ item }">
                            <div> {{ item.verified_at }} </div>
                            <div style="margin-top:-5px;"> <small> {{ item.verified_time }} </small> </div>
                            <!-- <div style="margin-top:-5px;"> <small> {{ item.real_gramasi }} </small> </div>
                    <div style="margin-top:-5px;"> <small> GR </small> </div> -->
                        </template>

                        <!-- <template v-slot:[`item.real_gramasi`]="{ item }">
                    <div>  <b> {{ item.real_gramasi }} </b> <br /> </div>
                    <div> <small> GR </small> </div>
            </template> -->


                        <template v-slot:[`item.em_verified`]="{ item }">
                            <div style="text-align:center;">
                                <div v-if="item.email_verified == 0" style="color:red;">
                                    <v-icon small color="red">mdi-block-helper</v-icon>
                                    <div style="margin-top:-5px;"> <small> Not Verified </small> </div>
                                </div>
                                <div v-if="item.email_verified == 1" style="color:green;">
                                    <v-icon small color="green">mdi-check</v-icon>
                                    <div style="margin-top:-5px;"> <small> Verified </small> </div>
                                </div>


                            </div>
                        </template>

                        <template v-slot:[`item.verified`]="{ item }">
                            <div style="text-align:center;">

                                <div v-if="item.is_block == false" style="color:red;">

                                    <div v-if="item.verified == 0" style="color:red;">
                                        <v-icon small color="red">mdi-block-helper</v-icon>
                                        <div style="margin-top:-5px;"> <small> Not Verified </small> </div>
                                    </div>
                                    <div v-if="item.verified == 1" style="color:green;">
                                        <v-icon small color="green">mdi-check</v-icon>
                                        <div style="margin-top:-5px;"> <small> Verified </small> </div>
                                    </div>

                                </div>

                                <div v-if="item.is_block == true" style="color:red;">
                                    <!-- <div v-if="item.verified == 0" style="color:red;">  -->
                                    <v-icon small color="red">mdi-block-helper</v-icon>
                                    <div style="margin-top:-5px;"> <small> Suspend </small> </div>
                                    <!-- </div> -->
                                </div>


                            </div>
                        </template>

                        <template v-slot:[`item.action`]="{ item }">
                            <v-dialog transition="dialog-top-transition" max-width="600">

                                <template v-slot:activator="{ on, attrs }">

                                    <v-btn color="info" icon v-bind="attrs" v-on="on"
                                        @click="showLock(item.id, item.real_gramasi, item.lock_user, item.lock_dinaran)">
                                        <v-icon small>mdi-lock</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="success" dark>Lock Member Balance</v-toolbar>

                                        <v-text-field v-model="formLock.userId" hidden label="">
                                        </v-text-field>

                                        <v-container>
                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field v-model="formLock.last_balance" label="Last Balance"
                                                        disabled>
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field v-model="formLock.lock_user"
                                                        label="Lock Balance by User" value="0">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field v-model="formLock.lock_dinaran"
                                                        label="Lock Balance by Dinaran" value="0">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                        </v-container>

                                        <v-card-actions class="justify-end">
                                            <v-btn text @click="dialog.value = false">Close</v-btn>
                                            <v-btn color="success" @click="submitLock(dialog)">Submit</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>

                            </v-dialog>

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="success" icon @click="showDetail(item)" v-bind="attrs" v-on="on">
                                        <v-icon small>mdi-eye</v-icon>
                                    </v-btn>
                                </template>
                                <span>Detail</span>
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
            profiles: this.$store.state.auth.profile,
            provinsiList: [],
            bankList: [],
            currentPage: 1,
            decimals: "10.00",
            icons: "chevron-right",
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
            formLock: {

            },
            tipe: [],
            menu: null,
            form: {},
            pagination: {},
            headers: [
                { text: "Member", value: "name" },
                { text: "Trx", align: "center", value: "trxCount" },
                { text: "Bal", align: "center", value: "bal_gramasi" },
                { text: "Lock Bal (gr)", align: "center", value: "lock_balance", width: "150" },
                { text: "Reg Date", value: "verified_date" },
                { text: "E-Ver", value: "em_verified" },
                { text: "M-Ver", value: "verified" },
                { text: "Updt By", align: "center", value: "tukangupdate", width: "95" },
                { text: "Action", align: "center", value: "action", width: "170" },
            ],
            loading: false,
            loadingText: "Loading Data...",
        };
    },
    methods: {
        fetchProv(params) {
            this.$store
                .dispatch("wilayah/fetchWilayah", {
                    find: params,
                })
                .then(() => {
                    this.provinsiList = this.$store.state.wilayah.wilayah.list;
                })
                .catch((res) => {
                    console.log("prov", res.response.data.message);
                });
        },
        fetchTotal(params) {
            this.$store
                .dispatch("member/fetchcorptotals", {
                    find: params,
                })
                .then(() => {
                    //alert("tess");
                    //this.provinsiList = this.$store.state.wilayah.wilayah.list;
                })
                .catch((res) => {
                    console.log("prov", res.response.data.message);
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
                    member: this.searchForm.member,
                    religion: this.searchForm.religion,
                    status_verified: this.searchForm.status_verified,
                    provinsi: this.searchForm.provinsiList,
                    gender: this.searchForm.gender,
                    date: this.searchForm.date,
                    date2: this.searchForm.date2,
                    monthDate: this.searchForm.monthDate
                })
                .then((res) => {
                    //   this.$store.commit("main/setLoading", false);
                    //   this.loading = false;
                    //   this.loadingtext = '';
                    console.log("tesData", res);
                    return res;
                })
                .catch((res) => {
                    console.log("fetchdata", res.response.data.message);
                    //   this.$store.commit("main/setLoading", false);
                    //   this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    //   this.loading = false;
                    //   this.loadingtext = '';
                });
        },
        startDownload() {
            alert('show loading');
        },
        finishDownload() {
            alert('hide loading');
        },
        downloadExcels(typeId) {
            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = 'Downloading Report ... Please wait';

            // let startsdate = this.searchForm.date;
            // let endssdate = this.searchForm.date2;

            var today = new Date().toLocaleDateString();
            this.$store.state.member.exports.filename = "Trx-Export-Member-List-" + today + ".xls";

            this.$store
                .dispatch("member/exportMemberExcel", {
                    member: this.searchForm.member,
                    religion: this.searchForm.religion,
                    filterMemberStatus: this.searchForm.status_verified,
                    provinsi: this.searchForm.provinsiList,
                    gender: this.searchForm.gender,
                    filterMemberStartdate: this.searchForm.date,
                    filterMemberEnddate: this.searchForm.date2,
                    monthDate: this.searchForm.monthDate,
                    typeId: typeId
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.loading = false;
                })
                .catch((res) => {
                    this.$store.commit("main/setSnackbarFail", res);
                });
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
                .dispatch("member/fetchListCorpMember", {
                    page: this.pagination.page,
                    itemsPerPage: this.pagination.itemsPerPage,
                    member: this.searchForm.member,
                    religion: this.searchForm.religion,
                    status_verified: this.searchForm.status_verified,
                    provinsi: this.searchForm.provinsiList,
                    gender: this.searchForm.gender,
                    date: this.searchForm.date,
                    date2: this.searchForm.date2,
                    monthDate: this.searchForm.monthDate
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
        searchMember(cari) {
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
                    itemsPerPage: this.pagination.itemsPerPage,
                    member: this.searchForm.member,
                    religion: this.searchForm.religion,
                    status_verified: this.searchForm.status_verified,
                    provinsi: this.searchForm.provinsiList,
                    gender: this.searchForm.gender,
                    date: this.searchForm.date,
                    date2: this.searchForm.date2,
                    monthDate: this.searchForm.monthDate
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
            this.$store.commit("member/setMemberCorpPage", "detail");
            this.$store.commit("member/setMemberDetail", item.id);
            this.loading = false;
            this.loadingtext = '';
        },
        showForm() {
            //this.$store.commit("main/setLoading", false);
            //this.$store.commit("main/setSnackbarFail", res.response.data.message);
            this.$store.state.member.member.paging_page = this.pagination.page;
            this.$store.commit("member/setMemberCorpPage", "form");
            this.loading = false;
            this.loadingtext = '';
        },
        showExpand: function (element, index) {
            const detailElement = document.getElementById(index);
            if (detailElement.classList.contains('hidden')) {
                element.target.classList.remove("mdi-chevron-right");
                element.target.classList.add("mdi-chevron-down");
                detailElement.classList.remove("hidden");
                //this.icons = "chevron-down";
            }
            else {
                element.target.classList.add("mdi-chevron-right");
                element.target.classList.remove("mdi-chevron-down");
                detailElement.classList.add("hidden");
                //this.icons = "chevron-right";
            }
        },
        showLock: function (userId, real_gramasi, lock_user, lock_dinaran) {
            this.formLock.userId = userId
            this.formLock.last_balance = real_gramasi
            this.formLock.lock_user = lock_user
            this.formLock.lock_dinaran = lock_dinaran
        },
        submitLock: function (dialog) {
            //this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/postLockGold", {
                    userId: this.formLock.userId,
                    lockdinaran: this.formLock.lock_dinaran,
                    lockuser: this.formLock.lock_user,
                    updateId: this.profiles.id,
                    page: this.pagination.page
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
        this.fetchProv("provinsi");
        this.fetchTotal("");

        // alert(this.$store.state.user.ac_read);

        //alert(this.$store.state.user.ac_read);
    },
    watch: {
        pagination() {
            //alert(this.$store.state.member.member.is_back);
            if (this.$store.state.member.member.is_back != 1) {
                this.loading = true
                this.loadingtext = 'Loading... Please wait'
                // alert("tes");
                //console.log("user_con" , "nils "+this.profiles.id);
                //alert("tes");

                this.fetch(0)
            }

            if (this.$store.state.member.member.is_back == 1) {
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
    //components: { CustomCard , downloadexcel },
    components: { CustomCard },
};
</script>

<style>

</style>