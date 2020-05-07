import * as yaml from 'js-yaml'
import * as fs from 'fs'

import * as db from './db'

const config = yaml.safeLoad(fs.readFileSync('dist/config.yaml', 'utf-8'));

(async () => {
  await db.initialize(config.database.initialize_sqls);
  const sections = await db.getSections()
  console.log(sections)
})()
