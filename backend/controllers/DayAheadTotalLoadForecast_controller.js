const DayAheadTotalLoadForecast = require('../models/DayAheadTotalLoadForecast.model');
const csv = require('csv-express');

exports.DayAheadTotalLoadForecast_get_YMD = (req,res,next)=>{
    var fulldate = (req.params.fulldate).split("-");
    DayAheadTotalLoadForecast
        .aggregate([
            { $match:{
            'ResolutionCode.ResolutionCodeText': req.params.Resolution,
            AreaName: req.params.AreaName, 
            Year: Number(fulldate[0]),
            Month: Number(fulldate[1]),
            Day: Number(fulldate[2])
            }},
            { $sort: {DateTime: 1}},
            { $project:{
                _id: 0,
                Source: "entso-e",
                DataSet: "DayAheadTotalLoadForecast",
                AreaName: "$AreaName",
                AreaTypeCode: '$AreaTypeCode.AreaTypeCodeText',
                MapCode: '$MapCode.MapCodeText',
                ResolutionCode:'$ResolutionCode.ResolutionCodeText',
                Year: "$Year",
                Month: "$Month",
                Day: "$Day",
                DateTimeUTC: '$DateTime',
                DayAheadTotalLoadForecastValue: '$TotalLoadValue',
                UpdateTimeUTC: '$UpdateTime'   
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

exports.DayAheadTotalLoadForecast_get_YM = (req,res,next)=>{
    var fulldate = (req.params.fulldate).split("-");
    DayAheadTotalLoadForecast
        .aggregate([
            { $match:{
                AreaName: req.params.AreaName,
                'ResolutionCode.ResolutionCodeText': req.params.Resolution,
                Year: Number(fulldate[0]),
                Month: Number(fulldate[1])
              }},
            { $group:{
                _id: "$Day",
                AreaName: { $first: "$AreaName"},
                AreaTypeCode: {$first: "$AreaTypeCode.AreaTypeCodeText"},
                MapCode: {$first: "$MapCode.MapCodeText"},
                ResolutionCode: {$first: "$ResolutionCode.ResolutionCodeText"},
                Year: {$first: "$Year"},
                Month: {$first: "$Month"},
                Day: {$first: "$Day"},
                DayAheadTotalLoadForecastByDayValue: {$sum: "$TotalLoadValue"},


            }},
            {$sort:{_id: 1}},
            {$project: {
                _id:0,
                Source:"entso-e",
                DataSet: "DayAheadTotalLoadForecast",
                AreaName:"$AreaName",
                AreaTypeCode: "$AreaTypeCode",
                MapCode: "$MapCode",
                ResolutionCode: "$ResolutionCode",
                Year:"$Year",
                Month: "$Month",
                Day: "$Day",
                DayAheadTotalLoadForecastByDayValue: "$DayAheadTotalLoadForecastByDayValue"

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

exports.DayAheadTotalLoadForecast_get_Y = (req,res,next)=>{
    var fulldate = (req.params.fulldate).split("-");
    DayAheadTotalLoadForecast
        .aggregate([
            { $match:{
                AreaName: req.params.AreaName,
                'ResolutionCode.ResolutionCodeText': req.params.Resolution,
                Year: Number(fulldate[0])
              }},
            { $group:{
                _id: "$Month",
                AreaName: { $first: "$AreaName"},
                AreaTypeCode: {$first: "$AreaTypeCode.AreaTypeCodeText"},
                MapCode: {$first: "$MapCode.MapCodeText"},
                ResolutionCode: {$first: "$ResolutionCode.ResolutionCodeText"},
                Year: {$first: "$Year"},
                Month: {$first: "$Month"},
                DayAheadTotalLoadForecastByMonthValue: {$sum: "$TotalLoadValue"}


            }},
            {$sort:{_id: 1}},
            {$project: {
                _id:0,
                Source:"entso-e",
                DataSet: "DayAheadTotalLoadForecast",
                AreaName:"$AreaName",
                AreaTypeCode: "$AreaTypeCode",
                MapCode: "$MapCode",
                ResolutionCode: "$ResolutionCode",
                Year:"$Year",
                Month: "$Month",
                DayAheadTotalLoadForecastByMonthValue: "$DayAheadTotalLoadForecastByMonthValue"
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

exports.DayAheadTotalLoadForecast_get_ = (req,res,next)=>{
    var date = new Date();
    DayAheadTotalLoadForecast
        .aggregate([
            { $match:{
            'ResolutionCode.ResolutionCodeText': req.params.Resolution,
            AreaName: req.params.AreaName, 
            Year: date.getFullYear(),
            Month: date.getMonth()+1,
            Day: date.getDate()
            }},
            { $sort: {DateTime: 1}},
            { $project:{
                _id: 0,
                Source: "entso-e",
                DataSet: "DayAheadTotalLoadForecast",
                AreaName: "$AreaName",
                AreaTypeCode: '$AreaTypeCode.AreaTypeCodeText',
                MapCode: '$MapCode.MapCodeText',
                ResolutionCode:'$ResolutionCode.ResolutionCodeText',
                Year: "$Year",
                Month: "$Month",
                Day: "$Day",
                DateTimeUTC: '$DateTime',
                DayAheadTotalLoadForecastValue: '$TotalLoadValue',
                UpdateTimeUTC: '$UpdateTime'   
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
}