import Vue from 'vue'
import Router from 'vue-router'
import Login from './children/Login.js'
import Dashboard from './children/Dashboard.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
     Login,
     Dashboard
  ]
})

export default router



// Navigation Guard
router.beforeEach((to, from, next) => {

    // console.log(to.path)
    // console.log( Vue.prototype.$session.get('jwt') )


    const publicRoutes = ['login']
    if( publicRoutes.includes(to.name) ){
      // If has session
      // Then redirect to proper dashboard url

      if(Vue.prototype.$session.exists()){
        
        let jwt = Vue.prototype.$session.get('jwt')
        let jwtArray = jwt.split('.')
        let payload = JSON.parse(atob(jwtArray[1]))
        let user = payload.user
        if(user.userType == 'psr' || user.userType == 'md' ){
          return next( { name: 'dashboard-'+user.userType } )
        }

      }
    } else{

      // if accessing dashboard paths
      if(to.path.includes('dashboard')){
        
        // If no session found
        // Then redirect to login page
        if( ! Vue.prototype.$session.exists() ){
          return next( { name: 'login'} )
        }
      }
    }

    //
    
    next()
})

