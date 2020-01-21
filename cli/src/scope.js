import { ActualTotalLoad } from "./datasets/ActualTotalLoad.js"
import { AggregatedGenerationPerType } from "./datasets/AggregatedGenerationPerType.js"
import { DayAheadTotalLoadForecast } from "./datasets/DayAheadTotalLoadForecast.js"
import {  ActualvsForecast } from "./datasets/ActualvsForecast.js";


export async function scope(args) {
    if (args.scope == 'ActualTotalLoad'){
        ActualTotalLoad(args)
    }
    else if (args.scope == 'AggregatedGenerationPerType') {
        AggregatedGenerationPerType(args)
    }
    else if (args.scope == 'DayAheadTotalLoadForecast') {
        DayAheadTotalLoadForecast(args)
    }
    else if (args.scope == 'ActualvsForecast') {
        ActualvsForecast(args)
    }

    console.log("eimai h scope");
    return;
}