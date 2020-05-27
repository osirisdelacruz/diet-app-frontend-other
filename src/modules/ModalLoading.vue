<template>
  <v-dialog
    v-model="show"
    width="100"
    height="100"
    :persistent="persistent"
    :no-click-animation="noClickAnimation"
  >
    <v-container fill-height class="back">
      <v-layout row justify-center align-center >
        <v-progress-circular :size="50" color="white" indeterminate></v-progress-circular>
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            persistent: true,
            noClickAnimation: true
        }
    },
    props: {
        show: Boolean,
    },
    created() {
    }
}
</script>
