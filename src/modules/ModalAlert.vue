<template>
  <v-dialog v-model="settings.SHOW" width="300">
    <v-card>
      <v-card-title :class="`${settings.TYPE} white--text`">{{ settings.TYPE.toUpperCase() }}</v-card-title>

      <v-card-text><span v-html="settings.MESSAGE"></span></v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="`${settings.TYPE}`" flat @click="settings.SHOW = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    props: {
        settings: Object,
    },
    watch: {
    }
}
</script>
