<template>
  <div>
    <!-- <v-btn color="success" @click="fetch">Add New MemberS New Baru</v-btn> -->

    <CustomCard>

        <template v-slot:toolbar>
            <v-btn color="success" small outlined @click="filterToggle">
            filter <v-icon>mdi-chevron-down</v-icon>
            </v-btn>

        </template>

        <template v-slot:expansion>
            <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel expand focusable>
                <v-expansion-panel-content>
                    
                <v-layout>

                        <v-flex>
                            <v-text-field
                                v-model="searchForm.namefilter"
                                label="Search By Name"
                                small
                                clearable
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex>
                            <v-text-field
                                v-model="searchForm.tipe"
                                label="Search By Tipe"
                                small
                                clearable
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex>
                                <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                single-line
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="searchForm.actfromdate"
                                    label="Activity Log FromDate"
                                    prepend-icon="mdi-calendar"
                                    single-line
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    clearable
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="searchForm.actfromdate"
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
                                <v-menu
                                ref="menu2"
                                v-model="menu2"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                single-line
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="searchForm.actenddate"
                                    label="Activity Log FromDate"
                                    prepend-icon="mdi-calendar"
                                    single-line
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    clearable
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="searchForm.actenddate"
                                no-title
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu2 = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu2.save(date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    
                </v-layout>

                <v-layout>
                        <v-flex>
                            <v-text-field
                                v-model="searchForm.notes"
                                label="Note"
                                small
                                clearable
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex>
                            <v-text-field
                                v-model="searchForm.action"
                                label="Search By Action "
                                small
                                clearable
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex>
                            <v-text-field
                                v-model="searchForm.log_before"
                                label="Log Before"
                                small
                                clearable
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex>
                            <v-text-field
                                v-model="searchForm.log_after"
                                label="Log After"
                                small
                                clearable
                            >
                            </v-text-field>
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
                :items="$store.state.member.member.listLogs"
                :options.sync="pagination"
                :server-items-length="$store.state.member.member.totalLogs"
                :footer-props="{
                'items-per-page-options': [10, 25, 50, 100],
                'items-per-page-text': 'Baris per Halaman:',
                }"
                :items-per-page="10"
                :loading="loading"
                :loading-text="loadingtext">

                    <template v-slot:[`item.tipe_act`]="{ item }">
                        <div>  <b>{{ item.tipe }}</b> </div>
                        <div>  {{ item.action }} </div>
                        <div>  {{ item.tukangupdate.name }} </div>
                        <div>  {{ item.updated_at | moment("add", "-1 hours") | moment("YYYY-MM-DD HH:mm:ss")  }} </div>
                    </template>

                    <template v-slot:[`item.created_at_formatted`]="{ item }">
                        <div> {{ item.created_at | moment("add", "-1 hours") | moment("YYYY-MM-DD HH:mm:ss") }} </div>
                    </template>

                    <template v-slot:[`item.log_items`]="{ item }">
                        <div>       
                               <small> {{ item.before}} </small>
                               <hr />
                               <small> {{ item.after}} </small>
                        </div>
                    </template>

                    

            </v-data-table>

        </v-flex>

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
      profiles:this.$store.state.auth.profile,
      provinsiList:[],
      currentPage:1,
      decimals:"10.00",
      icons:"chevron-right",
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
        { text: "Date", value: "created_at_formatted" , align: "left" , width:120},
        { text: "Tipe / Action / Update By", align: "left", value: "tipe_act" , width:250},
        { text: "Note", align: "left", value: "note"},
        { text: "Log ( Before & After )", value: "log_items"}
      ],
      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
    fetchProv(params){
        this.$store
            .dispatch("wilayah/fetchWilayah", {
                find: params,
            })
            .then(() => {
                this.provinsiList = this.$store.state.wilayah.wilayah.list;
            })
            .catch((res) => {
                console.log("prov" , res.response.data.message);
            });
    },
    fetch(cari) {
      if(cari == 1){
          this.pagination.page = 1;
      }
      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';

      //alert("limits "+this.pagination.itemsPerPage);
      
      this.$store
        .dispatch("member/fetchListMemberLogs", {
            page: this.pagination.page,
            itemsPerPage: this.pagination.itemsPerPage,
            filterActivityTipe:this.searchForm.tipe,
            filterActivityAction:this.searchForm.action,
            filterActivityNote:this.searchForm.notes,
            filterActivityLogbefore:this.searchForm.log_before,
            filterActivityLogafter:this.searchForm.log_after,
            filterActivityStartdate:this.searchForm.actfromdate,
            filterActivityEnddate:this.searchForm.actenddate,
            namefilter:this.searchForm.namefilter
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
    this.fetchProv("provinsi");
    //alert(this.profiles.id);
    //this.fetchTotal("");
  },
  watch: {
    pagination() {
        //alert(this.$store.state.member.member.is_back);
        if(this.$store.state.member.member.is_back != 1){
            this.loading = true
            this.loadingtext = 'Loading... Please wait'
            // alert("tes");
            //console.log("user_con" , "nils "+this.profiles.id);
            //alert("tes");
            
            this.fetch(0)
        }

        if(this.$store.state.member.member.is_back == 1){
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
  components: { CustomCard },
};
</script>

<style>
</style>