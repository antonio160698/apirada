//Este trae los grupos del maestro por medio de la clave de empleado
const sql = require('../../config/sql')

exports.getHorarioMaestro = (req, res) => {
    sql.then(conn => {
            return conn.request()
                .input('NumeroEmpleado',req.params.NumeroEmpleado)
                .query('SELECT Grupo.HorarioID,Grupo.Grupo,Grupo.Materia,Grupo.SalonID,Grupo.Dia,Grupo.NombreEmpleado FROM Grupo INNER JOIN Horario ON grupo.HorarioID=Horario.HorarioID WHERE NumeroEmpleado=@NumeroEmpleado ORDER BY  Inicio;')
                //.query('SELECT DISTINCT salon FROM ListasAsist WHERE empleado_clave=@NumeroEmpleado;')
        })
        .then(grupoMaestros => {
            tamaño = grupoMaestros.recordset
            if(tamaño.length > 0)
            {
                res.jsend.success(grupoMaestros.recordset)
                } else{
                    res.send(JSON.stringify({status: "error", message: "No existe empleado"}));
                }           
        })
}
