import Backend from '../Backend'

export default {
  setPuesto (body) {
    return Backend().post('puesto',body)
  },

  getPuesto () {
    return Backend().get('puesto')
  },

}