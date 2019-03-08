const controllers = require('./controller/controllers')

module.exports = (app) => {
	/* ----- asistencia ----- */
	app.post('/asistencia', controllers.assistance.uploadAssitance);


	app.get('/hours',controllers.hours.getHours);

	//para horarios
	app.get('/horario/:matricula',controllers.horario.getHorario);

	// -- grupoMaestros/103765
	app.get('/grupoMaestros/:NumeroEmpleado',controllers.grupoMaestros.getHorarioMaestro);

	// -- listaDgrupo/ con cuerpo de json salon,hora,dia,empleado_nombre
	app.post('/listaDgrupo',controllers.Lista.getListaAsistencia);

	/* ----- route ----- */

	//app.get('/routes', auth, controllers.route.getRoutes)
	app.post('/routes', controllers.route.sqlcall);
	
	app.get('/',controllers.home.x)

	/* ----- upload ----- */
	app.post('/upload/checkouts', controllers.checkout.receive)

	/* ------ DASHBOARD ----- */

}


