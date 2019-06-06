//Esto se encarga de hacer busquedas por el numero de edifcio y hora
const sql = require('../../config/sql')

exports.getIdentificadorEdificio = (req, res) => {
  const data = req.body
  sql.then(conn => {
      return conn.request()
        .input('Edificio', data.Edificio)
        .input('Hora', data.Hora)
        .input('Dia', data.Dia)
        .query(`select distinct
        la.dia,
        la.salon,
        la.clave,
        la.grupo,
        la.hora,
        la.materia,
        sln.Edificio,
        CONCAT((select SUM(asistencia) from AsistenciasAlumnos where grupo=la.salon and dia=la.dia and hora=la.hora) ,'/',(select COUNT(*) from ListasDeAsistencias where salon=la.salon and dia=la.dia and hora=la.hora)) as cupo
        from	ListasDeAsistencias la
        left join Salon sln on la.salon = sln.SalonID
        where Edificio=@Edificio and hora=@Hora and dia=@Dia
        order by salon`)
    })
    .then(Lista => {
      if (Lista.recordset.length > 0) {
        res.jsend.success(Lista.recordset)
      } else {
        res.send(JSON.stringify({
          status: "error",
          message: "No existe una zona "
        }));
      }
    })
}