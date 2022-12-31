<template>
  <transition name="slide" mode="out-in">
    <v-container grid-list-xs fluid fill-height class="bggradient">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" color="rgb(12 66 1 / 74%)">
            <v-toolbar color="rgb(12 66 1 / 0%)" flat>
              <v-img
                src="../assets/logodinaran-white.png"
                max-height="80px"
                style="margin-bottom: 20%"
                contain
              >
              </v-img>
            </v-toolbar>

            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  name="email"
                  label="Email"
                  id="email"
                  :rules="emailRules"
                  v-model="form.email"
                  append-icon="mdi-account"
                  :disabled="$store.state.auth.isAdmin"
                  solo
                ></v-text-field>
                <v-text-field
                  name="otp"
                  label="OTP"
                  v-model="form.otp"
                  v-if="$store.state.auth.isAdmin"
                  solo
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pb-5">
              <v-flex xs12>
                <v-btn
                  color="#107948"
                  block
                  @click="doLogin"
                  dark
                  x-large
                  v-if="$store.state.auth.isAdmin"
                >
                  Login
                </v-btn>
                <v-btn
                  class="mt-3"
                  block
                  outlined
                  :loading="loading"
                  @click="sendOTP"
                  v-on:keyup.enter="onEnter"
                  dark
                >
                  {{ buttonText }}
                </v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      form: {},
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      loading: false,
      buttonText: "Send OTP",
    };
  },
  created() {
    this.$store.dispatch("auth/tryAutoLogin");
  },
  mounted() {
    //alert(process.env.VUE_APP_API_URL_DEV);
  },
  watch: {
    isLogin(value) {
      if (value) {
        this.$router.push({ name: "Main Dashboard" });
      }
    },
  },
  methods: {
    sendOTP() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/getOTP", {
            email: this.form.email,
          })
          .then(() => {
            //console.log(res);
            this.buttonText = "resend otp";
            //this.form.otp = res.message;
          })
          .catch((res) =>
            this.$store.commit(
              "main/setSnackbarFail",
              res.response.data.message
            )
          );
      }
    },
    doLogin() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/userLogin", {
            email: this.form.email,
            otp: this.form.otp,
          })
          .then(() => {
            this.$router.push({ name: "Main Dashboard" });
          })
          .catch((res) => {
            this.$store.commit(
              "main/setSnackbarFail",
              res.response.data.message
            );
          });
      }
    },
  },
};
</script>

<style>
.gradient {
  background-image: linear-gradient(to right, #098551, #3a6831, #098551);
  color: #ffff !important;
}
.bggradient {
  background-image: linear-gradient(45deg, #1f361a, #098551);
  color: #ffff !important;
}
/* TRANSITION */
.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
/* END TRANSITION */
</style>
