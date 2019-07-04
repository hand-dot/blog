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

上記のHTMLのようなものは**JSX**で書かれた**React要素**と言います。JSXはJavaScriptの構文の拡張です。
実際にはBabelによって下記のようにコンパイルされます。

```javascript:title=
const element = React.createElement('h1', { className: 'heading' }, 'HelloWord!')
```

JSXを利用すると**見た目**はHTMLにかなり近くなります。後述するポイントを除けばHTMLを書いたことのある人であれば同じように書いていくことができると思います。

注意するポイントは3つです。

* `class`はJavaScript上で[予約語](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Reserved_Words)です。そのため、CSSクラスのスタイルを指定するときは上記の例のように`className`と記述します。
* `onclick`などのHTMLの属性は`onClick`のようにキャメルケースで記述してください。
* 閉じタグが存在しないタグ(閉じタグが省略可能なタグ)の`img`や`input`などはスラッシュで終わるようにしてください。例 `<img />`

そして先ほど**見た目**はHTMLに近くなると言いましたが、Babelにコンパイルされたものを見ればわかると思いますが、コンパイル後JSX式は普通のJavaScriptの関数呼び出しに変換され、JavaScriptオブジェクトへと評価されます。本質的にはJavaScriptなので、あらゆる**JavaScriptの式**をJSX内で中括弧に囲んで利用することができます。

一番簡単な例はこんな感じです。

```javascript:title=
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

もう少し発展してどういうことができるのか確認してみましょう。
下記では`users`という姓と名を持ったオブジェクトの配列のデータを使用して、リスト表示するReact要素を書いてみたいと思います。

表示するとこんな感じです。

![](/img/スクリーンショット-2019-07-05-1.33.42.png)

コードをみていきましょう。

```javascript:title=
function formatName(user) {
  return user.firstName + " " + user.lastName;
}

const users = [
  { firstName: "田中", lastName: "太郎" },
  { firstName: "山田", lastName: "花子" }
];
const element = (
  <ul>
    {users.map((user, index) => (
      <li>
        {index + 1}人目: {formatName(user)}
      </li>
    ))}
  </ul>
);


ReactDOM.render(element, document.getElementById('root'));
```

ここでは中括弧を3つ使って下記のことを行なっています。1つ1つみていきましょう。

まずはじめに、`users`の配列を`users.map`の部分で中括弧を書いて実行しています。

そのあとに、`li`タグ内でまた、中括弧が2つ出てきます。中では下記のことを行なっています。
- map関数のcallbackに渡される`index`に1を足して、「1人目、2人目」と表示されるようにしています。
- `formatName`関数にmap関数のcallbackに渡される`user`を引数にセットし実行し　「田中 太郎、山田 花子」と表示されるようにしています。

このようにJavaScriptの式を利用して自由に記述できます。

- - -

次に、よくある間違いをみていきましょう。中括弧で利用できるのは**式**なのですが、**文**を使用してしまい、動かないというケースです。(式と文に関しては[こちら](https://jsprimer.net/basic/statement-expression/)で詳細をみていただけます。)

例えばログインしていたら、「ようこそ！」と表示し、そうでなければ「ログインしてください」と表示するコンポーネントを作成するとしましょう。

```javascript:title=
const login = true;

const element = <div>
  {if(login){
    return <h1>ようこそ!</h1>
  }else{
    return <h1>ログインしてください</h1>
  }}
</div>

ReactDOM.render(element, document.getElementById('root'));
```

残念ながらこれはエラーになってしまいます。
理由は**if文を使っているからです。**先ほど説明したようにJSX内では「あらゆるJavaScriptの式をJSX内で中括弧に囲んで利用することができます。」と説明しました。

このようなケースでは[三項演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Expressions_and_Operators#Conditional_(ternary)_operator)を利用することで正しく表示することができます。

```javascript:title=
const login = true;

const element = <div>
  {login ? <h1>ようこそ!</h1> : <h1>ログインしてください</h1>}
</div>

ReactDOM.render(element, document.getElementById('root'));
```

評価した結果を変数に代入できるものは式であるという理解で問題ありませんが、
**if文**は評価した結果は変数に代入できませんが、三項演算子はできますので正しく表示できます。

React要素がうまく書けない理由としてJavaScriptの式と文の理解が不十分である場合があります。
**式**と**文**に関して、理解が曖昧な場合は[こちら](https://jsprimer.net/basic/statement-expression/)の記事を参考に理解をしておいてください。

そして次に学ぶ**コンポーネント**はReact要素を返却するものです。React要素の書き方をしっかり理解しておいてください。

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