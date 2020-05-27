import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/diabetes-program/b/public/api'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

const state = {
}

const getters = {
}

const actions = {
  API_POST: ({ dispatch }, { url, data, headers }) => {
    return new Promise((resolve, reject) => {
      data = data || {}
      headers = headers || {}
      dispatch('SHOW_LOADER')
      axios.post(url, data, headers)
        .then((r) => {
          console.log('------AXIOS------')
          console.log(r)
          console.log('------END AXIOS------')
          resolve(r)
        })
        .catch((e) => {
          dispatch('API_CUSTOM_ERROR', { e })
          reject(e)
        })
    })
  },
  API_PUT: ({ dispatch }, { url, data, headers }) => {

    data.append('_method', 'PUT')
    return dispatch('API_POST', { url, data, headers } )

  },
  API_DELETE: ({ dispatch }, { url, data, headers }) => {

    data.append('_method', 'DELETE')
    return dispatch('API_POST', { url, data, headers } )
    
  },
  API_GET: ({ dispatch }, { url, params, headers }) => {
    return new Promise((resolve, reject) => {

      let apiGet = (params)
        ? axios.get(url, { params: params }, headers)
        : axios.get(url)

      if(params['page_number']) params['page'] = params['page_number']

      dispatch('SHOW_LOADER')
      apiGet
        .then((r) => {
          console.log('------AXIOS------')
          console.log(r)

          //For Laravel Pagination
          if(r.data.total)  r.data.total_results = r.data.total
          console.log('------END AXIOS------')
          resolve(r)
        })
        .catch((e) => {
          console.log(e)
          dispatch('API_CUSTOM_ERROR', { e })
          reject(e)
        })
    })
  },
  API_CUSTOM_ERROR: ({ dispatch }, { e }) => {
   
    var errorMessage = []
    var forceLogout = false

    if (e.response === undefined) {
      errorMessage.push('Error Code: 500. Internal Server Error.')
    } else {
      let statusCode = e.response.status
      let data = e.response.data

      console.log(data)

      if (statusCode === 422) {
        var dataResponse = e.response.data.errors
        if (dataResponse) {
          Object.values(dataResponse).forEach(value => {
            value.forEach((item) => {
              errorMessage.push(item)
            })
          })
          if(!!e.response.data.forceLogout) forceLogout = true
        }
      } else if (statusCode === 401) {
        errorMessage.push('Authentication Failed.')
        forceLogout = true
      } else if (statusCode === 403) {
        errorMessage.push('Sorry you don\'t have permission to perform this action.')
        forceLogout = true
      } else {
        if (statusCode === 500) {
          if (data.message === 'Signature verification failed') {
            errorMessage.push(data.message)
            forceLogout = true
          }else{
            //errorMessage.push('Error Code: 500. Internal Server Error.')
            errorMessage.push(e.toString())
          }
        } else {
          errorMessage.push(e.toString())
        }
      }
    }

    let errorMessageLabel = ''
    if (errorMessage.length > 1) {
      // List
      errorMessageLabel += '<ul>'
      errorMessage.forEach(value => {
        errorMessageLabel += `<li>${value}</li>`
      })
      errorMessageLabel += '</ul>'
    } else {
      // Single
      errorMessageLabel += errorMessage[0]
    }

    dispatch('MODAL_ALERT', { type: 'error', message: errorMessageLabel })
    //if (forceLogout) dispatch('LOGOUT')

  }
}

const mutations = {
} 

export default {
  state,
  getters,
  actions,
  mutations
}
