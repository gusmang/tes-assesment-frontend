<template>
  <div>
    <!-- <v-btn color="success" @click="fetch">Add New MemberS New Baru</v-btn> -->
    <ModalForm></ModalForm>

    <CustomCard>
      <template v-slot:toolbar>
        <div style="width: 100%">
          <v-btn
            color="success"
            small
            outlined
            @click="filterToggle"
            style="float: left"
          >
            filter <v-icon>mdi-chevron-down</v-icon>
          </v-btn>

          <v-btn
            color="success"
            small
            outlined
            @click="fetch(pagination.page, '')"
            style="float: right"
          >
            <v-icon>mdi-refresh</v-icon> Refresh
          </v-btn>
        </div>
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
                    clearable
                    @keyup.13="fetch(1)"
                  >
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
                      <v-btn text color="primary" @click="menu = false">
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
                    v-model="searchForm.emoney"
                    :items="emoney"
                    item-text="text"
                    item-value="value"
                    label="EMoney Tipe"
                  >
                  </v-autocomplete>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex>
                  <v-text-field
                    v-model="searchForm.number"
                    label="EMoney Number"
                    single-line
                    small
                    clearable
                  >
                  </v-text-field>
                </v-flex>

                <v-flex>
                  <v-autocomplete
                    v-model="searchForm.status_verifikasi"
                    :items="status"
                    item-text="text"
                    item-value="value"
                    label="Status Verifikasi"
                  >
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
                  @click="fetch(1, 'cari')"
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
            :items="$store.state.member.member.listMemberVeMoney"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="id"
            show-expand
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
            <!-- <template v-slot:item="{ item, index }">
                    <tr>
                        <td>
                            {{ item.created_at }}
                        </td>
                        <td>
                            <div>  <b> {{ item.member.name != null ? item.member.name : ""  }} </b> </div>
                            <div>  {{ item.member.email }} </div>
                            <div>  {{ item.member.phone }} </div>
                        </td>
                        <td style="text-align: right">
                            <div> {{ item.emoney_tipe }} </div>
                        </td>
                        <td style="text-align: right">
                            <div>  {{ item.emoney_number }}</div>
                        </td>
                        <td>
                            <div>  {{ item.verified }}</div>
                        </td>
                        <td>
                            <div> {{ item.tukangupdateAs }}</div>
                        </td>
                        <td>
                            <div> 
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="success"
                                        icon
                                        @click="showDetail(item)"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon small>mdi-eye</v-icon>
                                    </v-btn>
                                    </template>
                                    <span>Detail</span>
                                </v-tooltip>
                            </div>
                        </td>
                    </tr>
                </template> -->

            <template v-slot:[`item.members`]="{ item }">
              <div>
                <b> {{ item.member.name != null ? item.member.name : "" }} </b>
              </div>
              <div>{{ item.member.email }}</div>
              <div>{{ item.member.phone }}</div>
            </template>

            <template v-slot:[`item.trxCount`]="{ item }">
              <div>
                <b> {{ item.trxCount }} </b> <br />
              </div>
              <div><small> TRX </small></div>
            </template>

            <template v-slot:[`item.bal_gramasi`]="{ item }">
              <div>
                <b> {{ item.bal_gramasi }} </b> <br />
              </div>
              <div style="margin-top: -5px">
                <small> {{ item.real_gramasi }} </small>
              </div>
              <div style="margin-top: -5px"><small> GR </small></div>
            </template>

            <template v-slot:[`item.lock_balance`]="{ item }">
              <div style="text-align: right">
                <div>
                  <small>
                    Emas Impian
                    <v-icon small @click="showExpand($event, item.id)"
                      >mdi-chevron-right</v-icon
                    >
                    <b> {{ item.lock_emasimpian }} </b>
                  </small>
                </div>
                <div style="margin-top: -5px">
                  <small>
                    Dinaran
                    <v-icon small @click="showExpand($event, item.id)"
                      >mdi-chevron-right</v-icon
                    >
                    <b> {{ item.lock_dinaran }} </b>
                  </small>
                </div>
                <div style="margin-top: -5px">
                  <small>
                    User
                    <v-icon small @click="showExpand($event, item.id)"
                      >mdi-chevron-right</v-icon
                    >
                    <b> {{ item.lock_user }} </b>
                  </small>
                </div>
              </div>
            </template>

            <template v-slot:[`item.verified_date`]="{ item }">
              <div>{{ item.verified_at }}</div>
              <div style="margin-top: -5px">
                <small> {{ item.verified_time }} </small>
              </div>
              <!-- <div style="margin-top:-5px;"> <small> {{ item.real_gramasi }} </small> </div>
                      <div style="margin-top:-5px;"> <small> GR </small> </div> -->
            </template>

            <!-- <template v-slot:[`item.real_gramasi`]="{ item }">
                      <div>  <b> {{ item.real_gramasi }} </b> <br /> </div>
                      <div> <small> GR </small> </div>
              </template> -->

            <template v-slot:[`item.tukangupdateAs`]="{ item }">
              <div>
                <b> {{ item.tukangupdate }} </b>
              </div>
              <div>
                <small> {{ item.updated_at }} </small>
              </div>
            </template>

            <template v-slot:[`item.verified`]="{ item }">
              <div style="text-align: center">
                <div v-if="item.is_verified == 0" style="color: black">
                  <v-icon small color="black">mdi-block-helper</v-icon>
                  <div style="margin-top: -5px">
                    <small> Request Verifikasi </small>
                  </div>
                  <div>
                    <small>{{ item.created_at }}</small>
                  </div>
                </div>
                <div v-if="item.is_verified == -1" style="color: red">
                  <v-icon small color="red">mdi-block-helper</v-icon>
                  <div style="margin-top: -5px">
                    <small> Verifikasi Ditolak </small>
                  </div>
                  <div>
                    <small>{{ item.updated_at }}</small>
                  </div>
                </div>
                <div v-if="item.is_verified == 1" style="color: green">
                  <v-icon small color="green">mdi-check</v-icon>
                  <div style="margin-top: -5px">
                    <small> Terverifikasi </small>
                  </div>
                  <div>
                    <small>{{ item.updated_at }}</small>
                  </div>
                </div>
              </div>
            </template>

            <template v-slot:[`item.action`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    icon
                    @click="showDetail(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
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

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                {{ item.note }}
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </template>
    </CustomCard>
  </div>
</template>
  
  <script>
import CustomCard from "../../../../components/CustomCard.vue";
import ModalForm from "./component/modalform.vue";

export default {
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
      panel: null,
      profiles: this.$store.state.auth.profile,
      detailsEmoney: this.$store.state.member.member.DetailEmoney,
      dialogEmoney: false,
      provinsiList: [],
      bankList: [],
      currentPage: 1,
      decimals: "10.00",
      icons: "chevron-right",
      status: [
        { text: "All Status", value: "all" },
        { text: "Request Verifikasi", value: "0" },
        { text: "TerVerifikasi", value: "1" },
        { text: "Ditolak", value: "-1" },
        // { text: "Gagal", value: "2" },
      ],
      json_fields: {
        Id: "id",
        Name: "name",
        Email: "email",
      },
      gender: [
        { text: "All Gender", value: "" },
        { text: "Laki-Laki", value: "Laki-Laki" },
        { text: "Perempuan", value: "Perempuan" },
        // { text: "Gagal", value: "2" },
      ],
      emoney: [
        { text: "All", value: "" },
        { text: "Ovo", value: "ovo" },
        { text: "Dana", value: "dana" },
        { text: "GoPay", value: "gopay" },
        { text: "ShopeePay", value: "shopeepay" },
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
        member: "",
        // tipe: 'ALL',
        // status: 'ALL',
        // sponsor: ''
      },
      formLock: {
        notes: "",
      },
      tipe: [],
      menu: null,
      form: {},
      pagination: {},
      headers: [
        { text: "Request Date", value: "created_at", width: 110 },
        { text: "Member", align: "left", value: "members", width: 80 },
        { text: "Tipe", align: "center", value: "emoney_tipe" },
        { text: "Number", align: "center", value: "emoney_number" },
        { text: "Status", value: "verified" },
        { text: "Update by", value: "tukangupdateAs", width: 110 },
        { text: "Action", align: "center", value: "action" },
        { text: "", value: "data-table-expand" },
      ],
      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
    editVerification: function (code) {
      this.$store.commit("main/setLoading", true);

      this.$store
        .dispatch("member/editMemberVerifEmoney", {
          updateId: this.profiles.id,
          code: code,
          id: this.detailsEmoney.id,
          note: this.formLock.notes,
        })
        .then(() => {
          this.fetch(this.pagination.page, "cari");
          this.dialogEmoney = false;
          this.$store.commit("main/setLoading", false);
          this.$store.commit(
            "main/setSnackbarSuccess",
            "Update Data Member Successfull"
          );
          // this.fetch(this.$store.state.member.searchParams.page);
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res);
          this.loading = false;
          this.loadingtext = "";
        });
    },
    fetch(cari, action) {
      //alert(action);
      if (action == "cari") {
        //this.$store.state.member.searchParams.page = 1;
        //alert("cr" + this.pagination.page);
        this.pagination.page = 1;
      }

      if (cari == 1) {
        this.$store.state.member.searchParams.page = 1;
      }

      (this.$store.state.member.searchParams.status =
        this.searchForm.status_verifikasi),
        (this.$store.state.member.searchParams.tipe = this.searchForm.emoney),
        (this.$store.state.member.searchParams.number = this.searchForm.number),
        (this.$store.state.member.searchParams.tanggal = this.searchForm.date),
        (this.$store.state.member.searchParams.name = this.searchForm.member);

      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = "Loading... Please wait";

      this.$store
        .dispatch("member/fetchListMemberVerifyEmoney", {
          page: this.$store.state.member.searchParams.page,
          itemsPerPage: this.$store.state.member.searchParams.itemsPerPage,
          status: this.$store.state.member.searchParams.status,
          tipe: this.$store.state.member.searchParams.tipe,
          number: this.$store.state.member.searchParams.number,
          tanggal: this.$store.state.member.searchParams.tanggal,
          name: this.$store.state.member.searchParams.name,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = "";
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = "";
        });
    },
    filterToggle() {
      if (this.panel == null)
        this.panel = [...Array(this.items).keys()].map((k, i) => i);
      else this.panel = null;
    },
    showDetail(item) {
      this.$store.state.member.member.dialogEmoney = true;
      this.$store.state.member.member.DetailEmoney = item;
      // //   this.$store.commit("member/setMemberPageEmoney", "detail");
      //   this.loading = false;
      //   this.loadingtext = '';
    },
    showExpand: function (element, index) {
      const detailElement = document.getElementById(index);
      if (detailElement.classList.contains("hidden")) {
        element.target.classList.remove("mdi-chevron-right");
        element.target.classList.add("mdi-chevron-down");
        detailElement.classList.remove("hidden");
        //this.icons = "chevron-down";
      } else {
        element.target.classList.add("mdi-chevron-right");
        element.target.classList.remove("mdi-chevron-down");
        detailElement.classList.add("hidden");
        //this.icons = "chevron-right";
      }
    },
    showLock: function (userId, real_gramasi, lock_user, lock_dinaran) {
      this.formLock.userId = userId;
      this.formLock.last_balance = real_gramasi;
      this.formLock.lock_user = lock_user;
      this.formLock.lock_dinaran = lock_dinaran;
    },
    submitLock: function (dialog) {
      //this.$store.commit("main/setLoading", true);
      this.$store
        .dispatch("member/postLockGold", {
          userId: this.formLock.userId,
          lockdinaran: this.formLock.lock_dinaran,
          lockuser: this.formLock.lock_user,
          updateId: this.profiles.id,
          page: this.pagination.page,
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
          this.loadingtext = "";
        });
    },
  },
  mounted() {},
  watch: {
    pagination() {
      this.loading = true;
      this.loadingtext = "Loading... Please wait";
      this.$store.state.member.searchParams.page = this.pagination.page;
      this.fetch(0, "");
    },
    searchSponsor(val) {
      val && val !== this.searchForm.sponsor && this.getSponsor(val);
    },
    searchMember(val) {
      val && val !== this.searchForm.member && this.getMember(val);
    },
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
  components: { CustomCard, ModalForm },
};
</script>
  
  <style>
</style>
  