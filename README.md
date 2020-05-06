# try_node_sqlite3

## 環境設定

### Node.jsバージョン指定

```bash
$ nodenv install 12.16.3
$ nodenv local 12.16.3
$ node -v
v12.16.3
$ npm -v
6.14.4
```

### npmモジュール指定( webpack+TypeScriptの最小構成 )

[最新版TypeScript+webpack 4の環境構築まとめ(React, Vue.js, Three.jsのサンプル付き)](https://ics.media/entry/16329/)

```bash
$ npm init
$ npm install --save-dev webpack webpack-cli typescript ts-loader
$ npm install --save sqlite3 @types/sqlite3
$ npm ls sqlite3
try_node_sqlite3@1.0.0 $HOME/git_repos/try_node_sqlite3
└── sqlite3@4.2.0
$ vi package.json
$ cat package.json
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack -w"
  },
...
  "devDependencies": {
    "ts-loader": "^7.0.2",
    "typescript": "^3.8.3",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11"
  },
  "private": true,
  "dependencies": {
    "@types/sqlite3": "^3.1.6",
    "sqlite3": "^4.2.0"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "target": "es5",
    "module": "es2015"
  }
}
```

### webpack.config.js

```javascript
module.exports = {
  mode: "development",
  target: 'node',
  entry: "./src/main.ts",
  // https://github.com/mapbox/node-sqlite3/issues/1029
  externals: { 'sqlite3': 'commonjs sqlite3'},
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ]
  }
};
```

### ビルド&実行

```bash
$ npm run build && node dist/main.js
...
Hash: a87ea7c5ff4f6452a3b0
Version: webpack 4.43.0
Time: 1003ms
Built at: 05/06/2020 11:42:10 AM
  Asset      Size  Chunks             Chunk Names
main.js  5.86 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/db.ts] 797 bytes {main} [built]
[./src/main.ts] 107 bytes {main} [built]
[sqlite3] external "sqlite3" 42 bytes {main} [built]
[0] initialize(): "SELECT * FROM sqlite_master"
  db_run => Success. lastid=0 changes=0
```

