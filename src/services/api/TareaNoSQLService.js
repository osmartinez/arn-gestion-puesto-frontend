import Api from '../Api'

export default {
  start (body) {
    return Api().post('tareaNoSQL/comenzar',body)
  },

  end (body) {
    return Api().post('tareaNoSQL/finalizar',body)
  },

  getCurrentTask (idPuesto) {
    return Api().get('tareaNoSQL/obtenerTarea',{params: {idPuesto: idPuesto}})
  },
  
  addFaulty(body){
      return Api().post('tareaNoSQL/sumarDefectuosas',body)
  },

  addWrong(body){
    return Api().post('tareaNoSQL/sumarSaldos',body)
  }
}