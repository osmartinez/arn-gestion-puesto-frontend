import Api from '../Api'

export default {
  login (body) {
    return Api().post('movimientoOperario/entrar',body)
  },
  logout (body) {
    return Api().post('movimientoOperario/salir',body)
  },
  findAll(params){
      return Api().get('movimientoOperario',{params: params})
  }
}