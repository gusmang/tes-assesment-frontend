<template>

    <v-container style="padding:20px!important; margin:0!important; max-width:100%!important; width:100%!important;">

        <v-row>
            <v-col class="12" style="margin-bottom:20px; padding-left:25px;">
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
            <v-col class="12" style="margin-bottom:20px; padding-left:25px;">
                <h3 style="font-size:24px;"> Informasi Alamat </h3>
            </v-col>
        </v-row>

        <v-row no-gutters>

            <v-col sm="6" md="6">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2" outlined tile>
                            Alamat Perusahaan
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.alamat_perusahaan" label="" single-line small>
                            </v-text-field>

                        </v-col>
                    </v-row>
                </v-col>
            </v-col>

            <v-col sm="6" md="6">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2" outlined tile>
                            Provinsi
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-autocomplete v-model="searchForm.corpeditProvinsi"
                                @change="(event) => getWilayah('kabupaten')" single-line
                                :items="$store.state.wilayah.wilayah.list" item-text="provinsi" item-value="provinsi"
                                label="">
                            </v-autocomplete>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>


            <v-col sm="6" md="6">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2" outlined tile>
                            Kabupaten / Kota
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-autocomplete v-model="searchForm.corpeditKabupaten"
                                @change="(event) => getWilayah('kecamatan')" :disabled="dis_kab"
                                :items="$store.state.wilayah.wilayah.corplistKabupaten" single-line
                                item-text="kabupaten" item-value="kabupaten" label="">
                            </v-autocomplete>

                        </v-col>
                    </v-row>
                </v-col>
            </v-col>

            <v-col sm="6" md="6">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2" outlined tile>
                            Kode Pos
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.alamat_perusahaan" label="" single-line type="text" small
                                clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

        </v-row>

        <v-row>
            <v-col class="12" style="margin-bottom:20px; padding-left:25px;">
                <h3 style="font-size:24px;"> Informasi Bisnis/Usaha </h3>
            </v-col>
        </v-row>

        <v-row no-gutters>

            <v-col sm="6" md="6">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2" outlined tile>
                            Nama Usaha
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.alamat_perusahaan" label="" single-line small>
                            </v-text-field>

                        </v-col>
                    </v-row>
                </v-col>
            </v-col>

            <v-col sm="6" md="6">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2" outlined tile>
                            No. Ijin Usaha
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.alamat_perusahaan" label="" single-line type="text" small
                                clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>


            <v-col sm="6" md="6">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2" outlined tile>
                            Website Utama
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.alamat_perusahaan" label="" single-line small>
                            </v-text-field>

                        </v-col>
                    </v-row>
                </v-col>
            </v-col>

        </v-row>


        <v-row>
            <v-col class="12" style="margin-bottom:20px; padding-left:25px;">
                <h3 style="font-size:24px;"> Informasi Rekening Bank </h3>
            </v-col>
        </v-row>

        <v-row no-gutters>

            <v-col sm="6" md="6">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2" outlined tile>
                            Nama Bank
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.alamat_perusahaan" label="" single-line small>
                            </v-text-field>

                        </v-col>
                    </v-row>
                </v-col>
            </v-col>

            <v-col sm="6" md="6">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2" outlined tile>
                            Atas Nama ( Rekening Bank )
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.alamat_perusahaan" label="" single-line type="text" small
                                clearable>
                            </v-text-field>

                        </v-col>
                    </v-row>

                </v-col>
            </v-col>


            <v-col sm="6" md="6">

                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>

                        <v-col class="pa-2" outlined tile>
                            Nomor Rekening
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>

                            <v-text-field v-model="searchForm.alamat_perusahaan" label="" single-line small>
                            </v-text-field>

                        </v-col>
                    </v-row>
                </v-col>
            </v-col>

            <v-col sm="6" md="6">
                <v-col class="pa-2" outlined tile>

                    <v-row no-gutters>
                        <v-col class="pa-2" outlined tile>
                            Foto Rekening Koran (Upload)
                        </v-col>

                    </v-row>

                    <v-row class="" no-gutters>
                        <v-col class="pa-2 martop-min" outlined tile>
                            <v-file-input accept="image/*" label="File input"></v-file-input>
                        </v-col>
                    </v-row>

                </v-col>
            </v-col>

        </v-row>

        <div class="mt-6">
            <v-row>
                <v-col md="6" style="margin:0; padding:0;">
                    <v-btn color="success" outlined @click="backsteps()">
                        <!-- <v-icon>mdi-chevron-left</v-icon> -->
                        <v-icon>mdi-chevron-left</v-icon> Back Steps
                    </v-btn>
                </v-col>
                <v-col md="6" style="margin:0; padding:0;">
                    <v-btn class="text-white" :color="$store.state.settings.colors.primary"
                        @click="$store.state.corporate.attributes.e1 = 2" style="float:right; color:white;">
                        Submit Data <v-icon>mdi-chevron-right</v-icon>
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
            searchForm: {
                member: ''
                // tipe: 'ALL',
                // status: 'ALL',
                // sponsor: ''
            },
            dis_kab: true,
            dis_kec: true,
            dis_kel: true,
            loading: false,
            loadingText: "Loading Data...",
        };
    },
    methods: {
        backsteps() {
            this.$store.state.corporate.attributes.e1 = this.$store.state.corporate.attributes.e1 - 1;
        },
        getWilayah(value) {

            if (value == "kabupaten") {
                this.dis_kab = false;
            }

            this.$store
                .dispatch("wilayah/fetchAreaWilayah", {
                    find: value,
                    provinsi: this.searchForm.corpeditProvinsi,
                    kabupaten: this.searchForm.corpeditKabupaten
                })
                .then(() => {
                    if (value == "kabupaten") {
                        // this.kabupatenList = this.$store.state.wilayah.wilayah.listKabupaten;
                        this.dis_kab = false;
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
    },

};

</script>