const utils = require('../core/utils')
const sql = require('../../config/sql')
const _ = require('underscore')

exports.uploadAssitance = (req, res) => {
  
  sql.then(conn => {
    //grupo      --> 4200
    //hora       --> M4
    //dia        --> 1
    //semana     --> 4
    //matricula  --> 1548488
    //asistencia --> 0/1
    const { group, hour, day, week, matricula, assit } = req.body;

    const q = 'INSERT INTO AsistenciasAlumnos VALUES (@gpo, @hra, @dia, @sem, @mat, @ast)';
    
    return conn.request()
      .input('gpo', group)
      .input('hra', hour)
      .input('dia', day)
      .input('sem', week)
      .input('mat', matricula)
      .input('ast', assit)
      .query(q)
    
  });
  res.send(JSON.stringify({message: "Asistencia almacenada"}));
}

exports.aasdasda = (req, res) => {
  
}
/*Ejemplo de como mandar el post
{
	"group": "6303",
	"hour": "V5",
	"day": 5,
	"week": 1,
	"matricula":216053,
	"assit": 1
}
*/