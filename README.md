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
  "private": true
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
  entry: "./src/main.ts",
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

### ビルド

```bash
$ cat src/main.ts
const message = 'Hello TypeScript!!';

console.log(message);
$ npm run build
...
Hash: dc68df39a5ebc9ae5023
Version: webpack 4.43.0
Time: 667ms
Built at: 05/05/2020 4:21:44 PM
  Asset      Size  Chunks             Chunk Names
main.js  3.82 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/main.ts] 58 bytes {main} [built]
```

### sqlite3インストール

```bash
$ npm install --save node-pre-gyp
$ npm install --save sqlite3 @types/sqlite3
$ npm ls sqlite3
try_node_sqlite3@1.0.0 /home/kashiba/git_repos/try_node_sqlite3
└── sqlite3@4.2.0
```
