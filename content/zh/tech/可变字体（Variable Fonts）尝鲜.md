+++
title = "可变字体（Variable Fonts）尝鲜"
date = "2020-02-29T22:00:19+08:00"
tags = ["typography", "web"]
slug = "get-started-with-variable-fonts"
gitinfo = true
+++

最近在系统地学习 Web，在 MDN 的 CSS 学习区的 [Web fonts](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts#Variable_fonts) 一节底部，看到 Variable Fonts 即「[可变字体](https://zh.wikipedia.org/wiki/可变字体)」一词，瞌睡之中突然来了点兴趣——因为之前间断地见过这个术语，前不久还在 Twitter 上刷到过好几次——于是我点开 [Variable fonts guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)，并马上被[这个示例](https://mdn.github.io/css-examples/variable-fonts/sample-page.html)的字体和视觉效果吸引了，决定马上尝试一下。二话不说，`CTRL + U` 发现 `Amstelvar VF` 然后 Google 到 [Amstelvar](https://github.com/TypeNetwork/Amstelvar)，先 Star 然后开始尝鲜可变字体！

## 前言

不过，可变字体其实已经不新鲜了，Google 结果中浏览到这篇 [Get started with variable fonts](https://medium.com/@clagnut/get-started-with-variable-fonts-c055fd73ecd7)，而此文的发布日期是 2017 年的 2 月份。但无论如何，可变字体对我来说还是新鲜的，而..尝试..一下也发现这是值得的——可变字体让人耳目一新。

![variable-fonts-sample-page.png](/images/variable-fonts-sample-page.png)

⌛经过一番尝试，我已经将上文提到的 Amstelvar 这个开源的可变字体应用到了我的博客——你现在所见的本博客正文中的英文即是。下面，就来说说可变字体在 Web 上的食用方法😺。

## 正文

首先，我们[去 GitHub 上下载 Amstelvar 字体](https://github.com/TypeNetwork/Amstelvar/tree/master/fonts)，将 `Amstelvar-Roman-VF.ttf` 和其斜体 `Amstelvar-Italic-VF.ttf` 下载到本地。

然后，我们将 `.ttf` 压缩成既现代又节约的 `.woff2`，可以使用 [ttf2woff2](https://github.com/nfroidure/ttf2woff2)，或者你也可以尝试其它方法。

接下来，我们添加 CSS 代码，使用 `@font-face` 指定一下我们要使用的字体：

```css
/* https://github.com/TypeNetwork/Amstelvar */

@font-face {
    font-family: 'Amstelvar';
    font-display: swap;
    src: url('/fonts/Amstelvar-Roman-VF.woff2') format('woff2-variations'),
         url('/fonts/Amstelvar-Roman-VF.woff2') format('woff2');
    font-weight: 100 900;
    font-stretch: 50% 125%;
    font-style: normal;
}

@font-face {
    font-family: 'Amstelvar';
    font-display: swap;
    src: url('/fonts/Amstelvar-Italic-VF.woff2') format('woff2-variations'),
         url('/fonts/Amstelvar-Italic-VF.woff2') format("woff2");
    font-weight: 100 900;
    font-stretch: 50% 125%;
    font-style: italic;
}
```

如以上代码所示，你需要将我们之前压缩好的两个字体放到网站根目录下的 `fonts` 文件夹；然后 `src` 中重复了两行是利用了 [CSS 的运行规则](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works#What_happens_if_a_browser_encounters_CSS_it_doesnt_understand)来实现浏览器的兼容性，以防 `woff2-variations` 这个全新的字体格式不能被旧浏览器识别而导致字体不能被应用；至于 `font-weight` 和 `font-stretch` 则表示字体的字重和字宽的范围；最后 `font-style` 则指定字体的风格，这里主要是为了区别斜体——使用真斜体而非通过算法实现的假斜体。

你可能会问：我们怎么知道字体支持的字重和字宽的范围的呢？很简单，在 Linux 中的 GNOME 桌面环境下，用默认的 Fonts 打开即可查看到相关信息，如下：

![amstelvar-roman-gnome-fonts-info.png](/images/amstelvar-roman-gnome-fonts-info.png "Amstelvar Roman 字体的信息")

我们可以发现 *Variation Axes* 之中的 `Weight 100 — 900, default 400` 和 `Width 50 — 125, default 100`，即字体的字重和字宽的范围和默认值。除此之外，我们在其下方还能发现一大堆抽象的名字，这些就是可变字体的「变形轴」（Variation Axis）。我们可以通过 [Wakamai Fondue](https://wakamaifondue.com/) 这个网站将我们之前下载的字体拖拽上去，通过移动滑块的方式来形象直观地理解这些术语，如下：

![variation-axes-on-wakamaifondue.png](/images/variation-axes-on-wakamaifondue.png "在线调试可变字体 Amstelvar Roman 的变形轴")

至于这些术语的全称和详细描述，可以参考 [Font Bureau OpenType 1.8 Variations Axes Proposals](https://variationsguide.typenetwork.com/)。

需要注意的是，变形轴分已注册和自定义两类。自定义的必须全部字母大写，详细可参考 [OpenType 细则](https://docs.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg)。其中，有一个字体设计中常用的 Grade（等级）[^1]，其变形轴标签为 `GRAD`，其它的可以参考上文提到的[这个提议](https://variationsguide.typenetwork.com/)了解。

已注册的目前有以下 5 个：

变形轴名（Name） | 变形轴标签（Axis tag）
:---:|:---:
Weight       | `wght`
Width        | `wdth`
Italic       | `ital`
Slant        | `slnt`
Optical Size | `opsz`

要注意的是，这些变形轴能否配置使用不是取决于细则的定义，而是取决于字体是否支持。比如，我们在此文中使用的 Amstelvar Roman 字体就没有 `Italic` 和 `Slant` 变形轴——因为其有独立设计的斜体 Amstelvar Italic。所以，在配置可变字体的变形轴之前务必先查看字体支持的变形轴 *Variation Axes*。

---

那么在 CSS 中，我们怎么去配置这些变形轴呢？有以下两种方式：

1. 通过 CSS 中现有的字体属性

    CSS 中的现有属性 | 变形轴名（Name） | 变形轴标签（Axis tag）
    :---:|:---:|:---:
    `font-weight`         | Weight        | `wght`
    `font-stretch`        | Width         | `wdth`
    `font-style`          | Italic, Slant | `ital`, `slnt`
    `font-optical-sizing` | Optical Size  | `opsz`

2. 通过 CSS 的 [`font-variation-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings) 属性[^2]

    配置的语法很简单，比如：

    ```css
    font-variation-settings: 'wght' 400, 'wdth' 100;
    ```

    即一个变形轴标签 + 空格 + 配置值，然后如有多个变形轴要配置，则添加逗号分隔。

既然有两种方式，且其配置值会相互冲突，我们肯定会想到优先级的问题，引用 MDN 的说明：

{{< quote en >}}

**Note**: font characteristics set using `font-variation-settings` will always override those set using the corresponding basic font properties, e.g. `font-weight`, no matter where they appear in the cascade. In some browsers, this is currently only true when the `@font-face` declaration includes a `font-weight` range.

— *https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings*

{{< /quote >}}

也就是说，只要配置使用了 `font-variation-settings` 属性，无论基本字体属性（比如 `font-weight`）的层级如何，都会覆盖它。在我的实际测试中（`Chrome 80.0.3987.122`），发现的确如此，但应用的只是这个可变字体包含的字符，不影响其不包含的字符，如下图：

![font-variation-settings-priority-test.png](/images/font-variation-settings-priority-test.png "优先级测试结果")

注意上图中：一、英文的字重被优先级更低的 `400` 覆盖；二、中文的字重还是 `700`。

---

接下来，我们来配置一个实例。不过这里我们配置的不是单个元素——因为这其实很简单，用 CSS 选择器定位到该元素，然后直接添加 `font-variation-settings` 即可——这里我们需要配置的是这样一个需求：

1. 修改正文字体的结构，使其更紧凑、高挑；
2. 修改标题字体的结构，使其更醒目、冲击。

其实现代码如下：

```css
/* 需求 1.1 */

:root {
    --text-wdth: 90;
    --text-opsz: 40;
    --text-YTLC: 460;
}

body {
    font-variation-settings:
        'wdth' var(--text-wdth),
        'opsz' var(--text-opsz),
        'YTLC' var(--text-YTLC);
}

/* 需求 1.2 */

.post-title {
    font-variation-settings:
        'wght' 550,
        'opsz' 60,
        'YOPQ' 90;
}
```

我们先来看看需求 1.1，我们首先通过 [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)[^3] 这个「老祖宗」来声明（定义）我们要使用的 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)，然后再给 `body` 这个「老祖宗」添加一个 `font-variation-settings` 属性，这样其子元素都能继承这一属性，最后为该属性里的变形轴标签配置相应的值，这里的话就是 CSS 变量的值。使用 CSS 变量是为了让子元素能够更方便地覆盖掉「老祖宗」的默认值，比如：以上面的代码为例，如果你有一个元素需要减小 `wdth` 的值，你就只需往该元素添加 `--text-wdth: 50;` 来重新为其赋值，而无需又重复一遍很长的 `font-variation-settings`。至于需求 1.2，这里我们就直接为其赋值了，原因见下方。

![variable-fonts-adjustment-compare.png](/images/variable-fonts-adjustment-compare.png "定制前和定制后")

---

特别要注意的是，以下这段代码是错误的（注意高亮部分）：

```diff
:root {
    --text-wdth: 90;
    --text-opsz: 40;
    --text-YTLC: 460;
}

body {
     font-variation-settings:
+        'wght' var(--text-wght),
         'wdth' var(--text-wdth),
         'opsz' var(--text-opsz),
         'YTLC' var(--text-YTLC);
}

+ .post-title {
+     --text-wght: 500;
+ }
```

因为对于除 `.post-title` 以外的所有其非子级元素来说，`--text-wght` 变量是未声明（定义）的，以上代码会导致所有这些元素的 `font-variation-settings` 都失效。而如果我们这样写：

```diff
:root {
+    --text-wght: 400; /* default value */
     --text-wdth: 90;
     --text-opsz: 40;
     --text-YTLC: 460;
}

body {
     font-variation-settings:
+        'wght' var(--text-wght),
         'wdth' var(--text-wdth),
         'opsz' var(--text-opsz),
         'YTLC' var(--text-YTLC);
}

+ .post-title {
+     --text-wght: 500;
+ }
```

即在 `:root` 中定义一下新增的 `--text-wght`，这又会导致一个问题，比如：如果文章中有一个 `<strong>` 标签，它的默认字重是 `700`，而根据上文的优先级问题可知——我们新加的 `--text-wght: 400` 会覆盖这个值，让 `<strong>` 标签的字重变成 `400`。也就是说，这可能会让我们陷入一个地狱——我们必须为其它所有的字重不为 `400` 的元素添加 `--text-wght` 来纠正其字重。

可见，这应该是目前使用中的一个缺陷，要完美地解决这个问题，我觉得就需要在 [`font-variation-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings) 中为变形轴标签新增一个特殊值 `inherit` 或 `auto`，它的作用是继承 CSS 中现有的字体属性的值或者字体的默认值。可惜的是，目前并没有这样的特殊值，所以这个问题目前还无法完美解决。

---

最后，还有一步，修改相应元素的 `font-family`，将 `Amstelvar` 添加进去，比如：

```css
body {
    font-family: 'Amstelvar', 'Noto Serif SC', serif;
}
```

## 参考

1. [Variable fonts guide | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
2. [Variable fonts guide (zh-CN) | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
3. [Introduction to variable fonts on the web | Google Developers](https://developers.google.com/web/fundamentals/design-and-ux/typography/variable-fonts)

## 链接

1. [Google Fonts](https://fonts.google.com/)
2. [CSS API update | Google Developers](https://developers.google.com/fonts/docs/css2)
3. [A Variable Fonts Primer](https://variablefonts.io/)
4. [70+ Best Free Fonts for Designers – Free for Commercial Use in 2020](https://www.websiteplanet.com/blog/best-free-fonts/)

## 结语

对于大多数人，字体通常都是仅仅「只可读不可写」的，而可变字体的到来，改变了这种情况——可变字体让我们每个人都可以在「盒子」外方便地定制出属于自己的个性字体样式。可变字体，前景光明！

## 附加

```css
/* 这里不能遗漏任何一项，否则 `font-variation-settings` 会失效 */
:root {
    --text-wght: 400;
    --text-wdth: 100;
    --text-opsz: 14;
    --text-GRAD: 0;
    --text-XTRA: 562;
    --text-XOPQ: 176;
    --text-YOPQ: 124;
    --text-YTLC: 500;
    --text-YTUC: 750;
    --text-YTAS: 767;
    --text-YTDE: -240;
    --text-YTFI: 760;
}

/* Amstelvar Roman 字体目前所支持的所有变形轴 */
body {
    font-variation-settings:
        /* Weight */
        'wght' var(--text-wght),
        /* Width */
        'wdth' var(--text-wdth),
        /* Optical Size */
        'opsz' var(--text-opsz),
        /* Grade */
        'GRAD' var(--text-GRAD),
        /* X Transparent */
        'XTRA' var(--text-XTRA),
        /* X Opaque */
        'XOPQ' var(--text-XOPQ),
        /* Y Opaque */
        'YOPQ' var(--text-YOPQ),
        /* Y Transparent Lowercase */
        'YTLC' var(--text-YTLC),
        /* Y Transparent Uppercase */
        'YTUC' var(--text-YTUC),
        /* Y Transparent Ascender */
        'YTAS' var(--text-YTAS),
        /* Y Transparent Descender */
        'YTDE' var(--text-YTDE),
        /* ? */
        'YTFI' var(--text-YTFI);
}
```

---

[^1]: 关于 Grade 的历史，可以参考 [Wikipedia 的 Font 词条中 Weight](https://en.wikipedia.org/wiki/Font#Weight) 一节的底部。
[^2]: 顺便安利一个 [`font-feature-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) 属性，特别是它的 `"tnum"` 这个值，其可以让本来不等宽的数字变成等宽（需要字体支持）。
[^3]: 当然，你也可以使用 `html` 或 `body`。
