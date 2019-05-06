---
templateKey: blog-post
title: 最初のブログ
date: 2019-05-01T08:30:57.052Z
description: はじめのブログです。
thumbnail: /img/undraw_startup_life_2du2.png
tags:
  - Blog
---
![undraw_startup_life_2du2](/img/undraw_startup_life_2du2.png "undraw_startup_life_2du2")

はじめまして。アウトプットする場所がほしいなと思っていたので簡単なブログをはじめました。

主にUIの開発についての考えをまとめたり、学習記録と技術解説などをぼちぼちやっていこうと思います。よろしくお願いします。

```javascript:title=コードサンプル 
function Form({ showMessage }) {
  let message = null;
  if (showMessage) {
    message = {
      type: 'p',
      props: { children: 'I was just added here!' }
    };
  }
  return {
    type: 'dialog',
    props: {
      children: [
        message,
        { type: 'input', props: {} }
      ]
    }
  };
}
```

