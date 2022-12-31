<template>

    <v-container style="padding:20px!important; margin:0!important; max-width:100%!important; width:100%!important;">

        <v-row>
            <v-col class="12" style="margin-bottom:40px; padding-left:25px;  border-bottom:1px solid #dddddd;">
                <h3 style="font-size:24px;"> Informasi Akun </h3>
            </v-col>
        </v-row>

        <v-row no-gutters>

            <v-col sm="6" md="6">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2" outlined tile>
                            Nama
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.editNames" label="" single-line small clearable>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-col>

            <v-col sm="6" md="6">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2" outlined tile>
                            Email
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>
                            <v-text-field v-model="searchForm.editEmail" label="" single-line small clearable>
                            </v-text-field>
                        </v-col>
                    </v-row>

                </v-col>
            </v-col>
        </v-row>

        <v-row no-gutters>

            <v-col sm="6" md="6">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2" outlined tile>
                            Password
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.editPassword" value="dinaran123456" label="" single-line
                                small>
                            </v-text-field>

                        </v-col>
                    </v-row>
                </v-col>
            </v-col>

            <v-col sm="6" md="6">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2" outlined tile>
                            Phone Num
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.editPhoneNum" label="" single-line type="number" small
                                clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

        </v-row>

        <v-row>
            <v-col class="12" style="margin-bottom:40px; padding-left:25px; border-bottom:1px solid #dddddd;">
                <h3 style="font-size:24px;"> Informasi Lainnya </h3>
            </v-col>
        </v-row>

        <v-row no-gutters class="mt-2">

            <v-col sm="6" md="4">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Name
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>
                            <v-text-field style="display:none;" v-model="searchForm.editId" label="id" single-line small
                                clearable>
                            </v-text-field>

                            <v-text-field v-model="searchForm.editNama" label="" disabled single-line small clearable>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-col>

            <v-col sm="6" md="4">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Negara
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>
                            <v-text-field v-model="searchForm.editNegara" label="" single-line small clearable>
                            </v-text-field>
                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

            <v-col sm="6" md="4">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Bank Name
                        </v-col>
                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-autocomplete v-model="searchForm.editBankName" :items="$store.state.bank.bank.listBank"
                                single-line item-text="bank_name" item-value="bank_id" label="">
                            </v-autocomplete>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

        </v-row>



        <v-row no-gutters>

            <v-col sm="6" md="4">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Birth Place
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.editBirthPlace" label="Search By BirthPlace" single-line
                                small clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

            <v-col sm="6" md="4">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Provinsi
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>
                            <v-autocomplete v-model="searchForm.editProvinsi"
                                @change="(event) => getWilayah('kabupaten')" single-line
                                :items="$store.state.wilayah.wilayah.list" item-text="provinsi" item-value="provinsi"
                                label="">
                            </v-autocomplete>
                        </v-col>
                    </v-row>

                </v-col>
            </v-col>


            <v-col sm="6" md="4">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Bank Acc. No
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.editBankAccNo" label="" single-line small clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

        </v-row>

        <v-row no-gutters>

            <v-col sm="6" md="4">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Date Of Birth
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                                single-line transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="searchForm.date_of_birth" label="BirthDate"
                                        prepend-icon="mdi-calendar" single-line readonly v-bind="attrs" v-on="on"
                                        clearable></v-text-field>
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
                    </v-row>

                </v-col>
            </v-col>

            <v-col sm="6" md="4">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Kabupaten
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>
                            <v-autocomplete v-model="searchForm.editKabupaten"
                                @change="(event) => getWilayah('kecamatan')" :disabled="dis_kab"
                                :items="$store.state.wilayah.wilayah.listKabupaten" single-line item-text="kabupaten"
                                item-value="kabupaten" label="">
                            </v-autocomplete>
                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

            <v-col sm="6" md="4">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Bank Acc. Holder
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.editBankAccHolder" label="Bank Acc. Holder" single-line
                                small clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

        </v-row>


        <v-row no-gutters>

            <v-col sm="6" md="4">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Address
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>
                            <v-text-field v-model="searchForm.editAddress" label="Address" single-line small clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

            <v-col sm="6" md="4">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Kecamatan
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>
                            <v-autocomplete v-model="searchForm.editKecamatan" :disabled="dis_kec"
                                @change="(event) => getWilayah('kelurahan')" single-line
                                :items="$store.state.wilayah.wilayah.listKecamatan" item-text="kecamatan"
                                item-value="kecamatan" label="">
                            </v-autocomplete>
                        </v-col>
                    </v-row>

                </v-col>
            </v-col>


        </v-row>

        <v-row no-gutters>

            <v-col sm="5" md="4">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Religion
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-autocomplete v-model="searchForm.editReligion"
                                :items="$store.state.settings.attributes.religion" single-line item-text="text"
                                item-value="value" label="Religion">
                            </v-autocomplete>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>


            <v-col sm="6" md="4">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Kelurahan
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.editKelurahan" :disabled="dis_kel" label="" single-line
                                small clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

        </v-row>


        <v-row no-gutters>

            <v-col sm="6" md="4">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Gender
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-autocomplete v-model="searchForm.editGender"
                                :items="$store.state.settings.attributes.gender" single-line item-text="text"
                                item-value="value" label="Gender">
                            </v-autocomplete>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

            <v-col sm="6" md="4">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2 font-weight-bold" outlined tile>
                            Kode Pos
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>
                            <v-text-field v-model="searchForm.editKodePos" label="" single-line small clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

        </v-row>

        <div class="mt-6">
            <v-row>
                <v-col md="6" style="margin:0; padding:0;">

                </v-col>
                <v-col md="6" style="margin:0; padding:0;">
                    <v-btn class="text-white" :color="$store.state.settings.colors.primary"
                        @click="$store.state.corporate.attributes.e1 = 2" style="float:right; color:white;">
                        Continue <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </div>


    </v-container>

</template>

<script>

export default {
    data() {
        return {
            dis_kab: true,
            dis_kec: true,
            dis_kel: true,
            searchForm: {
                member: ''
                // tipe: 'ALL',
                // status: 'ALL',
                // sponsor: ''
            },
            loading: false,
            loadingText: "Loading Data...",
        };
    },
    methods: {
        backsteps() {
            this.$store.state.corporate.attributes.e1 = this.$store.state.corporate.attributes.e1 - 1;
        },
        fetchProv(params) {
            this.$store
                .dispatch("wilayah/fetchWilayah", {
                    find: params,
                })
                .then(() => {
                    //  this.provinsiList = this.$store.state.wilayah.wilayah.list;
                })
                .catch((res) => {
                    this.$store.commit("main/setSnackbarFail", res);
                    //console.log("prov", res.response.data.message);
                });
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
                    kecamatan: this.searchForm.editKecamatan
                })
                .then(() => {
                    if (value == "kabupaten") {
                        // this.kabupatenList = this.$store.state.wilayah.wilayah.listKabupaten;
                        this.dis_kab = false;
                        //alert("fetched");
                    }

                    if (value == "kecamatan") {
                        //this.kecamatanList = this.$store.state.wilayah.wilayah.listKecamatan;
                        this.dis_kec = false;
                        //alert("fetched");
                    }

                    if (value == "kelurahan") {
                        // this.kelurahanList = this.$store.state.wilayah.wilayah.listKelurahan;
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
    },
    mounted() {
        this.fetchProv("");
        this.fetchBank("");
    },

};

</script>