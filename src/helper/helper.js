import Vue from 'vue'

const Helper = {
	test_helper () {
		return 'test_helper'
  }, // to call inside a component : this.$helpers.test_helper(),
  jsUcfirst (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export default {
  install () {
    Vue.helpers = Helper
    Vue.prototype.$helpers = Helper
  }
}
