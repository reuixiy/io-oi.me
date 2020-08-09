+++
title = "Hugo 主题 MemE 文档"
date = "2019-11-02T10:42:03+08:00"
tags = ["hugo"]
slug = "documentation-of-hugo-theme-meme"
gitinfo = true
dropCap = false
toc = true
+++

![tn.png](https://raw.githubusercontent.com/reuixiy/hugo-theme-meme/master/images/tn.png "预览图")

## 前言

[MemE](https://github.com/reuixiy/hugo-theme-meme) 是一个强大且可高度定制的 [GoHugo](https://gohugo.io/) 博客主题，专为个人博客设计。MemE 主题专注于优雅、简约、现代，以及代码的正确性。MemE 主题对习惯了 Hexo 的用户非常友好，是从 Hexo 迁移到 Hugo 的不错选择。

为什么要起名为 MemE 呢？这四个字母的含义是基于这个单词本身的，即希望你的博客以及文章能够像[模因](https://t.me/yixiuer/413)一样传播、影响。当然，希望这个主题也是如此，并给你带来欢乐。至于这四个字母的形式（**M**em**E**），则是受 Taylor Swift 的 [ME!](https://www.youtube.com/watch?v=FuXNumBwDOM) 中的「you can’t spell “awesome” without “me”」启发。同时，这两个字母的大写就将这个单词分成了两部分——ME 和 em，中间两个字母组成 em，这也给人一种可爱的感觉。此外，em 也是 me 的反写，这又是我非常喜欢的形式！

MemE 主题践行极简主义，没有使用现有的流行前端库，主题的 HTML 和 CSS 皆由我纯手工从零雕琢而成。同时，MemE 的 CSS 也是按需生成的，比如：如果你不需要代码高亮的功能，那么代码高亮的样式就不会被加入 MemE 的 CSS 文件中。更甚，MemE 无需加载任何图标库——主题的图标是通过 Hugo 的数据模板直接将 SVG 嵌入到 HTML 中实现的——这使得 MemE 不会去加载图标库中大量你所不需要的图标，节约了很多资源。当然，这也意味着你可以方便地自定义属于自己的图标。

极简并不等于简陋，MemE 主题具有许多强大的、现代的特性：

- 功能
    * 完全的深色模式支持
    * 完全的多语言支持
    * 可自定义的 SVG 图标
    * 支持 HTML/CSS/JS 的压缩和 JS 的捆包
    * 代码高亮、脚注、Todo 列表、定义列表、Emoji
    * 字体排版
        * 自定义字体、字号、行间距
        * 自定义文章内容宽度
        * 段首缩排、两端对齐
        * 首字下沉、小型大写
        * 图片说明、图片脚注
        * 着重号
        * 中文标点符号字形纠正
    * 归档页面、分类页面、标签云页面
    * Atom╱RSS 订阅
    * 分节标题锚点
    * 图片外链、视频外链
    * 自定义页脚
    * 404 页面
- 模块
    * 顶栏
    * 菜单栏
    * 文章副标题
    * 文章描述
    * 文章元信息
    * 文章目录
    * 文章版权
    * 文章更新徽章
    * 文章的 Git 版本信息
    * 文章分享
    * 相关文章
    * 文章的标签
    * 文章上下篇
    * 极简页脚、关于页面的极简页脚
    * 返回顶部按钮
- 其它
    * Service Worker 及 PWA 
    * Google Analytics、Google Site Verification、Google AdSense
    * [不蒜子](https://busuanzi.ibruce.info/)页面浏览量和站点访客数、站点访问量
    * Disqus 评论、[Valine](https://valine.js.org/) 评论、[Utterances](https://utteranc.es/) 评论
    * KaTeX 和 MathJax 3.0 公式支持（包括化学方程式）、[Mermaid](https://github.com/mermaid-js/mermaid)
    * SEO 和社交网络相关：Sitemap、JSON-LD、Open Graph、Twitter Cards
    * 支持部署在星际文件系统（IPFS）

以上的这些特性的实现离不开强大的 Hugo，而得益于 Hugo 的优越性，你无需安装第三方的插件就能体验到以上所有特性。事实上，你只需下载一个二进制可执行文件（Hugo）和一个源码包（MemE）就可以了，下面就来讲讲安装。

## 安装

对于不同的操作系统，安装过程可能会有所不同，以下给出的都是 Arch Linux 下的安装过程。如果你使用的是 Ubuntu 或 macOS 或 Windows，请自行查看 [Hugo 官方文档](https://gohugo.io/getting-started/installing/)或 Google 相关教程。此外，由于国内网络环境较差，请你务必具备..科学上网..的能力。

### Hugo

```sh
~ $ sudo pacman -S hugo
~ $ hugo new site blog
```

特别注意：请安装..扩展版..（`extended`）的 Hugo，可以通过 `hugo version` 命令检查。

### MemE

```sh
~ $ cd blog
~/blog $ git init
~/blog $ git submodule add --depth 1 https://github.com/reuixiy/hugo-theme-meme.git themes/meme
```

特别注意：请用 [Git](https://git-scm.com/downloads) 的这种方式安装 MemE，有利于主题的更新，以及持续集成部署。

### 更新提示

如何将 MemE 更新到最新版本？

```sh
~/blog $ git submodule update --rebase --remote
```

请在 GitHub 上关注（Watch）Hugo 和 MemE，如此你就能通过邮件及时获取到最新版本的通知。当然，你也可以通过查看 [Releases](https://github.com/gohugoio/hugo/releases) 页面以获取相关的更新说明。此外，如果有任何问题，可以前往 [Issues](https://github.com/reuixiy/hugo-theme-meme/issues) 页面提问（New issue）。

![watch-hugo.png](/images/watch-hugo.png "关注 Hugo 的版本发布")

## 开始

安装完 Hugo 和 MemE 后，再进行以下两步操作——替换 `config.toml` 和新建文章，以为博客的起飞做准备😺～

1️⃣ 替换 `config.toml`

对于简体中文用户，你可以通过文件浏览器打开站点文件夹，然后将 Hugo 默认生成的 `config.toml` 删除，再进入 `themes/meme/config-examples/zh-cn/` 目录，将 MemE 提供的 `config.toml` ..复制..到站点根目录下。当然，你也可以直接通过终端：

```sh
~/blog $ rm config.toml && cp themes/meme/config-examples/zh-cn/config.toml config.toml
```

2️⃣ 新建文章

由于 Hugo 并不会提供默认的示例文章，所以如果你想在安装和配置完后立即体验 MemE 的话，还需新建一篇文章和一个关于页面：

```sh
~/blog $ hugo new "posts/hello-world.md"
~/blog $ hugo new "about/_index.md"
```

3️⃣ 现在：

```sh
~/blog $ hugo server -D
```

不到 100 ms 后，打开 <http://localhost:1313/>，恭喜你！你已经成功在本地搭建好博客了🎉🎉🍻！尽情享受 MemE 的简约和 Hugo 的飞速吧🚀！

## 配置

在 Hugo 中，配置是通过修改站点根目录下的 `config.toml` 这个配置文件来实现的。MemE 为主题所支持的每种语言的用户都提供了一份相应的示例配置，里面都有非常详细的注释说明🐼，请先花点时间查看示例配置。

示例配置中的「站点配置」中的绝大多数都是 Hugo 的配置，如果你对它们有疑问，请查看 [Hugo 官方文档](https://gohugo.io/getting-started/configuration/)。此外，如果你对 `.toml` 格式的语法有疑问，请查看 [TOML 细则](https://github.com/toml-lang/toml)。

需要注意的是，MemE 的示例配置是会随着 MemE 的更新而更新的，而有一些变动可能会让旧的示例配置无法工作。因此，在你更新主题前，请先查看示例配置的[改动历史](https://github.com/reuixiy/hugo-theme-meme/commits/master/config-examples/zh-cn/config.toml)，并将改动手动同步到你的 `config.toml` 文件中。当然，如果有这样的改动，我也会在 MemE 的[版本发布](https://github.com/reuixiy/hugo-theme-meme/releases)中说明，你可以在 GitHub 上关注 MemE 以及时获取通知。

### 品牌栏

如果你想使用 SVG 作为你的博客的品牌栏，那么你首先需要将你的 SVG 文件[压缩](https://jakearchibald.github.io/svgomg/)一下，然后用代码编辑器打开，添加一个名为 `brand` 的 `class`，比如：

```diff
- <svg xmlns="http://www.w3.org/2000/svg">
+ <svg xmlns="http://www.w3.org/2000/svg" class="brand">
```

接下来，在..站点..的 `data` 文件夹内新建一个 `SVG.toml` 文件，并添加一行：

```toml
brand = ''
```

最后，将你的 SVG 粘贴进 `''` 内。

### 图标

MemE 自带了 25+ 个 [Font Awesome](https://fontawesome.com/) 图标，你可以在 `themes/meme/data/SVG.toml` 文件中找到它们，但请不要编辑这个文件。

如果你想要添加图标，可浏览 Font Awesome 的[免费图标列表](https://fontawesome.com/icons?d=gallery&m=free)，然后去 [GitHub](https://github.com/FortAwesome/Font-Awesome/tree/master/svgs) 上找到并点击 Raw 以直接复制相应的 SVG 代码。

接下来的操作与[品牌栏](#品牌栏)的类似，只不过你添加的 `class` 名应为 `icon`。

### 归档页面

如果你有多个文章分区，你可能就需要一个归档页面，怎么配置呢？

首先，在站点的 `content` 文件夹下新建一个名为 `archives` 的文件夹，并在该文件夹下新建一个 `_index.md` 文件，里面加上：

```t
+++
title = "归档"
+++
```

然后，添加一个入口，比如在菜单栏中，往 `config.toml` 中加入：

```toml
[[menu.main]]
    url = "/archives/"
    name = "归档"
    weight = 2
    pre = "internal"
    post = "archive"
```

其中，`weight` 可自行修改一下。

### 代码高亮的样式

如果你不喜欢 MemE 默认的代码高亮的样式，可以前往[这个列表](https://xyproto.github.io/splash/docs/longer/all.html)找一个你喜欢的，比如 `monokai`，然后：

```sh
hugo gen chromastyles --style=monokai
```

将输出与 [`_highlight.scss`](https://github.com/reuixiy/hugo-theme-meme/blob/master/assets/scss/components/_highlight.scss) 中的相关代码对比，找出相关颜色值，然后[定制](#定制)一下 [`assets/scss/themes/`](https://github.com/reuixiy/hugo-theme-meme/tree/master/assets/scss/themes) 中的相应文件内的相应代码即可。

### 多语言站点

在 Hugo 中，可以方便地实现多语言站点，在 MemE 中，你甚至可以为站点的不同语言配置不同的样式。你可以在[本博客的配置文件](https://github.com/reuixiy/io-oi.me/blob/master/config.toml)的底部找到相关代码。

### KaTeX/MathJax/Mermaid

对于 KaTeX 和 MathJax，由于 Markdown 与 TeX 的语法冲突，可能会导致相关 TeX 代码被 Markdown 渲染器处理，进而导致公式无法显示。比如：

符号 | TeX | Markdown
:---:|:---:|:---:
`_` | 下标 | [`<em>`](https://daringfireball.net/projects/markdown/syntax#em)
`\` | 标识符 | [转义符](https://daringfireball.net/projects/markdown/syntax#backslash)

为了解决这个冲突问题，你可以在受影响的 TeX 代码前后加上 HTML 的 `<div>` 和 `<span>` 标签来解决，如下：

1. 公式
   ```html
   <div>
   $$
   ...
   $$
   </div>
   ```

2. 行内公式
   ```html
   <span>$...$</span>
   ```

这样就能避免其被 Markdown 渲染器处理。当然，如果其不受影响，则无需这样麻烦。

---

类似的问题，也会导致 Mermaid 的渲染失败。在 MemE 中，Mermaid 的食用方法如下：

1. 在文章的 Front Matter 中开启：
   ```toml
   mermaid = true
   ```

2. 使用 `<div>` 包裹相关代码：
   ```html
   <div class="mermaid">
   graph TD;
       A-->B;
       A-->C;
       B-->D;
       C-->D;
   </div>
   ```

## 组件

在强大的 Hugo 中有一个叫[主题组件](https://gohugo.io/hugo-modules/theme-components/)的东西，说白了就是你可以同时使用多个主题。你可以使用这个功能添加一些别人写好的[短代码](https://gohugo.io/content-management/shortcodes/)（类似 Hexo 中的标签插件），比如：如果你喜欢 NexT 中的 [Note 标签](https://theme-next.org/docs/tag-plugins/note)并想将它迁移到 MemE，可以通过 [hugo-notice](https://github.com/martignoni/hugo-notice) 这个主题组件实现。

## 定制

在 MemE 中，你可以方便地自定义样式、模板，但需要注意的是：..千万不要..直接修改 MemE 的文件！这样是非常不利于主题的更新的。

在 Hugo 中，如果你想要自定义主题的一些样式、模板，直接在..站点..下新建相应的文件即可覆盖..主题..的模板。

此外，如果你想要自定义样式，推荐在 `~/blog/assets/scss/custom/_custom.scss` 文件（没有自建）中添加。

## 支持的 Front Matter

见 [README.md](https://github.com/reuixiy/hugo-theme-meme/blob/master/README.zh-cn.md)。
