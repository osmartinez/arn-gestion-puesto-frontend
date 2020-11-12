import Api from '../Api'

export default {
  getNews () {
    return Api().get('news')
  },

}
