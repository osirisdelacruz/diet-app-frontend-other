<template>
  <v-container class>
    <div>
      <v-layout wrap align-center v-if="!GET_TABLE_OPTIONS.FOR_VIEWING_ONLY">
        <v-flex xs12 sm3 d-flex>
          <div class="mb-3 font-italic">
            <span class="title font-weight-regular">{{ GET_TABLE_OPTIONS.ITEMS.length }}</span>
            <span class="caption"> out of {{ GET_TABLE_OPTIONS.DATA['total_results'] }} result(s)</span>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm2 d-flex class="mr-4">
          <v-select
            :items="GET_TABLE_OPTIONS.SORTING.by.items"
            label="Sort by"
            :value="GET_TABLE_OPTIONS.SORTING.by.value"
            v-model="GET_TABLE_OPTIONS.SORTING.by.value"
            @change="$emit('updateTable')"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm1 d-flex class="mr-4">
          <v-select
            :items="GET_TABLE_OPTIONS.SORTING.order.items"
            label="Sort order"
            :value="GET_TABLE_OPTIONS.SORTING.order.value"
            v-model="GET_TABLE_OPTIONS.SORTING.order.value"
            @change="$emit('updateTable')"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm2 d-flex class="mr-4">
          <v-select
            :items="GET_TABLE_OPTIONS.PAGINATION.per_page_items"
            label="Show per page"
            :value="GET_TABLE_OPTIONS.PAGINATION.page_size"
            v-model="GET_TABLE_OPTIONS.PAGINATION.page_size"
            @change="$emit('updateTable', 'showPerPageChanged')"
            v-if="GET_TABLE_OPTIONS.ITEMS.length"
          ></v-select>
        </v-flex>

        <v-flex xs12 sm3 d-flex>
          <v-text-field
            label="Search"
            v-model="GET_TABLE_OPTIONS.SEARCH_KEYWORD"
            v-on:keyup.enter="search"
            clearable
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-card flat v-for="(item, key) in GET_TABLE_OPTIONS.ITEMS" :key="key">
        <v-layout row wrap :class="`pa-3 item`">
          <v-flex
            :class="header.width"
            v-for="(header, key) in GET_TABLE_OPTIONS.HEADERS"
            :key="key"
          >
            <div class="caption grey--text">{{ $helpers.jsUcfirst(header.title) }}</div>
            <div class="pr-3 pb-2" v-html="getValue(item, header)"></div>
          </v-flex>

          <v-flex
            :class="`edit-container ${GET_TABLE_OPTIONS.ACTIONS.width}`"
            v-if="GET_TABLE_OPTIONS.ACTIONS.isVisible && !GET_TABLE_OPTIONS.FOR_VIEWING_ONLY"
          >
            <v-btn
              :color="item2.color"
              small
              @click="$emit(item2.emit, item)"
              v-for="(item2, key2) in GET_TABLE_OPTIONS.CUSTOM_BUTTONS"
              :key="key2"
            >
              <v-icon>{{ item2.icon }}</v-icon>
            </v-btn>

            <v-btn
              color="success"
              small
              v-if="GET_TABLE_OPTIONS.ACTIONS.isView"
              @click="$emit('view', item)"
            >
              <v-icon>visibility</v-icon>
            </v-btn>

            <v-btn
              color="primary"
              small
              v-if="GET_TABLE_OPTIONS.ACTIONS.isEdit"
              @click="$emit('edit', item)"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              color="error"
              small
              v-if="GET_TABLE_OPTIONS.ACTIONS.isDelete"
              @click="$emit('destroy', item)"
            >
              <v-icon>delete</v-icon>
            </v-btn>

          </v-flex>
        </v-layout>

        <v-divider></v-divider>
      </v-card>

      <div v-if="!GET_TABLE_OPTIONS.ITEMS.length && false">No data found</div>
      <div class="text-xs-center mt-3" v-if="numberOfPages > 1 && !GET_TABLE_OPTIONS.FOR_VIEWING_ONLY">
        <v-pagination
          v-model="GET_TABLE_OPTIONS.PAGINATION.page_number"
          :length="numberOfPages"
          @input="paginationInput"
        ></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
import { debounce } from "debounce";
export default {
  data() {
    return {};
  },
  methods: {
    getValue(item, header) {
      if (!!!header.html) {
        let field = header.field;
        return this.getNested(item, field.split("."));
      }

      let match = header.html.match(/\[([a-zA-Z0-9._]+)\]/g);
      let thisObj = this;
      let newHtml = header.html;
      Object.values(match).forEach(function(value) {
        let matchField = value.replace("[", "").replace("]", "");
        let theValue = thisObj.getNested(item, matchField.split("."));
        newHtml = newHtml.replace(value, theValue);
      });

      return newHtml;
    },
    getNested(item, fieldArray) {
      var firstField = fieldArray[0];
      if (!!item[firstField]) {
        fieldArray.shift();
        if (fieldArray.length > 0)
          return this.getNested(item[firstField], fieldArray);
        return item[firstField];
      }
      return null;
    },
    paginationInput(page) {
      this.SET_TABLE_OPTIONS({
        key: "PAGINATION",
        value: {
          page_number: page
        }
      });
      this.$emit("updateTable");
    },
    //@input="debounceSearchKeyword"
    // debounceSearchKeyword: debounce(function (keyword) {
    //   if(!!keyword){
    //     this.GET_TABLE_OPTIONS.SEARCH_KEYWORD = keyword
    //     this.$emit('search', 'search')
    //   }
    // }, 700)
    search() {
      this.$emit("updateTable");
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(
        this.GET_TABLE_OPTIONS.DATA.total_results /
          this.GET_TABLE_OPTIONS.PAGINATION.page_size
      );
    }
  },
  created() {


  }
};
</script>


<style scoped>
.item {
  border-left: 4px solid orange;
}
.item.active {
  border-left: 4px solid #3cd1c2;
}
.item.inactive {
  border-left: 4px solid red;
}
.v-chip {
  background: #ffaa2c;
}
.v-chip.active {
  background: #3cd1c2;
}
.v-chip.inactive {
  background: #f83e70;
}
.edit-container .v-btn {
  min-width: 10px;
}
.edit-container .v-btn i {
  font-size: 1.3rem;
}
</style>