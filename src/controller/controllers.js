const route = require('./route')
const check = require('./checkout')
const home = require('./home')
const hours = require('./hours')
const assistance = require('./assistance')
const  horario = require('./horario')
const grupoMaestros = require('./gruposMaestros')
const Lista = require('./ListasDeAsistencias')

module.exports = {
    route     : route,
    checkout  : check,
    home      : home,
    hours     : hours,
    assistance: assistance,
    horario : horario,
    grupoMaestros : grupoMaestros,
    Lista : Lista
}