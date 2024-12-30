const express = require('express');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const newProductsTemplate = require('../../views/admin/products/new');
const renderedProductsTemplate = require('../../views/admin/products');
const { requireTitle, requirePrice } = require('./validators');
const { handleErrors } = require('./middlewares');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(renderedProductsTemplate({ products }));
});

router.get('/admin/products/new', (req, res) => {
  res.send(newProductsTemplate({}));
});

router.post(
  '/admin/products/new',
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(newProductsTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });

    res.redirect('/admin/products');
  }
);

module.exports = router;
