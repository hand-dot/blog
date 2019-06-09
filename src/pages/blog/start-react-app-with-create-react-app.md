---
templateKey: blog-post
title: Create React Appを少し遠回りしてはじめよう
date: 2019-06-06T01:38:22.997Z
description: >-
  Reactのボイラープレートとして利用されるCreate React
  Appを使えばすぐにReactのコードを書いていくことができます。しかし、少し遠回りをして中で何が行われているか見てみましょう！
thumbnail: /img/undraw_road_sign_mfpo.png
---
![Create React Appを少し遠回りしてはじめよう](/img/undraw_road_sign_mfpo.png "Create React Appを少し遠回りしてはじめよう")

## Create React App で始めるReactを理解する

この講義から実際にReactに触れていきます！
前の講義で、[vscode](https://code.visualstudio.com/)と[node.js](https://nodejs.org/ja/)のインストールがすでに完了していると思いますが、この講義ではReactを始めるときに使用する[create-react-app](https://facebook.github.io/create-react-app/)というコマンドラインツールを少し掘り下げていきたいと思います。

**このコマンドラインツールはfecebookが開発したもので、ワンコマンドでReactを使うことができる環境をセットアップできます。**

このツールができるまではReactを使おうとするとモジュールバンドラーやトランスパイラ(後ほど説明するので今はなんのことを言っているかわからなくても問題ありません)の設定が必要でしたが、このツールを使うことでそれらの設定をすっ飛ばしてすぐにReactのコンポーネントを書いていくことができます。

**さらにこのツールを利用して開発を効率的に行えますし、ビルド時に最適化も行ってくれます。**

これは大変ありがたいことですが、この講義では実際にそのコマンドを使ってセットアップした後に、このツールには何が含まれていて、どんなことをやってくれるのかを実際に見ていきましょう。

**遠回りにはなりますが、create-react-appで作ったReactのWebアプリの動作の仕組みがわかることで、何をしているのかわからない部分を減らし、自信を持って開発ができるようになると考えています。**

- - -

## Create React App ではじめたアプリの動作の仕組み

私たちはcreate-react-appを使ってセットアップしたプロジェクトで[webpack](https://webpack.js.org/)や[babel](https://babeljs.io/),[PostCSS](https://postcss.org/)などを意識せず利用していますがそれらを一つづつみていきます。

**まずはコマンドを打ってはじめのReactのWebアプリを作成してみましょう！**(react-scriptsは3.0.1のバージョンを使っています。)

```
$ npx create-react-app my-app
```

また、下記のコマンドを打つことで雛形のアプリを起動して確認することもできます！

```
$ cd my-app
$ npm run start
```

![create-react-app の雛形](/img/スクリーンショット-2019-06-08-23.00.04.png "create-react-app の雛形")

**さっそくコンポーネントをガシガシ書いていきたい気持ちを抑えて遠回りしていきましょう。**

---

### モジュールハンドラーのwebpackはなにをしてくれているのか

![webpack](/img/webpack.jpg "webpack")

**内部的に[webpack](https://webpack.js.org/)というものを使っていますが、webpackとはウェブコンテンツを構成するファイルをまとめてくれます。一緒に動作をみていきましょう。**

まずは`my-app`にできたフォルダを確認してみましょう。下記のようなフォルダの構成になっていますよね？

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

**`public`フォルダーからみていきましょう。**

`public/favicon.ico`はスキップします。

`public/manifest.json`はホーム画面へ追加する際に、より細かな指定をするための記述です。
[PWA](https://developers.google.com/web/progressive-web-apps/)を作成する際にこちらのファイルを記述していくことになると思いますが、今回はReactのWebアプリにフォーカスしたいのでスキップします。

**次に`public/index.html`を開いてみましょう。  
いろいろとコメントがありますが、このファイルの`body`タグには`id`が`root`の`div`タグしかないことがわかると思います。**

これだと真っ白な画面じゃんと思う気持ちを置いておいて、このアプリをビルドしてみましょう。

```
$ npm run build
```

ビルドが終わったらもう一度フォルダを確認してみましょう。

`build`というフォルダが新たに追加されていると思います。

**create-react-appで生成したプロジェクトでビルドを実行すると`build`というフォルダに成果物が出力されることがわかります。**

`build`フォルダを開いてみると、先ほど`public`フォルダにあった`index.html`や`favicon.ico`,`manifest.json`があることがわかります。これはcreate-react-appの内部の実装を見ればわかるのですが、`build`時に`public`フォルダーの内容を`build`フォルダにコピーしています。

次に`build/index.html`のファイルの内容をみていきましょう。

ビルド時に最適化され無駄な文字が削除されているので、少しみにくいのですがフォーマットして確認すると、先ほど`public`フォルダで確認した`index.html`と違いをいくつか見つけられると思います。

`body`タグの末尾に`script`タグが挿入されていますね？

なので、ウェブサーバーに`build`フォルダを配置した時に空の`div`タグではなく、なにかしらの`jsファイル`が読み込まれReactのコンポーネントが表示されるのです。

次に、読み込んでいる`static/js/`のファイルを見に行ってみましょう。


**下記の2ファイルについて簡単に説明させてください。**
(`runtime~main.[hash].js`のファイルはwebpackランタイムロジックの小さな塊ですのでスキップしてOKです。

- `[number].[hash].chunk.js`
  - このコードは`src`ディレクトリ配下でインポートした`node_modules`のアプリケーション外のライブラリのコードが含まれています。(現時点ではReactのコードが含まれています。)
- `main.[hash].chunk.js`
  - このファイルは`App.js`などの`src`ディレクトリ配下のアプリケーションのコードが含まれます。

**このようなファイルが生成されるのはwebpackが`src/index.js`をスタート地点として依存関係の解析を行い、必要なものを最適化しまとめてくれているからです。**

そして、さきほどの`body`タグの末尾に`script`タグが挿入されている話に戻りますが、これも実はwebpackのプラグインの[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)というものが行っています。

実際、普通にWebアプリを作っている場合は、これらの動作についてはwebpackの中に設定として書かれているため、あまり意識する必要はなく、なんとなくwebpackがいろいろとやってくれているんだな〜と思っていただく程度でOKですが、私たちがアプリケーションを書く際にwebpackの恩恵に直接触れる部分があります。
**それはES6モジュールのエクスポートとインポートです。**

`src/App.js`の最後の行の部分の`export default App;`としている部分が、エクスポートのことで、
インポートは`src/index.js`をみてみてましょう。コードの1行目から5行目に書かれている`import App from './App';`と書かれている部分です。

この部分はこのプロジェクトにおいてはwebpack無しでは書くことはできません。
またまた先ほどの話に戻りますが、このプロジェクトはwebpackが`src/index.js`をスタート地点にしてそれらの依存関係をまとめて`static/js/....chunk.js`を作成すると言いましたが、実際には**依存関係はこのようにインポートとエクスポートで書いていきます。**

**webpackのことをモジュールバンドラーと説明しましたがイメージがつきましたでしょうか？様々なファイルをまとめてくれるのでモジュールバンドラーです。また、他のファイルを見てもらえればわかりますが、`jsファイル`だけでなく、`css`,`svg`ファイルなどもインポートして使うことができます。**

また、開発用のwebサーバーにもwebpackの[webpack-dev-server](https://github.com/webpack/webpack-dev-server)というものを使っています。

このおかげでコードを書き換えたときに毎回ビルドしなくてもファイルやリソースファイルを更新すると即座に反映してくれる機能をもっています。
実際にwebpack-dev-serverを使った処理を確認してみましょう。

```
$ npm run start
```

サーバーが立ち上がりますので、`src/App.js`の文字を書き換えて、保存してみましょう。変更がすぐに反映されましたでしょうか？変更するたびに更新されるため、サクサク開発できます。

**再度確認ですが、webpackは`src/index.js`から始まった依存関係をまとめてくれ、その参照を`public/index.html`に挿入してくれるということがわかりました。***

**また、開発時にはその処理をソースコードに変更があるたびに継続して行なってくれるため、書き換えた内容が即座反映されるということがわかりました。**

**このようにファイルを分割することができるのでコンポーネントごとにファイルを分け、モジュールとして利用できます。**

- - -

### トランスパイラーのBabelはなにをしてくれているのか

![babel](/img/babel.png "babel")

**内部的に[Babel](https://babeljs.io/)というものを使っていますが、BabelとはJavaScriptのコードを新しい書き方から古い書き方へと変換するために使われているツールです。**

**なぜトランスパイルするのか**

トランスパイルとはソース・トゥ・ソースコンパイラなどとも言われますが、このケースではJavaScriptをJavaScriptに変換します。

なぜそんなことが必要なのかというと、効率的に開発を行うためです。あまり想像したくないですが、やろうと思えば[`ES6`なしで`React`のWebアプリを開発する](https://ja.reactjs.org/docs/react-without-es6.html)ことは可能です。
しかし、Babelを使用することで[ここ](https://github.com/lukehoban/es6features)に書かれている`ES6`という新しいバージョンのJavaScriptの機能を使うことができます。

また、`JSX`というJavaScriptを拡張した書き方ができます。

**最終的にブラウザで動かすことのできるJavaScriptになりますが、Babelでのトランスパイルを前提にすることで、便利な機能や美しい見た目で効率的に開発することが可能になります。**

動作をみていきましょう。
例えば下記のようなコードを書いてみましょう。

```javascript:title=src/index.js
const log = msg =>　console.log(msg);
log('Hello Word!')
```

`const`というのは`ES6`の機能で一度定義したものに再代入を許可しないという機能があります。また、`=>`はアローファンクションと言って`function`式をより短く記述できる、代替構文です。これらは通常ブラウザ上では動きません。

ではビルドしてみましょう。

```
$ npm run build
```

さきほど動作を確認しましたが、`webpack`がバンドルしてくれるので`/build`を`const`(constの後に半角スペースを入れないと`constructor`がヒットするので注意)や`=>`で検索すればOKです。

検索にヒットしたのは`...chunk.js.map`ではないでしょうか？

このファイルはソースマップファイルと言って、コンパイルされた難読化したコードを元のソースコードファイルから参照できるようにするマッピングの目的で利用されるため<u>実行はされません。</u>ということは実行されるjsファイルに`const`や`=>`が含まれないということです。

**新しい書き方から古い書き方へとトランスパイルされていることが確認できました。**
(先ほど書いた`const`や`=>`は`var`や`function`に置き換えられています。)

トランスパイルを行うタイミングはwebpackがバンドルするときにjsファイルやReactコンポーネントをロードしますがそのときに変換しています。

(`create-react-app`のデフォルトの設定ではInternet Explorer 9, 10, 11には`polyfill`というものが必要です。このコースでは目的にしていないため一旦スキップします。)

(`create-react-app`では`ES6`に加えて[ここ](https://facebook.github.io/create-react-app/docs/supported-browsers-features#supported-language-features)に記載されている機能もサポートしています。)

- - -

### CSSパーサーのPostCSSはなにをしてくれているのか

![postcss](/img/postcss.jpg "postcss")

**内部的に[PostCSS](https://postcss.org/)というものを使っていますが、PostCSSはCSSのパーサーで`PostCSSプラグイン`と組み合わせてCSSに変更を加えるツールです。**

create-react-appではPostCSSプラグインの[`Autoprefixer`](https://github.com/postcss/autoprefixer)というものを利用しています。
`Autoprefixer`は必要なCSSベンダープレフィックス(-webkit-や-ms-)を付与してくれます。

これが何をしてくれているのか実際にみていきましょう。

`src/App.css`の中に下記の`App-logo`というクラスがあります。

```css
.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
}
```

プロパティとしてCSS3の`animation`が使用されています。

先ほどbabelの説明でビルドしたままで結構ですので、
`/build/static/css/...chunk.css`を確認してみましょう。
これもwebpackによって最適化されているのでフォーマットしてから確認しましょう。

先ほど確認した`App-logo`というクラスが下記のように下記変わっていることが確認できます。

```css
.App-logo {
  -webkit-animation: App-logo-spin 20s linear infinite;
  animation: App-logo-spin 20s linear infinite;
  height: 40vmin;
  pointer-events: none;
}
```

ベンダープレフィックスが付与されていることが確認できます。

**こうすることで開発時に`CSS`プロパティに応じて必要なベンダープレフィックスなどを意識せず効率的に開発を行うことができます。**

この変更が加えられるタイミングもbabelと同様です。webpackがバンドルするときに`CSS`ファイルもロードしますがそのときにベンダープレフィックスを付与しています。

- - -

### まとめ

簡単にではありましたが、**create-react-app**で何をしてくれているのかを確認しました。

**かえって混乱してしまいましたか？ゆっくり一つずつを理解していけば大丈夫です。そもそもなにを行なっているかを知らないよりは次のステップに進んでいます。**

**振り返ると、`create-react-app`はすぐに開発を行うことができるだけでなく、開発が効率的に行えるように、かつブラウザの対応状態などをうまく隠蔽して開発に専念できるような工夫がしてあることがわかりました。**

あ、今回はスキップしましたが、上記で紹介したもの以外にも`Progressive Web App`を作るためのアセットや、`単体テスト`を行うためのツール、`コードの静的解析ツール`も入っています。

これ以上の説明は一旦やめておきます。(笑)

それではまた次回。
