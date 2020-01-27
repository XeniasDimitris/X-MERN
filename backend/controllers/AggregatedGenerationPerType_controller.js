const AggregatedGenerationPerType = require('../models/AggregatedGenerationPerType.model');
const csv = require('csv-express');

exports.AggregatedGenerationPerType_get_YMD = (req,res,next)=>{
    var fulldate = (req.params.fulldate).split("-");
    console.log(fulldate)
    match = {        
        'ResolutionCode.ResolutionCodeText': req.params.Resolution,
        AreaName: req.params.AreaName, 
        Year: Number(fulldate[0]),
        Month: Number(fulldate[1]),
        Day: Number(fulldate[2])
    }
    if (req.params.ProductionType !== "AllTypes") {
        match['ProductionType.ProductionTypeText'] = req.params.ProductionType;
    }
    AggregatedGenerationPerType
        .aggregate([
            { $match:match},
            { $sort: {DateTime: 1}},
            { $project:{
                _id: 0,
                Source: "entso-e",
                DataSet: "AggregatedGenerationPerType",
                AreaName: "$AreaName",
                AreaTypeCode: '$AreaTypeCode.AreaTypeCodeText',
                MapCode: '$MapCode.MapCodeText',
                ResolutionCode:'$ResolutionCode.ResolutionCodeText',
                Year: "$Year",
                Month: "$Month",
                Day: "$Day",
                DateTimeUTC: '$DateTime',
                ProductionType: "$ProductionType.ProductionTypeText",
                ActualGenerationOutputValue: '$ActualGenerationOutput',
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

exports.AggregatedGenerationPerType_get_YM = (req,res,next)=>{
    var fulldate = (req.params.fulldate).split("-");
    var match = {        
        'ResolutionCode.ResolutionCodeText': req.params.Resolution,
        AreaName: req.params.AreaName, 
        Year: Number(fulldate[0]),
        Month: Number(fulldate[1])
    }
    var _id= {Day: "$Day", ProductionType:"$ProductionType.ProductionTypeText"};
    if (req.params.ProductionType !== "AllTypes") {
        match['ProductionType.ProductionTypeText'] = req.params.ProductionType;
        _id = {Day: "$Day"}
    }
    AggregatedGenerationPerType
        .aggregate([
            { $match: match},
            { $group:{
                _id,
                AreaName: { $first: "$AreaName"},
                AreaTypeCode: {$first: "$AreaTypeCode.AreaTypeCodeText"},
                MapCode: {$first: "$MapCode.MapCodeText"},
                ResolutionCode: {$first: "$ResolutionCode.ResolutionCodeText"},
                Year: {$first: "$Year"},
                Month: {$first: "$Month"},
                Day: {$first: "$Day"}, 
                ProductionType: {$first: "$ProductionType.ProductionTypeText"},
                ActualTotalLoadByDayValue: {$sum: '$ActualGenerationOutput'},
            }},
            {$sort:{Day: 1}},
            {$project: {
                _id:0,
                Source:"entso-e",
                DataSet: "AggregatedGenerationPerType",
                AreaName:"$AreaName",
                AreaTypeCode: "$AreaTypeCode",
                MapCode: "$MapCode",
                ResolutionCode: "$ResolutionCode",
                Year:"$Year",
                Month: "$Month",
                Day: "$Day",
                ProductionType: "$ProductionType",
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

exports.AggregatedGenerationPerType_get_Y = (req,res,next)=>{
    var fulldate = (req.params.fulldate).split("-");
    var match = {        
        'ResolutionCode.ResolutionCodeText': req.params.Resolution,
        AreaName: req.params.AreaName, 
        Year: Number(fulldate[0]),
    }
    var _id= {Month: "$Month", ProductionType:"$ProductionType.ProductionTypeText"};
    if (req.params.ProductionType !== "AllTypes") {
        match['ProductionType.ProductionTypeText'] = req.params.ProductionType;
        _id = {Month: "$Month"}
    }
    AggregatedGenerationPerType
        .aggregate([
            { $match: match},
            { $group:{
                _id,
                AreaName: { $first: "$AreaName"},
                AreaTypeCode: {$first: "$AreaTypeCode.AreaTypeCodeText"},
                MapCode: {$first: "$MapCode.MapCodeText"},
                ResolutionCode: {$first: "$ResolutionCode.ResolutionCodeText"},
                Year: {$first: "$Year"},
                Month: {$first: "$Month"},
                ProductionType: {$first: "$ProductionType.ProductionTypeText"},
                ActualTotalLoadByMonthValue: {$sum: '$ActualGenerationOutput'},
            }},
            {$sort:{Month: 1}},
            {$project: {
                _id:0,
                Source:"entso-e",
                DataSet: "AggregatedGenerationPerType",
                AreaName:"$AreaName",
                AreaTypeCode: "$AreaTypeCode",
                MapCode: "$MapCode",
                ResolutionCode: "$ResolutionCode",
                Year:"$Year",
                Month: "$Month",
                ProductionType: "$ProductionType",
                ActualTotalLoadByMonthValue: "$ActualTotalLoadByMonthValue"

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

exports.AggregatedGenerationPerType_get_ = (req,res,next)=>{
    var date = new Date();
    match = {        
        'ResolutionCode.ResolutionCodeText': req.params.Resolution,
        AreaName: req.params.AreaName, 
        AreaName: req.params.AreaName, 
        Year: date.getFullYear(),
        Month: date.getMonth()+1,
        Day: date.getDate()
    }
    if (req.params.ProductionType !== "AllTypes") {
        match['ProductionType.ProductionTypeText'] = req.params.ProductionType;
    }
    AggregatedGenerationPerType
        .aggregate([
            { $match:match},
            { $sort: {DateTime: 1}},
            { $project:{
                _id: 0,
                Source: "entso-e",
                DataSet: "AggregatedGenerationPerType",
                AreaName: "$AreaName",
                AreaTypeCode: '$AreaTypeCode.AreaTypeCodeText',
                MapCode: '$MapCode.MapCodeText',
                ResolutionCode:'$ResolutionCode.ResolutionCodeText',
                Year: "$Year",
                Month: "$Month",
                Day: "$Day",
                DateTimeUTC: '$DateTime',
                ProductionType: "$ProductionType.ProductionTypeText",
                ActualGenerationOutputValue: '$ActualGenerationOutput',
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