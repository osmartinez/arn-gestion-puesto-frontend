import PrepaqueteService from "../api/PrepaqueteService";
import TareaNoSQLService from "../api/TareaNoSQLService";

async function startFromPrepaquete (codigoEtiqueta){
    const result = [];

    const maquinasSchemas = [];
    let utillaje = "";
    let tallaUtillaje = "";
    for (const maquina of this.$store.getters.puesto.Maquinas) {
        const response = await PrepaqueteService.getPrepaquete(
            codigoEtiqueta,
            maquina.CodSeccion
        );
        if (response.data == null || response.data.length == 0) {
            throw 'La etiqueta no existe'
        }

        result.push(response.data);

        const maquinaSchema = {
            idSql: maquina.ID,
            nombre: maquina.Nombre,
            codSeccion: maquina.CodSeccion,
            detallesTarea: [],
        };

        for (const tarea of response.data) {
            utillaje = tarea.CodUtillaje;
            tallaUtillaje = tarea.IdUtillajeTalla;

            maquinaSchema.detallesTarea.push({
                idSql: tarea.IdTarea,
                codigoOrden: tarea.Codigo,
                cliente: tarea.NOMBRECLI.trim(),
                modelo: tarea.DESCRIPCIONARTICULO.trim(),
                referencia: tarea.CodigoArticulo,
                tallasArticulo: tarea.Tallas.split(","),
                cantidadFabricar: tarea.CantidadFabricar,
                cantidadFabricada: tarea.CantidadFabricada,
                descripcionOperacion: tarea.Descripcion,
                pedidoLinea: tarea.PedidoLinea,
            });
        }

        maquinasSchemas.push(maquinaSchema);
    }

    const tareaActual = {
        idPuestoSql: this.$store.getters.puesto.Id,
        maquinas: maquinasSchemas,
        etiquetaFichada: codigoEtiqueta,
        utillaje: utillaje,
        tallaUtillaje: tallaUtillaje,
    };

    try {
        const response = await TareaNoSQLService.start(tareaActual);
        this.$store.commit("setTask", response.data);
        return 'Tarea comenzada'
    } catch (err) {
        throw err.response.data.message
    }
}

async function startFromOperationLabel(idOperacion) {
    console.log(idOperacion)
}

export {
    startFromPrepaquete,
    startFromOperationLabel,
}