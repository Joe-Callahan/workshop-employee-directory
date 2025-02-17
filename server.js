const employees = require('./employees.js');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`Hello employees!`);
});

app.get('/employees', (req, res) => {
  res.send(employees);
});

app.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  const foundEmployee = employees.find((individualEmployee) => {
    if(id === `random`) {
      return individualEmployee.id === Math.floor(1+(Math.random() * employees.length));
    } else {
      return individualEmployee.id === Number(id);
    }
  });
  res.send(foundEmployee);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});