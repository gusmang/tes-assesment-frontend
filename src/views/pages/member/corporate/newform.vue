<template>
    <div>
        <!-- <v-btn color="success" @click="fetch">Detail Member</v-btn> -->
        <p></p>

        <template>
            <v-row>

                <v-col md="6">
                    <div style="float:left;">
                        <v-btn color="success" small outlined @click="showListMember()">
                            <!-- <v-icon>mdi-chevron-left</v-icon> -->
                            <v-icon>mdi-chevron-left</v-icon> Back
                        </v-btn>
                    </div>
                </v-col>

                <v-col md="6">
                    <div style="float:right;">
                        <v-btn color="success" small outlined @click="showListMember()">
                            <!-- <v-icon>mdi-chevron-left</v-icon> -->
                            Form Tambah Data Corporate
                        </v-btn>
                    </div>
                </v-col>

            </v-row>

        </template>


        <v-stepper v-model="$store.state.corporate.attributes.e1" class="mt-6">
            <v-stepper-header>
                <v-stepper-step :complete="$store.state.corporate.attributes.e1 > 1" step="1">
                    Member Registration
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="$store.state.corporate.attributes.e1 > 2" step="2">
                    Corporate Detail
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">
                    Finish
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <MemberShipForm />
                </v-stepper-content>

                <v-stepper-content step="2">
                    <CorpDetailForm />

                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                    <v-btn :color="$store.state.settings.colors.primary"
                        @click="$store.state.corporate.attributes.e1 = 1">
                        Continue
                    </v-btn>

                    <v-btn text>
                        Cancel
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

        <CustomCard>



        </CustomCard>

    </div>
</template>

<script>
import CustomCard from "../../../../components/CustomCard.vue";
import CorpDetailForm from "./components/corpdetail.vue"
import MemberShipForm from "./components/membershipform.vue"


export default {
    data() {
        return {
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            modal: false,
            panel: null,
            currentPage: 1,
            decimals: "10.00",
            icons: "chevron-right",
            showDialogUpdate: false,
            unverdialog: false,
            suspenddialog: false,
            dis_kab: true,
            dis_kec: true,
            dis_kel: true,
            curr_dis_kab: true,
            curr_dis_kec: true,
            curr_dis_kel: true,
            curr_dis_prov: true,
            profiles: this.$store.state.auth.profile,
            provinsiList: [],
            kabupatenList: [],
            kecamatanList: [],
            kelurahanList: [],
            currkabupatenList: [],
            currkecamatanList: [],
            currkelurahanList: [],
            IndexKel: "",
            e1: 1,
            bankList: [],
            detailsMember: "",
            editAct: this.$store.state.member.member.formStates,
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
            formLock: {

            },
            headers: [
                { text: "Name", value: "name" },
                { text: "Email", value: "new_email" },
                { text: "Phone", value: "phone" },
                { text: "Reg Date", value: "verified_date" },
                { text: "E-Ver", value: "em_verified" },
                { text: "M-Ver", value: "verified" },
                { text: "Action", align: "center", value: "action" },
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
        fetchProv(params) {
            this.$store
                .dispatch("wilayah/fetchWilayah", {
                    find: params,
                })
                .then(() => {
                    this.provinsiList = this.$store.state.wilayah.wilayah.list;
                    //console.log("provlist" ,this.$store.state.wilayah.wilayah.list);
                    //alert("prov list");
                })
                .catch((res) => {
                    console.log("prov", res.response.data.message);
                });
        },
        getIndexKel(index) {
            // alert("index = "+index)
            console.log(index);
        },
        fetchBank(params) {
            this.$store
                .dispatch("bank/fetchBank", {
                    find: params,
                })
                .then(() => {
                    this.bankList = this.$store.state.bank.bank.listBank;
                })
                .catch((res) => {
                    console.log("prov", res.response.data.message);
                });
        },
        fetch() {
            this.loading = true;
            this.loadingtext = 'Loading... Please wait';
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/fetchListMemberDetail", {
                    id_member: this.$store.state.member.member.detail,
                })
                .then(() => {
                    //alert("tes-dd");
                    console.log("itemsfetch", this.$store.state.member.member.listDetail[0]);
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
            this.$store.commit("transaction/setMemberPage", "detail");
            this.$store.commit("transaction/setMemberDetail", item);
            //this.detailsName = "New Member";
        },
        showList() {
            this.$store.commit("member/setMemberPage", "list");
            this.$store.state.member.member.is_back = 1;
            //   this.$store.commit("transaction/setMemberDetail", item);
        },
        showEdit() {
            this.searchForm.editNik = this.detailsMember.nik;
            this.searchForm.editId = this.detailsMember.id;
            this.searchForm.editProvinsi = this.detailsMember.provinsi;
            this.searchForm.editKabupaten = this.detailsMember.kabupaten;
            this.searchForm.editKecamatan = this.detailsMember.kecamatan;
            this.searchForm.editKelurahan = this.detailsMember.kelurahan + "#" + this.detailsMember.kode_post;

            this.searchForm.editBirthPlace = this.detailsMember.birth_place;
            this.searchForm.editReligion = this.detailsMember.religion;
            this.searchForm.date_of_birth = this.detailsMember.date_of_birth;
            this.searchForm.editGender = this.detailsMember.gender;
            this.searchForm.editAddress = this.detailsMember.address;
            this.searchForm.editKodePos = this.detailsMember.kode_post;
            this.searchForm.editBankName = this.detailsMember.bank_id;
            this.searchForm.editBankAccNo = this.detailsMember.bank_acc_number;
            this.searchForm.editBankAccHolder = this.detailsMember.bank_acc_holder;
            this.searchForm.editCurrentProvinsi = this.detailsMember.current_provinsi;
            this.searchForm.editCurrKabupaten = this.detailsMember.current_kabupaten;
            this.searchForm.editCurrKecamatan = this.detailsMember.current_kecamatan;
            this.searchForm.editCurrKelurahan = this.detailsMember.current_kelurahan + "#" + this.detailsMember.current_kodepost;
            this.searchForm.editBankCurrentAddress = this.detailsMember.current_address;

            if (this.detailsMember.provinsi != "") {
                this.getWilayah("kabupaten");
            }

            if (this.detailsMember.kabupaten != "") {
                this.getWilayah("kecamatan");
            }

            if (this.detailsMember.kecamatan != "") {
                this.getWilayah("kelurahan");
            }

            if (this.detailsMember.current_provinsi != "") {
                this.getWilayah("currkabupaten");
            }

            if (this.detailsMember.current_kabupaten != "") {
                this.getWilayah("currkecamatan");
            }

            if (this.detailsMember.current_kecamatan != "") {
                this.getWilayah("currkelurahan");
            }

            this.$store.commit("member/setFormSwitch", true);
        },
        showListMember() {
            // this.fetch();
            //this.$store.commit("member/setFormSwitch", false);
            this.$store.commit("member/setMemberCorpPage", "list");
        },
        editVerification: function () {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/addCorporateMember", {
                    updateId: this.profiles.id,
                    userId: this.searchForm.editId,
                    nik: this.searchForm.editNik,
                    provinsi: this.searchForm.editProvinsi,
                    kabupaten: this.searchForm.editKabupaten,
                    kecamatan: this.searchForm.editKecamatan,
                    nama: this.searchForm.editNames,
                    email: this.searchForm.editEmail,
                    phone: this.searchForm.editPhoneNum,
                    kelurahan: this.searchForm.editKelurahan,
                    birthplace: this.searchForm.editBirthPlace,
                    religion: this.searchForm.editReligion,
                    birthdate: this.searchForm.date_of_birth,
                    gender: this.searchForm.editGender,
                    address: this.searchForm.editAddress,
                    kodepost: this.searchForm.editKodePos,
                    bankname: this.searchForm.editBankName,
                    bankaccnumber: this.searchForm.editBankAccNo,
                    bankaccholder: this.searchForm.editBankAccHolder,
                    curprovinsi: this.searchForm.editCurrentProvinsi,
                    curkecamatan: this.searchForm.editCurrKecamatan,
                    curkelurahan: this.searchForm.editCurrKelurahan,
                    curkabupaten: this.searchForm.editCurrKabupaten,
                    curaddress: this.searchForm.editBankCurrentAddress
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

            if (value == "kabupaten") {
                this.dis_kab = false;
            }

            if (value == "kecamatan") {
                this.dis_kec = false;
            }

            if (value == "kelurahan") {
                this.dis_kel = false;
            }

            this.$store
                .dispatch("wilayah/fetchAreaWilayah", {
                    find: value,
                    provinsi: this.searchForm.editProvinsi,
                    kabupaten: this.searchForm.editKabupaten,
                    kecamatan: this.searchForm.editKecamatan,
                    currprovinsi: this.searchForm.editCurrentProvinsi,
                    currkabupaten: this.searchForm.editCurrKabupaten,
                    currkecamatan: this.searchForm.editCurrKecamatan
                })
                .then(() => {

                    if (value == "kabupaten") {
                        this.kabupatenList = this.$store.state.wilayah.wilayah.listKabupaten;
                        this.dis_kab = false;
                    }

                    if (value == "kecamatan") {
                        this.kecamatanList = this.$store.state.wilayah.wilayah.listKecamatan;
                        this.dis_kec = false;
                    }

                    if (value == "kelurahan") {
                        this.kelurahanList = this.$store.state.wilayah.wilayah.listKelurahan;
                        this.dis_kel = false;
                    }

                    if (value == "currkabupaten") {
                        this.currkabupatenList = this.$store.state.wilayah.wilayah.currlistKabupaten;
                        this.curr_dis_kab = false;
                    }

                    if (value == "currkecamatan") {
                        this.currkecamatanList = this.$store.state.wilayah.wilayah.currlistKecamatan;
                        this.curr_dis_kec = false;
                    }

                    if (value == "currkelurahan") {
                        this.currkelurahanList = this.$store.state.wilayah.wilayah.currlistKelurahan;
                        this.curr_dis_kel = false;
                    }

                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        tambahCorporate: function () {
            this.$store
                .dispatch("corporate/tambahCorporate", {
                    name: this.searchForm.editNames,
                    email: this.searchForm.editEmail,
                    password: this.searchForm.editPassword,
                    phone: this.searchForm.editPhoneNum
                })
                .then(() => {
                    //   this.$store.commit("main/setLoading", false);
                    //   this.loading = false;
                    //   this.loadingtext = '';
                    // this.fetch();
                    // dialog.value = false;
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarSuccess", "Input Data Corporate Berhasil");
                    this.loading = false;
                    this.loadingtext = '';

                    this.searchForm.editNames = "";
                    this.searchForm.editEmail = "";
                    this.searchForm.editPassword = "";
                    this.searchForm.editPhoneNum = "";
                    this.$store.commit("member/setMemberCorpPage", "list");
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        userUnverify: function (dialog) {
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
        userSuspend: function (dialog) {
            this.$store
                .dispatch("member/userSuspend", {
                    userId: this.formLock.userId,
                    updateId: this.profiles.id,
                    suspend_reason: this.formLock.suspend_reason
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
        userUnSuspend: function (dialog) {
            this.$store
                .dispatch("member/userUnSuspend", {
                    userId: this.formLock.userId,
                    updateId: this.profiles.id,
                    suspend_reason: this.formLock.suspend_reason
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
        showLock: function (userId, member_name, member_email, member_phone) {
            this.formLock.userId = userId
            this.formLock.edit_name = member_name
            this.formLock.edit_email = member_email
            this.formLock.edit_phone = member_phone
            this.showDialogUpdate = true
        },
        showUnVer: function (userId, member_name, member_email, member_phone) {
            this.formLock.userId = userId
            this.formLock.edit_name = member_name
            this.formLock.edit_email = member_email
            this.formLock.edit_phone = member_phone
            this.unverdialog = true
        },
        showDetailId: function (userId) {
            this.formLock.userId = userId
            this.suspenddialog = true
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
    },
    mounted() {
        this.fetchProv("");
        this.fetchBank("bank");
        this.$store.commit("member/setFormSwitch", false);


        //this.fetch();

        //alert(this.$store.state.user.ac_update);
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
    components: { CustomCard, CorpDetailForm, MemberShipForm },
};
</script>
