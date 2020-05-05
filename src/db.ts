import { verbose } from 'sqlite3'

const sqlite3 = verbose()
const db = new sqlite3.Database(':memory:')

export function initialize(sqls: string[]) {
  sqls.forEach(e => console.log(e))
}
