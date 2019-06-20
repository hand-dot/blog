---
templateKey: blog-post
title: React開発で生産性を向上させるヒント
date: 2019-06-10T04:38:47.529Z
description: Create React Appで作ったアプリなど、Reactアプリで開発するにあたって生産性を向上させるヒントをまとめました。
thumbnail: /img/undraw_web_developer_p3e5.png
---
# 生産性を向上させるヒント

エディターやブラウザにいくつかの設定をしておくことで、バグを未然に防いだり、デバッグの作業を効率的に行うことができます。
実際、慣れていないときは多くの時間をバグと戦うこともあると思いますが、
そのときに、どのようにしてバグを未然に防ぐのか,原因を突き止めるのかというヒントをお伝えできればと思います。

ここで、設定するのは

* eslint のプラグイン
* pretter のプラグイン
* Google Chrome 拡張機能版の React Developer Tools

です。

すでに設定されている方に関してはこの講義はスキップしていただいて結構ですが、していない方は一緒に設定をしていきましょう。

## エディターの設定をしよう

vscode上で、[eslint のプラグイン](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#overview),[pretterのプラグイン](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)をインストールしていきます。

[eslint](https://eslint.org/)はJavaScriptのための静的検証ツールです。コードを実行する前に明らかなバグを見つけたりすることができます。
[pretter](https://prettier.io/)はコードを整形してくれるフォーマッタです。コードのスタイルの一貫性を保つことができます。

これらをvscodeでインストールし、使ってみましょう。

### eslint

![](./img/eslint.png)

下記の画像では[eslint のプラグイン](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#overview)のプラグインをインストールすることで、

```
<img src={logo} className="App-logo" alt="logo"/>
```

の部分を

```
<img src={lego} className="App-logo" alt="logo"/>
```

に書き換え、`'lego' is not defined.eslint(no-undef)`というエラーになっています。

![](./img/eslint.gif)

このようにeslintを導入することで静的解析によってバグを早期に発見することができます。

- - -

#### pretter

![](./img/pretter.png)

下記の画像では[pretterのプラグイン](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)のプラグインをインストールし`vscode`の保存時にフォーマットするという設定を行うことで、保存時に自動的にフォーマットがかかっています。

![](./img/pretter.gif)

このようにpretterを導入することでコードのスタイルの一貫性を保つことができます。

- - -

## React 開発者ツールを使おう

[React Developer Tools
](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ja)を使うことで意図しない動きに対しての原因の追求がスムーズになります。

Google Chrome 拡張機能から「React Developer Tools」を検索してインストールするとReactの開発環境でGoogle Chromeの開発者ツールから、
Reactのタブが選択できるようになります。

![](./img/react-developer-tools.jpg)

具体的にどのようなことができるかを紹介します。

- - -

### props, stateを確認したり書き換える

![](./img/react-developer-tools1.gif)

上記にあるようにReactコンポーネントを選択して、コンポーネントの値を確認したり、書き換えることができます。(例ではpropsを書き換えています。)

画面に問題がある場合に、レンダーを担当するコンポーネントを見つけて、問題の切り分けをします。

コンポーネントの呼び出し(`props`)の問題なのか、状態(`state`)の問題なのか、描画(`render`)の問題ないのかというように3つに分類できます。

はじめに、`props`を確認し、コンポーネントに渡された引数を確かめることができます。
`props`が間違っている場合はこのコンポーネントを呼び出しているコンポーネントへ1つ上に辿っていき、おかしな`props`を渡したコンポーネントを見つけることで原因がわかります。

`props`が正しい場合は、次に`state`を確認します。stateが間違っている場合はコンポーネント内の`setState()`の呼び出しのどれかによって問題が引き起こされていることがわかります。

`props`も`state`も正しい場合はコンポーネントの描画(`render`)内に問題があるということになります。

React Developer Toolsを使ってコンポーネントを調べることで、問題に対して素早く原因を特定し、デバッグを当てずっぽうで行わずに、手順を追って行うことがきます。

- - -

### ブレークポイントを貼る例

![](/img/react-developer-tools2.gif)

上記の方法で`props`や`state`を調べてもわからない場合、ブレークポイントを貼って、動作を確認すことができます。問題のコンポーネントを右クリックして「Show xxx Source」をクリックしてコンポーネントのソースコードに飛んでみてください。

ソースコードにブレークポイントを貼り(上記の例では\[6]行目をクリックしてブレークポイントを貼っています。)、ブレークポイントを通過する動作を行うことで次にそこに到達した時に、コードの実行を止め、その時に変数がどのような値になっているのか確認することができます。

`props`, `state`を調べる際や、`render`内を調べる際にブレークポイントを呼び出し元から貼って1つづつ順を追って値を確認していくことで実際に値がどのように渡されているのか、変わっているのかというところをアプリを動かしながら見ることができます。

---

上記の2つ紹介した使い方だけでも、うまく使いこなすことで効率的にデバッグを行うことができます。
なにかおかしい,うまくいかないと思ったときにこの「React Developer Tools」の機能を思い出して使ってみてください。

- - -

## まとめ

エディターは他にもいろいろとカスタマイズができますし、たくさんのショートカットがあります。毎日使うものなので徹底的に調べ、使いこなすことができると生産性は飛躍的に向上します。

そしてReact Developer Toolsをはじめ、**Google Chromeの開発者ツール**はWeb開発になくてはならない存在です。

開発者ツールを使いこなせると開発体験は飛躍的に向上します。基本的な使い方はGoogle開発者公式の[こちら](https://developers.google.com/web/tools/chrome-devtools/)から確認できます。日々進化を続けており、[こちら](https://developers.google.com/web/updates/)に最新のGoogle Chromeの記事がアップロードされるので、そちらも気になる方はチェックしてみてください！

**今回はエディターや開発者向けのブラウザの機能などを紹介しましたが、開発をサポートしてくれるものは他にもたくさんあります。ツールにこだわったり、理解を深めることで生産性は上げられます。楽しく開発するためにも日々、ツールへの理解を深めていきましょう。**


## おまけ

ほかにも開発に欠かせないアプリ

- クリップボードの履歴アプリ
  - win: [Clibor](https://www.vector.co.jp/soft/winnt/util/se472890.html)
  - mac: [Clipy](https://clipy-app.com/)
- 画面分割アプリ
  - win: `win`key + `矢印`key で可能
  - mac: [ShiftIt](https://github.com/fikovnik/ShiftIt)
