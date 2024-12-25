const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['qo918b46sk54sp6ttcu8hb'],
  })
);

app.get('/', (req, res) => {
  res.send(`
    <div>
    Your id is: ${req.session.userId}
    <form method="POST" action="">
      <input name="email" type="text" placeholder="email">
      <input name="password" type="text" placeholder="password">
      <input name="passwordConfirmation" type="text" placeholder="password confirmatiom">
      <button>Sign Up</button>
    </form>
  </div>
    `);
});

app.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send('Email in use');
  }
  if (password !== passwordConfirmation) {
    return res.send('Passwords must match');
  }

  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  res.send('Account created');
});

app.listen(3000, () => {
  console.log('Listening...');
});
