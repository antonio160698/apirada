module.exports = {
    port: process.env.PORT || 3001,
    slq: {
        user: 'lpadilla',
        password: 'fsw-123',
        server: 'epsilon.fime.uanl.mx',//148.234.37.144
        database: 'RutaPrefecta'
    },
    db: {
        development: {
            mongo: {
                host: "mongodb://localhost/codo3",
                port: 27017,
                db: "codo"
            }
        },
        production: {
            mongo: {
                host: "mongodb://123:123@ds032340.mlab.com:32340/codo",
                port: 32340,
                db: "codo"
            }
        }
    },
    passport: {
        secret: "codo"
    },
    amqp: {
        development: {
            host: 'amqp://localhost'
        },
        production: {
            host: "amqp://tjttatfr:q2yhgpI_sIXXlQFiZUSAizmjH9I2vASr@wasp.rmq.cloudamqp.com/tjttatfr"
        },
        queues: {
            checkouts: "checkouts"
        }
    }
}