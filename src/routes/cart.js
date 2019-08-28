import auth from '../middleware/auth';
import {CartService} from "../services/cart";

import express from "express";

const router = express.Router();

// add item to cart
router.post('/addItem', auth, async (req, res) => {
  try {
    res.status(200).send(await CartService.addItem(req.body, req.user._id))
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
});

// update item in cart
router.post('/updateItem', auth, async (req, res) => {
  try {
    res.status(200).send(await CartService.updateItem(req.body, req.user._id))
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
});

// complete the order
router.post('/complete', auth, async (req, res) => {
  // add item to cart
  try {
    res.status(200).send(await CartService.complete(req.body, req.user._id))
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
});

// clear the cart items
router.delete('/clear', auth, async (req, res) => {
  try {
    res.status(200).send(await CartService.clearCart(req.user._id))
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
});

// list all the carts
router.get('/', auth, async (req, res) => {
  try {
    res.send(await CartService.listCarts(req.params))
  } catch (error) {
    res.status(500).send(error)
  }
});

// get cart by id
router.get('/:cartId', auth, async (req, res) => {
  try {
    res.send(await CartService.getCart(req.params.cartId))
  } catch (error) {
    res.status(500).send(error)
  }
});

// delete cart by id
router.delete('/:cartId', auth, async (req, res) => {
  try {
    await CartService.deleteCart(req.params.cartId);
    res.send({ error: 'Categoría eliminada' })
  } catch (error) {
    res.status(500).send(error)
  }
});


module.exports = router;
