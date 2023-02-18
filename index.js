const express = require('express')
const app = express()
const port = 5000
app.use(express.json());

// トップページのURLをリクエストされたら
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// ローカルサーバーの立ち上げ
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// お客様情報の準備
const customers = [
  { title: "田中", id: 1},
  { title: "斉藤", id: 2},
  { title: "橋本", id: 3},
  { title: "鈴木", id: 4},
  { title: "安藤", id: 5},
];

// customersページのURLをリクエストされたら
app.get('/customers', (req, res) => {
  res.send(customers)
})

// customersページに新しくお客様情報が追加された場合
app.post('/customers', (req, res) => {
  const customer = {
    title: req.body.title,
    id: customers.length + 1
  };
  customers.push(customer);
  res.send(customers)
})

// お客様情報の更新
app.put('/customers/:id', (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  customer.title = req.body.title;
  res.send(customer);
})

// お客様情報の削除
app.delete('/customers/:id', (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  
  const index = customers.indexOf(customer);
  customers.splice(index, 1);

  res.send(customer);
})