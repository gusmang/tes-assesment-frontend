<template>

    <v-dialog transition="dialog-top-transition" max-width="600" v-model="$store.state.member.member.dialogEmoney">

        <!-- <template v-slot:default="dialog"> -->
        <template>

            <v-card>

                <v-toolbar color="success" dark>
                    Form Edit E-Money
                </v-toolbar>


                <v-container>

                    <v-row no-gutters>

                        <v-col sm="12" md="12">

                            <v-col class="pa-2" outlined tile>

                                <v-row no-gutters>

                                    <v-col class="pa-2 font-weight-bold" outlined md="3" tile>
                                        Name
                                    </v-col>

                                    <v-col class="pa-2" outlined md="1" tile>
                                        :
                                    </v-col>

                                    <v-col class="pa-2" md="8" outlined tile>
                                        {{ $store.state.member.member.DetailEmoney.member.name != null ?
        $store.state.member.member.DetailEmoney.member.name : ""
}}
                                    </v-col>

                                </v-row>

                            </v-col>

                        </v-col>

                        <v-col sm="12" md="12">

                            <v-col class="pa-2" outlined tile>

                                <v-row no-gutters>
                                    <v-col class="pa-2 font-weight-bold" outlined md="3" tile>
                                        Email
                                    </v-col>

                                    <v-col class="pa-2" outlined md="1" tile>
                                        :
                                    </v-col>

                                    <v-col class="pa-2" md="8" outlined tile>
                                        {{ $store.state.member.member.DetailEmoney.member.email != null ?
        $store.state.member.member.DetailEmoney.member.email : ""
}}
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-col>

                        <v-col sm="12" md="12">

                            <v-col class="pa-2" outlined tile>

                                <v-row no-gutters>
                                    <v-col class="pa-2 font-weight-bold" outlined md="3" tile>
                                        Phone
                                    </v-col>

                                    <v-col class="pa-2" outlined md="1" tile>
                                        :
                                    </v-col>

                                    <v-col class="pa-2" md="8" outlined tile>
                                        {{ $store.state.member.member.DetailEmoney.member.phone != null ?
        $store.state.member.member.DetailEmoney.member.phone : ""
}}
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-col>

                        <v-col sm="12" md="12">

                            <v-col class="pa-2" outlined tile>

                                <v-row no-gutters>
                                    <v-col class="pa-2 font-weight-bold" outlined md="3" tile>
                                        E-Money Tipe
                                    </v-col>

                                    <v-col class="pa-2" outlined md="1" tile>
                                        :
                                    </v-col>

                                    <v-col class="pa-2" md="8" outlined tile>
                                        {{ $store.state.member.member.DetailEmoney.emoney_tipe != null ?
        $store.state.member.member.DetailEmoney.emoney_tipe : ""
}}
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-col>

                        <v-col sm="12" md="12">

                            <v-col class="pa-2" outlined tile>

                                <v-row no-gutters>
                                    <v-col class="pa-2 font-weight-bold" outlined md="3" tile>
                                        E-Money Number
                                    </v-col>

                                    <v-col class="pa-2" outlined md="1" tile>
                                        :
                                    </v-col>

                                    <v-col class="pa-2" md="8" outlined tile>
                                        {{ $store.state.member.member.DetailEmoney.emoney_number != null ?
        $store.state.member.member.DetailEmoney.emoney_number : ""
}}
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-col>

                        <v-col sm="12" md="12">

                            <v-col class="pa-2" outlined tile>

                                <v-row no-gutters>
                                    <v-col class="pa-2 font-weight-bold" outlined md="3" tile>
                                        E-Money Image
                                    </v-col>

                                    <v-col class="pa-2" outlined md="1" tile>
                                        :
                                    </v-col>

                                    <v-col class="pa-2" md="8" outlined tile>

                                        <img v-bind:src="$store.state.member.member.DetailEmoney.path_img != null ? $store.state.member.member.DetailEmoney.path_img : ''"
                                            style="width:80px; height:120px;" v-bind="attrs" v-on="on" />

                                    </v-col>

                                </v-row>
                            </v-col>
                        </v-col>

                        <v-col sm="12" md="12">

                            <v-col class="pa-2" outlined tile>

                                <v-row no-gutters>

                                    <v-textarea outlined label="Notes" v-model="formLock.notes">
                                    </v-textarea>

                                </v-row>
                            </v-col>
                        </v-col>

                    </v-row>

                </v-container>

                <v-card-actions class="justify-end">

                    <!-- 
                <v-btn
                    text
                    @click="dialog.value = false"
                >Close</v-btn> -->

                    <v-btn color="danger" small @click="editVerification(0)">
                        <v-icon small>mdi-delete </v-icon> Reject
                    </v-btn>


                    <v-btn color="success" small @click="editVerification(1)">
                        <v-icon small>mdi-check</v-icon> Approve
                    </v-btn>

                </v-card-actions>

            </v-card>

        </template>

    </v-dialog>

</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
    data() {
        return {
            formLock: {
                notes: ""
            },
            profiles: this.$store.state.auth.profile
        }
    },
    mounted() {
        //  console.log("DetailsEMoney Member" , this.detailsEmoney);

    },
    methods: {
        editVerification: function (code) {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/editMemberVerifEmoney", {
                    updateId: this.profiles.id,
                    code: code,
                    id: this.$store.state.member.member.DetailEmoney.id,
                    note: this.formLock.notes
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarSuccess", "Update Data Member Successfull");
                    this.$store.state.member.member.dialogEmoney = false;
                    this.fetch();
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        fetch() {

            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = 'Loading... Please wait';

            this.$store
                .dispatch("member/fetchListMemberVerifyEmoney", {
                    page: this.$store.state.member.searchParams.page,
                    itemsPerPage: this.$store.state.member.searchParams.itemsPerPage,
                    status: this.$store.state.member.searchParams.status,
                    tipe: this.$store.state.member.searchParams.tipe,
                    number: this.$store.state.member.searchParams.number,
                    tanggal: this.$store.state.member.searchParams.tanggal,
                    name: this.$store.state.member.searchParams.name
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.loading = false;
                    this.loadingtext = '';
                    this.$store.state.member.member.is_back = 1;
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });

        },
    }
}

</script>
