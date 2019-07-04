---
templateKey: blog-post
title: Reactの基本的な考え方のイントロ
date: 2019-06-23T14:04:34.154Z
description: reactを実際に書いていくにあたっての導入としてこの記事を書きました。
thumbnail: /img/react.png
---
memo

入門のためのまとまったブログ:https://www.taniarascia.com/getting-started-with-react/

入門のための動画: https://egghead.io/courses/the-beginner-s-guide-to-react

公式サイト: https://ja.reactjs.org/

公式サイトの作業の流れ: https://ja.reactjs.org/docs/thinking-in-react.html

公式サイトの用語集: https://ja.reactjs.org/docs/glossary.html

- - -

ここでは何回かの講義に分けて、シンプルなログインフォームを作成し、Reactの機能を学んでいきます。



![](/img/react-form.gif)



- - -

構成としては下記になります。

* JSXとReact要素
* コンポーネント
  * 関数
  * クラスベース1
  * クラスベース2(Class Fields and Static Properties)
* props&state
  * props:コンポーネントの再利用をするためのデータ
  * state:ユーザー操作や時間経過などで動的に変化するデータ
* ライフサイクル&ref
* Form
  * props,stateとは逆方向のデータフローを追加する
* 用語の整理とまとめ

- - -

# JSXとReact要素

ここではJSX,React要素について学んでいきます。

```javascript:title= 
const element = <h1 className="heading">HelloWord!</h1>
```

上記のHTMLのようなものはJSXと言います。JavaScriptの構文の拡張です。
実際にはBabelによって下記のようにコンパイルされます。

```javascript:title= 
const element = React.createElement('h1', { className: 'heading' }, 'HelloWord!')
```

JSXを利用すると**見た目**はHTMLにかなり近くなります。後述するポイントを除けばHTMLを書いたことのある人であれば簡単にコンポーネントを作成することができると思います。

注意するポイントは3つです。
- `class`はJavaScript上で予約語です。
-
-



- - -

# コンポーネント

- - -

# props&state

React には 2 種類の「モデル」データが存在します。props と state です。このふたつの相違を理解するのは重要なことです。

- - -

# ライフサイクル&ref

- - -

# Formの値をハンドリング

- - -

# 用語の整理とまとめ
