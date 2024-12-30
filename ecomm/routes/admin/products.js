const express = require('express');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const newProductsTemplate = require('../../views/admin/products/new');
const renderedProductsTemplate = require('../../views/admin/products');
const editProductTemplate = require('../../views/admin/products/edit');
const { requireTitle, requirePrice } = require('./validators');
const { handleErrors, requireAuth } = require('./middlewares');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(renderedProductsTemplate({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
  res.send(newProductsTemplate({}));
});

router.post(
  '/admin/products/new',
  requireAuth,
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

router.get(
  '/admin/products/:id/edit',
  requireAuth,
  async (req, res) => {
    const product = await productsRepo.getOne(req.params.id);

    if (!product) {
      return res.send('Product not found');
    }

    res.send(editProductTemplate({ product }));
  }
);

router.post(
  '/admin/products/:id/edit',
  requireAuth,
  async (req, res) => {}
);

module.exports = router;
