<template>
  <div>
    <v-container grid-list-xs fluid>

        <v-row
          no-gutters>

              <v-col
                  sm="6"
                  md="6"
                  class="padnoBorder20">
                    <v-col
                    sm="12"
                    md="12">
                      <CustomCard>
                          <template v-slot:toolbar>
                              <v-btn color="success" small outlined>
                                  10 High Balance tes
                              </v-btn>
                          </template>

                         <template v-slot:datatable>
                            <v-flex md12 style="overflow-x: scroll">
                                <v-data-table
                                    :headers="headers"
                                    :items="$store.state.member.member.rankListBal"
                                    :loading="loading"
                                    :loading-text="loadingtext">
                                </v-data-table>
                            </v-flex>
                          </template>
                      </CustomCard>
                    </v-col>
              </v-col>

              <v-col
                  sm="6"
                  md="6"
                  class="padnoBorder20">
                    <v-col
                    sm="12"
                    md="12">
                      <CustomCard>
                          <template v-slot:toolbar>
                              <v-btn color="success" small outlined>
                                  10 Best Active
                              </v-btn>
                          </template>
                      </CustomCard>
                    </v-col>
              </v-col>

        </v-row>

        <v-row
          no-gutters>

              <v-col
                  sm="6"
                  md="6"
                  class="padnoBorder20">

                  <v-col
                  sm="12"
                  md="12">
                    <CustomCard>
                        <template v-slot:toolbar>
                            <v-btn color="success" small outlined>
                                10 Best Buy (May 2022)
                            </v-btn>
                        </template>

                        <template v-slot:datatable>
                          <v-flex md12 style="overflow-x: scroll">
                              <v-data-table
                                  :headers="headers"
                                  :items="$store.state.member.member.rankListBal"
                                  :loading="loading"
                                  :loading-text="loadingtext">
                              </v-data-table>
                          </v-flex>
                        </template>
                    </CustomCard>
                  </v-col>
              </v-col>

              <v-col
                  sm="6"
                  md="6"
                  class="padnoBorder20">
                    <v-col
                    sm="12"
                    md="12">
                      <CustomCard>
                          <template v-slot:toolbar>
                              <v-btn color="success" small outlined>
                                  10 Best Sell (May 2022)
                              </v-btn>
                          </template>

                         <template v-slot:datatable>
                            <v-flex md12 style="overflow-x: scroll">
                                <v-data-table
                                    :headers="headers"
                                    :items="$store.state.member.member.rankListBal"
                                    :loading="loading"
                                    :loading-text="loadingtext">
                                </v-data-table>
                            </v-flex>
                          </template>
                      </CustomCard>
                    </v-col>
              </v-col>

        </v-row>
        
    </v-container>
  </div>
</template>


<script>
//import CustomCard from "../../../../components/CustomCard.vue";
import CustomCard from "../../components/CustomCard.vue";


export default {
  data() {
    return {
      tipe: [],
      menu: null,
      form: {},
      nowMonth:"",
      pagination: {},
      headers: [
        { text: "#", value: "id"},
        { text: "Name", align: "center", value: "name" },
        { text: "Total Balance", align: "center", value: "gramasi"}
      ],
      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
    fetchRank(params){
        this.$store
            .dispatch("member/fetchRank", {
                find: params,
            })
            .then(() => {
                //this.provinsiList = this.$store.state.wilayah.wilayah.list;
               // console.log("logRank" , this.$store.state.member.member.rankListBal);
            })
            .catch((res) => {
                console.log("prov" , res.response.data.message);
            });
    },
  },
  mounted() {
    this.fetchRank("");

    let dates = new Date();
    //alert(dates.getMonth);
  },
  watch: {
    pagination() {
      this.fetchRank("");
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