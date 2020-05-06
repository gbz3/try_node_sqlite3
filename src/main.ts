import { initialize } from './db'

initialize([
  { sql: `SELECT * FROM sqlite_master`, params: {} }
])
