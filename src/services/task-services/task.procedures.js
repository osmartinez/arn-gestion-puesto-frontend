import PrepaqueteService from "../api/PrepaqueteService";
import TareaNoSQLService from "../api/TareaNoSQLService";

async function comenzarTarea(tarea,store){
    const response = await TareaNoSQLService.start(tarea);
    store.commit("setTask", response.data);
    return response
}

async function startFromPrepaquete(codigoEtiqueta, store) {
    const result = [];

    const maquinasSchemas = [];
    let utillaje = "";
    let tallaUtillaje = "";
    for (const maquina of store.getters.puesto.Maquinas) {
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
        idPuestoSql: store.getters.puesto.Id,
        maquinas: maquinasSchemas,
        etiquetaFichada: codigoEtiqueta,
        utillaje: utillaje,
        tallaUtillaje: tallaUtillaje,
    };

    try {
        await comenzarTarea(tareaActual,store)
        return 'Tarea comenzada'
    } catch (err) {
        throw err.response.data.message
    }
}

async function startFromOperationLabel(task,taskSize, store) {
    const maquinasSchemas = [];
    for (const maquina of store.getters.puesto.Maquinas) {
        const maquinaSchema = {
            idSql: maquina.ID,
            nombre: maquina.Nombre,
            codSeccion: maquina.CodSeccion,
            detallesTarea: [],
        };

        maquinaSchema.detallesTarea.push({
            idSql: taskSize.IdTarea,
            codigoOrden: task.CodigoOrden,
            cliente: task.Cliente.trim(),
            modelo: task.Modelo.trim(),
            referencia: task.CodigoArticulo,
            tallasArticulo: taskSize.TallasArticulo.split(","),
            cantidadFabricar: taskSize.CantidadFabricar,
            cantidadFabricada: taskSize.CantidadFabricada,
            descripcionOperacion: task.Descripcion,
            pedidoLinea: task.PedidoLinea,
        });

        maquinasSchemas.push(maquinaSchema);
    }

    const tareaActual = {
        idPuestoSql: store.getters.puesto.Id,
        maquinas: maquinasSchemas,
        etiquetaFichada: "",
        utillaje: task.CodUtillaje,
        tallaUtillaje: taskSize.TallaUtillaje,
    };

    try {
        await comenzarTarea(tareaActual,store)
        return 'Tarea comenzada'
    } catch (err) {
        throw err.response.data.message
    }
}

export {
    startFromPrepaquete,
    startFromOperationLabel,
}