const sql = require('../../config/sql')

exports.getHours = (req, res) => {
    sql.then(conn => {
            return conn.request()
                .query('SELECT * FROM Horario')
        })
        .then(hours => {
            res.jsend.success(hours.recordset)
        })
}