const conf       = require('./config/config')
const app        = require('express')()
const cors       = require('cors')

require('./config/express')(app)
require('./src/router')(app)

function init() {
    app.use(cors())
    app.listen(conf.port)
    console.log('runnig... http://localhost:' + conf.port)
}

init()

/* push and commit test ignore pls */