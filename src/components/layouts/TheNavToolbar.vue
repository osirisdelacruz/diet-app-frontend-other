<template>
  <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="$emit('updateDrawer')"></v-toolbar-side-icon>
      <span>{{ title }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
      <span class="hidden-xs-only">Hello, {{ $authUser.get('firstname') }}</span>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          dark
          v-on="on"
          flat
          >
        <v-icon>expand_more</v-icon>
      </v-btn>
      </template>
      <v-list class="pa-0">
        <v-list-tile @click="logout" >
          <v-list-tile-title class="caption">Logout <v-icon>arrow_right</v-icon>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: String
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    logout(){
      this.$session.destroy()
      this.$router.push({ name: 'login'})
    }
  }
};
</script>