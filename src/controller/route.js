const utils = require('../core/utils')
const store = require('../core/routeStorage')
const sql = require('../../config/sql')
const _ = require('underscore')

exports.sqlcall = (req, res) => {

    let date = req.body.date
    let hours = []
    let hourData = []
    let prefectosData = []
    console.log(store.keyExist(date))
    console.log(date)
    if (!store.keyExist(date)) {
        checkDayOff(date)
            .then(isDayOff => {
                console.log(isDayOff)
                console.log(!(utils.ActualDay(date) == "Domingo"))
                if (!isDayOff && !(utils.ActualDay(date) == "Domingo")) {
                    console.log("here")
                    sql.then(conn => {
                            return conn.request()
                                .input('date', date)
                                .query('SELECT * FROM FechaExamen WHERE Fecha = @date')
                        })
                        .then(examenes => {

                            console.log(examenes.recordset)
                            if (examenes.recordset.length > 0) {
                                for (let hour of examenes.recordset) {
                                    hours.push(hour.HorarioID)
                                }
                            } else {
                                hours = utils.AcademyHours.getAllHours();
                            }
                            // console.log(hours)
                            let day = new Date(date).getDay() + 1
                            sql.then(conn => {

                                sql.then(conn => {
                                    let week = getWeekOfTheYear(date);
                                    console.log(week)
                                    return conn.request()
                                        .input('week', week)
                                        .query('SELECT * FROM SemanaCalendario WHERE Semana = @week')
                                })
                                .then(semana => {

                                    let weeks = []
                                    console.log(semana)
                                    for(let week of semana.recordset) {
                                        weeks.push(week.CalendarioID)
                                    }
                                    return conn.request()
                                    .input('day', day)
                                    .query('SELECT * FROM GrupoSalon WHERE Dia = @day')
                                    .then(data => {
                                        console.log(data.recordset.length)
                                        console.log(weeks)
                                        let last = -1;
                                        for (let x of data.recordset) {
                                            console.log(x.Id)
                                            if(last !== x.Id) {
                                                for(let z of weeks) {
                                                    console.log(x.CalendarioID)
                                                    console.log(z)
                                                    if(x.CalendarioID == z) {
                                                        hourData.push(x);
                                                    }
                                                }
                                                last = x.Id;
                                            }
                                        }

                                        console.log("storing data to: " + date)

                                        const filterHourData = _.uniq(hourData, (i, k, a) => {
                                            if (i) {
                                                return i.id;
                                            }
                                        })

                                        console.log(filterHourData)
                                        store.saveData(date, filterHourData)
                                        res.jsend.success(filterHourData)
                                        
                                    })
                                })
                                
                            })
                        })
                }

            })
            .catch(e => {
                res.jsend.error(e)
            })
    } else {
        console.log("getting data from: " + date)
        res.jsend.success(store.getData(date))
    }
}

function getWeekOfTheYear(date) {
    
    let now = new Date(date);
    let x = new Date(now.getFullYear(), 0, 1);
    week = Math.ceil((((now - x) / 86400000) + x.getDay() + 1) / 7);
    return week.toString()
    
}

function cleanData(hourData) {

}
    
function checkDayOff(dia) {

    return new Promise((resolve, reject) => {
        sql.then(conn => {
                return conn.request()
                    .input('day', dia)
                    .query('SELECT * FROM Asueto WHERE Fecha = @day')
            })
            .then(result => {
                // console.log(result)
                if (result.rowsAffected[0] == 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
    })

}

function getDayNumber(datestring) {

    return utils.ActualDay(datestring)

}

exports.getRoutes = (req, res) => {

    models.Route.find({})
        .select('-_id -__v')
        .populate([{
            path: 'tasks',
            select: '-__v',
            populate: {
                path: 'data',
                select: '-_id -__v',
                populate: [{
                        path: 'assigment',
                        select: "-_id -__v"
                    },
                    {
                        path: 'owner',
                        select: '-_id -__v'
                    },
                    {
                        path: 'room',
                        select: '-_id -__v',
                        populate: [{
                                path: 'building',
                                select: '-_id -__v'
                            },
                            {
                                path: 'area',
                                select: '-_id -__v'
                            }
                        ]
                    }
                ]
            }
        }])
        .then((routes) => {
            models.Prefectos.find()
                .then((prefectos) => {
                    let obj = {
                        routes: routes,
                        prefectos: prefectos
                    }
                    res.jsend.success(obj)
                })

        })
}