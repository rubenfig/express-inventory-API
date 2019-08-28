import Metric from "../models/Metric";

export class MetricService {
  static async createMetric(metric) {
    // Create a new metric
    let newMetric = new Metric(metric);
    await newMetric.save();
    return newMetric;
  };

  static async listMetrics(params) {
    return await Metric.find(params);
  }

  static async getMetric(metricId) {
    return await Metric.findOne({"_id": metricId});
  }

  static async updateMetric(metricId, metric) {
    return await Metric.findOneAndUpdate({_id: metricId}, {$set: metric}, {useFindAndModify: false, new: true});
  }

  static async deleteMetric(metricId) {
    return await Metric.deleteOne({"_id": metricId});
  }
}
