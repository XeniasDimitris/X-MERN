#!/bin/sh
mongoimport --collection=ActualTotalLoad_Aggr --drop --file=./ActualTotalLoad_Aggr.json
mongoimport --collection=AggregatedGenerationPerType --drop --file=./AggregatedGenerationPerType_Aggr.json
mongoimport --collection=DayAheadTotalLoadForecast --drop --file=./DayAheadTotalLoadForecast_Aggr.json
