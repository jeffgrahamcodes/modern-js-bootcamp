const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['qo918b46sk54sp6ttcu8hb'],
  })
);
app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log('Listening...');
});
