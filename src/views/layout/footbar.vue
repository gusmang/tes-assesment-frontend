<template>
    <div>
        <v-footer app
            style="background:#0B2627!important; padding-top: 3rem!important; position:static; padding-bottom: 3rem!important;">
            <v-container class="footers_container">
                <v-row style="justify-content:center;">

                    <v-col md="5" cols="12">
                        <div class="style_bar">
                            <h4 style="color:#FFFFFF; font-size:21px; font-weight:normal;"> Layanan Pelanggan </h4>
                        </div>
                        <div>
                            <ul>
                                <li> <a href="#"> Tentang Kami </a> </li>
                                <li> <a href="#"> Bantuan </a> </li>
                                <li> <a href="#"> Panduan </a> </li>
                                <li> <a href="#"> Tanya Jawab </a> </li>
                                <li>
                                    <div class="btn btn-lg mr-2 border text-white-50"
                                        style="background-color: #81999b; border-radius:30px; margin-top:20px; font-size:24px; color:white;">
                                        <v-icon style="font-size:32px;  color:white;">mdi-whatsapp</v-icon> 08123456789
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </v-col>

                    <v-col md="4" cols="12">

                        <div class="style_bar">
                            <h4 style="color:#FFFFFF; font-size:21px; font-weight:normal;"> Browse Info </h4>
                        </div>

                        <div>
                            <ul>
                                <li> <a href="#"> Blog </a> </li>
                                <li> <a href="#"> Kebijakan Privasi </a> </li>
                                <li> <a href="#"> Syarat dan Ketentuan </a> </li>
                                <li> <a href="#"> Karir </a> </li>
                                <li> <a href="#"> Kebijakan Privasi </a></li>
                            </ul>
                        </div>
                    </v-col>

                    <v-col md="3" cols="12">

                        <div class="style_bar">
                            <h4 style="color:#FFFFFF; font-size:21px; font-weight:normal;"> Sosial Media </h4>
                        </div>

                        <div>
                            <v-icon class="icon-footers"
                                style="color:#FFFFFF; font-size:48px; margin-right:10px;">mdi-facebook</v-icon>
                            <v-icon class="icon-footers"
                                style="color:#FFFFFF; font-size:48px; margin-right:10px;">mdi-instagram</v-icon>
                            <v-icon class="icon-footers"
                                style="color:#FFFFFF; font-size:48px; margin-right:10px;">mdi-twitter</v-icon>
                        </div>

                    </v-col>

                </v-row>
            </v-container>
            <!-- <v-col class="text-center footerStyle" cols="12">
                2022 — Dinaran.id - PT. Ciptalintang Aji Dana. All Rights Reserved. version 2.0.0
            </v-col> -->
        </v-footer>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.v-navigation-drawer--fixed {
    z-index: 1;
}

.style_bar {
    margin-bottom: 30px;
}

.footers_container ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footers_container ul li {
    padding: 4px 0px;
    margin: 0;
}

.footers_container ul li a {
    color: #81999b;
    text-decoration: none;
}

.footers_container ul li a:hover {
    color: #fd7e14;
}


.style_bar::after {
    height: 2px;
    background-color: #F7962A;
    width: 40px;
    display: block;
    content: "";
    margin: 16px 0px 0px 0px;
}

.header-jadwal-table {
    background-color: #F5F5F5;
}

.padLeft20 {
    padding-left: 20px !important;
}

.pad20 {
    padding: 20px 0 !important;
    border-top: 1px solid #DDD;
    border-bottom: 1px solid #DDD;
    padding: 15px 0;
}

.padnoBorder20 {
    padding: 20px 0 !important;
}


.hidden {
    display: none;
}

.hiddenpad {
    padding: 10px;
    display: none;
}

.pad10 {
    padding: 10px;
}

.rowStyles {
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
}

.sub-items-tables {
    margin-left: 20px;
}

.primary-colors {
    background: rgb(16, 121, 72) !important;
}

.no-pad-left {
    padding-left: 0 !important;
    margin-left: 0 !important;
}

.martop-min {
    margin-top: -25px;
}

.icon-footers {
    font-size: 32px;
    color: #FFFFFF;
}

.btn-group-lg>.btn,
.btn-lg {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    border-radius: 0.3rem;
}

.btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>