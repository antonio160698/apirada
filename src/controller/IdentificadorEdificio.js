//Esto se encarga de hacer busquedas por el numero de edifcio y hora
const sql = require('../../config/sql')

exports.getIdentificadorEdificio = (req, res) => {
  const data = req.body
  sql.then(conn => {
      return conn.request()
        .input('Edificio', data.Edificio)
        .input('hora', data.hora)
        //.query("SELECT * FROM Grupo where Edificio = @Edificio AND HorarioID=@hora")
        .query(`SELECT gps.Grupo,mta.Nombre,gps.PeriodoID,
        hr.Nomenclatura,
        gps.CantidadHoras,
        gps.PlanEstudio,
        gps.Dias,
        gps.SalonID,
        salon.Edificio,
        gps.NumeroEmpleado,
        gps.Nexus,
        gps.InscripcionID
      FROM Grupo gps
      LEFT JOIN Materia mta ON gps.MateriaID = mta.ID
      LEFT JOIN Salon salon ON gps.SalonID = salon.SalonID
      LEFT JOIN Horario hr on gps.HorarioID = hr.ID
      WHERE salon.Edificio = @Edificio and hr.Nomenclatura=@hora`)
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
/*
{
	"Edificio":1,
	"hora":"v2"
}
*/