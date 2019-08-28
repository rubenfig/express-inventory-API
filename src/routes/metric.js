import auth from '../middleware/auth';
import {MetricService} from "../services/metric";
import express from "express";

const router = express.Router();

// Create a new metric
router.post('/', async (req, res) => {
  try {
    res.status(201).send(await MetricService.createMetric(req.body))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.get('/', auth, async (req, res) => {
  try {
    res.send(await MetricService.listMetrics(req.params))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.get('/:metricId', auth, async (req, res) => {
  try {
    res.send(await MetricService.getMetric(req.params.metricId))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.put('/:metricId', auth, async (req, res) => {
  try {
    res.send(await MetricService.updateMetric(req.params.metricId, req.body))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.delete('/:metricId', auth, async (req, res) => {
  try {
    await MetricService.deleteMetric(req.params.metricId);
    res.send({ error: 'Categoría eliminada' })
  } catch (error) {
    res.status(500).send(error)
  }
});


module.exports = router;
