import * as sqlite3 from 'sqlite3'

const db = new sqlite3.Database(':memory:')

export type Sql = { sql: string, params: any }

export function initialize(sqls: string[]) {
  return new Promise(async (resolve, reject) => {
    try {
      await db_run(`[] initialize`, 'BEGIN TRANSACTION', {})
      for (let i=0; i < sqls.length; i++) {
        await db_run(`[${i}] initialize`, sqls[i], {})
      }
      await db_run(`[] initialize`, 'COMMIT', {})
      resolve()
    } catch (err) {
      await db_run(`[] initialize`, 'ROLLBACK', {})
      reject(err)
    }
  })
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
