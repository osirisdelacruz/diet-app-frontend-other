/* eslint-disable no-tabs */
import { mapActions, mapGetters } from 'vuex'
export const MixinsFormHelper = {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'SHOW_LOADER', 
      'HIDE_LOADER', 
      'MODAL_ALERT',
      'MODAL_CONFIRM',
      'API_POST',
      'API_GET',
      'API_PUT',
      'API_DELETE',
      'SET_TABLE_OPTIONS',
    ]),
    to_formData_mixin (form) {
      let data = new FormData()

      if(!!!form) return data
      
      Object.keys(form).forEach((key) => {
        //let value = form[key] === undefined ? '' : form[key]
        let value =  form[key]
        data.append(key, value)
      })
      return data
    },
    resetFormObject_mixin(form){
      Object.keys(form).forEach((key) => {
        form[key] = ''
      })
    },
    autocompleteFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1
      // || textTwo.indexOf(searchText) > -1
    },
    autocompleteForDoctor (item, queryText, itemText) {
      const textOne = item.label.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1
    }
  },
  computed: {
    ...mapGetters([
      'GET_TABLE_OPTIONS',
      'GET_MODAL_CONFIRM_SETTINGS'
    ])
  }
}

