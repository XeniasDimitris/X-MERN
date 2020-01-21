import minimist from 'minimist';
import { help } from './help';
import { scope } from './scope'
import { newuser } from './user/newuser'
import { moduser } from './user/moduser'
import { userstatus } from './user/userstatus'
import { Options } from './optionsCli.js'
import { constraintsCli } from './constraintsCli.js'
import { version } from './version.js'








export async function cli(argsArray) {
  
  const argument = minimist(argsArray.slice(2) , Options);
  const args = constraintsCli(argument);





  
  let cmd = Object.keys(args)[0] || 'help';
  args._="[]";

  if (args.version) {
    cmd = 'version';
  }

  if (args.help) {
    cmd = 'help';
  }

  console.log(cmd)




  var Table = require('cli-table3');
  var table = new Table();
   
  table.push(
      { 'Some key': 'Some value' }
    , { 'Another key': 'Another value' }
  );
   
  console.log(table.toString());















  switch (cmd) {
    case 'version':
      version(args);
      break;

    case 'help':
      help(args);
      break;

    case 'scope':
      scope(args);
      break;

    case 'newuser':
        newuser(args);
        break;
  
    case 'moduser':
        modeuser(args);
        break;

    case 'userstatus':
        userstatus(args);
        break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}
