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
  }
}