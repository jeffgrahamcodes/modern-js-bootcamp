const express = require('express');
const cartsRepo = require('../repositories/carts');
const productRepo = require('../repositories/products');
const showCartTemplate = require('../views/carts/show');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.send('product added to cart');
});

router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.getOne(req.session.cartId);
  console.log(cart);

  for (let item of cart.items) {
    const product = await productRepo.getOne(item.id);

    item.product = product;
  }

  res.send(showCartTemplate({ items: cart.items }));
});

module.exports = router;
