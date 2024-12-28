const express = require('express');
const { validationResult } = require('express-validator');

const productsRepo = require('../../repositories/products');
const newProductsTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();

router.get('/admin/products', (req, res) => {});
router.get('/admin/products/new', (req, res) => {
  res.send(newProductsTemplate({}));
});

router.post(
  '/admin/products/new',
  [requireTitle, requirePrice],
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    // if (!errors.isEmpty()) {
    //   return res.send(newProductsTemplate({ errors }));
    // }

    res.send('Submitted');
  }
);

module.exports = router;
