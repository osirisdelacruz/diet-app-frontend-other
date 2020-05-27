<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" fullscreen>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$emit('close')">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Doctor</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="editDoctor">Update</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card>
        <v-form ref="form" lazy-validation v-on:submit.prevent="addDoctor">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field :value="doctorName" label="Doctor Name" disabled></v-text-field>
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
  </v-layout>
</template>

<script>
import DashboardPsrAddEdit from '@/mixins/dashboard/Psr/Md/DashboardPsrMdAddEdit.js'
export default {
  mixins: [ DashboardPsrAddEdit ],
  data: () => ({
  }),
  props: {
    show: Boolean,
    item: Object
  },
  watch: {
    item() {
      this.doctorObj.code = this.item.code;
      this.doctorObj.carbs = this.item.carbs;
      this.doctorObj.protein = this.item.protein;
      this.doctorObj.fats = this.item.fats;
    }
  },
  computed: {
    doctorName() {
      return `${this.item.lastname}, ${this.item.firstname} (${this.item.code})`;
    }
  },
  methods: {
    editDoctor() {
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
          this.MODAL_ALERT({ type: "error", message: "Invalid Macros" })
          return;
        }

        //Ajax Post
        let url = "/psr/md"
        let data = this.to_formData_mixin(this.doctorObj)
        let headers = {}

        this.API_PUT({ url, data, headers })
          .then(r => {
            this.HIDE_LOADER()
            this.$emit("updateData")
            this.$emit('close')
          })
          .finally(e => {
            
          })
      }


    }
  },
  created() {}
};
</script>
