const conf = require('./config').amqp
const amqp = require('amqplib').connect(conf.production.host)

exports.send = (data, res, username) => {
    
    let buffer

    try {
        for(let x of data.checkouts) {
            console.log(x)
        }
        buffer = new Buffer(JSON.stringify(data))
        console.log(buffer)
    } catch(e) {
        res.jsend.error("invalid Data")
    }
    
    amqp.then((conn) => { 
        return conn.createChannel()
    })
    .then( (ch) => {
        return ch.assertQueue("checkouts",{durable: true})
            .then((resolve) => {
                return ch.sendToQueue("checkouts",buffer,{durable: true})
            }).then((resolve) => {
                console.log(resolve)
                res.jsend.success("checkouts :)")
            })
            .then((resolve) => {
                ch.close()
            })
            .catch( (e) => {
                console.log(e)
            })
    })
    .catch( err => {
        res.jsend.error("failed to upload")
    })

}