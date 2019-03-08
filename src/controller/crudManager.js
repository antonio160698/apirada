const Router = require('express').Router

class CRUDManager {

    constructor(model,app) {
		this.model = model
    }

    create(data) {

        return this.model
            .save(data)
            .then( () => {
                return "saved"
            })

    }

    read(id) {

		let query = {}
		/*
		for (prop of Object.keys(opts)) {

			query['prop'] = opts['prop']

		}*/
		query._id = id;

		return this.model
			.find(query)
			.then( ( resolved ) => {
				return resolved
			})
	}

    update(id, data) {

		return this.model
			.update({ _id: id }, data)
			.then( ( resolve ) => {
				return "updated"
			})

	}

    delete(id) {

		return this.model
			.remove({ _id : id })
			.then( (resolve) => {
				return "removed"
			})
	}

	all() {

		return this.model
			.find({})
			.then( (resolve) => {
				return resolve
			})
	}

	path() {

		let app = new Router()
		
		app.get('/', (req, res) => {
			console.log("GET /")
			this.all()
				.then((data) => {
					res.jsend.success(data)
				})
				.catch(e => {
					res.jsend.fail(e)
				})
		})
		
		app.post('/', (req, res) => {
			this.create()
				.then( (result) => {
					res.jsend.success(result)
				})
		})

		app.get('/:_id', (req, res) => {
			this.read(req.params._id)
				.then( (result) => {
					res.jsend.success(result)
				})
		})

		app.put('/:_id', (req, res) => {
			this.update(req.params._id, req.body)
				.then( (result) => {
					res.jsend.success(result)
				})
		})

		app.delete('/:_id', (req, res) => {
			this.delete(req.params._id)
				.then( (result) => {
					res.jsend.success(result)
				})
		})

		return app
	}

	
}

module.exports = {
	CRUDManager : CRUDManager
} 