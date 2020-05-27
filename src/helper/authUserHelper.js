import Vue from 'vue'

const AuthUserHelper = {
	get ( field ) {
        if(Vue.prototype.$session.exists()){
            if(Vue.prototype.$session.has('jwt')){

                let jwt = Vue.prototype.$session.get('jwt')
                let jwtArray = jwt.split('.')
                let payload = JSON.parse(atob(jwtArray[1]))
                let user = payload.user

                if(!!user[field]) return user[field]
                return user
            }
        }
        return []

  }, // to call inside a component : this.$helpers.get(),
}

export default {
  install () {
    Vue.authUser = AuthUserHelper
    Vue.prototype.$authUser = AuthUserHelper
  }
}
