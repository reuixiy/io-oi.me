+++
title = "Hugo 与 Hexo 的异同"
date = "2019-11-14T11:25:35+08:00"
description = "一句话：Hexo 是一个博客框架，Hugo 是一个网站框架。"
tags = ["hugo", "hexo"]
slug = "hugo-vs-hexo"
gitinfo = true
dropCap = false
+++

![hugo-vs-hexo.png](/images/hugo-vs-hexo.png)

## 前言

[Hugo](https://gohugo.io/) 是一个基于 [Go](https://golang.org/) 语言开发的静态网站生成器（[SSG](https://www.staticgen.com/)），目前由 [@bep](https://github.com/bep) 领衔开发，Hugo 的突出特点是简洁、灵活、高效，目前有很多知名网站都在使用 Hugo：[Netlify](https://www.netlify.com/)、[Let’s Encrypt](https://letsencrypt.org/)、[IPFS](https://ipfs.io/)、[Cloudflare Developers](https://developers.cloudflare.com/)、[DigitalOcean Docs](https://www.digitalocean.com/docs/)、[1Password](https://1password.com/) 等等。与目前国内流行的 [Hexo](https://hexo.io/) 相比，Hugo 的速度可称为飞速🚀——在安装和使用上都是如此。

下面，我们就来看一下 Hugo 与 Hexo 的一些异同，不过需要注意的是：此文主要探讨的是用户层面上的一些异同，而非技术层面的差异。简体中文来说🐼：即一个技术小白（我）从 Hexo 迁移到 Hugo 时遇到的一些常见问题。

## 目录结构

```sh
~/blog $ tree -L 1
.                     # 说明             Hexo
├── archetypes/     # 文章模板          scaffolds/
├── assets/         # Hugo 管道
├── config.toml     # 配置文件          _config.yml
├── content/        # 文章目录          source/_posts/
├── data/           # Hugo 数据文件     source/_data/
├── layouts/        # 布局模板
├── public/         # 生成的静态文件     public/
├── resources/      # Hugo 缓存
├── static/         # 网站的静态文件     source/
└── themes/         # 主题目录          themes/
```

在 Hugo 中，与 Hexo 的一个很大不同——也可以说是优点——是主题目录与站点目录有一样的结构，以 [MemE](/tech/documentation-of-hugo-theme-meme/) 主题举个例子（已剔除无关文件）：

```sh
~/blog/themes/meme $ tree -L 1
.
├── assets/
├── data/
├── i18n/
├── layouts/
└── static/
```

其中，`assets`、`data`、`layouts`、`static` 的作用都是与站点目录下的相应文件夹相同的，且站点目录下的文件可以覆盖主题目录下的相应文件——这意味着你可以在不修改主题文件的前提下方便地定制主题。在 Hugo 中，如果你想要定制主题，你只需在站点目录下新建相应的文件即可。这是非常利于主题的维护的，你只需使用 Git 的 `submodule` 的方式安装 Hugo 的主题，然后更新时只需直接在站点根目录下敲一条命令回车即可，非常方便！同时，这在持续集成部署时也会方便很多，这点你可以在 GitHub 中看出来，如下图。

![git-submodule.png](/images/git-submodule.png "以子模块的方式安装主题")

此外，上面的 `i18n` 文件夹相当于 Hexo 的主题中的 `languages` 文件夹，如果你不喜欢主题的一些文字翻译，可以在站点目录下新建相应文件自定义。这里特别需要提醒的是，Hugo 中的 `data` 和 `i18n` 文件夹下的所有文件都是可以按「键」覆盖的，即你无需复制文件全文，只需添加你想自定义的那项即可。

## 配置文件

Hugo 中是不区分站点和主题的配置文件的，Hugo 中只有一个位于站点根目录下的 `config.toml` 配置文件[^1]。你可能注意到 `.toml` 后缀，没错，Hugo 默认使用的配置文件是 [TOML](https://github.com/toml-lang/toml) 格式的，它的语法是非常简单易懂的，它在语法上也没有缩进的要求[^2]。当然，在 Hugo 中你也可使用 Hexo 默认的 YAML 格式，但我还是建议你使用 TOML，毕竟入乡随俗嘛😺。此外，如果你想将文章中的 Front Matter 也从 YAML 转换成 TOML 的话，推荐一个 [Python 脚本](https://github.com/wd/hexo2hugo)，是我在[这篇文章](https://wdicc.com/migrate-blog-to-hugo/)中发现的。但..特别注意..：尝试前务必先备份！

## 分类方式和组织方式

实话实说，这应该是从 Hexo 迁移到 Hugo 中遇到的最难的问题了，主要是概念上很难转过来。我们知道，在 Hexo 中有两种分类方式——[分类和标签](/tech/categories+tags/)，它们都是在文章的 Front Matter 中设置的，其中：`categories` 是具有顺序性和层次性的，即你可以通过它来实现树状结构的分类；`tags` 则没有这种特点，它的作用只是将不同的文章联系起来。由于 Hexo 中的 `categories` 具有这样的特点，因此在 Hexo 中 `categories` 可以作为一种文章的组织方式——在 Hexo 中你可以将 `categories` 用在文章的 URL 结构中。

[^3]![hexo-permalinks.png](/images/hexo-permalinks.png "Hexo 中的 URL 结构配置")

但是在 Hugo 中这是无法实现的，在 Hugo 中你是无法将文章的 Front Matter 中的 `categories` 用于文章的 URL 的。为什么呢？因为 Hugo 中的 `categories` 与 `tags` 在功能上其实是..完全相同..的，它们的作用都是将不同的文章联系起来。其实，Front Matter 中的 `categories` 和 `tags` 在 Hugo 中都属于 Taxonomies：

{{< quote en >}}

Hugo includes support for user-defined taxonomies to help you demonstrate logical relationships between content for the end users of your website.

— *https://gohugo.io/content-management/taxonomies/*

{{< /quote >}}

简体中文来说🐼：「Hugo 支持用户定义的类别（taxonomies）来帮你为自己网站的读者展示文章之间的逻辑关系」。也就是说，在 Hugo 中其实你可以自定义自己想要的任何类别，而不仅限于部类（`categories`）[^4]和标签（`tags`），比如：你可以自定义一个 `series`，也就是系列╱专题╱专栏。

既然 Hugo 中基于 Front Matter 的部类和标签都属于类别，而类别的作用只是联系文章，部类自然不可能有树状结构，自然也不能用部类来组织文章。那么，在 Hugo 中你要怎么组织文章呢？分区（[Sections](https://gohugo.io/content-management/sections/)）。所谓分区，即站点的 `content` 目录下的文件夹和子文件夹，一个文件夹即一个分区[^5]。很明显，这是基于文件系统的结构的，自然也就支持树状╱网状╱嵌套结构，也就能够用来实现文章的树状分类。我觉得这是 Hugo 的又一个优点，直接利用起文件系统的结构来组织文章，合理且符合用户预期，Markdown 文档的存放也更有序。

## URL

迁移博客过程中最重要的莫过于保证文章的 URL 不变，不然，这将会非常不利于 SEO。好不容易有一篇文章出现在 Google 相关搜索结果的前排，却因为 URL 的变化导致原链接 404 从而导致该文章从 Google 的索引中移除，这一定会是非常令人沮丧的😶。

当你从 Hexo 迁移到 Hugo 时，如果你在 Hexo 中的站点配置文件 `_config.yml` 的 `permalink` 中只使用了 `:year`、`:month`、`:day`、`:title` 变量的话，那么文章的 URL 是能够平滑地迁移到 Hugo 的，见 [URL Management](https://gohugo.io/content-management/urls/)。同时，提醒一点，Hexo 中的文章中的 *Front Matter* 中的 [`permalink`](/tech/hexo-next-optimization/#文章的模版文件) 在 Hugo 中对应的是 `slug`。

但是，对于某些用户（比如我）在迁移时则可能会有一些麻烦，比如在 Hexo 中使用了 `:category`、`:id`、`:abbrlink` 变量，以及 `.html` 后缀。下面就来讲讲这些情况的解决之道。

---

首先就是部类，即 Categories 页面，也即 Front Matter 中的 `categories`，也即配置文件里的 `:category`。

正如上文所说的，Hugo 中的部类是与标签无差别的，所以在 Hugo 中你是无法实现多级的部类的，即当你从 Hexo 迁移到 Hugo 时，`/categories/foo/bar/` 这样的链接是一定会 404 的，除非你使用 [Aliases](https://gohugo.io/content-management/urls/#aliases)。当然，这其实也无所谓，因为重要的是文章的链接，其它页面的链接可保持也可不保持。

对于文章的链接，如果你设计了复杂的多级部类（树状分类）且将之加入了文章的 URL 结构，那么在 Hugo 中保持文章 URL 中的这种结构的合理方式就是使用分区 Sections，然后在 Hugo 的配置文件 `config.toml` 中的 `permalinks` 配置相应的分区的 `:sections` 变量[^6]。

---

然后是 `.html` 后缀，博主当时年轻，想着加上这个显得 COOL 一点，于是添加了此参数并随着那篇教程带偏了很多人。现在接触了 Hugo，博主知道了这样的 URL 其实是[很丑的](https://gohugo.io/content-management/urls/#ugly-urls)，所以也就不在 Hugo 中保持了。毕竟，现代的服务器都有类似的自动跳转，这意味着原链接并不会 404，故在 Hugo 中也没必要再去丑化 URL。

当然，如果你还是想在 Hugo 中保持文章的 URL 的 `.html` 后缀，也不是没有办法，利用 Hugo 配置中的 `uglyURLs` 和 [Output Formats](https://gohugo.io/templates/output-formats#configure-output-formats) 的一个配置项 `noUgly` 即可实现。首先在配置文件 `config.toml` 的..顶部..加上 `uglyURLs = true`，然后继续添加以下代码：

```toml
[outputFormats.NoUglyHTML]
    mediaType = "text/html"
    noUgly = "true"
[outputFormats.NoUglyRSS]
    mediaType = "application/rss+xml"
    noUgly = "true"

[outputs]
    page = ["HTML"]
    home = ["HTML", "RSS"]
    section = ["NoUglyHTML", "NoUglyRSS"]
    taxonomyTerm = ["NoUglyHTML", "NoUglyRSS"]
    taxonomy = ["NoUglyHTML", "NoUglyRSS"]
```

这样就能实现..仅文章..的 URL 是有 `.html` 后缀的，但需要注意的是：这样是会产生一些 bugs 的——具体我就不再花时间叙述了——因此还是建议直接抛弃 `.html` 后缀。

---

迁移时另外一个比较重要的 URL 问题应该是中文部类和中文标签的英文别名问题，比如你添加了一个「树莓派」标签，但你不希望该标签的 URL 是 `/tags/树莓派/`，你希望它的 URL 是英文的 `/tags/raspberry-pi/`。在 Hexo 中你可以通过站点配置文件 `_config.yml` 中的 `tag_map` 来实现，但在 Hugo 中没有这样的功能，那在 Hugo 中应该怎么办呢？

首先，你需要在配置文件 `config.toml` 中配置下部类和标签的 URL 结构：

```toml
[permalinks]
    categories = "/categories/:slug/"
    tags = "/tags/:slug/"
```

然后，在你的站点根目录下的 `content` 文件夹内新建 `tags` 文件夹，并在它的里面新建一个 `树莓派` 文件夹，最后在该文件夹内新建一个 `_index.md` 文件，并加入：

```t
+++
slug = "raspberry-pi"
+++
```

这样就解决了 URL 内的中文标签的别名问题。但还有一种特殊情况，就是你添加的标签如果比较..复杂..[^7]，比如 `Raspberry Pi（树莓派）`。那么此时，你在 `tags` 文件夹内新建的文件夹的名字就不能是标签的名字本身，而必须是 Hugo「[链接化](https://gohugo.io/functions/urlize/)」后的标签名，比如 `raspberry-pi树莓派`。然后，在上面添加了 `slug` 的基础上，再手动添加一行 `title = "Raspberry Pi（树莓派）"` 以修正标题。此外，如果你在配置文件 `config.toml` 中设置了 `disablePathToLower`，那么新建的文件夹的名字就应该是 `Raspberry-Pi树莓派`。

这里再来说一说 URL 中的英文字符的大小写的问题。在 Hexo 中如果你添加一个 `Raspberry Pi` 标签，那么它的 URL 是 `Raspberry-Pi`，但在 Hugo 中它的 URL 会变成 `raspberry-pi`，即将大写字母处理成了使 URL 更美观的小写字母。这也意味着当你从 Hexo 迁移到 Hugo 时，你的一些包含大写字母的原链接会 404，如果你想避免这个情况，你可以在配置文件 `config.toml` 的..顶部..加上 `disablePathToLower = true`。但我还是不建议这样做，因为全小写的 URL 的确会更美观，即使这会导致原链接 404，但重要的是..文章的链接..，而非某一标签页面。

最后，对于以上方法，我只能保证在 [MemE](/tech/documentation-of-hugo-theme-meme/) 主题中是正常工作的。此外，MemE 主题支持复杂的中文标签名，支持复杂的中文部类名，支持复杂的中文分区名。

---

对于分区，我推荐直接使用小写英文命名，然后通过新建相应的 `_index.md` 并添加 `title` 以修正标题。当然，如果你要用中文也可以，但建议用..简单..的中文名。然后，如果你想要使分区的 URL 却为英文，比如：你想使「系列」分区的 URL 为 `/series/` 而非 `/系列/`，那么你需要先在「系列」文件夹下新建一个 `_index.md` 文件，然后加上以下内容：

```t
+++
url = "series"
+++
```

最后在配置文件 `config.toml` 中配置下该分区下的文章的 URL 结构，比如：

```toml
[permalinks]
    "系列" = "/series/:slug/"
```

---

对于从 Hexo 迁移到 Hugo 在 URL 上的其它情况，比如在 Hexo 中使用了 `:id` 和 `:abbrlink` 变量，那么你可以通过 `url` 在文章的 Front Matter 中直接手动指定文章的 URL，以保持文章链接的不变。

当然，如果在迁移时你想重构博客文章的 URL 结构，那么可以利用 Hugo 的 [Aliases](https://gohugo.io/content-management/urls/#aliases) 或 Netlify 的 [Redirects](/tech/deploy-static-site-to-netlify/#扩展)[^8] 来保证原链接不 404。根据我的测试，这两种方式是都可以平滑地实现链接的迁移的，即不会降低文章在 Google 搜索结果中的排名。

## 其它方面

在迁移时还会遇到一些小问题，比如：日期格式、修改时间、阅读更多、Hexo 的标签插件等等问题，下面来一一说明。

---

首先是文章的 Front Matter 中的 `date` 日期格式的问题。在 Hugo 中，Hexo 默认的日期格式是不能工作的，比如：你必须要修改 `1969-07-20 20:17:43` 为 `1969-07-20T20:17:43+00:00`，即添加了时区的信息。对于这点，你可以用上文提到的那个 [Python 脚本](https://github.com/wd/hexo2hugo)批量处理一下。

然后是文章的修改时间的问题。在 Hexo 中，会自动将..文件..的修改时间作为..文章..的修改时间，但在 Hugo 中不会。不过你可以[自行配置](https://gohugo.io/getting-started/configuration/#configure-dates)[^9]，在配置文件 `config.toml` 中加入 `:fileModTime`：

```toml
[frontmatter]
    lastmod = ["lastmod", ":git", ":fileModTime", ":default"]
```

如此，就算你没有在文章的 Front Matter 中手动指定修改时间 `lastmod`，它依然会随着你的文章的改动或修改而「自动更新」。

---

在 Hexo 中，你可能会在 Markdown 中使用 [Hexo 标签插件](https://hexo.io/zh-cn/docs/tag-plugins.html)来实现一些 Markdown 语法无法实现的特殊排版需求。这些特殊的语法是无法在 Hugo 中生效的，尽管在 Hugo 中有与之对应的[短代码](https://gohugo.io/content-management/shortcodes/)，但它们之间的语法是不同的，故我建议最好放弃这种非 [Markdown 原生语法](https://daringfireball.net/projects/markdown/syntax)的写法。当然，如果你非要手动将之从 Hexo 迁移到 Hugo 中也不是没有可能，比如：你可以用 [hugo-notice](https://github.com/martignoni/hugo-notice) 实现 NexT 主题的 [Note 标签](https://theme-next.org/docs/tag-plugins/note)。

此外，对于文章摘要的截取，即「阅读更多」上方的内容。在 Hexo 中你可以在文章中加入 `<!-- more -->` 来控制，但这在 Hugo 中是不会生效的，在 Hugo 中你必须将空格删除，即 [<code>&#60;&#33;&#45;&#45;more&#45;&#45;&#62;</code>](https://gohugo.io/content-management/summaries/#manual-summary-splitting)。

还有一个是 `index.md` 的问题，在 Hugo 中你必须在它的前面添加一个下划线，即 `_index.md`。比如：你想自定义标签页面的标题为中文，那么你先在新建一个 `content/tags/_index.md` 文件，然后在文件中加入：

```t
+++
title = "标签"
+++
```

---

在 Hexo 中，你每对文章进行一次修改，你就必须要在浏览器中手动刷新一下页面，如此才能看到最新的渲染结果🐶。但在 Hugo 中，只要有相关变化，Hugo 就会自动为你刷新页面。也就是说，你可以即时预览😎！顺便安利一个有用的技巧，在配置文件..上方..添加 `newContentEditor = "gedit"`（修改 `gedit` 为你喜欢的编辑器名），就可以在每次 `hugo new` 新建文章后自动打开你喜欢的文本编辑器！

在 Hugo 中，与 `hexo s` 命令等同的是 `hugo server`，但由于默认的[文章模板](https://gohugo.io/content-management/archetypes/)里面有 `draft: true`，故需加上 `-D` 参数以渲染草稿；与 `hexo g` 命令等同的是 `hugo`，用来生成 `public` 文件夹；与 `hexo clean` 类似的命令是 `hugo --gc --cleanDestinationDir`；在 Hugo 中可以直接使用 `hugo --minify` 压缩 HTML、JS、CSS 等文件；在 Hugo 中，没有 `hexo d` [一键部署](https://hexo.io/zh-cn/docs/one-command-deployment) `public` 文件夹到 GitHub 的操作，你需要自己[新建脚本](https://gohugo.io/hosting-and-deployment/hosting-on-github/)，但我建议使用 Git 管理整个站点，然后上传整个站点到 GitHub 以通过[持续集成](/tech/host-your-blog-on-ipfs/)的方式部署，而非用 Git 直接部署 `public` 生产版代码，因为这其实是非常可笑的——Git 是用来管理源码的。此外，关于 `hugo` 命令的更多参数，请见 [Commands](https://gohugo.io/commands/)。

最后，Hugo 默认是渲染到内存的，如果你有一些特殊情况要调试，比如 [Service Worker](/tech/pwa-via-workbox/)，那么你可以通过使用 `--renderToDisk` 参数渲染到硬盘来实现调试。此外，如果你有一个厚重的 `static` 文件夹（比如有大量图片或视频），那么也可以使用该参数以渲染到硬盘。不然，Hugo 可能会吃光你的电脑内存🤪。

---

[^1]: 当然，你也可以将它拆分开来，见：<https://gohugo.io/getting-started/configuration/>
[^2]: 下文的 TOML 代码中的缩进仅为美观和提高代码的可读性。
[^3]: 来自：<https://hexo.io/zh-cn/docs/permalinks.html>
[^4]: 为了在中文上将 Categories 和 Taxonomies 与广义的分类区分开来，今后一例将 Categories 翻译为「部类」，将 Taxonomies 翻译为「类别」。
[^5]: 需注意的是子文件夹内必须有 `_index.md`，否则 Hugo 不会认为该子文件夹为一个分区，见：<https://gohugo.io/content-management/sections/#nested-sections>
[^6]: Hugo 默认的分区的 URL 结构 `/:sections/:slug/` 就有 `:sections` 变量，但如果你要添加其它变量，则需添加它。
[^7]: 即有空格、标点符号，或其它特殊符号。
[^8]: 如果你的博客部署在 Netlify 上的话。
[^9]: 在 Hugo 中，你甚至可以配置 Git 的改动（commit）时间为文章的修改时间，即 `:git`。
