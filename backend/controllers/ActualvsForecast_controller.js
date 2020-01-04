const ActualTotalLoad = require('../models/ActualTotalLoad.model');
const csv = require('csv-express');

const lookup_pipeline = {
    from: 'DayAheadTotalLoadForecast_Aggr',
    let: {areaname:"$AreaName", resolution:"$ResolutionCode.ResolutionCodeText", datetime:"$DateTime"},
    pipeline: [
      {$match:{
        $expr:
          {$and: [
              {$eq : ["$DateTime","$$datetime"]},
              {$eq: ["$AreaName","$$areaname"]},
              {$eq: ['$ResolutionCode.ResolutionCodeText','$$resolution']}
            ]
           }
      }
    }],
    as: 'forecast'
};

exports.ActualvsForecast_get_YMD = (req,res,next)=>{
    ActualTotalLoad
        .aggregate([
            { $match:{
            'ResolutionCode.ResolutionCodeText': req.params.Resolution,
            AreaName: req.params.AreaName, 
            Year: Number(req.params.Year),
            Month: Number(req.params.Month),
            Day: Number(req.params.Day)
            }},
            { $sort: {DateTime: 1}},
            {$lookup: lookup_pipeline},
            {$unwind: {path: "$forecast"}},
            { $project:{
                _id: 0,
                Source: "entso-e",
                DataSet: "ActualvsForecastTotalLoad",
                AreaName: "$AreaName",
                MapCode: '$MapCode.MapCodeText',
                AreaTypeCode: '$AreaTypeCode.AreaTypeCodeText',
                ResolutionCode:'$ResolutionCode.ResolutionCodeText',
                Year: "$Year",
                Month: "$Month",
                Day: "$Day",
                DateTimeUTC: '$DateTime',
                DayAheadTotalLoadForecastValue: '$forecast.TotalLoadValue',
                ActualTotalLoadValue: '$TotalLoadValue'  
            }}
        ])
        .exec()
        .then(docs =>{
            if (docs.length >0 )//Check if query is json or null,so as to send json response
                if (Object.keys(req.query).length === 0 || req.query.format === "json" ){
                    res.status(200).json(docs);
                }
                else { 
                    res.csv(docs,true);
                }
            else 
                res.status(403).json({
                    message: "No data"
                })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        }); 
};

exports.ActualvsForecast_get_YM = (req,res,next)=>{
    ActualTotalLoad
        .aggregate([
            { $match:{
                AreaName: req.params.AreaName,
                'ResolutionCode.ResolutionCodeText': req.params.Resolution,
                Year: Number(req.params.Year),
                Month: Number(req.params.Month)
              }},
              {$lookup: lookup_pipeline},
            {$unwind: {path: "$forecast"}},
            { $group:{
                _id: "$Day",
                AreaName: { $first: "$AreaName"},
                AreaTypeCode: {$first: "$AreaTypeCode.AreaTypeCodeText"},
                MapCode: {$first: "$MapCode.MapCodeText"},
                ResolutionCode: {$first: "$ResolutionCode.ResolutionCodeText"},
                Year: {$first: "$Year"},
                Month: {$first: "$Month"},
                Day: {$first: "$Day"},
                DayAheadTotalLoadForecastByDayValue: {$sum:'$forecast.TotalLoadValue'},
                ActualTotalLoadByDayValue: {$sum: '$TotalLoadValue'}  
            }},
            {$sort:{_id: 1}},
            {$project: {
                _id:0,
                Source:"entso-e",
                DataSet: "ActualvsForecastTotalLoad",
                AreaName:"$AreaName",
                AreaTypeCode: "$AreaTypeCode",
                MapCode: "$MapCode",
                ResolutionCode: "$ResolutionCode",
                Year:"$Year",
                Month: "$Month",
                Day: "$Day",
                DayAheadTotalLoadForecastByDayValue: "$DayAheadTotalLoadForecastByDayValue",
                ActualTotalLoadByDayValue: "$ActualTotalLoadByDayValue"
            }}
        ])
        .exec()
        .then(docs =>{;
            if (docs.length >0 ){
                //Check if query is json or null,so as to send json response
                if (Object.keys(req.query).length === 0 || req.query.format === "json" ){
                    res.status(200).json(docs);
                }
                else { // if query is csv, then send csv response
                    res.csv(docs,true);
                }
            }   
            else 
                res.status(403).json({
                    message: "No data"
                })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        }); 
};

exports.ActualvsForecast_get_Y = (req,res,next)=>{
    ActualTotalLoad
        .aggregate([
            { $match:{
                AreaName: req.params.AreaName,
                'ResolutionCode.ResolutionCodeText': req.params.Resolution,
                Year: Number(req.params.Year)
              }},
            {$lookup: lookup_pipeline},
            {$unwind: {path: "$forecast"}},
            { $group:{
                _id: "$Month",
                AreaName: { $first: "$AreaName"},
                AreaTypeCode: {$first: "$AreaTypeCode.AreaTypeCodeText"},
                MapCode: {$first: "$MapCode.MapCodeText"},
                ResolutionCode: {$first: "$ResolutionCode.ResolutionCodeText"},
                Year: {$first: "$Year"},
                Month: {$first: "$Month"},
                DayAheadTotalLoadForecastByMonthValue: {$sum:'$forecast.TotalLoadValue'},
                ActualTotalLoadByMonthValue: {$sum: '$TotalLoadValue'}
            }},
            {$sort:{_id: 1}},
            {$project: {
                _id:0,
                Source:"entso-e",
                DataSet: "ActualvsForecastTotalLoad",
                AreaName:"$AreaName",
                AreaTypeCode: "$AreaTypeCode",
                MapCode: "$MapCode",
                ResolutionCode: "$ResolutionCode",
                Year:"$Year",
                Month: "$Month",
                DayAheadTotalLoadForecastByMonthValue: "$DayAheadTotalLoadForecastByMonthValue",
                ActualTotalLoadByMonthValue: "$ActualTotalLoadByMonthValue"
            }}
        ])
        .exec()
        .then(docs =>{;
            if (docs.length >0 )//Check if query is json or null,so as to send json response
                if (Object.keys(req.query).length === 0 || req.query.format === "json" ){
                    res.status(200).json(docs);
                }
                else { // if query is csv, then send csv response
                    res.csv(docs,true);
                }
            else 
                res.status(403).json({
                    message: "No data"
                })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        }); 
};

exports.ActualvsForecast_get_ = (req,res,next)=>{
    var date = new Date();
    ActualTotalLoad
        .aggregate([
            { $match:{
                'ResolutionCode.ResolutionCodeText': req.params.Resolution,
                AreaName: req.params.AreaName, 
                AreaName: req.params.AreaName, 
                Year: date.getFullYear(),
                Month: date.getMonth()+1,
                Day: date.getDate()
            }},
            { $sort: {DateTime: 1}},
            {$lookup: lookup_pipeline},
            {$unwind: {path: "$forecast"}},
            { $project:{
                _id: 0,
                Source: "entso-e",
                DataSet: "ActualvsForecastTotalLoad",
                AreaName: "$AreaName",
                MapCode: '$MapCode.MapCodeText',
                AreaTypeCode: '$AreaTypeCode.AreaTypeCodeText',
                ResolutionCode:'$ResolutionCode.ResolutionCodeText',
                Year: "$Year",
                Month: "$Month",
                Day: "$Day",
                DateTimeUTC: '$DateTime',
                DayAheadTotalLoadForecastValue: '$forecast.TotalLoadValue',
                ActualTotalLoadValue: '$TotalLoadValue'  
            }}
        ])
        .exec()
        .then(docs =>{
            if (docs.length >0 )//Check if query is json or null,so as to send json response
                if (Object.keys(req.query).length === 0 || req.query.format === "json" ){
                    res.status(200).json(docs);
                }
                else { 
                    res.csv(docs,true);
                }
            else 
                res.status(403).json({
                    message: "No data"
                })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        }); 
};