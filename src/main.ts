import { initialize } from './db'

const message = 'SELECT * FROM sqlite_master'

initialize([message])
