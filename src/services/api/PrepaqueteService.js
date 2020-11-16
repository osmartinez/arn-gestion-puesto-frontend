import Api from '../Api'

export default {
  getPrepaquete (codigoEtiqueta,codSeccion) {
    return Api().get('prepaquetes/buscarEnSeccion',{params: {codigoEtiqueta:codigoEtiqueta,codigoSeccion:codSeccion}})
  },
}