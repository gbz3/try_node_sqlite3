import * as sqlite3 from 'sqlite3'

const db = new sqlite3.Database(':memory:')

export type Sql = { sql: string, params: any }

export function initialize(sqls: Sql[]) {
  sqls.forEach((s, i) => db_run(`[${i}] initialize`, s.sql, s.params))
}


// 1行実行ヘルパー
const db_run = (fn: string, sql: string, args: any) => {
  return new Promise((resolve, reject) => {
    console.log(`${fn}(): "${sql}"`)
    db.run(sql, args, function(err) {
      // bind して this を書き換えるため、アロー関数は使用できない
      err? (console.log(`  db_run => Failed. [${err}]`), reject(err)):
        (console.log(`  db_run => Success. lastid=${this.lastID} changes=${this.changes}`), resolve({ lastid: this.lastID, changes: this.changes, fn }))
    })
  })
}
