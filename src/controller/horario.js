//Este trae el horario del alumno por matricula
const sql = require('../../config/sql')

exports.getHorario = (req, res) => {
    sql.then(conn => {
            return conn.request()
                .input('matricula',req.params.matricula)
                .query('SELECT * FROM ListasDeAsistencias WHERE matricula=@matricula;')
        })
        .then(horarios => {
            tamaño = horarios.recordset
            if(tamaño.length > 0)
            {
                res.jsend.success(horarios.recordset)
                } else{
                    res.send(JSON.stringify({status: "error", message: "alumno no existe"}));
                }           
        })
}