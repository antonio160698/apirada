const Data = require('./AlumonsMaterias.json')
const fs = require('fs')

const formatAssistList = {
  list: {},
  sort: function (data) {
    data.forEach(e => {
      const groupKey =`${e.salon}-${e.hora}`;
      const day = parseInt(e.dia, 10)

      if(!this.list.hasOwnProperty(groupKey)) {
        this.list[groupKey] = [[],[],[],[],[],[]]; //esta medio chafa la declaracion pero se ve chido
      } 

      this.list[groupKey][day].push(e)
    });
  }
}

formatAssistList.sort(Data.data)
console.log(formatAssistList.list)
fs.writeFileSync('./data.json', JSON.stringify(formatAssistList.list, null, 2) , 'utf-8');