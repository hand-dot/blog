---
templateKey: blog-post
title: start-react-app-with-create-react-app
date: 2019-06-06T01:38:22.997Z
description: >-
  Reactのボイラープレートとして利用されるCreate React
  Appを使えばすぐにReactのコードを書いていくことができます。しかし、少し遠回りをして中で何が行われているか見てみましょう！
thumbnail: /img/undraw_road_sign_mfpo.png
---
## Create React App で始めるReactを理解する

この講義から実際にReactに触れていきます！

前の講義で、[`vscode`](https://code.visualstudio.com/)と[`node.js`](https://nodejs.org/ja/)のインストールがすでに完了していると思いますが、
この講義ではReactを始めるときに使用する[`create-react-app`](https://facebook.github.io/create-react-app/)というコマンドラインツールを少し掘り下げていきたいと思います。


このコマンドラインツールはfecebookが開発したもので、
ワンコマンドでReactを使うことができる環境をセットアップできます。

このツールができるまではReactを使う場合はモジュールバンドラーやトランスパイラ(後ほど説明するので今はなんのことを言っているかわからなくても問題ありません)の設定が必要でしたが、
このツールを使うことでそれらの設定をすっ飛ばしてすぐにReactのコンポーネントを書いていくことができます。

さらにこのツールを利用して開発を効率的に行えますし、ビルド時に最適化も行ってくれます。

これは大変ありがたいことですが、この講義では実際にそのコマンドを使ってセットアップした後に、
このツールには何が含まれていて、どんなことをやってくれるのかを実際に見ていきましょう。

遠回りにはなりますが、
`create-react-app`で作ったReactのWebアプリの動作の仕組みがわかることで、何をしているのかわからない部分を減らし、自信を持って開発ができるようになると考えています。

---

## Create React App ではじめたアプリの動作の仕組み

私たちは`create-react-app`を使ってセットアップしたプロジェクトで`webpack`や`babel`,`autoprefixer`などを意識せず利用していますがそれらを一つづつみていきます。


それではさっそくコマンドを打ってはじめのReactのWebアプリを作成してみましょう！

```
$ npx create-react-app my-app
$ cd my-app
```

### モジュールハンドラーのwebpackはなにをしてくれているのか

バンドラーという言葉がしっくりこなくても大丈夫です。内部的に`webpack`というものを使っていますが、動作をみていきましょう。

次に`my-app`にできたフォルダを確認してみましょう。

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

`public`フォルダーからみていきましょう。

`favicon.ico`はスキップします。

`manifest.json`はホーム画面へ追加する際に、より細かな指定をするための記述です。PWAを作成する際にこちらのファイルを記述していくことになると思いますが、今回はReactのWebアプリにフォーカスしたいのでスキップします。

次にindex.htmlを開いてみましょう。
いろいろとコメントがありますが、このファイルには`id`が`root`の`div`タグしかないことがわかると思います。

次にまだなにもしていませんが、このアプリをビルドしてみましょう。

```
$ npm run build
```

ビルドが終わったらもう一度フォルダを確認してみましょう。

`build`というフォルダが新たに追加されていると思います。

`create-react-app`で生成したプロジェクトでビルドを実行すると`build`というフォルダに成果物が出力されることがわかります。フォルダを開いてみると、先ほど`public`フォルダにあった`index.html`や`favicon.ico`,`manifest.json`があることがわかります。
これは`create-react-app`の内部の実装を見ればわかるのですが、`build`時に`public`フォルダーの内容を`build`フォルダにコピーしています。

次に`index.html`のファイルの内容をみていきましょう。ビルド時に最適化され無駄な文字が削除されているので、少しみにくいのでフォーマットして確認すると、先ほど`public`フォルダで確認した`index.html`と違いをいくつか見つけられると思います。
`body`タグの末尾に`script`タグが挿入されていますね？

なので、ウェブサーバーに`build`フォルダを配置した時に空の`div`タグではなく、Reactのコンポーネントが表示されるのです。


次に、読み込んでいる`static/js/....chunk.js`のファイルを見に行ってみましょう。

とんでもない量のJavaScriptが見れると思います。
これは`webpack`というモジュールバンドラーが`src/index.js`をスタート地点として依存関係の解析を行い、必要なものを最適化しまとめてくれています。

そして、さきほどの`body`タグの末尾に`script`タグが挿入されている話に戻りますが、これも実は`webpack`のプラグインの`html-webpack-plugin`というものが行っています。

実際、普通にWebアプリを作っている場合は、これらの動作については`webpack`の中に設定として書かれているため、あまり意識する必要はなく、なんとなく`webpack`がいろいろとやってくれているんだな〜と思っていただく程度でOKですが、私たちがアプリケーションを書く際に`webpack`の恩恵に直接触れる部分があります。

ES6モジュールのエクスポートとインポートです。

`src/App.js`の最後の行の部分の`export default App;`としている部分が、エクスポートのことで、インポートは`src/index.js`をみてみてましょう。コードの1行目から5行目に書かれている`import App from './App';`と書かれている部分。

この部分はこのプロジェクトにおいてはwebpack無しでは書くことはできません。

またまた先ほどの話に戻りますが、このプロジェクトは`webpack`が`src/index.js`をスタート地点にしてそれらの依存関係をまとめて`static/js/....chunk.js`を作成すると言いましたが、実際には依存関係はこのようにインポートとエクスポートで書いていきます。

また、開発用のwebサーバーにも`webpack`の`webpack-dev-server`というものを使っています。このおかげでコードを書き換えたときに毎回ビルドしなくてもファイルやリソースファイルを更新すると即座に反映してくれる機能をもっています。

---

### トランスパイラーのBabelはなにをしてくれているのか

次にトランスパイラーのBabelが何をしてくれているかみていきましょう
。(https://facebook.github.io/create-react-app/docs/supported-browsers-features)

生成されたjavascriptファイルはES6で書いても最近のブラウザで動くようになっていることを生成物をみて確認する

---

### CSSパーサーのautoprefixerはなにをしてくれているのか

次にautoprefixerが何をしてくれているのか確認する
生成されたcssファイルにベンダープレフィックスが自動的に付与されていることを確認する
