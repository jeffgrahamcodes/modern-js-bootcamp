const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['qo918b46sk54sp6ttcu8hb'],
  })
);
app.use(authRouter);

app.listen(3000, () => {
  console.log('Listening...');
});
