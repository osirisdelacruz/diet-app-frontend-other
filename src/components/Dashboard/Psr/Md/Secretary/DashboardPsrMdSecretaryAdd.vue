<template>
  <div>
    Tst
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="showDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Secretary</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="reset">Reset</v-btn>
          <v-btn dark flat @click="store">Submit</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card>
        <v-form ref="form" lazy-validation v-on:submit.prevent>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm4 md6>
                  <v-text-field 
                    type="text" 
                    label="Firstname *"
                    v-model="secretary.firstname"
                    :rules="[ rules.required ]">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md6>
                  <v-text-field 
                    type="text" 
                    label="Middlename"
                    v-model="secretary.middlename">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md6>
                  <v-text-field 
                    type="text" 
                    label="Lastname *"
                    v-model="secretary.lastname"
                    :rules="[ rules.required]">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md6>
                  <v-text-field 
                    prefix="+63" 
                    type="number" 
                    label="Mobile Number *"
                    v-model="secretary.mobileNumber"
                    :rules="[ rules.required ]"
                    >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
    <v-btn absolute dark fab bottom right small color="pink" @click="showDialog = true">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      secretary: {
        firstname: '',
        middlename: '',
        lastname: '',
        mobileNumber: ''
      },
      rules: {
        required: v => !!v || 'Field is required'
      }
    };
  },
  methods: {
    store() {
      if(this.$refs.form.validate()){
        alert("ok")
      }
    },
    reset() {
      console.log("reset");
    }
  }
};
</script>