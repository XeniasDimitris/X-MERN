import chalk from 'chalk';

const menus = {
  main: `
${chalk.greenBright('energy_group_g25 [command] <options>')}
  ${chalk.blueBright('--scope')} ................ general scope of data
  ${chalk.blueBright('--format')} ................ data format (default json)
  ${chalk.blueBright('--newuser')} ................ add a new user
  ${chalk.blueBright('--moduser')} ........... modifies user's attributes
  ${chalk.blueBright('--userstatus')}.............. print user's usage status
  ${chalk.blueBright('--version')} ............ show package version
  ${chalk.blueBright('--help')} ............... show help menu for a command
`,

  scope: `
${chalk.greenBright('energy_group_g25 --scope <options>')}

  ActualTotalLoad, ................................. Returns total actual system load.
  AggregatedGenerationPerType, .. Returns cumulative production by type of production.
  DayAheadTotalLoadForecast, .................. Returns next day system load forecast.
  ActualvsForecast, ....................... Compare forecasts with actual load values.
`,

  newuser: `
${chalk.greenBright('energy_group_g25 --newuser <options>')}

  --passw,  ..... sets new user's password.
  --email,  ........ sets new user's email.
  --quota,  ....... sets new user's quota.
`,

  moduser: `
${chalk.greenBright('energy_group_g25 --moduser <options>')}

  --passw,  ..... modifies new user's password.
  --email,  ........ modifies new user's email.
  --quota,  ....... modifies new user's quota.
`,
  userstatus: `
${chalk.greenBright('energy_group_g25 --userstatus <options>')}
    --username,  ........ view user's name, email, API Key, quota, remaining API quatas.
    `,
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
    console.log(args._[0])
  console.log(menus[subCmd] || menus.main)
}
