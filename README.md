# try_node_sqlite3

## 環境設定

### Node.jsバージョン指定

```bash
$ nodenv local 14.1.0
$ node -v
v14.1.0
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
$ npm run build
...
Insufficient number of arguments or no entry found.
Alternatively, run 'webpack(-cli) --help' for usage info.
...
```
