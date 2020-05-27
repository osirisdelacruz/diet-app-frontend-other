<template>
<v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Dr. {{ doctor.firstname }} {{ doctor.lastname }}</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        Profile
      </v-tab>
      <v-tab>
        Secretary
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Profile
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
           Secreatry
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      activeTab: null,
      tabs: [
        {
          text: "Profile",
          route: "dashboard-psr-md-profile"
        },
        {
          text: "Secretary",
          route: "dashboard-psr-md-secretary"
        },
      ],
      doctor: {}
    };
  },
  methods: {
    getDoctorInfo() {
      
      // Check if session not exist
      if (this.$session.has("for_single_view_object")) {
        let singleObj = JSON.parse(this.$session.get("for_single_view_object"));
        if (singleObj["code"] === this.$route.params.code) {
          this.doctor = singleObj;
          return;
        }
      }

      console.log(22)

      let url = "/psr/md";
      let params = {
        code: this.$route.params.code
      };

      this.API_GET({ url, params })
        .then(r => {
          this.doctor = r.data;
          this.isLoaded = true;
          this.$session.set("for_single_view_object", JSON.stringify(r.data));
        })
        .finally(() => {
          this.HIDE_LOADER();
        });
    },
    goTo(routeName) {
      this.$router.push({ name: routeName });
    }
  },
  created() {

    // Get Doctor Info
    this.getDoctorInfo();

    // Update active tab
    Object.keys(this.tabs).forEach(v => {
      if (this.tabs[v]["route"] === this.$router.currentRoute.name) {
        this.activeTab = parseInt(v);
        return;
      }
    });
  }
};
</script>