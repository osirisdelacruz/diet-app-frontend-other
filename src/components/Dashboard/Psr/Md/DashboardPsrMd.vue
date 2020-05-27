<template>
  <v-app>
    <h1 class="subheading grey--text">My Doctors</h1>
    <Table @updateTable="getData" @edit="edit" @destroy="destroy" @view="view" />
    <MdAdd @updateTable="getData" />
    <MDEdit :show="showEdit" :item="editItem" @close="showEdit = false" @updateData="getData" />
  </v-app>
</template>

<script>
import MdAdd from "./DashboardPsrMdAdd";
import MDEdit from "./DashboardPsrMdEdit";
import Table from '@/modules/Table';
export default {
  components: {
    MdAdd,
    MDEdit,
    Table
  },
  data() {
    return {
      showEdit: false,
      editItem: {}
    };
  },
  methods: {
    getData(action) {
      if (action == "created" || action == "showPerPageChanged")
        this.GET_TABLE_OPTIONS.PAGINATION.page_number = 1;

      let url = "/psr/md/relationships";
      let params = {
        page_size: this.GET_TABLE_OPTIONS.PAGINATION.page_size,
        page_number: this.GET_TABLE_OPTIONS.PAGINATION.page_number,
        search_keyword: this.GET_TABLE_OPTIONS.SEARCH_KEYWORD,
        order_by: this.GET_TABLE_OPTIONS.SORTING.order.value,
        order_by_field: this.GET_TABLE_OPTIONS.SORTING.by.value
      };

      this.API_GET({ url, params })
        .then(r => {
          this.SET_TABLE_OPTIONS({ key: "DATA", value: r.data });
        })
        .finally(() => {
          this.HIDE_LOADER();
        });
    },
    edit(item) {
      console.log(item);
      this.showEdit = true;
      this.editItem = item;
    },
    destroy(item) {
      this.MODAL_CONFIRM({
        show: true,
        type: "error",
        title: "Delete Confirmation",
        message: "Are you sure you want to disconnect this doctor?",
        item: item
      });
    },
    view(item) {

      console.log(11)
      // Remove session for single object view
      if (this.$session.has("for_single_view_object")) {
        this.$session.remove("for_single_view_object");
      }

      this.SET_TABLE_OPTIONS({ key: "DATA", value: { data: [] } });

      this.$router.push({
        name: "dashboard-psr-md-profile",
        params: {
          code: item.code
        }
      });


    }
  },
  watch: {
    "GET_MODAL_CONFIRM_SETTINGS.CALLBACK"() {
      if (!!this.GET_MODAL_CONFIRM_SETTINGS.CALLBACK) {
        let item = this.GET_MODAL_CONFIRM_SETTINGS.ITEM;

        //Ajax Delete
        let url = "/psr/md";
        let data = this.to_formData_mixin({ code: item.code });
        let headers = {};

        this.API_DELETE({ url, data, headers })
          .then(r => {
            this.getData();
          })
          .finally(e => {});
      }
    }
  },
  created() {

    this.SET_TABLE_OPTIONS({
      key: "HEADERS",
      value: [
        {
          title: "Doctor Name",
          width: "xs12 sm12 md4",
          html:
            "<strong>[lastname]</strong>, [firstname] <strong>([code])</strong>"
        },
        {
          title: "Carbs",
          width: "xs4 sm4 md2",
          html: "[carbs]%"
        },
        {
          title: "Protein",
          width: "xs4 sm4 md2",
          html: "[protein]%"
        },
        {
          title: "Fats",
          width: "xs4 sm4 md2",
          html: "[fats]%"
        }
      ]
    });

    this.SET_TABLE_OPTIONS({
      key: "ACTIONS",
      value: {
        width: "xs12 sm6 md2"
      }
    });

    this.SET_TABLE_OPTIONS({
      key: "SORT_BY",
      value: [
        {
          text: "Doctor Name",
          value: "lastname"
        }
      ]
    });

    this.SET_TABLE_OPTIONS({
      key: "FOR_VIEWING_ONLY",
      value: false
    });

    // this.SET_TABLE_OPTIONS({
    //   key: "CUSTOM_BUTTONS",
    //   value: [
    //     {
    //       icon: "person_add",
    //       color: "success",
    //       emit: "addSecretary"
    //     }
    //   ]
    // });

    this.getData();
  }
};
</script>