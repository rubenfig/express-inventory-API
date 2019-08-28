import {expect} from "chai";
import mongoUnit from "mongo-unit";
import {describe} from "mocha";
import app from '../../app';

import {MetricService} from "../../src/services/metric";

const testMongoUrl = process.env.MONGO_URL;

describe('MetricService', () => {
  const testData = require('./testingDB.js');
  beforeEach(() => mongoUnit.initDb(testMongoUrl, testData));
  afterEach(() => mongoUnit.drop());

  it('should find all metrics', () => {
    return MetricService.listMetrics()
      .then(metrics => {
        expect(metrics.length).to.equal(2);
        expect(metrics[0].name).to.equal('Kilogramos');
        expect(metrics[0].abreviation).to.equal('Kg');
      })
  });

  it('should create new metric', () => {
    return MetricService.createMetric({name: 'test', abreviation: 't'})
      .then(metric => {
        expect(metric.name).to.equal('test');
      })
      .then(() => MetricService.listMetrics())
      .then(metrics => {
        expect(metrics.length).to.equal(3);
        expect(metrics[2].name).to.equal('test');
        expect(metrics[2].abreviation).to.equal('t');
      })
  });

  it('should remove metric', () => {
    return MetricService.listMetrics()
      .then(metrics => metrics[0]._id)
      .then(metricId => MetricService.deleteMetric(metricId))
      .then(() => MetricService.listMetrics())
      .then(metrics => {
        expect(metrics.length).to.equal(1)
      })
  });

  it('should update metric', () => {
    return MetricService.listMetrics()
      .then(metrics => metrics[0])
      .then(metric => {
        metric.name = 'Testing update';
        return MetricService.updateMetric(metric._id, metric);
      })
      .then(() => MetricService.listMetrics())
      .then(metrics => {
        expect(metrics.length).to.equal(2);
        expect(metrics[0].name).to.equal('Testing update');
      })
  });
});
