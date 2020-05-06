import * as yaml from 'js-yaml'
import * as fs from 'fs'

import { initialize } from './db'

const config = yaml.safeLoad(fs.readFileSync('dist/config.yml', 'utf-8'))

initialize(config.database.initialize_sqls);
