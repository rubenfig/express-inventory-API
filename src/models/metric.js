import * as mongoose from "mongoose";

const metricSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  abreviation: {
    type: String,
    required: true
  }
});

const Metric = mongoose.models.Metric || mongoose.model('Metric', metricSchema);

module.exports = Metric;
