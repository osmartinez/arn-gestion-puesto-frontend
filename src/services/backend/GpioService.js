import Backend from '../Backend'

export default {
  getGpioState () {
    return Backend().get('gpio/obtenerEstadoPins')
  },

  

}