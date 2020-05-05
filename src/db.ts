import * as sqlite3 from 'sqlite3'

const db = new sqlite3.Database(':memory:')

export function initialize(sqls: string[]) {
  sqls.forEach(e => console.log(db.get(e)))
}
