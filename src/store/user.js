import * as types from './types'
import API from '@/api/index'
const state = {
  tags: []
}
const getters = {}
const mutations = {
  [types.SET_TAGS](state, data) {
    state.tags = [...data]
  }
}
const actions = {
  async [types.GET_TAGS]({ commit }, data) {
    let { data: tags } = await API.getAllTags()
    commit(types.SET_TAGS, tags)
  },
  async [types.CHECK_STATUS]() {
    await API.checkStatus()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}