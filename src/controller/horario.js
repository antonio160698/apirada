//Este trae el horario del alumno por matricula
const sql = require('../../config/sql')

exports.getHorario = (req, res) => {
    sql.then(conn => {
            return conn.request()
                .input('matricula',req.params.matricula)
                .query('SELECT * FROM ListasDeAsistencias WHERE matricula=@matricula;')
        })
        .then(Lista => {
            if (Lista.recordset.length > 0) {
              res.jsend.success(Lista.recordset)
            } else {
              res.send(JSON.stringify({
                status: "error",
                message: "No existe un horario para esta matricula"
              }));
            }
          })
}