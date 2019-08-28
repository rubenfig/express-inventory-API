import auth from '../middleware/auth';
import {ProductService} from "../services/product";

import express from "express";

const router = express.Router();


router.post('/', async (req, res) => {
  // Create a new product
  try {
    res.status(201).send(await ProductService.createProduct(req.body))
  } catch (error) {
    res.status(400).send(error)
  }
});

router.get('/', auth, async (req, res) => {
  try {
    res.send(await ProductService.listProducts(req.params))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.get('/:productId', auth, async (req, res) => {
  try {
    res.send(await ProductService.getProduct(req.params.productId))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.put('/:productId', auth, async (req, res) => {
  try {
    res.send(await ProductService.updateProduct(req.params.productId, req.body))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.delete('/:productId', auth, async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.productId);
    res.send({ error: 'Categoría eliminada' })
  } catch (error) {
    res.status(500).send(error)
  }
});


module.exports = router;
