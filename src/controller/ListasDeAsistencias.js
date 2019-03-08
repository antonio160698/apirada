//Este es el encargado de traer la lista de asistencia de un grupo
const sql = require('../../config/sql')

exports.getListaAsistencia = (req, res) => {
    console.log(req)
    const data = req.body
    sql.then(conn => {
            return conn.request()
                .input('salon',data.salon)
                .input('hora',data.hora)
                .input('dia',data.dia)
                .query('SELECT * FROM ListasDeAsistencias WHERE salon=@salon AND hora=@hora AND dia=@dia ;')
        })
        .then(Lista => {
            tamaño = Lista.recordset
            if(tamaño.length > 0)
            {
                res.jsend.success(Lista.recordset)
                } else{
                    res.send(JSON.stringify({status: "error", message: "Empleado no existe"}));
                }           
        })
}


const formatAssistList = {
    list: {},
    sort: function (data) {
      data.forEach(e => {
        const groupKey =`${e.salon}-${e.hora}`;
        const day = parseInt(e.dia, 10)
  
        if(!this.list.hasOwnProperty(groupKey)) {
          this.list[groupKey] = [[],[],[],[],[],[]]; //esta medio chafa la declaracion pero se ve chido
        } 
  
        this.list[groupKey][day].push(e)
      });

      return this;
    }
  }

  /* Este query regresa todos los alumos que tiene asistencia
SELECT DISTINCT ListasAsist.alumno,ListasAsist.salon,ListasAsist.hora, AsistenciasN.matricula
FROM ListasAsist 
LEFT JOIN AsistenciasN ON ListasAsist.matricula = AsistenciasN.matricula where AsistenciasN.assit = 1 AND ListasAsist.salon=AsistenciasN.[group];
*/