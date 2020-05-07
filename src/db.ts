import * as sqlite3 from 'sqlite3'

const db = new sqlite3.Database(':memory:')

export type Sql = { sql: string, params: any }

export function initialize(sqls: string[]): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await db_run(`initialize`, 'BEGIN TRANSACTION', {})
      for (let i=0; i < sqls.length; i++) {
        await db_run(`initialize[${i}]@T`, sqls[i].replace(/\s+/g, ' '), {})
      }
      await db_run(`initialize`, 'COMMIT', {})
      resolve()
    } catch (err) {
      await db_run(`initialize`, 'ROLLBACK', {})
      reject(err)
    }
  })
}

export function getSections(): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    try {
      await db_run(`initialize`, 'BEGIN TRANSACTION', {})
      const { rows } = await db_gets(`getSections`, `SELECT * FROM section`, {})
      await db_run(`initialize`, 'COMMIT', {})
      resolve(rows)
    } catch (err) {
      await db_run(`initialize`, 'ROLLBACK', {})
      reject(err)
    }
  })
}

// 1行実行ヘルパー
const db_run = (fn: string, sql: string, args: any): Promise<{ lastid: number, changes: number, fn: string }> => {
  return new Promise((resolve, reject) => {
    console.log(`${fn}(): "${sql}"${args? `, ${JSON.stringify(args)}`: ''}`)
    db.run(sql, args, function(err) {
      // bind して this を書き換えるため、アロー関数は使用できない
      if (err) {
        console.log(`  db_run => Failed. [${err}]`)
        return reject(err)
      }
      console.log(`  db_run => Success. lastid=${this.lastID} changes=${this.changes}`)
      return resolve({ lastid: this.lastID, changes: this.changes, fn })
    })
  })
}

// N件検索ヘルパー
const db_gets = (fn: string, sql: string, args: any): Promise<{ rows: any[], fn: string }> => {
  return new Promise((resolve, reject) => {
    console.log(`${fn}(): "${sql}"${args? `, ${JSON.stringify(args)}`: ''}`)
    db.all(sql, args, (err, rows) => {
      if (err) {
        console.error(`db_gets => Failed. [${err}]`)
        return reject(err)
      }
      console.info(`db_gets => ${rows.length} row(s) found.`
        + (rows.length > 0? ` row[0]=${JSON.stringify(rows[0])}`: (rows.length > 1? ` row[1]=${JSON.stringify(rows[1])}`: '')))
      resolve({ rows: rows, fn: fn })
    })
  })
}
