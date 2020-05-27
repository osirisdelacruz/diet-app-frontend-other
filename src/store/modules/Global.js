const state = {
  LOADER: false,
  MODAL_ALERT_SETTINGS: {
    SHOW: false,
    TYPE: 'success',
    MESSAGE: ''
  },
  MODAL_CONFIRM_SETTINGS: {
    SHOW: false,
    TYPE: 'success',
    MESSAGE: '',
    TITLE: '',
    ITEM: {},
    CALLBACK: false
  }
}

const getters = {
  GET_LOADER: (state) => {
    return state.LOADER
  },
  GET_MODAL_ALERT_SETTINGS: (state) => {
    return state.MODAL_ALERT_SETTINGS
  },
  GET_MODAL_CONFIRM_SETTINGS: (state) => {
    return state.MODAL_CONFIRM_SETTINGS
  }
}

const actions = {
  HIDE_LOADER: ({ commit }) => {
    commit('HIDE_LOADER')
  },
  SHOW_LOADER: ({ commit }) => {
    commit('SHOW_LOADER')
  },
  MODAL_ALERT: ({ commit }, { type, message }) => {
    commit('MODAL_ALERT', { type, message })
  },
  MODAL_CONFIRM: ({ commit }, { show, type, title, message, item, callback }) => {
    commit('MODAL_CONFIRM', { show, type, title, message, item, callback })
  }
}

const mutations = {
  HIDE_LOADER: (state) => {
    state.LOADER = false
  },
  SHOW_LOADER: (state) => {
    state.LOADER = true
  },
  MODAL_ALERT: (state, { type, message }) => {
    state.MODAL_ALERT_SETTINGS.SHOW = true
    state.MODAL_ALERT_SETTINGS.TYPE = type
    state.MODAL_ALERT_SETTINGS.MESSAGE = message
  },
  MODAL_CONFIRM: (state, { show, type, title, message, item, callback }) => {
    state.MODAL_CONFIRM_SETTINGS.SHOW = show
    state.MODAL_CONFIRM_SETTINGS.TYPE = type
    state.MODAL_CONFIRM_SETTINGS.TITLE = title
    state.MODAL_CONFIRM_SETTINGS.MESSAGE = message
    state.MODAL_CONFIRM_SETTINGS.ITEM = item
    state.MODAL_CONFIRM_SETTINGS.CALLBACK = callback
  },
  // HIDE_MODAL_CONFIRM: (state) => {
  //   state.MODAL_CONFIRM_SETTINGS.SHOW = false
  //   state.MODAL_CONFIRM_SETTINGS.ITEM = {}
  //   state.MODAL_CONFIRM_SETTINGS.TITLE = ''
  //   state.MODAL_CONFIRM_SETTINGS.MESSAGE = ''
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}

// USE

// ALert
//this.MODAL_ALERT({ type: 'success', message: 'Ow Error'})

// Loading
//this.SHOW_LOADER()
//this.HIDE_LOADER()