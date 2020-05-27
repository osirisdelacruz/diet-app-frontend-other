<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm6 md4 lg3 v-if="!isOTP">
      <v-card>
        <v-toolbar dark color="primary" flat>
          <v-toolbar-title>Diabetes Program Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="loginForm" lazy-validation v-on:submit.prevent="login" class="mt-3">
            <v-text-field
              prepend-icon="phone"
              label="Mobile Number (Ex. 9xxxxxxxxx)"
              type="number"
              v-model="credentials.mobileNumber"
              :rules="rules.mobileNumber"
              prefix="+63"
            ></v-text-field>
            <v-radio-group class="ml-4" v-model="credentials.userType" :row="true" :rules="rules.userType">
              <v-radio label="MD" value="md"></v-radio>
              <v-radio label="Secretary" value="secretary"></v-radio>
              <v-radio label="PSR" value="psr"></v-radio>
            </v-radio-group>
            <v-card-actions >
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" >Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 v-else>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>OTP Verification</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="verifyOtpForm" lazy-validation v-on:submit.prevent="verifyOtp">
            <p class="subheading">
              One-time Pin was successfully sent to
              <br />
              <strong>+63 {{credentials.mobileNumber}}</strong>
            </p>
            <v-text-field
              prepend-icon="phone"
              label="One Time Pin"
              type="number"
              v-model="OTP"
              :rules="rules.OTP"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary">Submit</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isOTP: false,
      credentials: {
        userType: "psr",
        mobileNumber: "9267308592"
      },
      OTP: "",
      rules: {
        mobileNumber: [
          v => !!v || "Mobile Number is required",
          v =>
            (v && v.length == 10) ||
            "Invalid length should be 10 digits (Ex. 9xxxxxxxxx)"
        ],
        userType: [
          v => !!v || "usertype is required",
          v => (!!v && v === "psr") || v === "md" || "Invalid usertype"
        ],
        OTP: [
          v => !!v || "Enter 6 digits OTP",
          v => (v && v.length == 6) || "OTP length should be 6 digits"
        ]
      }
    };
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {

        let url = "/login";
        let data = this.to_formData_mixin(this.credentials);
        let headers = {};

        this.API_POST({ url, data, headers })
          .then(r => {
            this.isOTP = true;
          })
          .finally(e => {
            this.HIDE_LOADER();
          });
      }
    },
    verifyOtp() {
      if (this.$refs.verifyOtpForm.validate()) {
        let url = "/login-otp-verify";
        let data = this.to_formData_mixin({
          userType: this.credentials.userType,
          mobileNumber: this.credentials.mobileNumber,
          OTP: this.OTP
        });
        let headers = {};

        this.API_POST({ url, data, headers })
          .then(r => {

            if ("jwt" in r.data) {
              this.$session.start();
              this.$session.set("jwt", r.data.jwt);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + r.data.jwt;
              if(this.credentials.userType == 'psr'){
                this.$router.push({ name: "dashboard-psr" })
              }
            }

          })
          .catch(() => {
            this.OTP = "";
          })
          .finally(e => {
            this.HIDE_LOADER();
          });
      }
    }
  }
};
</script>


<style>
.login-box .the-container{
}
</style>