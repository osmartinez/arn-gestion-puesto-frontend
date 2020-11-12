import Api from '../Api'

export default {
  getChats () {
    return Api().get('chats')
  },

  sendMessage (body) {
    return Api().post('chats/sendMessage', body)
  },

  getMessages (roomId) {
    return Api().get(`chats/getMessages/${roomId}`)
  },

}
