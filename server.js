const employees = require('./employees.js');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('dist'));

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

let idNumber = employees.length + 1;

app.post('/employees', (req, res, next) => {
  const { name, position } = req.body;
  if (!name || !position) {
    const error = new Error("Name or Position not provided");
    next(error);
  } else {
    employees.push({
      id: idNumber,
      name, position
    });
    idNumber++;
    res.send(employees);
  }
})

app.use((err, req, res, next) => {
  console.log('ERROR MESSAGE', err.message);
  res.status(400).send(err.message);
});

app.use((req, res) => {
  res.status(404).send('Page Not Found')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});