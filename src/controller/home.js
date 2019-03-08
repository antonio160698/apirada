//const a = require('../../static/h.txt')
const path = require('path')
exports.x = (req, res) => {
    res.sendFile('h.txt', {root: path.resolve(__dirname,'../../static/')})
}