<template>
  <div>
    <Table />
  </div>
</template>

<script>
import Table from "@/modules/Table";
export default {
  components: {
    Table
  },
  data() {
    return {};
  },
  methods: {
    getDoctorInfo() {

      let url = "/psr/md";
      let params = {
        code: this.$route.params.code
      };

      this.API_GET({ url, params })
        .then(r => {
            this.SET_TABLE_OPTIONS({
                key: "DATA",
                value: { data: [r.data]  }});
        })
        .finally(() => {
          this.HIDE_LOADER();
        });
    }
  },
  created() {


    this.SET_TABLE_OPTIONS({
      key: "HEADERS",
      value: [
        {
          title: "Firstname",
          width: "xs12 sm12 md3",
          field: "firstname"
        },
        {
          title: "Lastname",
          width: "xs4 sm12 md3",
          field: "lastname"
        },
        {
          title: "Code",
          width: "xs4 sm12 md3",
          field: "code"
        },
        {
          title: "Mobile Number",
          width: "xs4 sm12 md3",
          html: "+63 [mobile_number]"
        },
        {
          title: "Carbs",
          width: "xs4 sm12 md3",
          html: "[carbs]%"
        },
        {
          title: "Protein",
          width: "xs4 sm12 md3",
          html: "[protein]%"
        },
        {
          title: "Fats",
          width: "xs4 sm12 md3",
          html: "[fats]%"
        }
      ]
    });

    this.SET_TABLE_OPTIONS({
      key: "FOR_VIEWING_ONLY",
      value: true
    });

    this.getDoctorInfo();



  }
};
</script>