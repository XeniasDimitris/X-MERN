const mongoose = require('mongoose');

const ActualTotalLoadSchema = mongoose.Schema({},{ collection: 'ActualTotalLoad_Aggr'});

module.exports = mongoose.model('ActualTotalLoad_Aggr', ActualTotalLoadSchema);