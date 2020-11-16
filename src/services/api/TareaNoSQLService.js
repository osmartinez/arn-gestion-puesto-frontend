import Api from '../Api'

export default {
  start (body) {
    return Api().post('tareaNoSQL/comenzar',body)
  },

  getCurrentTask (idPuesto) {
    return Api().get('tareaNoSQL/obtenerTarea',{params: {idPuesto: idPuesto}})
  },
  
}