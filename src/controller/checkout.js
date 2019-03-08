const sql = require('../../config/sql')

const FLAG_CODE_32 = 0
const FLAG_CODE_42 = 8
const FLAG_CODE_51 = 9
const FLAG_CODE_52 = 15
const FLAG_CODE_53 = 11

exports.receive = (req, res) => {
    
    const routes = req.body.data;
    const codedRoutes = routes.checkout.map((e) => {
        e.code = getCode(e);
        return e
    })
    
    const q = "INSERT INTO Asistencias VALUES (@id,@preId,@mtoId,@mtaId,@horaId,@fecha,@starAt,@visitAt,@signAt,@finiAt,@code)"
s
    for(let x of routes.checkout) {
        sql.then(conn => {
            return conn.request()
                .input("id", x.id)
                .input("preId", x.prefectoId)
                .input("mtoId", x.maestroId)
                .input("mtaId", x.materia)
                .input("horaId", x.horaId)
                .input("fecha", x.date)
                .input("starAt", x.startedAt)
                .input("visitAt", x.visitAt)
                .input("signAt", x.signedAt)
                .input("finiAt", x.finishedAt)
                .input("code", x.statusCode)
                .query(q)
        })
    }
    
    
}

const getCode = (e) => {
    const flag = getDecimalValue(e);
    switch (flag) {
        case FLAG_CODE_32:
            return 32
        case FLAG_CODE_42:
            return 42
        case FLAG_CODE_51:
            return 51
        case FLAG_CODE_52:
            return 52
        case FLAG_CODE_53:
            return 53
        default:
            break;
    }
}

const getDecimalValue = (e) => {
    let bin = ''
    bin += e.startedAt !== "" ? "1" : "0"
    bin += e.visitAt !== "" ? "1" : "0"
    bin += e.signedAt !== "" ? "1" : "0"
    bin += e.finishedAt !== "" ? "1" : "0"

    return parseInt(bin, 2);
}

// st  vi  si  fi           FLAG
// 0   0   0   0   32 --->   0
// 1   0   0   0   42 --->   8 
// 1   0   0   1   51 --->   9
// 1   1   1   1   52 --->   15
// 1   0   1   1   53 --->   11

// function test() {
//     test = {
//         startedAt: "1",
//         visitAt: "",
//         signedAt: "",
//         finishedAt: ""
//     }

//     console.log(getDecimalValue(test))
// }
// test()