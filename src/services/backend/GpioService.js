import Backend from '../Backend'

export default {
  getGpioState () {
    return Backend().get('gpio/obtenerEstadoPins')
  },

  pulse(body){
    return Backend().post('gpio/pulsoMaquina',body)
  },

  packetCountReached(pinBuzzer){
    return Backend().post('gpio/buzzer/paquete',{pinBuzzer: pinBuzzer})
  },

  taskCountReached(pinBuzzer, intervals){
    return Backend().post('gpio/buzzer/custom',{pinBuzzer: pinBuzzer, intervals: intervals})
  }
}