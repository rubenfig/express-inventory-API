import auth from '../middleware/auth';
import {CategoryService} from "../services/category";

import express from "express";

const router = express.Router();

// Create a new category
router.post('/', async (req, res) => {
  try {
    res.status(201).send(await CategoryService.createCategory(req.body))
  } catch (error) {
    res.status(400).send(error)
  }
});

// Obtain category by id
router.get('/', auth, async (req, res) => {
  try {
    res.send(await CategoryService.listCategories(req.params))
  } catch (error) {
    res.status(500).send(error)
  }
});

// Update existing category
router.get('/:categoryId', auth, async (req, res) => {
  try {
    res.send(await CategoryService.getCategory(req.params.categoryId))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.put('/:categoryId', auth, async (req, res) => {
  try {
    res.send(await CategoryService.updateCategory(req.params.categoryId, req.body))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.delete('/:categoryId', auth, async (req, res) => {
  try {
    await CategoryService.deleteCategory(req.params.categoryId);
    res.send({ error: 'Categoría eliminada' })
  } catch (error) {
    res.status(500).send(error)
  }
});

module.exports = router;
