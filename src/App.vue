<template>
  <v-app :class="`${this.$router.currentRoute.name}-box`">
    <TheNav v-if="$session.exists()"/>
    <v-content>
      <ModalLoading :show="GET_LOADER"/>
      <ModalAlert :settings="GET_MODAL_ALERT_SETTINGS" />
      <ModalConfirm :settings="GET_MODAL_CONFIRM_SETTINGS" />
      <v-container fluid class="the-container">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TheNav from "./components/layouts/TheNav";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    TheNav
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters(['GET_LOADER', 'GET_MODAL_ALERT_SETTINGS'])
  },
  created() {}
};
</script>

<style>
.login-box .the-container {
  height: 100%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
</style>