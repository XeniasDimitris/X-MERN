const mongoose = require('mongoose');

const AggregatedGenerationPerTypeSchema = mongoose.Schema({},{ collection: 'AggregatedGenerationPerType_Aggr'});

module.exports = mongoose.model('AggregatedGenerationPerType_Aggr', AggregatedGenerationPerTypeSchema);