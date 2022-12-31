<template>
    <div>
        <!-- <v-btn color="success" @click="fetch">Detail Member</v-btn> -->

        <v-dialog v-model="dialog" width="500">

            <v-card style="position:relative;">

                <div style="top:35%; left:0; position:absolute;">
                    <v-icon style="color:#000000; font-size:96px;"
                        @click=showImagePrev(indexfoto)>mdi-chevron-left</v-icon>
                </div>

                <div style="top:35%; right:0; position:absolute;">
                    <v-icon style="color:#000000; font-size:96px;"
                        @click=showImageNext(indexfoto)>mdi-chevron-right</v-icon>
                </div>

                <v-card-title class="text-h5 primary-colors text-light" style="color:#FFF;">
                    {{ titleFoto[indexfoto] }}
                </v-card-title>

                <v-card-text style="margin-top:20px;">
                    <img v-bind:src="detailsFoto[indexfoto]" style="width:100%;" />
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- <v-btn
                color="primary"
                text
                @click="dialog = false"
            >
                Oke
            </v-btn> -->
                </v-card-actions>
            </v-card>
        </v-dialog>

        <CustomCard>

            <template v-slot:toolbar>

                <div style="width:100%;">

                    <v-btn color="success" small outlined style="float:left;">
                        <!-- <v-icon>mdi-chevron-left</v-icon> -->
                        Request Data Verify
                    </v-btn>

                    <v-btn color="success" small outlined @click="showForms()" style="float:right;">
                        <v-icon>mdi-pencil</v-icon> Edit Data Request Verify
                    </v-btn>

                    <v-btn color="success" small outlined @click="showList()" style="float:right; margin-right:10px;">
                        <v-icon>mdi-chevron-left</v-icon> Back to List
                    </v-btn>


                </div>

            </template>


            <template v-slot:datatable>

                <template v-if="editAct == true">

                    <template>

                        <v-container>

                            <v-row no-gutters>

                                <v-col sm="6" md="4">

                                    <v-col class="pa-2" outlined tile>

                                        <v-row no-gutters>
                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                Name
                                            </v-col>

                                        </v-row>

                                        <v-row class="" no-gutters>
                                            <v-col class="pa-2 martop-min" outlined tile>
                                                <v-text-field style="display:none;" v-model="searchForm.editId"
                                                    label="id" single-line small clearable>
                                                </v-text-field>

                                                <v-text-field v-model="searchForm.editNama" label="" disabled
                                                    single-line small clearable>
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
                                                <v-text-field v-model="searchForm.editNegara" label="" single-line small
                                                    clearable>
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

                                                <v-autocomplete v-model="searchForm.editBankName" :items="bankList"
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

                                                <v-text-field v-model="searchForm.editBirthPlace"
                                                    label="Search By BirthPlace" single-line small clearable>
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
                                                    :items="provinsiList" item-text="provinsi" item-value="provinsi"
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

                                                <v-text-field v-model="searchForm.editBankAccNo" label="" single-line
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
                                                Date Of Birth
                                            </v-col>

                                        </v-row>

                                        <v-row class="" no-gutters>
                                            <v-col class="pa-2 martop-min" outlined tile>

                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                    :return-value.sync="date" single-line transition="scale-transition"
                                                    offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="searchForm.date_of_birth"
                                                            label="BirthDate" prepend-icon="mdi-calendar" single-line
                                                            readonly v-bind="attrs" v-on="on" clearable></v-text-field>
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
                                                    :items="kabupatenList" single-line item-text="kabupaten"
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

                                                <v-text-field v-model="searchForm.editBankAccHolder"
                                                    label="Bank Acc. Holder" single-line small clearable>
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
                                                <v-text-field v-model="searchForm.editAddress" label="Address"
                                                    single-line small clearable>
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
                                                    :items="kecamatanList" item-text="kecamatan" item-value="kecamatan"
                                                    label="">
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

                                                <v-autocomplete v-model="searchForm.editReligion" :items="religion"
                                                    single-line item-text="text" item-value="value" label="Religion">
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

                                                <v-text-field v-model="searchForm.editKelurahan"
                                                    :disabled="curr_dis_kel" label="" single-line small clearable>
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

                                                <v-autocomplete v-model="searchForm.editGender" :items="gender"
                                                    single-line item-text="text" item-value="value" label="Gender">
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
                                                <v-text-field v-model="searchForm.editKodePos" label="" single-line
                                                    small clearable>
                                                </v-text-field>

                                            </v-col>
                                        </v-row>

                                    </v-col>
                                </v-col>

                            </v-row>


                            <v-row no-gutters>

                                <div style="width:100%;">

                                    <div style="float:right; margin-left:20px;">
                                        <v-btn color="success" small @click="editRequestVerif()" style="float:right;">
                                            <!-- <v-icon>mdi-chevron-left</v-icon> -->
                                            Submit <v-icon>mdi-chevron-right</v-icon>
                                        </v-btn>
                                    </div>

                                    <div style="float:left;">
                                        <v-btn color="success" small outlined @click="showDetails()"
                                            style="float:right;">
                                            <!-- <v-icon>mdi-chevron-left</v-icon> -->
                                            <v-icon>mdi-chevron-left</v-icon> Back
                                        </v-btn>
                                    </div>

                                </div>

                            </v-row>

                        </v-container>

                    </template>


                </template>

                <template v-if="editAct == false">

                    <v-container>

                        <v-row no-gutters>

                            <v-col sm="6" md="4">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Name
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.name }}
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

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.negara }}
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

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.bank_name }}
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

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.birth_place }}
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

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.provinsi }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="6" md="4">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>
                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Bank Acc Number
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.bank_acc_number }}
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
                                            Date of Birth
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.date_of_birth }}
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

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.kabupaten }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="6" md="4">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>
                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Bank Acc Holder
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.bank_acc_holder }}
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

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.address }}
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

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.kecamatan }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="6" md="4">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>
                                        <v-col class="pa-2" outlined tile>
                                            <div class="font-weight-bold"> Buku Tabungan </div>
                                            <div> <small> *click image for zooming </small> </div>
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>

                                            <v-col class="pa-2 text-right" outlined tile>
                                                <template>
                                                    <!-- <v-btn
                                color="red lighten-2"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                > -->
                                                    <img v-bind:src="detailsMember.tab_image" style="width:80px;"
                                                        @click="showImage(0)" />
                                                    <!-- </v-btn> -->
                                                </template>
                                            </v-col>

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
                                            Religion
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.religion }}
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

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.kode_post }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="6" md="4">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>
                                        <v-col class="pa-2" outlined tile>
                                            <div class="font-weight-bold"> Img Ktp </div>
                                            <div> <small> *click image for zooming </small> </div>
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>

                                            <template>
                                                <!-- <v-btn
                                color="red lighten-2"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                > -->
                                                <img v-bind:src="detailsMember.ktp_image" style="width:80px;"
                                                    @click="showImage(1)" />
                                                <!-- </v-btn> -->
                                            </template>

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

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.gender }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>


                            <v-col sm="6" md="4">

                                <v-col class="pa-2" outlined tile>


                                </v-col>

                            </v-col>

                            <v-col sm="6" md="4">

                                <v-col class="pa-2" outlined tile>


                                    <v-row no-gutters>

                                        <v-col class="pa-2" outlined tile>
                                            <div class="font-weight-bold"> Foto Selfie </div>
                                            <div> <small> *click image for zooming </small> </div>
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            <template>
                                                <!-- <v-btn
                                color="red lighten-2"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                > -->
                                                <img v-bind:src="detailsMember.slf_image" style="width:80px;"
                                                    @click="showImage(2)" />
                                                <!-- </v-btn> -->
                                            </template>

                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-col>
                        </v-row>

                    </v-container>

                </template>

            </template>

        </CustomCard>

        <template>

            <v-container>

                <v-row no-gutters>

                    <v-col sm="6" md="6">

                        <v-col sm="12" md="12">

                            <CustomCard>

                                <template v-slot:toolbar>

                                    <div style="width:100%;">

                                        <v-btn color="success" small outlined style="float:left;">
                                            <!-- <v-icon>mdi-chevron-left</v-icon> -->
                                            Data Register
                                        </v-btn>


                                    </div>

                                </template>


                                <template v-slot:datatable>

                                    <template>
                                        <v-container>
                                            <v-row no-gutters>

                                                <v-col sm="12" md="12">

                                                    <v-col class="pa-2" outlined tile>

                                                        <v-row no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                Name
                                                            </v-col>

                                                            <v-col class="pa-2 text-right" outlined tile>
                                                                {{ detailsMember.member_name }}
                                                            </v-col>

                                                        </v-row>

                                                        <v-row no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                Email
                                                            </v-col>

                                                            <v-col class="pa-2 text-right" outlined tile>
                                                                {{ detailsMember.new_email }}
                                                            </v-col>

                                                        </v-row>


                                                        <v-row no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                Phone
                                                            </v-col>

                                                            <v-col class="pa-2 text-right" outlined tile>
                                                                {{ detailsMember.member_phone }}
                                                            </v-col>

                                                        </v-row>

                                                        <v-row no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                Register date
                                                            </v-col>

                                                            <v-col class="pa-2 text-right" outlined tile>
                                                                {{ detailsMember.member_register }}
                                                            </v-col>

                                                        </v-row>

                                                        <v-row no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                Email Verified At
                                                            </v-col>

                                                            <v-col class="pa-2 text-right" outlined tile>
                                                                {{ detailsMember.member_register }}
                                                            </v-col>

                                                        </v-row>

                                                        <v-row no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                Trx Count
                                                            </v-col>

                                                            <v-col class="pa-2 text-right" outlined tile>
                                                                {{ detailsMember.member_trxCount }}
                                                            </v-col>

                                                        </v-row>

                                                        <v-row no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                Balance
                                                            </v-col>

                                                            <v-col class="pa-2 text-right" outlined tile>
                                                                {{ detailsMember.member_balance }}
                                                            </v-col>

                                                        </v-row>

                                                    </v-col>
                                                </v-col>
                                            </v-row>

                                        </v-container>

                                    </template>



                                </template>

                            </CustomCard>

                        </v-col>

                    </v-col>

                    <v-col sm="6" md="6">

                        <v-col sm="12" md="12">

                            <CustomCard>

                                <template v-slot:toolbar>

                                    <div style="width:100%;">

                                        <v-btn color="success" small outlined style="float:left;">
                                            <!-- <v-icon>mdi-chevron-left</v-icon> -->
                                            Approval Data Verify
                                        </v-btn>


                                    </div>

                                </template>


                                <template v-slot:datatable>

                                    <template>
                                        <v-container>

                                            <v-row no-gutters>

                                                <v-col sm="12" md="12">

                                                    <v-col class="pa-2" outlined tile>

                                                        <v-row no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                Pilih Status
                                                            </v-col>


                                                        </v-row>

                                                        <v-row style="margin-top:-30px;" no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                <v-autocomplete v-model="searchForm.statusApproval"
                                                                    auto-select-first :items="status_approval"
                                                                    item-text="text" item-value="value"
                                                                    label="Status Approval" singleLine
                                                                    @change="(event) => updateRegion(event, index)">
                                                                </v-autocomplete>
                                                            </v-col>


                                                        </v-row>

                                                        <v-row no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                Note
                                                            </v-col>


                                                        </v-row>

                                                        <v-row style="margin-top:-10px;" no-gutters>

                                                            <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                <v-textarea v-model="searchForm.notes"
                                                                    label="Input Note" singleLine outlined>
                                                                </v-textarea>
                                                            </v-col>


                                                        </v-row>

                                                        <v-row style="margin-top:-10px;" no-gutters>


                                                            <!-- <v-dialog
                                        v-model="dialog"
                                        :max-width="options.width"
                                        :style="{ zIndex: options.zIndex }"
                                        @keydown.esc="cancel"
                                    >
                                        <v-card>
                                        <v-toolbar dark :color="options.color" dense flat>
                                            <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
                                            {{ title }}
                                            </v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text
                                            v-show="!!message"
                                            class="pa-4 black--text"
                                            v-html="message"
                                        ></v-card-text>
                                        <v-card-actions class="pt-3">
                                            <v-spacer></v-spacer>
                                            <v-btn
                                            v-if="!options.noconfirm"
                                            color="grey"
                                            text
                                            class="body-2 font-weight-bold"
                                            @click.native="cancel"
                                            >Cancel</v-btn
                                            >
                                            <v-btn
                                            color="primary"
                                            class="body-2 font-weight-bold"
                                            outlined
                                            @click.native="agree"
                                            >OK</v-btn
                                            >
                                        </v-card-actions>
                                        </v-card>

                                    <v-col
                                    class="pa-2 font-weight-bold"
                                    outlined
                                    tile>
                                        <v-btn
                                            style="width:100%;"
                                            depressed
                                            rounded
                                            :color="saveButtonsStyle"
                                            >
                                            {{ save_teks }}
                                        </v-btn>
                                    </v-col>

                                </v-dialog> -->

                                                            <v-dialog transition="dialog-top-transition"
                                                                max-width="600">
                                                                <template v-slot:activator="{ on, attrs }">

                                                                    <v-col class="pa-2 font-weight-bold" outlined tile>
                                                                        <v-btn style="width:100%;" depressed rounded
                                                                            :color="saveButtonsStyle" v-bind="attrs"
                                                                            v-on="on">
                                                                            {{ save_teks }}
                                                                        </v-btn>
                                                                    </v-col>
                                                                    <!-- <span>Email Not Verified</span> -->

                                                                </template>

                                                                <template v-slot:default="dialog">
                                                                    <v-card>
                                                                        <v-toolbar :color="saveButtonsStyle" dark>{{
        save_teks
}} </v-toolbar>

                                                                        <v-container>

                                                                            <v-layout>
                                                                                <v-flex>
                                                                                    <div> Apakah anda yakin verifikasi
                                                                                        akun <b>{{
        detailsMember.member_name
}}</b> ?</div>
                                                                                    <hr />
                                                                                    <p></p>
                                                                                    <div>
                                                                                        Status<v-icon>mdi-chevron-right</v-icon>
                                                                                        <span
                                                                                            v-if="searchForm.statusApproval == 1">
                                                                                            <v-icon small
                                                                                                color="green">mdi-check</v-icon>
                                                                                            DiVerifikasi </span>
                                                                                        <span
                                                                                            v-if="searchForm.statusApproval == -2">
                                                                                            <v-icon small
                                                                                                color="red">mdi-block-helper</v-icon>
                                                                                            Ditolak </span>
                                                                                    </div>
                                                                                    <div> Notes
                                                                                        <v-icon>mdi-chevron-right</v-icon>
                                                                                        {{ searchForm.notes }}
                                                                                    </div>
                                                                                </v-flex>
                                                                            </v-layout>
                                                                            <!-- <v-layout>
                                        <v-flex>
                                            <v-text-field
                                                v-model="formLock.suspend_email"
                                                label="Block Reason"
                                                >
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                     -->
                                                                        </v-container>

                                                                        <v-card-actions class="justify-end">

                                                                            <v-btn text
                                                                                @click="dialog.value = false">Close</v-btn>
                                                                            <v-btn :color="saveButtonsStyle"
                                                                                @click="editVerification(dialog)">Submit</v-btn>
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </template>
                                                            </v-dialog>

                                                        </v-row>
                                                    </v-col>
                                                </v-col>
                                            </v-row>

                                        </v-container>

                                    </template>

                                </template>

                            </CustomCard>

                        </v-col>

                    </v-col>

                </v-row>
            </v-container>

        </template>

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
            currentPage: 1,
            decimals: "10.00",
            icons: "chevron-right",
            profiles: this.$store.state.auth.profile,
            editAct: false,
            detailsMember: "",
            selectedItem: "-2",
            tipe: [],
            provinsiList: [],
            kabupatenList: [],
            kecamatanList: [],
            kelurahanList: [],
            dis_kab: true,
            dis_kec: true,
            dis_kel: true,
            curr_dis_kab: true,
            curr_dis_kec: true,
            curr_dis_kel: true,
            curr_dis_prov: true,
            menu: null,
            form: {},
            dialog: false,
            resolve: null,
            reject: null,
            message: null,
            title: null,
            detailsFoto: [],
            titleFoto: ["Buku Tabungan", "Image KTP", "Image Selfie"],
            indexfoto: 0,
            options: {
                color: "grey lighten-3",
                width: 400,
                zIndex: 200,
                noconfirm: false
            },
            pagination: {},
            formLock: {

            },
            saveButtonsStyle: "error",
            save_teks: "Save Status Ditolak",
            status_approval: [
                { text: "Ditolak", value: "-2" },
                { text: "DiVerifikasi", value: "1" }
            ],
            searchForm: {
                member: '',
                statusApproval: "-2",
                // tipe: 'ALL',
                // status: 'ALL',
                // sponsor: ''
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
        showImage(index) {
            this.dialog = true;
            if (index == 3) {
                index = 0;
            }
            if (index == -1) {
                index = 2;
            }
            this.indexfoto = index;
        },
        showImagePrev(index) {
            this.dialog = true;
            if (index == 3) {
                index = 0;
            }
            if (index == -1) {
                index = 2;
            }
            this.indexfoto = index - 1;
        },
        showImageNext(index) {
            this.dialog = true;
            if (index == 3) {
                index = 0;
            }
            if (index == -1) {
                index = 2;
            }
            this.indexfoto = index + 1;
        },
        updateRegion(value, index) {
            console.log(value);
            console.log(index);
            if (value == -2) {
                this.saveButtonsStyle = "error"
                this.save_teks = "Save Status Ditolak"
            }
            else {
                this.saveButtonsStyle = "success"
                this.save_teks = "Save Status DiVerifikasi"
            }

            // how can I have here the index value?
        },
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
                .dispatch("member/fetchListMemberVerifyDetail", {
                    id_member: this.$store.state.member.member.listDetailVerify,
                })
                .then(() => {
                    //alert("tes-dd");
                    //console.log("itemsfetch",this.$store.state.member.member.listDetail[0]);
                    this.$store.commit("main/setLoading", false);
                    this.loading = false;
                    this.loadingtext = '';
                    this.detailsMember = this.$store.state.member.member.listDetailVerify[0];

                    this.detailsFoto.push(this.detailsMember.tab_image);
                    this.detailsFoto.push(this.detailsMember.ktp_image);
                    this.detailsFoto.push(this.detailsMember.slf_image);

                    console.log("detailMember", this.$store.state.member.member.listDetailVerify[0]);
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
            this.$store.commit("transaction/setMemberPageReqVer", "detail");
            this.$store.commit("transaction/setMemberDetail", item);
            //this.detailsName = "New Member";
        },
        showList() {
            this.$store.commit("member/setMemberPageReqVer", "list");
            this.$store.state.member.member.is_back = 1;
            //   this.$store.commit("transaction/setMemberDetail", item);
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
                        this.kabupatenList = this.$store.state.wilayah.wilayah.listKabupaten;
                        this.dis_kab = false;
                        //alert("fetched");
                    }

                    if (value == "kecamatan") {
                        this.kecamatanList = this.$store.state.wilayah.wilayah.listKecamatan;
                        this.dis_kec = false;
                        //alert("fetched");
                    }

                    if (value == "kelurahan") {
                        this.kelurahanList = this.$store.state.wilayah.wilayah.listKelurahan;
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
        showForms() {
            this.editAct = true;

            this.searchForm.editNik = this.detailsMember.nik;
            this.searchForm.editId = this.detailsMember.id;
            this.searchForm.editNama = this.detailsMember.name;
            this.searchForm.editProvinsi = this.detailsMember.provinsi;
            this.searchForm.editKabupaten = this.detailsMember.kabupaten;
            this.searchForm.editKecamatan = this.detailsMember.kecamatan;
            this.searchForm.editKelurahan = this.detailsMember.kelurahan;
            this.searchForm.editNegara = this.detailsMember.negara;

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

            if (this.detailsMember.provinsi != "") {
                this.getWilayah("kabupaten");
            }

            if (this.detailsMember.kabupaten != "") {
                this.getWilayah("kecamatan");
            }

            if (this.detailsMember.kecamatan != "") {
                this.getWilayah("kelurahan");
            }

        },
        showDetails() {
            this.editAct = false;
        },
        editRequestVerif: function () {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/editRequestVerification", {
                    reqId: this.searchForm.editId,
                    gender: this.searchForm.editGender,
                    religion: this.searchForm.editReligion,
                    birth_place: this.searchForm.editBirthPlace,
                    date_of_birth: this.searchForm.date_of_birth,
                    negara: this.searchForm.editNegara,
                    provinsi: this.searchForm.editProvinsi,
                    kabupaten: this.searchForm.editKabupaten,
                    kecamatan: this.searchForm.editKecamatan,
                    kelurahan: this.searchForm.editKelurahan,
                    kode_post: this.searchForm.editKodePos,
                    address: this.searchForm.editAddress,
                    bank_name: this.searchForm.editBankName,
                    bank_acc_number: this.searchForm.editBankAccNo,
                    bank_acc_holder: this.searchForm.editBankAccHolder,
                    updated_by: this.profiles.id,
                    userId: this.profiles.id
                })
                .then(() => {
                    //   this.$store.commit("main/setLoading", false);
                    //   this.loading = false;
                    //   this.loadingtext = '';
                    this.fetch();
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarSuccess", "Update Request Verify Success");
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
        editVerification: function (dialog) {
            this.$store
                .dispatch("member/editVerification", {
                    verifyid: this.detailsMember.id,
                    statusApproval: this.searchForm.statusApproval,
                    verifystatus: this.searchForm.statusApproval,
                    memberid: this.detailsMember.member_id,
                    notes: this.searchForm.notes,
                    updateId: this.profiles.id
                    // updateId: this.profiles.id,
                    // edit_phone:this.formLock.edit_phone
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
        },
        showDetailId: function (userId) {
            this.formLock.userId = userId
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
        this.fetch();
        this.fetchProv("");
        this.fetchBank("bank");


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
