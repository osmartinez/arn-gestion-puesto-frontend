import Api from '../Api'

export default {
  getPaysheets (params) {
    return Api().get('files/paysheets', { params: params })
  },

}
