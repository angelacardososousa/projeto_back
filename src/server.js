// importanto o express
const express = require('express');
// criando o servidor
const app = express();
const conn = require('./conn/index')
 app.use(express.json({
  extended: true
}))


//criando a rota
app.get("/",(req,res)=>
res.send ("Bem vindo, ao mundo do futebol Pernambucano!"));

let arrTimes = [
  {
    id: 1,
    nome: 'Sport',
    estado: 'Bahia',
    pais: 'Brasil',
    serie: 'A',
    data_criação: new Date().toISOString(),
    data_atualização: new Date().toISOString()
  }, 
  {
    id: 2,
    nome: 'Santa Cruz',
    estado: 'Pernambuco',
    pais: 'Brasil',
    serie: 'D',
    data_criação: new Date().toISOString(),
    data_atualização: new Date().toISOString()
  }, 
  {
    id: 3,
    nome: 'Náutico',
    estado: 'Pernambuco',
    pais: 'Brasil',
    serie: 'D',
    data_criação: new Date().toISOString(),
    data_atualização: new Date().toISOString()
  } 
];

// Middleware para tratar erros não capturados
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno no servidor');
});

// const day = new Date().getDay
// const month = new Date().getMonth
// const year = new Date().getFullYear

app.get('/times', (req, res) => {
  console.log('Estes são os times de futebol do estado de Pernambuco:');
  // console.log(arrTimes);
  // res.send(arrTimes);
  conn.query('select * from time', (err, response)=>{
    if(err)console.error(err)
    
      const data = response.map(item=>({
        id: item.id,
        nome: item.nome,
        estado: item.estado,
        pais: item.pais,
        serie: item.serie,
        data_criação: item.data_criação,
        data_atualização: item.data_atualização
      }))

      res.json(data)
  })
});

// criando a rota
app.get('/times/:id', (req, res) => {
  const timesId = req.params.id;
  const times = arrTimes.find(times => times.id === parseInt(timesId));
  if (times) {
    console.log(times);
    res.send(times);
  } else {
    res.send(`Este time ${timesId} não faz parte do grupo seleto de times do Estado de Pernambuco ${timesId}`);
  }
});

app.delete('/times/delete/:id', (req, res) => {
  const timesId = req.params.id;
  arrTimes = arrTimes.filter(times => times.id !== parseInt(timesId));

  res.send(`O time ${timesId} não faz mais parte do grupo seleto de times do estado de Pernambuco`);
  console.log('Segue abaixo os times que fazem parte, atualamente, do futebol pernambucano:')
  console.log(arrTimes);

});

// iniciando o servidor
app.listen(3000);

console.log('Servidor iniciado na porta 3000');

