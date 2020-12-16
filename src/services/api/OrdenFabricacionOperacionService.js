import Api from '../Api'

export default {
  buscarPorId (id) {
    return Api().get('ordenFabricacionOperacion',{params: {idOperacion:id}})
  },
}