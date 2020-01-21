







function isValidInput(error) {
  if (error) {
    console.error(error.details[0].message)
  };

} 













function constraintsCli(args) {
  //our parser gets an extra element so we eliminate it
  if (args["_"]) { delete args["_"]; }



  const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));
  var moment = require('moment');



  //if --scope is given
  if (args.scope) {




    //we can have date | time | month so:
    if (!args.date) {
      if (args.date == '') {
        args.date = moment().format("YYYY-MM-DD");
        console.log('mpika')
      }
    }
    if (args.month) {
      if (args.month == true) {
        args.month = moment().format("YYYY-MM");
      }
    }
    if (args.year) {
      if (args.year == true) {
        args.year = moment().format("YYYY");
      }
    }
    //we set format json as default
    if (!args.format) {
      if (args.format == '') {
        args.format = 'json'
      }
    }


    //if we have AggregatedGemerationPerType some things changes
    //compered to  other datasets
    if (args.scope == "AggregatedGemerationPerType") {
      const schema = Joi.object({
        scope: Joi.string()
          .allow('AggregatedGemerationPerType')
          .required(),

        area: Joi.string()
          .required(),

        timers: Joi.string()
          .allow('PT15M', 'PT30M', 'PT60M')
          .required(),

        prodtype: Joi.string()
          .required(),

        date: Joi.date()
          .format('YYYY-MM-DD')
          .utc()
          .empty(''),

        month: Joi.date()
          .format('YYYY-MM')
          .utc()
          .optional(),


        year: Joi.date()
          .format('YYYY')
          .utc()
          .optional(),

        format: Joi.string()
          .default('json')
          .optional()

      });

      const {
        error,
        value
        } = schema.validate(args)
     
    } else {
      const schema = Joi.object({
        scope: Joi.string()
          .allow('ActualTotalLoad', 'DayAheadTotalLoadForecast', 'ActualvsForecast')
          .required(),

        area: Joi.string()
          .required(),

        timers: Joi.string()
          .allow('PT15M', 'PT30M', 'PT60M')
          .required(),

        date: Joi.date()
          .format('YYYY-MM-DD')
          .utc()
          .optional(),

        month: Joi.date()
          .format('YYYY-MM')
          .utc()
          .optional(),

        year: Joi.date()
          .format('YYYY')
          .utc()
          .optional(),

        format: Joi.string()
          .empty('')
          .default('json')
          .optional()

      });

      const {
        error,
        value
      } = schema.validate(args)
      
      
    }
  }


  //constraints for new user
  if (args.newuser) {
    const schema = Joi.object({
    newuser: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .required(),

      passw: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

      
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'gr'] } }),

      quota: Joi.number()
    })
   
    const {
      error,
      value
    } = schema.validate(args)
    if (error) {
      console.error(error.details[0].message)
    };
  }
  return args 
}



/* Moduser and userstatus doesn't require something 
from user so they haven't any constraints              */





export {
  constraintsCli
};