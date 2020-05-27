const state = {
    TABLE_OPTIONS: {
        FOR_VIEWING_ONLY: false,
        HEADERS: [],
        ACTIONS: {
            width: 'xs12 sm6 md2',
            isVisible: true,
            isView: true,
            isEdit: true,
            isDelete: true
        },
        PAGINATION: {
            page_size: 5,
            page_number: 1,
            per_page_items: [5, 10, 50, 100]
        },
        DATA: {},
        ITEMS: [],
        SEARCH_KEYWORD: '',
        SORTING: {
            by: {
                items: [
                    {
                        "text": 'Date Created',
                        'value': 'date_created'
                    }
                ],
                value: 'date_created'
            },
            order: {
                items: [
                    {
                        "text": 'Desc',
                        'value': 'desc'
                    },
                    {
                        "text": 'Asc',
                        'value': 'asc'
                    }
                ],
                value: 'desc'
            } 
        },
        CUSTOM_BUTTONS : []
    },
}

const getters = {
    GET_TABLE_OPTIONS: state => state.TABLE_OPTIONS
}

const actions = {
    SET_TABLE_OPTIONS: ({ commit }, { key, value }) => {
        commit('SET_TABLE_OPTIONS', { key, value })
    }
}

const mutations = {
    SET_TABLE_OPTIONS: (state, { key, value }) => {

        if (key === 'ACTIONS') {
            value = Object.assign(state.TABLE_OPTIONS.ACTIONS, value)
        } else if (key === 'PAGINATION') {
            value = Object.assign(state.TABLE_OPTIONS.PAGINATION, value)
        } else if (key === 'DATA') {
            state.TABLE_OPTIONS.ITEMS = value.data
        } else if (key === 'SORT_BY') {
             Object.values(value).forEach(function(valueRow){
                state.TABLE_OPTIONS.SORTING.by.items.push(valueRow)
             })
        }
        state.TABLE_OPTIONS[key] = value
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
