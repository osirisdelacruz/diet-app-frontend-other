<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" persistent max-width="600px">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="show = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Doctor</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="reset">Reset</v-btn>
          <v-btn dark flat @click="addDoctor">Submit</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card>
        <v-form ref="form" lazy-validation v-on:submit.prevent="addDoctor">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-autocomplete
                    :items="doctors"
                    :filter="autocompleteForDoctor"
                    color="white"
                    item-text="label"
                    item-value="code"
                    label="Doctor"
                    :rules="rules.doctor"
                    @change="doctorChange"
                    v-model="doctorObj.code"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm12 md12 class="pa-0">
                  <p>
                    Macros
                    <small>Should total of 100%</small>
                  </p>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    type="number"
                    label="Carbs *"
                    :rules="rules.carbs"
                    v-model="doctorObj.carbs"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    type="number"
                    label="Protein *"
                    :rules="rules.protein"
                    v-model="doctorObj.protein"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    type="number"
                    label="Fats *"
                    :rules="rules.fats"
                    v-model="doctorObj.fats"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
    <v-btn fixed dark fab bottom right color="pink" @click="showDialog">
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import DashboardPsrAddEdit from '@/mixins/dashboard/Psr/Md/DashboardPsrMdAddEdit.js'
export default {
  mixins: [ DashboardPsrAddEdit ],
  data: () => ({
    show: false,
    doctors: [],
  }),
  methods: {
    showDialog() {

        let url = "/psr/md/list";
        let params = {

        };

        this.API_GET({ url, params })
          .then(r => {

            let filtered = [];
            Object.values(r.data.data).forEach(value => {
                value[
                  "label"
                ] = `${value.lastname}, ${value.firstname} (${value.code})`;
                filtered.push(value);
            });

            this.doctors = filtered;
          })
          .finally(() => {
            this.HIDE_LOADER();
            this.show = true;
          });
    },
    reset() {
      this.resetFormObject_mixin(this.doctorObj);
      this.$refs.form.resetValidation();
    },
    addDoctor() {
      if (this.$refs.form.validate()) {
        //Validation
        let totalMacros =
          parseInt(this.doctorObj.carbs) +
          parseInt(this.doctorObj.protein) +
          parseInt(this.doctorObj.fats);

        if (totalMacros !== 100) {
          this.MODAL_ALERT({
            type: "error",
            message: "Total Macros should be 100% of total"
          });
          return;
        }
        if (
          parseInt(this.doctorObj.carbs) <= 0 ||
          parseInt(this.doctorObj.protein) <= 0 ||
          parseInt(this.doctorObj.fats) <= 0
        ) {
          this.MODAL_ALERT({ type: "error", message: "Invalid Macros" });
          return;
        }

        //Ajax Post
        let url = "/psr/md";
        let data = this.to_formData_mixin(this.doctorObj);
        let headers = {};

        this.API_POST({ url, data, headers })
          .then(r => {

             this.show = false;
             this.reset();
             this.$emit("updateTable", 'created');

          })
          .finally(e => {
            this.HIDE_LOADER();
          });
      }
    },
    doctorChange(doctorCode) {
      //Filter doctors to get the doctor name
      // let doctorObj = this.doctors.filter(value => {
      //   if (value["code"] === doctorCode) {
      //     return value;
      //   }
      // });
      //this.doctorObj.doctorCode = doctorCode;
    }
  },
  created() {}
}
</script>
