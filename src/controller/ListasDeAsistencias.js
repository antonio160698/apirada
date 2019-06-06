//Este es el encargado de traer la lista de asistencia de un grupo
const sql = require('../../config/sql')

exports.getListaAsistencia = (req, res) => {
  const data = req.body
  sql.then(conn => {
      return conn.request()
        .input('salon', data.salon)
        .input('hora', data.hora)
        .input('dia', data.dia)
        .query("SELECT listA.hora AS Hora,listA.alumno AS Alumno,listA.materia AS Materia,listA.clave AS Clave,listA.empleado_clave AS EmpleadoClave,listA.matricula AS Matricula,listA.dia AS Dia,listA.grupo AS Grupo,listA.salon AS Salon,listA.empleado_nombre AS EmpleadoNombre,AsistA.asistencia AS Asistencia FROM ListasDeAsistencias listA FULL OUTER JOIN AsistenciasAlumnos AS AsistA ON AsistA.matricula = listA.matricula WHERE listA.hora = @hora AND listA.dia = @dia AND listA.salon = @salon GROUP BY  listA.hora,listA.alumno,listA.materia,listA.clave,listA.empleado_clave,listA.matricula,listA.dia,listA.grupo,listA.salon,listA.empleado_nombre,listA.dia,AsistA.asistencia ORDER BY Asistencia DESC")
    })
    .then(Lista => {
      if (Lista.recordset.length > 0) {
        res.jsend.success(Lista.recordset)
      } else {
        res.send(JSON.stringify({
          status: "error",
          message: "No existe un grupo para esos parametros "
        }));
      }
    })
}