const mongoose = require('mongoose');

const DayAheadTotalLoadForecastSchema = mongoose.Schema({},{ collection: 'DayAheadTotalLoadForecast_Aggr'});

module.exports = mongoose.model('DayAheadTotalLoadForecast_Aggr', DayAheadTotalLoadForecastSchema);