    const buildOptions = require('minimist-options');
    const minimist = require('minimist');
    const Options = buildOptions({
        scope: {
            type: 'string',
            '--': true
        },

        area: {
            type: 'string',
            '--': true
        },

        timers: {
            type: 'string',
            '--': true
        },

        date: {
            type: 'string',
            '--': true
        },

        month: {
            type: 'number',
            '--': true
        },
        
        year: {
            type: 'number',
            '--': true
        },

        productiontype: {
            type: 'number',
            '--': true
        },
        format: {
            type: 'string',
            '--': true
        },
        token: {
            type: 'string',
            '--': true
        },

        newuser: {
            type: 'string',
            '--': true

        },

        passw: {
            type: 'string',
            '--': true
        },

        email: {
            type: 'string',
            '--': true
        },
        
        quota: {
            type: 'number',
            '--': true
        },


        moduser: {
            type: 'string',
            '--': true
        },
    
        userstatus: {
            type: 'string',
            '--': true
        },
    });


export { Options };