<template>
  <div>
    <!-- <v-btn color="success" @click="fetch">Detail Member</v-btn> -->
    <p></p>

     <CustomCard>

            <template v-slot:toolbar>
                <v-btn color="success" small outlined @click="showList()">
                    <v-icon>mdi-chevron-left</v-icon> Back to List
                </v-btn>
            </template>

            <template v-slot:datatable>
                <v-flex md12 style="overflow-x: scroll">
                    
                    <v-data-table
                        :headers="headers"
                        :items="$store.state.member.member.listDetail"
                        :loading="loading"
                        :loading-text="loadingtext"
                    >

                    <template v-slot:[`item.verified_date`]="{ item }">
                            <div>  {{ item.verified_at }} </div>
                            <div style="margin-top:-5px;"> <small> {{ item.verified_time }} </small> </div>
                            <!-- <div style="margin-top:-5px;"> <small> {{ item.real_gramasi }} </small> </div>
                            <div style="margin-top:-5px;"> <small> GR </small> </div> -->
                    </template>

                    <template v-slot:[`item.em_verified`]="{ item }">

                        <div style="text-align:center;">
                            <div v-if="item.email_verified == 0" style="color:red;"> 
                                <v-icon small color="red">mdi-block-helper</v-icon> 
                                <div style="margin-top:-5px;"> <small> Not Verified </small> </div>
                            </div>
                            <div v-if="item.email_verified == 1" style="color:green;"> 
                                <v-icon small color="green">mdi-check</v-icon> 
                                <div style="margin-top:-5px;"> <small>  Verified </small> </div>
                            </div>    
                        </div>

                    </template>

                    <template v-slot:[`item.verified`]="{ item }">
                        <div style="text-align:center;">
                           
                            <div v-if="item.verified == 0" style="color:red;"> 
                                <v-icon small color="red">mdi-block-helper</v-icon> 
                                <div style="margin-top:-5px;"> <small> Not Verified </small> </div>
                            </div>
                            <div v-if="item.verified == 1" style="color:green;"> 
                                <v-icon small color="green">mdi-check</v-icon> 
                                <div style="margin-top:-5px;"> <small>  Verified </small> </div>
                            </div>
                    </div>
                    </template>

                    <template v-slot:[`item.action`]="{ item }">
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
                                @click="showLock(item.id,item.name , item.new_email , item.phone)"
                            >
                                <v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                            </template>
                            <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar
                                color="success"
                                dark
                                >Form Edit Detail Member</v-toolbar>

                                <v-layout style="display:none;">

                                    <v-text-field
                                        v-model="formLock.userId"
                                        label=""
                                        hidden
                                        >
                                    </v-text-field>

                                </v-layout>

                                <v-container>

                                    <v-layout>
                                        <v-flex>
                                            <v-text-field
                                                v-model="formLock.edit_name"
                                                label="Name"
                                                >
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>

                                     <v-layout>
                                        <v-flex>
                                            <v-text-field
                                                v-model="formLock.edit_email"
                                                label="Email"
                                                >
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>

                                     <v-layout>
                                        <v-flex>
                                            <v-text-field
                                                v-model="formLock.edit_phone"
                                                label="Phone"
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
                                    @click="editProfiles(dialog)"
                                >Submit</v-btn>
                                </v-card-actions>
                            </v-card>
                            </template>
                    </v-dialog>
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
                                v-if="item.email_verified == 1 && item.is_block == false"
                                @click="showLock(item.id,item.name , item.new_email , item.phone)"
                            >
                                <v-icon small>mdi-block-helper</v-icon>
                            </v-btn>

                            </template>
                            <span>Email Not Verified</span>
                            <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar
                                color="success"
                                dark
                                >UnVerified Email </v-toolbar>
                                
                                <v-container>

                                    <v-layout>
                                        <v-flex>
                                            Yakin anda akan melakukan Unverified Email atas user ini? Request Email Verifikasi sebelumnya akan di unverified
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
                                    
                                <v-btn
                                    text
                                    @click="dialog.value = false"
                                >Close</v-btn>
                                <v-btn
                                    color="success"
                                    @click="userUnverify(dialog)"
                                >Submit</v-btn>
                                </v-card-actions>
                            </v-card>
                            </template>
                </v-dialog>

                <v-dialog
                            transition="dialog-top-transition"
                            max-width="600"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="warning"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                v-if="item.verified == 1 && item.is_block == false"
                                @click="showLock(item.id,item.name , item.new_email , item.phone)"
                            >
                                <v-icon small>mdi-block-helper</v-icon>
                            </v-btn>
                            </template>
                            <span>Unverified User</span>
                            <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar
                                color="success"
                                dark
                                >Unverified User Account</v-toolbar>

                                <v-container>

                                    <v-layout>
                                        <v-flex>
                                            Yakin anda akan melakukan Unverified atas user ini? Request Verifikasi sebelumnya akan di unverified
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
                                    @click="userUnverify(dialog)"
                                >Unverified This Account</v-btn>
                                </v-card-actions>
                            </v-card>
                            </template>
                </v-dialog>

                <v-dialog
                            transition="dialog-top-transition"
                            max-width="600"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="danger"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                v-if="item.is_block == false"
                                @click="showDetailId(item.id)"
                            >
                                <v-icon small>mdi-block-helper</v-icon>
                            </v-btn>
                            </template>
                            
                            <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar
                                color="success"
                                dark
                                >Suspend User Account </v-toolbar>

                                <v-layout style="display:none;">

                                    <v-text-field
                                        v-model="formLock.userId"
                                        label=""
                                        hidden
                                        >
                                    </v-text-field>

                                </v-layout>

                                <v-container>

                                <v-layout>
                                    <v-flex>
                                        Yakin anda akan melakukan Suspend atas user ini?
                                    </v-flex>
                                </v-layout>

                                <v-layout>
                                        <v-flex>
                                            <v-text-field
                                                v-model="formLock.suspend_reason"
                                                label="Suspend Reason"
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
                                    @click="userSuspend(dialog)"
                                >Suspend User Account</v-btn>
                                </v-card-actions>
                            </v-card>
                            </template>
                </v-dialog> 

                <v-dialog
                            transition="dialog-top-transition"
                            max-width="600">
                        <template v-slot:activator="{ on, attrs }">
                            
                            <v-btn
                                color="success"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                v-if="item.is_block == true"
                                @click="showDetailId(item.id)"
                            >
                                <v-icon small>mdi-check</v-icon>
                            </v-btn>

                        </template>
                            
                            <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar
                                color="success"
                                dark
                                >UnSuspend User Account {{ item.is_block }}</v-toolbar>

                                <v-text-field
                                    v-model="formLock.userId"
                                    label=""
                                    hidden
                                    >
                                </v-text-field>

                                <v-container>

                                <v-layout>
                                    <v-flex>
                                        Yakin anda akan melakukan UnSuspend atas user ini?
                                    </v-flex>
                                </v-layout>

                                <v-layout>

                                    <v-flex>
                                        <v-text-field
                                            v-model="formLock.suspend_reason"
                                            label="UnSuspend Reason"
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
                                    @click="userUnSuspend(dialog)"
                                >UnSuspend User Account</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                </v-dialog>
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

                    </v-data-table>
                </v-flex>
    </template>
</CustomCard>


<p></p>

<CustomCard>

<template v-slot:toolbar>
    <v-btn color="success" small outlined @click="showList()" v-if="detailsMember.verified == 1">
        <!-- <v-icon>mdi-chevron-left</v-icon> -->
        Data Verify 
    </v-btn>

    <v-btn color="success" small outlined @click="showList()" v-if="detailsMember.verified == 0">
        <!-- <v-icon>mdi-chevron-left</v-icon> -->
        Not Verified
    </v-btn>

</template>


<template v-if="detailsMember.verified == 1" v-slot:datatable>

     <template>

        <v-container>

            <v-row
                no-gutters>

            <v-col
                    sm="5"
                    md="6">

                <v-col
                class="pa-2"
                outlined
                tile>

                <v-row
                no-gutters>

                    <v-col
                    class="pa-2 font-weight-bold"
                    outlined
                    tile>
                        NIK
                    </v-col>

                    <v-col
                    class="pa-2 text-right"
                    outlined
                    tile>
                        {{ detailsMember.nik }}
                    </v-col>

                </v-row>

                </v-col>

            </v-col>


            <v-col
                    sm="5"
                    md="6">

                <v-col
                class="pa-2"
                outlined
                tile>

                <v-row
                no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Provinsi
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                                {{ detailsMember.provinsi }}
                        </v-col>

                </v-row>

                </v-col>

            </v-col>

    </v-row>

    <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Birth Place
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            {{ detailsMember.birth_place }}
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Kabupaten
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.kabupaten }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>


     <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Date of Birth
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            {{ detailsMember.date_of_birth }}
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Kecamatan
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.kecamatan }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>

     <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Religion
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            {{ detailsMember.religion }}
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Kelurahan
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.new_email }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>

    <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Gender
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            {{ detailsMember.gender }}
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Address New
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.address }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>

     <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Bank Name
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            {{ detailsMember.bank_name_detail }}
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Kode Pos
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.kode_post }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>

     <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Bank ACC. No.
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            {{ detailsMember.bank_acc_number }}
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Current Provinsi
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.current_provinsi }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>

     <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Bank Acc. Holder
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            {{ detailsMember.bank_acc_holder }}
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Current Kabupaten
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.current_kabupaten }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>

     <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Buku Tabungan
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            <img v-bind:src="detailsMember.tab_image" style="width:80px;" />
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Current Kecamatan
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.current_kecamatan }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>

     <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            KTP
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            <v-dialog
                                v-model="dialog"
                                width="500"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <!-- <v-btn
                                    color="red lighten-2"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    > -->
                                    <img v-bind:src="detailsMember.ktp_image" style="width:80px;"  v-bind="attrs"
                                    v-on="on" />
                                    <!-- </v-btn> -->
                                </template>

                                <v-card>
                                    <v-card-title class="text-h5 primary-colors text-light" style="color:#FFF;">
                                     KTP Images
                                    </v-card-title>

                                    <v-card-text style="margin-top:20px;">
                                       <img v-bind:src="detailsMember.ktp_image" style="width:100%;" />
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
                                
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

<v-col
    sm="5"
    md="6">

    <v-col
        class="pa-2"
        outlined
        tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Current Kelurahan
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.current_kelurahan }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>

     <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Foto Selfie
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            <v-dialog
                                v-model="dialog"
                                width="500"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <!-- <v-btn
                                    color="red lighten-2"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    > -->
                                    <img v-bind:src="detailsMember.slf_image" style="width:80px;"  v-bind="attrs"
                                    v-on="on" />
                                    <!-- </v-btn> -->
                                </template>

                                <v-card>
                                    <v-card-title class="text-h5 primary-colors text-light" style="color:#FFF;">
                                     Self Images
                                    </v-card-title>

                                    <v-card-text style="margin-top:20px;">
                                       <img v-bind:src="detailsMember.slf_image" style="width:100%;" />
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
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Current Address
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.new_email }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>

     <v-row
        no-gutters>

        <v-col
            sm="5"
            md="6">

            <v-col
                    class="pa-2"
                    outlined
                    tile>

                    <v-row
                    no-gutters>

                        <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Birth Place
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            {{ detailsMember.new_email }}
                        </v-col>

                    </v-row>

                    </v-col>

                </v-col>

                <v-col
                        sm="5"
                        md="6">

                    <v-col
                    class="pa-2"
                    outlined
                    tile>

                        <v-row
                        no-gutters>

                                <v-col
                                class="pa-2 font-weight-bold"
                                outlined
                                tile>
                                    Current Kode Pos
                                </v-col>

                                <v-col
                                class="pa-2 text-right"
                                outlined
                                tile>
                                    {{ detailsMember.new_email }}
                                </v-col>

                        </v-row>

                    </v-col>

                </v-col>

    </v-row>


    </v-container>

</template>

</template>

</CustomCard>

  </div>
</template>

<script>
import CustomCard from "../../../../../components/CustomCard.vue";



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
      profiles:this.$store.state.auth.profile,
      detailsMember:"",
      tipe: [],
      menu: null,
      form: {},
      pagination: {},
      formLock:{

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
      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
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
      this.$store.commit("transaction/setMemberPage", "detail");
      this.$store.commit("transaction/setMemberDetail", item);
      //this.detailsName = "New Member";
    },
    showList() {
      this.$store.commit("member/setMemberPage", "list");
      this.$store.state.member.member.is_back = 1;
    //   this.$store.commit("transaction/setMemberDetail", item);
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
