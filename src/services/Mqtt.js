import mqtt from 'mqtt'



export default () => {
    const clientPulso = mqtt.connect('ws://localhost:8883')
    clientPulso.callbacks = {}
    clientPulso.on('connect', () => {
        console.log('MQTT PULSOS CONECTADO')
        clientPulso.subscribe('/puesto/pulso', (err) => {
            if (err) {
                console.log(err)
            }
        })
    })
    clientPulso.on('message', async (topic, message) => {
        if (clientPulso.callbacks[topic]) {
            await clientPulso.callbacks[topic](String(message))
        }
    })

    const client = mqtt.connect('ws://192.168.0.104:8883');
    client.callbacks = {}
    client.on('connect', () => {
        console.log('MQTT PUESTO CONECTADO')
        client.subscribe('/puestos/+/login', (err) => {
            if (err) {
                console.log(err)
            }
        })
        client.subscribe('/puestos/+/logout', (err) => {
            if (err) {
                console.log(err)
            }
        })
        client.subscribe('/puestos/+/programacion', (err) => {
            if (err) {
                console.log(err)
            }
        })
    })
    client.on('message', async (topic, message) => {
        if (client.callbacks[topic]) {
            await client.callbacks[topic](String(message))
        }
    })

    return {
        client: client,
        clientPulso: clientPulso
    }
}