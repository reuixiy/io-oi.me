+++
title = "打造个性超赞博客 Hexo + NexT + GitHub Pages 的超深度优化"
date = "2017-06-09T01:36:42+08:00"
tags = ["hexo", "blogging", "foss"]
toc = true
slug = "hexo-next-optimization"
gitinfo = true
aliases = ["/technology/computer/computer-aided-art/2017/06/09/hexo-next-optimization.html"]
+++

![hexo-next-optimization-title.jpg](/images/hexo-next-optimization-title.jpg "Coldplay")

人无完人，设想地球上的每个超棒的想法都能汇聚在相应的小河之中，那么文明的大河将会迅速变成大海（赶在太阳将河水蒸干之前）。感谢互联网，让开源共享精神照耀了这个时代，让这个设想有了真正的可能。拥有自己的博客，不仅记录了自己，反思了自己，而且借助互联网还可能照亮他人，给整个文明光能。本文就是一篇关于利用 GitHub Pages + Hexo + NexT 搭建个人博客的文章，教你如何从 0 到 1 打造自己的个性超赞博客！

注意：NexT 主题已经更新到 [v6](https://github.com/theme-next/hexo-theme-next)，所以文章中的有些内容可能 out 了，建议大家先浏览..新版本..主题的[官方文档](https://theme-next.org/docs/)，对此请大家多留意哈～🐒

说明：博客近期改版，如果你想要查看之前的版本，可以查看[快照](https://web.archive.org/web/20190226111008/https://reuixiy.github.io/technology/computer/computer-aided-art/2017/06/09/hexo-next-optimization.html)。文章较长，但目录和标题是相互链接的，可..双向..跳转。

---

**最后说明**：很久没看 Hexo 和 NexT 了，发现最新版的 NexT 已经改变太多了，比如本文所提的定制样式的 `custom.styl` 已经没了，新的定制方法见 [Custom Style Support](https://theme-next.org/docs/theme-settings/#Custom-Style-Support)。也就是说，此篇文章在快速的互联网时代已接近过时了，特别是文中介绍的..部署..方式和..定制..方式。目前现代的部署方式是..持续集成..，目前现代的定制方式是..覆盖..而非直接修改主题的文件，而主题则是直接以 Git 的 `submodule` 方式安装和维护的……如果你还要继续使用 Hexo 和 NexT，可以参考一下我在 GitHub 上发现的这两个仓库：[lei2rock/blog](https://github.com/lei2rock/blog) 和 [whyliam/blog.naaln.com](https://github.com/whyliam/blog.naaln.com)。此外，本博客目前使用的是 [Hugo](https://gohugo.io/)，它更简洁也更快速，主题是 [MemE](/tech/documentation-of-hugo-theme-meme/)。

## 必读 写在前面

本文主要内容是 NexT 主题的个性化定制和一些细节的优化。搭建的过程，已有的优化，Markdown 的使用，都直接贴出大佬的文章链接。

首先肯定是感谢各位大佬的文章，我一个小白，没学 HTML，没学 CSS，没学 JavaScript，连 C 也还没学会……如果你是一个和我一样的小白，且对本博客感觉还蛮满意，恭喜你！看完这篇文章，你自己也可以拥有一个这样的博客啦！

给小白（像我一样，也许还有完美主义和强迫症😂）却想搭建个性化博客提供参考，是我写这篇文章的主要目的，所以如果本文有幸被大佬读到，文中的不足还请大佬见谅。

本文参考的文章都会直接给出原文链接或者以注脚的形式标记出处，但 Google 参考了实在太多太多了，有些我当时没做记录，如有遗漏，欢迎指出。另外，有一些优化的很好的博客，有很多很酷的功能，我当时没收藏，后来非常后悔，提醒大家如果看到很赞的博客，一定要马上收藏。

### 重要的定义

了解定义，防止懵逼和大脑混乱。这两个文件名字都叫 `_config.yml`，容易乱。

1）..站点..配置文件，位于站点文件夹根目录内  
`~/blog/_config.yml`

2）..主题..配置文件，位于主题文件夹根目录内  
`~/blog/themes/next/_config.yml`

### 我操作的环境

留这个，是因为有时我 Google 教程，发现按流程走，却达不到应有的效果。故当按照这篇的某流程却达不到预期效果，可以考虑考虑这个，然后自己灵活点去 Google 解决方案。

```s
/* [2017.12.13 更新] */

/* 调试浏览器 */
Google Chrome Version 62.0.3202.94 (Official Build) (64-bit)

/* 版本信息 */
root@kali:~/blog# hexo version
(node:6675) [DEP0061] DeprecationWarning: fs.SyncWriteStream is deprecated.
hexo: 3.4.1
hexo-cli: 1.0.4
os: Linux 4.13.0-kali1-amd64 linux x64
http_parser: 2.7.0
node: 8.3.0
v8: 6.0.286.52
uv: 1.13.1
zlib: 1.2.11
ares: 1.10.1-DEV
modules: 57
openssl: 1.0.2l
icu: 59.1
unicode: 9.0
cldr: 31.0.1
tz: 2017b

/* 依赖包 */
root@kali:~/blog# cat package.json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": "3.4.1"
  },
  "dependencies": {
    "gulp": "^3.9.1", /* 压缩代码 */
    "gulp-htmlclean": "^2.7.15", /* 压缩代码 */
    "gulp-htmlmin": "^3.0.0", /* 压缩代码 */
    "gulp-minify-css": "^1.2.4", /* 压缩代码 */
    "hexo": "^3.4.1", /* 默认安装 */
    "hexo-deployer-git": "^0.3.1", /* Git 部署工具 */
    "hexo-filter-github-emojis": "^1.4.3", /* emoji 支持 */
    "hexo-footnotes": "^1.0.1", /* 注脚 */
    "hexo-generator-archive": "^0.1.5", /* 默认安装 */
    "hexo-generator-category": "^0.1.3", /* 默认安装 */
    "hexo-generator-feed": "^1.2.2", /* RSS */
    "hexo-generator-index-pin-top": "^0.2.2", /* 替代默认安装的，支持文章置顶 */
    "hexo-generator-searchdb": "^1.0.8", /* 本地搜索 */
    "hexo-generator-sitemap": "^1.2.0", /* 生成 sitemap.xml，利于 SEO */
    "hexo-generator-tag": "^0.2.0", /* 默认安装 */
    "hexo-renderer-ejs": "^0.3.0", /* 默认安装 */
    "hexo-renderer-marked": "^0.3.0", /* 默认安装 */
    "hexo-renderer-stylus": "^0.3.1", /* 默认安装 */
    "hexo-server": "^0.2.0", /* 默认安装 */
    "hexo-tag-aplayer": "^2.0.5", /* 音乐播放插件，支持歌词 */
    "hexo-tag-dplayer": "^0.2.1", /* 视频播放插件，支持弹幕 */
    "hexo-wordcount": "^3.0.2" /* 字数统计 */
  }
}

/* 主题 NexT 版本 */
version: 5.1.3

/* 优化主题 NexT 的设计版式 */
scheme: Muse
```

## 开始 搭建博客

终于进入正文了！但是这个我却不打算写，因为看到了一些很好的文章，这里直接给出这些文章的链接🌚～

### 在本地安装 Hexo

直接参考 Hexo 官方文档，毕竟是[官方文档](https://hexo.io/zh-cn/docs/)。安装好 Hexo 后，先任意目录新建个文件夹，名字可以为 blog，然后进入这个文件夹，输入命令：

```s
~/blog $ hexo init
```

等一会，如果出现橙色的 *WARN* 没关系，只要不出现红色的 *ERROR* 就行。好了后，输入命令：

```s
~/blog $ hexo g && hexo s
```

然后点开 <http://localhost:4000/>，恭喜你！已经在本地搭建好博客了 (๑•̀ㅂ•́)و✧！距离成功只差下一步——部署博客到 GitHub Pages 了～

### 部署博客到 GitHub Pages

[GitHub Pages](https://pages.github.com/) 是开源协作社区 GitHub 的一个服务，将博客部署到它上面再合适不过了。

问题 | 解答
:---:|:---:
为什么要部署到 GitHub Pages 上？ | 首先免费，其次省心，最后可以学习使用 GitHub。
GitHub Pages 有容量限制吗？ | 有，由 [What is GitHub Pages?](https://help.github.com/articles/what-is-github-pages/) 可知：大小限制为 1GB，一个月 100GB 流量。
超出限制的容量怎么办？ | 讲真，如果图片音乐视频等大文件都放在[七牛云 KODO](https://www.qiniu.com/)、[阿里云 OSS](https://www.aliyun.com/product/oss) 或其它云存储上，那么压根不用担心，因为我的博客现在 `[2017.11.17]` 也才用了 6.73MB 😅，所以无需担心。
国内访问速度行不行，有必要同时部署在 [Coding](https://coding.net/) 上吗？ | 个人感觉完全没必要，自己不用梯子时，感觉访问速度可以，毕竟站点的大文件都是放在了云存储上。
我可以用自己的域名吗？ | 可以，并且原生支持 https，教程见[这篇文章](/tech/custom-domains-on-github-pages/)。

注册 GitHub 帐号和创建 Repository 请查看[这篇文章](https://yangbingdong.com/2017/build-blog-hexo-base/#GitHub)，之后在..站点..文件夹根目录，安装 Git 部署插件（以后安装插件都先到这个目录），输入下面命令回车：

```s
~/blog $ npm install hexo-deployer-git --save
```

然后，打开..站点..文件夹根目录下的..站点..配置文件，编辑：

```diff
# 文件位置：~/blog/_config.yml

# URL
url: https://reuixiy.github.io/
.
.
.省略……
.
.
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
-  type:
+  type: git
+  repository: https://github.com/reuixiy/reuixiy.github.io.git
+  branch: master
```

将其中的 `reuixiy` 改成你的 GitHub 注册的帐号名就行，然后执行下面的命令：

```s
~/blog $ hexo clean && hexo g && hexo d
```

输入你的 GitHub 的用户名和密码，成功后复制 `https://帐号名.github.io/` 到浏览器打开就行。看！这就是你的博客了，只要能连接到互联网，就能随时查看它 (๑•̀ㅂ•́)و✧！

当然，如果你不想每次都输入用户名和密码，不想每次更新时，在 GitHub 上显示 `invalid-email-address`，可以按上面所提的那篇文章操作。

### 更新提示（可以最后看）

更新会有不确定因素，即讨厌又麻烦，但是不更新又怎么能享受新功能呢😑...

#### 其它更新

1）npm 更新全局安装的包：

```s
npm update -g
```

2）npm 更新..站点..文件夹根目录下安装的依赖包：

```s
~/blog $ npm update
```

3）更新 npm 它自己：

```s
npm install npm -g
```

4）更新 Node.js 到最新版：

```s
npm install n -g

n latest
```

#### 更新主题

进入..主题..文件夹根目录，然后 `git pull`，发现报错，怎么解决呢？可以先浏览[这篇文章](http://www.01happy.com/git-resolve-conflicts/)，然后参考我的操作。

先到..主题..文件夹根目录：

```s
~/blog/themes/next $ git pull
```

会发现报错，由于我们更改了相关文件，更新不成功，所以要将本地的所有修改先暂时存储起来：

```s
~/blog/themes/next $ git stash
```

然后再试一下：

```s
~/blog/themes/next $ git pull
```

可以了吧，接下来还原暂时存储的内容（即保存我们的所有修改）：

```s
~/blog/themes/next $ git stash pop
```

如果报 `CONFLICT`，是因为 Git 无法确定一些改动，所以要我们手动解决文件中冲突的部分，这个比较麻烦，可以参考我下面的流程。

首先打开报 `CONFLICT` 的文件，Ctrl + F 搜索 `>>>>>>> Stashed changes`，查看从此处到 `=======` 之间保存的代码，回忆一下自己当时更改了什么，是为了达到什么功能。

然后查看 `=======` 到 `<<<<<<< Updated upstream` 之间更新的代码，与下面保存的代码进行对比（也请浏览下所标出代码前后的代码）：

1. 如果改动较大，可能是主题增加了新功能，建议保留更新的代码，然后更改一下，达到自己想要在保存的代码中实现的功能，最后删除保存的代码。
2. 如果改动较小，建议还是保留更新的代码，然后更改一下，最后删除保存的代码。

注意：要是自己不确定，一定记得将 `<<<<<<< Updated upstream` 到 `>>>>>>> Stashed changes` 之间的代码另存备份，然后进行调试，直到最后确定没有问题。

最后：

```s
root@kali:~/blog/themes/next# git pull
error: Pulling is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm <file>'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.
```

哇，又报错了😂😂😂，咋办？

先查看：

```s
root@kali:~/blog/themes/next# git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   layout/_custom/header.swig
	modified:   layout/_custom/sidebar.swig
	modified:   layout/_layout.swig
	modified:   layout/category.swig
	modified:   layout/tag.swig
	modified:   source/css/_common/components/post/post-meta.styl
	modified:   source/css/_common/components/post/post-nav.styl
	modified:   source/css/_common/scaffolding/base.styl
	modified:   source/css/_custom/custom.styl
	deleted:    source/images/avatar.gif
	modified:   source/lib/Han/dist/han.min.css

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)

	both modified:   _config.yml
	both modified:   languages/zh-Hans.yml
	both modified:   layout/_macro/post-copyright.swig
	both modified:   layout/_macro/post.swig
	both modified:   layout/_macro/sidebar.swig
	both modified:   layout/_partials/footer.swig
	both modified:   layout/page.swig
	both modified:   source/css/_variables/base.styl

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	layout/_macro/passage-end-tag.swig
	source/js/src/love.js
```

看下面 `Unmerged paths`，说 `git reset HEAD <file>...` 来取消修改（大概），`git add <file>...` 来 mark 决定（大概），我们当然要保存这些文件的更改，所以：

```s
root@kali:~/blog/themes/next# git add -A
```

最后再来试一下吧：

```s
root@kali:~/blog/themes/next# git pull
Already up to date.
```

哇，成功更新主题！

注意：更新有风险，一定要谨慎处理文件中冲突的部分！另，如果更新 NexT 主题后，配置文件有些新功能不会配置，可以查看 [Releases](https://github.com/iissnan/hexo-theme-next/releases)（[最新版](https://github.com/theme-next/hexo-theme-next/releases)）页面，去里面找说明。

## 优化 基本功能配置

通过上面的折腾，你应该能够在自己的 GitHub Pages 上看到自己的博客了，接下来就是配置和增加功能，如阅读统计、加上评论和安装插件啥的，还有就是添加一些博客的基本信息，这些配置建议在写文章之前先折腾好。

基本功能配置大部分就是改两个文件，都叫 `_config.yml`，文章的[开头位置](#重要的定义)已告诉大家。我觉得与其将两个文件中的每点都分开来解释，倒不如直接将这两个文件贴出来，然后通过注释的方式告诉大家配置的方法，所以下面我会贴出这两个文件，怎么配置看注释就好了😄～

### 选择主题

不过还有一件事要先说一说，就是选择合适自己的主题，这是搭建好博客后最重要的一件事。默认的主题功能少，而且不太好看（个人感觉），而一些主题则有很多功能，也比较美观。

我选择的是 [NexT](https://github.com/iissnan/hexo-theme-next)（[最新版](https://github.com/theme-next/hexo-theme-next)），简洁且功能不少，也是在 GitHub 上[被 Star 最多](https://github.com/search?o=desc&q=topic%3Ahexo-theme&s=stars&type=Repositories) `[2017.11.17]` 的一个 Hexo 主题。第二多的是 [hexo-theme-yilia](https://github.com/litten/hexo-theme-yilia)，第三多的是 [hexo-theme-material](https://github.com/viosey/hexo-theme-material)（还有一个很棒的 Material Design 风格主题 [hexo-theme-material-indigo](https://github.com/yscoder/hexo-theme-indigo/tree/card)），还有一个我感觉比较有特色的，叫 [Cactus Dark](https://github.com/probberechts/cactus-dark)，这几个我感觉都不错，可以点开链接看看长啥样。要是我上面说的还是没有合你胃口的😅，咋办？去 [Hexo Themes](https://hexo.io/themes/) 慢慢找。

至于换主题，很简单，我拿 NexT 主题举个栗子。首先在这个主题的 GitHub 页面的右上方复制链接，如下图：

![hexo-next-optimization-1.png](/images/hexo-next-optimization-1.png)

然后：

```s
~/blog/themes $ git clone https://github.com/theme-next/hexo-theme-next.git next
```

再在..站点..配置文件中修改成如下即可：

```yml
# 文件位置：~/blog/_config.yml

## Themes: https://hexo.io/themes/
theme: next
```

### 站点配置文件

请先查看 [Hexo 官方文档](https://hexo.io/zh-cn/docs/configuration.html)，再查看下面我贴出的，如果这样后你还是对有些地方比较懵，可以自行 Google。如果你的文件中没有相关内容，请勿直接添加，且所有的 `:` 都为英文字符，它后面都有一个空格。

```yml
# [2017.11.14 更新]
# 文件位置：~/blog/_config.yml

# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: reuixiy
subtitle: Viva La Vida
description: 易 象 辞
author: reuixiy
language: zh-CN
timezone:

# URL
url: https://reuixiy.github.io/
root: /
# 博客文章的 URL 结构，请务必写文章之前就想好！
# 详细参数请查看：https://hexo.io/docs/permalinks.html
# 当然最好不要参考我的，我的太不利于 SEO 了，除非……
permalink: :category/:year/:month/:day/:title.html
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
# 代码高亮设置
highlight:
  enable: true
  line_number: true
# 代码自动高亮
  auto_detect: true
  tab_replace:
# 关于代码高亮的更多知识，可以查看本文 6.5.2 节

# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ''
  per_page: 10
  order_by: -date

# Category & Tag
default_category: uncategorized
# URL 中的分类和标签「翻译」成英文
# 见：https://github.com/hexojs/hexo/issues/1162
category_map:
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
# 这个我有点懵，上面不是有啊……
per_page: 10
pagination_dir: page

## 修改归档页面、某一分类页面、某一标签页面的显示篇数
## 参考：http://theme-next.iissnan.com/faqs.html#setting-page-size
archive_generator:
  per_page: 0
  yearly: false
  monthly: false
  daily: false

category_generator:
  per_page: 0

tag_generator:
  per_page: 0

# Extensions
## Plugins: https://hexo.io/plugins/
# RSS，要先进入站点文件夹根目录安装插件
# npm install hexo-generator-feed --save 即可
# 无需更多配置
# 参数说明查看 README：https://github.com/hexojs/hexo-generator-feed
feed:
  type: atom
  path: atom.xml
# 文章数，0 为全部
  limit: 0
  hub:
# 是否包含文章内容
  content: true

# emoji 支持，教程见本文 6.3 节
githubEmojis:
  enable: true
  idName: github-emoji
  unicode: false
  styles:
  localEmojis:

## Themes: https://hexo.io/themes/
# 主题配置
theme: next

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: https://github.com/reuixiy/reuixiy.github.io.git
  branch: master
```

### 主题配置文件

如果你的主题不是 NexT，那么请另 Google。建议先查看 [NexT 官方文档](http://theme-next.iissnan.com/getting-started.html)（[最新版](https://theme-next.org/docs/)），写得很好，多逗留会没坏处。由于文件过长，为了保证文章阅读效果，我把文件放在了 [GitHub](https://github.com/reuixiy/reuixiy.github.io/blob/master/_config.yml)。另外，我把我没有配置的差不多都删了，有问题可以多 Google。如果里面有些设置你还想进一步自定义，比如进一步自定义页脚文字的顺序，折腾完本文[第 5 节](#进阶-高级功能配置)你就会了😉。

### 动态背景

![hexo-next-optimization-2.gif](/images/hexo-next-optimization-2.gif "效果图")

在..主题..配置文件中，靠后面，改 `canvas_nest: true`，想要更改颜色和数量？修改文件：

```
文件位置：~/blog/themes/next/source/lib/canvas-nest/canvas-nest.min.js
```

怎么修改？参考 [README](https://github.com/hustcc/canvas-nest.js/blob/master/README-zh.md)。

### 注脚

![hexo-next-optimization-footnotes.jpg](/images/hexo-next-optimization-footnotes.jpg "Hexo 插件页面")

在 [Hexo 插件](https://hexo.io/plugins/)搜索 `footnotes`，发现目前有两种插件，右边的可以实现鼠标放在上面悬浮显示注释的功能，但是亲测有一个 Bug，有时对页面宽度有影响，强迫症难以忍受。我安装的是左边的，先进入..站点..文件夹根目录，然后：

```s
~/blog $ npm install hexo-footnotes --save
```

安装后按 [README](https://github.com/LouisBarranqueiro/hexo-footnotes) 的介绍的语法书写，应该就可以了。注意：注脚的内容一定要放在 Markdown 文档的最后面，否则可能会有错误。

## 优化 网页样式布局

发现页面有大量留白？颜色不合自己口味？那就 F12 开始吧，大换装开始！空白区？颜色？背景？圆角矩形？阴影？透明度？超链接样式？侧栏头像圆形并旋转？文章标题前面的竖线和颜色？只需按下 F12，改到自己想要的样式，然后 Copy 到 `custom.styl` 文件即可。感觉这是 NexT 主题非常棒的设计，因为这让我们能够很方便自定义博客的样式。怎么知道要修改这个文件呢？强烈推荐阅读[这篇文章](http://www.cduyzh.com/hexo-settings-3/)。

### 怎么更改？

浏览器按 F12 即可，建议用 [Google Chrome 浏览器](http://down.tech.sina.com.cn/content/40975.html)（有梯子的直接去 Google 下载😂），或者[火狐浏览器](http://www.firefox.com.cn/download/)。如果你按下 F12 后简直特么一脸懵逼，那么别急，硬着头皮慢慢折腾吧哈哈哈嗝～

#### bb - for - bb

不管你信不信，其实博主就是这样直接折腾过来的，我之前没学过 HTML 和 CSS，所以当时按下 F12 真是一脸懵逼。我一开始是 Google（关键字：`Hexo NexT 自定义`）到上面那篇文章，一点进去，卧槽！侧栏终于不是清一色的默认黑色，激动！这位大佬怎么改的啊？这篇文章一定有吧😍！？然后看下去，果然有！然后眼睛先盯着贴的 `custom.styl`，久久看着少数的注释，Copy 一段到自己的 `custom.styl`，保存，然后 `hexo clean`、`hexo g`、`hexo s`（当时我还不知道可以 `hexo s` 后可以直接本地调试😭），再去浏览器刷新自己的本地调试页面，看看效果。效果是有了，但是不是我想要的效果啊……于是去百度其中一行 CSS 代码，再回去慢慢删改调试……博主由懵逼到熟悉花了不少时间，但是我写这篇文章就是为了减少像我这样的小白折腾的时间，所以下面详细说明下按下 F12 后怎么快速由懵逼到熟悉！

#### 快速由懵逼到熟悉

首先按下 F12 后的操作流程图，就是[这篇文章](https://yangbingdong.com/2017/build-blog-hexo-advanced/#定位元素)中的三步骤，点小箭头定位元素，调试 CSS 代码，最后 Copy 到 `custom.styl`。然后懵逼的地方，应该有下面两点：

1. 按下 F12 后弹出的界面是什么鬼？！
2. 界面中的 `{}` 前面的和里面的英文是什么鬼？！

第一点：弹出的界面是为调试设计的，如果你知道调试的是啥，也许就自然了解弹出的界面，所以我不多说，不过还是给一份 Google 官方的资料——[Chrome 开发者工具](https://developers.google.com/web/tools/chrome-devtools/)。第二点：`{}` 前面的是 HTML 的元素名，`{}` 里面的是这个元素的 CSS 样式。

社交要先有自己原则，一段代码要先声明变量，一个数学问题有前提，一篇论文要先定义名词，到这里我们也必须要先了解一些 HTML 和 CSS 的基本语法知识了，才能继续折腾下去。建议先浏览下 MDN 的 [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 和 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 的页面，但没必要记住里面的每一个语法知识，因为这样的记忆是不够深刻也并不高效的，只要浏览下留个印象（为了能找准元素）就行，而记忆是要在实践中记忆的。

#### bb - for - fun

实践？对！就是打开自己的本地调试页面，然后用你挑剔的眼光看看，哪里让你不爽，就按 F12，定位元素，最后调试，直到改到自己满意。这不是与一开始说的三步骤一样吗，为啥现在又说一遍？不不不，想想如果你点开一个俄文网站，然后我给你个这页面上的一个俄文链接的中文翻译，让你找到这个俄文链接并点开，你会不会懵逼呢……一样的，如果我没有让先你浏览 HTML 和 CSS 的基本语法知识，那么对网页中出现的东东大脑压根就「翻译」不成 HTML 和 CSS 代码（反之一样）。对 HTML 和 CSS 的语法定义不明，就可能会找不准元素，而找不准元素不仅可能达不到预期效果，还可能会产生一些新的 bugs，所以要先浏览上面那篇文章。这也是我这个小白走过的坑中，最大的一个了，花费了我不少时间在无意义的搜索上，想达到一个效果，但是不知道输入什么搜索关键字……最后，要熟练还是要多折腾……喵？！多折腾，说好的快速呢！？快速是要有对比的，我填了定义不明这个大坑，你按我说的操作，与我的慢折腾经历相比，你的折腾当然是快速。诡辩？好吧说实话也算是谎言，不过是个善意的谎言，只为给你一种神奇的能量——Hope，这种谎言在生活中很常见，但我的缺少一个目的——钱。

### 附上我的 custom.styl {#附上我的-custom-styl}

由于文件过长，为了保证文章阅读效果，我把文件放在了 [GitHub](https://github.com/reuixiy/reuixiy.github.io/blob/master/custom.styl)。请先找对元素，不然可能会制造出新 bug，建议大家修改一个，就加个注释，方便以后调试修改。注意：一定是先 F12 找到要自定义的元素，调试成自己喜欢的值，然后再复制到 `custom.styl`，而不是直接复制我给出的，我给出的仅供参考。

### 修改字体

优化了这么多，但还有一个最影响博客形象和阅读体验的项没有优化，瓦特？字体！文章字体大小可以编辑：

```css
/* 文件位置：~/blog/themes/next/source/css/_variables/base.styl */

$font-size-base           = 16px
```

如果你是一个和我一样对字体一脸懵逼的人，推荐阅读：

1. [Web 中文字体排版指南](https://www.voyax.me/posts/59710/)
2. [Web 字体的选择和运用](https://blog.coding.net/blog/Web-Fonts)
3. [如何优雅的选择默认字体（font-family）](https://segmentfault.com/a/1190000006110417)
4. [中文字体网页开发指南](http://www.ruanyifeng.com/blog/2014/07/chinese_fonts.html)
5. [在 Web 内容中使用系统字体](https://csspod.com/using-the-system-font-in-web-content/)

首先对于汉字来说，因为其字体库太大，通常都是调用本地中文字体库。然而，不同设备有不同默认中文字体和中文字体库，想要尽可能在不同设备上有较好的显示效果，就要在调用不同设备的本地字体库中显示效果较好的中文字体。下面附上我的供大家参考：

```css
/* 文件位置：~/blog/themes/next/source/css/_variables/base.styl */

$font-family-chinese      = -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "STHeiti", "Source Han Sans SC", "Noto Sans CJK SC", "WenQuanYi Micro Hei", "Droid Sans Fallback", "Microsoft YaHei"

$font-family-base         = $font-family-chinese, sans-serif
$font-family-base         = get_font_family('global'), $font-family-chinese, sans-serif if get_font_family('global')

$font-family-logo         = $font-family-base
$font-family-logo         = get_font_family('logo'), $font-family-base if get_font_family('logo')

$font-family-headings     = $font-family-base
$font-family-headings     = get_font_family('headings'), $font-family-base if get_font_family('headings')

$font-family-posts        = $font-family-base
$font-family-posts        = get_font_family('posts'), $font-family-base if get_font_family('posts')

$font-family-monospace    = $font-family-chinese, monospace
$font-family-monospace    = Menlo, Monaco, Consolas, get_font_family('codes'), $font-family-chinese, monospace if get_font_family('codes')
```

注意：要想 NexT 主题的简体中文字体配置生效，..站点..配置文件中的 language 必须为 zh-CN。然后对于英文字体，因为其字体库很小，所以想要个性化就简单多了。首先去 [Google Fonts](https://fonts.google.com/) 找自己喜欢的英文字体，然后编辑..主题..配置文件，可以查看一下 [NexT 官方文档](http://theme-next.iissnan.com/theme-settings.html#fonts-customization)（[最新版](https://theme-next.org/docs/theme-settings/#Fonts-Customization)）。下面附上我的供大家参考：

```yml
# 文件位置：~/blog/themes/next/_config.yml

font:
  enable: true

  # Uri of fonts host. E.g. //fonts.googleapis.com (Default)
  # 亲测这个可用，如果不可用，自己搜索 [Google 字体 国内镜像]，找个能用的就行
  host: https://fonts.loli.net

  # Global font settings used on <body> element.
  global:
    # external: true will load this font family from host.
    external: true
    family: Lato

  # Font settings for Headlines (h1, h2, h3, h4, h5, h6)
  # Fallback to `global` font settings.
  headings:
    external: true
    family: Roboto Slab

  # Font settings for posts
  # Fallback to `global` font settings.
  posts:
    external: true
    family:

  # Font settings for Logo
  # Fallback to `global` font settings.
  # The `size` option use `px` as unit
  logo:
    external: true
    family:
    size:

  # Font settings for <code> and code blocks.
  codes:
    external: true
    family: Roboto Mono
    size:
```

注意：本博客的字体最新设置方法请看我的[这篇文章](/tech/noto-serif-sc-added-on-google-fonts/)。

## 进阶 高级功能配置

这些功能的配置，大部分都要修改 NexT 主题的一些文件，所以 `git pull` 升级主题的时候，会比较麻烦，解决方法见[本文 2.3.2 节](#更新主题)。

### 大佬的文章

更多如外挂一样的功能配置，就直接贴大佬的文章了，哪些功能自己喜欢，按照大佬的教程来配置就行。不过也有坑，比如有些功能（超链接样式、侧栏头像圆形并旋转）可以直接通过在 `custom.styl` 添加 CSS 代码实现，无需更改其它文件。

1. [Hexo 高阶教程 NexT 主题优化](http://cherryblog.site/Hexo-high-level-tutorialcloudmusic,bg-customthemes-statistical.html)
2. [Hexo 的 NexT 主题个性化教程：打造炫酷网站](http://shenzekun.cn/hexo的next主题个性化配置教程.html)
3. [Hexo 搭建博客的个性化设置](http://www.dingxuewen.com/categories/Site/)

第一篇文章内有 NexT 主题的文件目录说明，这对自己自定义博客有很大帮助。此外，大佬的博客可不仅仅有一篇文章，多在上面逗留会，也许会有甜品。

### 更改上一篇，下一篇的顺序

进入一篇文章，在文章底部，有上下篇的链接（< >），但是点 > 发现进入的是页面中的的上面那篇文章，与操作习惯不符，别扭。

我猜这是从时间角度设计的，> 英语叫 next，而 next 是更新的。不过别扭就改成习惯的好了，从空间位置角度设计。[^1]

方法就是修改文件：

```diff
<!-- 文件位置：~/blog/themes/next/layout/_macro/post.swig -->

{% if not is_index and (post.prev or post.next) %}
  <div class="post-nav">
    <div class="post-nav-next post-nav-item">
-      {% if post.next %}
+      {% if post.prev %}
-        <a href="{{ url_for(post.next.path) }}" rel="next" title="{{ post.next.title }}">
+        <a href="{{ url_for(post.prev.path) }}" rel="prev" title="{{ post.prev.title }}">
-          <i class="fa fa-chevron-left"></i> {{ post.next.title }}
+          <i class="fa fa-chevron-left"></i> {{ post.prev.title }}
        </a>
      {% endif %}
    </div>

    <span class="post-nav-divider"></span>

    <div class="post-nav-prev post-nav-item">
-      {% if post.prev %}
+      {% if post.next %}
-        <a href="{{ url_for(post.prev.path) }}" rel="prev" title="{{ post.prev.title }}">
+        <a href="{{ url_for(post.next.path) }}" rel="next" title="{{ post.next.title }}">
-          {{ post.prev.title }} <i class="fa fa-chevron-right"></i>
+          {{ post.next.title }} <i class="fa fa-chevron-right"></i>
        </a>
      {% endif %}
    </div>
  </div>
{% endif %}
```

自己改单词请注意：是 *prev* 不是 *perv*，之前自己搞错了，然后盯着电脑屏幕尴尬半天，不停想特么老子哪里错了，怎么特么就是达不到效果！？？？

![heirenwenhaolian.jpg](/images/heirenwenhaolian.jpg)

### 移动端显示 back-to-top 按钮和侧栏

今天更新一下 NexT 主题，发现已经添加这功能，前提是主题的设计模版是 Muse 或 Mist，然后可以直接在..主题..配置文件中配置：

```yml
# 文件位置：~/blog/themes/next/_config.yml

# Enable sidebar on narrow view
onmobile: true
```

如果你发现你的..主题..配置文件 `_config.yml` 中没有这段内容，可以尝试按[本文 2.3.1 节](#更新主题)的方法更新主题。

### 博客推广及谷歌搜索优化（必读）

想自己写的文章被别人看到？希望得到别人的评论肯定？渴望用自己写的文章照亮他人，给整个文明光能？那么这个就不可或缺了。你能看到这篇文章，很大程度上也是因为这个😏。

#### 博客推广

博客推广第一步，手动推广。你可以多浏览别人的博客并留下你的爪印（博客地址），比如评论；你可以去 [README.md](https://github.com/iissnan/hexo-theme-next#live-preview) 中提到的这个 [issue](https://github.com/iissnan/hexo-theme-next/issues/119) 留下你的爪印；你可以去 [Issues](https://github.com/iissnan/hexo-theme-next/issues)（[最新版](https://github.com/theme-next/hexo-theme-next/issues)）页面试着回答下大家的问题并留下你的爪印。

#### 搜索引擎

博客推广第二步，[SEO](https://baike.baidu.com/item/SEO)（Search Engine Optimization）。搜索引擎是互联网上寻找资源的重要手段，而要让别人能够在搜索结果中看到自己的博客文章链接，就必须让搜索引擎收录，怎么操作呢？

直接参考[这篇文章](http://www.ehcoo.com/seo.html)，学会使用站长工具抓取自己的网页，然后请求搜索引擎收录。博主也是刚接触不久，不太懂，但推荐提交次数尽量多，而且每天尽量都提交一次。我没有弄百度的，只弄了 Google 的，但是前几天百度 `hexo next 优化`（其它关键字没试），发现第一页就有自己文章，而且文章图片也在上面，很显眼，让我非常惊喜😆！

![hexo-next-optimization-3.jpg](/images/hexo-next-optimization-3.jpg)

看到[链接](https://segmentfault.com/p/1210000011450995)是 SegmentFault 的，恍然大悟，原来是这个[大佬](http://shenzekun.cn/)推荐的，不仅帮我把此文推到了掘金，还有 SegmentFault，在此再次感谢大佬！这也给了一个启示，除了直接向搜索引擎提交自己的链接，还可以通过这种途径优化博客的 SEO。

#### 间接影响

另外，SEO 固然重要，但不要小看另一种影响，相比搜索引擎，这种可以称之为间接影响。这篇文章是一篇技术性的文章，而技术人员经常会用 Google，所以对这篇文章的浏览量，搜索引擎的功劳较大。但是，如果是其他的文章，比如一首诗，那么直接通过 Google 访问的读者几乎没有，那读者哪来？从其它文章上的读者「流」过来的。因为读者浏览着的不是一篇文章，而是一个博客。

而想让博客上的几乎不可能被 Google 的一首诗被浏览，就要这样间接拉读者了，可以称之「引流」。首先对博客上的每篇文章来说，肯定是读者花在自己博客的时间越长，被读到的可能性越大。这就意味着你要尽可能把用户留在自己的博客上，怎么留？

1. 博客要装饰好
2. 文章质量要高

读者的第二印象是博客的界面，如果界面够特别，也许马上就被加入了书签。第三印象是文章内容，这其实更加重要，如果文章质量很高，那么读者肯定不会让这么好的一篇文章消失在自己的记忆中，即使界面不咋地。第一印象？加载速度，试想点开半天还是空白，那么肯定马上关了。

如果做到上面三点，那么就算好不容易「骗」到一个 Google 浏览量，但是这个读者马上被博客和文章惊呆了，看完文章后，这读者心里美滋滋，认为这么好的文章（博客）必须分享啊（如上面的大佬推荐🌚），于是可能马上来了一大批满怀期待的读者，然后这批读者又……这时文章的读者数（博客的访问量）就不是简单的加法了～

#### 知识平台

直接或间接因为 Google 这样的搜索引擎而来的读者，绝大部分都是技术人员，而他们只希望尽快解决自己的技术问题，这也是他们的目的，这就意味着博客上的一首诗还是很难被欣赏。而要想照亮他人，他人必须要能懂自己的文章，这样也才可能有更强的交互——评论。所以为了不浪费自己的光能，能把自己的光能完完整整地贡献给文明，那就必须也让一首诗也有评论，怎么做呢？让读者的类型多样化，不限于技术人员。还好现在大部分读者也不用搜索引擎了，谁在吞食搜索引擎的用户？移动端。智能手机的迅速普及导致搜索引擎已经不是人们获取知识的主要途径，大部分人已经将手机 APP 上的知识平台作为自己获取知识的主要途径，比如：知乎、简书、微信订阅号……所以，你还可以将自己的文章发布在这些知识平台上的相应分类上，然后留个博客链接，吸引更多类型的读者😄～

#### 谷歌分析

你怎么知道自己推广的效果？你怎么知道有没有人看了自己的博客？哪篇文章最受欢迎？此时有没有人正浏览着自己的博客？自己的文章有没有被引用？这时最常用的就是强大免费的 [Google Analytics](https://analytics.google.com/)，推荐博客建好后，就立即使用。

如何使用？请务必自备梯子查看 [Google 官方的教程](https://analytics.google.com/analytics/academy/course/6)，开始使用后一定要按照里面的设置，先添加多份 view（数据视图）。

ATTENTION：虽然有个复制 view 选项，但由 Google Analytics（分析）帮助中的[具体复制内容](https://support.google.com/analytics/answer/3256366?hl=zh-Hans)再加上我的实践，发现（用我这个外行人的话来说）：复制 view 时只会复制它的相关配置，不会复制数据！所以请使用后立即按照官方教程中的方式添加 view！

![google-analytics-filter.png](/images/google-analytics-filter.png "仅包含有效主机名")

我们写文章，会在本地调试，这时 Google Analytics 也是会收集数据的，会影响数据分析，所以必须添加一个 filter（过滤器）。

![google-analytics.png](/images/google-analytics.png "filter")

ATTENTION：由 Google Analytics（分析）的[工作原理](https://support.google.com/analytics/answer/6383007)可知，filter 是在数据处理时生效的（如上图），也就是说添加 filter 后只能过滤添加它之后的数据，而无法过滤添加它之前的数据（处理后），而 view 是利用处理后的数据生成的，所以要想去除自己在本地调试时的影响（在 view 中看不到自己在本地调试时的访问），请添加 view 之后就立即添加 filter！

### 时间轴页面的年份分隔

在 Archives（归档）页面，文章之间有年份分隔，而某一个 category 和 tag 的时间轴页面却没有。怎么办呢？修改两个文件，加代码即可😌～

#### category

加到哪？要加两个位置：

```
{# 文件位置：~/blog/themes/next/layout/category.swig #}

    {% for post in page.posts %}
      位置A
      {{ post_template.render(post) }}
    {% endfor %}
.
.
.（省略好多行）
.
.
位置B（没错最后面）
```

加什么？绿色的自己看着加：

```diff
<!-- 文件位置：~/blog/themes/next/layout/category.swig -->
<!-- 无 + 号版：https://github.com/reuixiy/reuixiy.github.io/blob/master/category.swig -->

    {% for post in page.posts %}
+
+      {# Show year #}
+      {% set year %}
+      {% set post.year = date(post.date, 'YYYY') %}
+
+      {% if post.year !== year %}
+        {% set year = post.year %}
+        <div class="collection-title">
+          <h2 class="archive-year motion-element" id="archive-year-{{ year }}">{{ year }}</h2>
+        </div>
+      {% endif %}
+      {# endshow #}
+
      {{ post_template.render(post) }}
    {% endfor %}
.
.
.（省略好多行）
.
.
+{% block script_extra %}
+  {% if theme.use_motion %}
+    <script type="text/javascript" id="motion.page.archive">
+      $('.archive-year').velocity('transition.slideLeftIn');
+    </script>
+  {% endif %}
+{% endblock %}
```

#### tag

文件位置：`~/blog/themes/next/layout/tag.swig`，修改内容与 category 的完全一样。

#### 说明

两段代码直接 Copy 同目录下的 archive.swig 文件里面的，而且 tag.swig 和 category.swig 好像都预留了位置似的，代码小白的我折腾了半天，才改好😭😭😭，不知道写代码的大佬怎么想的 w(ﾟДﾟ)w～

### 文章底部加上评分小星星

淘宝买东西，作为消费者的我们，看评价很重要。现在作为博主，写了一篇文章，很期待读者的反馈。而与淘宝一样，确认收货后，相比评论，更愿意五星好评。那么博客文章怎么加上呢？首先打开..主题..配置文件：

```yml
# 文件位置：~/blog/themes/next/_config.yml

# Star rating support to each article.
# To get your ID visit https://widgetpack.com
rating:
  enable: true
  id:     
  color: f79533
```

先去注释中的网站，首页点 Rating，然后注册个帐号，填一下自己博客的信息，左上角有个 ID，填进..主题..配置文件中就行，`color` 改成自己喜欢的即可。另：

1）可以配置评分方式，侧栏 > Rating > Setting，建议用 IP address 或 Device (cookie)，免登录，毕竟 Socials 里面的选项几乎都被墙，不适合国内网络环境。  
2）建议在侧栏 > Site > Setting 中勾选 Private 选项。  
3）上面两步勾选后别忘了点击页面右下方的 *SAVE SETTING* 绿色按钮保存。

如果感觉上下留白太多，咋整？浏览器 F12 找元素，调成自己喜欢的值，然后 Copy 到 `custom.styl` 即可，参考[本文 4.2 节](#附上我的-custom-styl)。经过上面的配置，默认最下面只会显示 5 颗小星星，简洁但不明了😂，怎么加上文字说明呢？编辑下面这个文件，Ctrl + F 搜索 `rating`，找到这段，对比我给出的，在绿色这行所示的位置，加上自己想要的说明和样式即可。

```diff
<!-- 文件位置：~/blog/themes/next/layout/_macro/post.swig -->

        {% if theme.rating.enable %}
          <div class="wp_rating">
+           <div style="color: rgba(0, 0, 0, 0.75); font-size:13px; letter-spacing:3px">(&gt;看完记得五星好评哦亲&lt;)</div>
            <div id="wpac-rating"></div>
          </div>
        {% endif %}
```

### 侧栏加入已运行的时间

我们都有自己的生日，都知道自己的岁数，那为什么不给博客加上，让读者知道博客的年纪呢？操作很简单，而且不是精确到年而是精确到秒，233333～

首先要加入下面代码：[^2]

```html
<!-- 文件位置：~/blog/themes/next/layout/_custom/sidebar.swig -->

<div id="days"></div>
<script>
function show_date_time(){
    window.setTimeout("show_date_time()", 1000);
    BirthDay=new Date("05/27/2017 15:13:14");
    today=new Date();
    timeold=(today.getTime()-BirthDay.getTime());
    sectimeold=timeold/1000
    secondsold=Math.floor(sectimeold);
    msPerDay=24*60*60*1000
    e_daysold=timeold/msPerDay
    daysold=Math.floor(e_daysold);
    e_hrsold=(e_daysold-daysold)*24;
    hrsold=setzero(Math.floor(e_hrsold));
    e_minsold=(e_hrsold-hrsold)*60;
    minsold=setzero(Math.floor((e_hrsold-hrsold)*60));
    seconds=setzero(Math.floor((e_minsold-minsold)*60));
    document.getElementById('days').innerHTML="已运行 "+daysold+" 天 "+hrsold+" 小时 "+minsold+" 分 "+seconds+" 秒";
}
function setzero(i) {
    if (i<10) {
        i="0" + i
    };
    return i;
}
show_date_time();
</script>
```

上面 `Date` 的值记得改为你自己的，且按上面格式，然后修改：

```diff
<!-- 文件位置：~/blog/themes/next/layout/_macro/sidebar.swig -->

        {# Blogroll #}
        {% if theme.links %}
          <div class="links-of-blogroll motion-element {{ "links-of-blogroll-" + theme.links_layout | default('inline') }}">
            <div class="links-of-blogroll-title">
              <i class="fa  fa-fw fa-{{ theme.links_icon | default('globe') | lower }}"></i>
              {{ theme.links_title }}&nbsp;
              <i class="fa  fa-fw fa-{{ theme.links_icon | default('globe') | lower }}"></i>
            </div>
            <ul class="links-of-blogroll-list">
              {% for name, link in theme.links %}
                <li class="links-of-blogroll-item">
                  <a href="{{ link }}" title="{{ name }}" target="_blank">{{ name }}</a>
                </li>
              {% endfor %}
            </ul>
+        {% include '../_custom/sidebar.swig' %}
          </div>
         {% endif %}

-        {% include '../_custom/sidebar.swig' %}
```

这样就可以了！当然，要是不喜欢颜色，感觉不好看，就可以在上文所提的 `custom.styl` 加入：

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */

/* 自定义的侧栏时间样式 */
#days {
    display: block;
    color: rgb(7, 179, 155);
    font-size: 13px;
    margin-top: 15px;
}
```

里面的值 F12 调成自己喜欢的，然后更改即可。要是不想放在侧栏，想放在页脚，自己应该能折腾了吧😄～

### 添加 TopX 页面

博客已有的分类，如 categories 和 tags，都是基于博主的，那么有没有一种分类是基于读者的呢？有，一种是搜索，另一种就是这里的文章阅读量排行榜。前提是在..主题..配置文件中配置了 leancloud_visitors，配置方法见[本文 3.3 节](#主题配置文件)中我的..主题..配置文件中的教程链接。首先新建页面：

```s
~/blog $ hexo new page "top"
```

然后在..主题..配置文件中加上菜单 top 和它的 icon：

```yml
# 文件位置：~/blog/themes/next/_config.yml

menu:
  top: /top/ || signal
```

接着在语言翻译文件中加上菜单 top：

```yml
# 文件位置：~/blog/themes/next/languages/zh_CN.yml

menu:
  home: 首页
  archives: 归档
  categories: 分类
  tags: 标签
  about: 关于
  search: 搜索
  schedule: 日程表
  sitemap: 站点地图
  commonweal: 公益404
  top: TopX /* 可以不为 TopX，随便取 */
```

注意：如果你的..站点..配置文件中的 languages 写的不是 zh-CN，那么这里请更改相应语言配置文件。最后，编辑第一步新建页面生成的文件：[^3]

```html
<!-- 文件位置：~/blog/source/top/index.md -->

---
title: TopX /* 可以不为 TopX，随便取 */
comments: false
keywords: top,文章阅读量排行榜
description: 博客文章阅读量排行榜
---
<div id="top"></div>

<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<script>AV.initialize("app_id", "app_key");</script>
<script type="text/javascript">
    var time=0
    var title=""
    var url=""
    var query = new AV.Query('Counter');
    query.notEqualTo('id',0);
    query.descending('time');
    query.limit(1000);
    query.find().then(function (todo) {
        for (var i=0;i<1000;i++){
            var result=todo[i].attributes;
            time=result.time;
            title=result.title;
            url=result.url;
            var content="<a href='"+"https://reuixiy.github.io"+url+"'>"+title+"</a>"+"<br />"+"<font color='#555'>"+"阅读次数："+time+"</font>"+"<br /><br />";
            document.getElementById("top").innerHTML+=content
        }
    }, function (error) {
        console.log("error");
    });
</script>

<style>.post-description { display: none; }</style>
```

必须将里面的里面的 `app_id` 和 `app_key` 替换为你的..主题..配置文件中的值，必须替换里面博客的链接，`1000` 是显示文章的数量，其它可以自己看情况更改。最后，修改样式可以在 `custom.styl` 中加入自定义代码，参考[本文 4.2 节](#附上我的-custom-styl)。Okay！完成了！不过还有几点需要注意：

1）如果在设置 > 安全中心中，没有将 `http://localhost:4000` 加入 Web 安全域名，那么本地调试将看不到，可以先将之加入，调试完后删除。  
2）如果你发现文章标题显示不对，这是由于更改过文章标题导致的，在存储 > Counter 双击 `title` 修改即可。

另外，应该也可以按类似的方式，利用 JS 代码，将评分（rating）高╱多的文章，评论多的文章，也加入这个页面，不过现在博客的阅读量还不多，我暂时没折腾（其实也不太会）。如果你实现了，麻烦告诉我哦😘～

注意：如果你的博客使用了 Valine 评论系统，那么可能会有代码冲突问题，解决方法见[这篇文章](/tech/use-valine-in-theme-next/)。

### 利用 gulp 压缩代码

右键查看网页源代码发现有大量留白，咋整？利用 gulp。首先任意目录全局安装：[^4]

```s
npm install gulp@3.9.1 -g
```

然后到..站点..文件夹根目录：

```s
~/blog $ npm install gulp@3.9.1 gulp-minify-css gulp-htmlmin gulp-htmlclean --save
```

接着在..站点..文件夹根目录新建 gulpfile.js：

```js
// 文件位置：~/blog/gulpfile.js

var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'))
});
gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
         removeComments: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true
    }))
    .pipe(gulp.dest('./public'))
});
gulp.task('default', ['minify-html', 'minify-css']);
```

最后部署到 GitHub Pages 上查看效果：

```s
~/blog $ hexo clean && hexo g && gulp && hexo d
```

我没有压缩 JavaScript，因为我发现会报错，实际也并不需要，因为大部分 JavaScript 都已压缩过。这里的这段代码执行 gulp 后也不支持 `hexo s` 本地调试，记得在哪看过解决方法，需要的自己 Google。另外，可能会产生一些奇怪的 bugs，没看到最好，要是看到了的话就自己解决吧～（逃……

### 让页脚的心跳动起来

世界上有一种伟大的力量，它的名字无人不晓，就是——❤～

首先编辑..主题..配置文件：

```diff
# 文件位置：~/blog/themes/next/_config.yml

footer:
-  icon: user
+  icon: heart
```

然后编辑：

```diff
<!-- 文件位置：~/blog/themes/next/layout/_partials/footer.swig -->

- <span class="with-love">
+ <span class="with-love" id="heart">
```

接着编辑 `custom.styl`，加入：

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */

/* 自定义页脚跳动的心样式 */
@keyframes heartAnimate {
    0%,100%{transform:scale(1);}
    10%,30%{transform:scale(0.9);}
    20%,40%,60%,80%{transform:scale(1.1);}
    50%,70%{transform:scale(1.1);}
}
#heart {
    animation: heartAnimate 1.33s ease-in-out infinite;
}
.with-love {
    color: rgb(255, 113, 168);
}
```

`color` 的值可以改成你自己喜欢的，灵感来自 [DIYgod](https://diygod.me/) 大佬的博客，CSS 代码参考[这篇文章](http://www.jianshu.com/p/73b46c376188)。

注意：最新版本的主题已支持，无需添加代码，直接[设置](https://theme-next.org/docs/theme-settings/footer) `animated` 即可。

### 页脚加上微信二维码

主题默认的微信订阅个人感觉不美观，看到很多网站都是在页脚有个微信的 LOGO，然后鼠标移动到上面便会显示二维码，这样感觉很棒。

首先编辑文件，在文件最后加上下面代码：

```html
<!-- 文件位置：~/blog/themes/next/layout/_partials/footer.swig -->

<div class="weixin-box">
  <div class="weixin-menu">
    <div class="weixin-hover">
      <div class="weixin-description">微信扫一扫，订阅本博客</div>
    </div>
  </div>
</div>
```

然后编辑 `custom.styl`，加入：

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */

/* 自定义的页脚微信订阅号样式 */
.weixin-box {
    position: absolute;
    bottom: 43px;
    left: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
}
.weixin-menu {
    position: relative;
    height: 24px;
    width: 24px;
    cursor: pointer;
    background: url(https://微信的logo.svg);
    background-size: 24px 24px;
}
.weixin-hover {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 0px;
    width: 0px;
    border-radius: 3px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
    background: url(https://二维码.svg);
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 150px 150px;
    transition: all 0.35s ease-in-out;
    z-index: 1024;
    opacity: 0;
}
.weixin-menu:hover .weixin-hover {
    bottom: 24px;
    left: 24px;
    height: 170px;
    width: 150px;
    opacity: 1;
}
.weixin-description {
    opacity: 0;
    position: absolute;
    bottom: 3%;
    left: 5%;
    right: 5%;
    font-size: 12px;
    transition: all 0.35s cubic-bezier(1, 0, 0, 1);
}
.weixin-menu:hover .weixin-description {
    opacity: 1;
}
```

图片务必用矢量图 SVG 格式，否则手机上显示效果很差，其它的自己看情况更改。微信 LOGO 的图片我准备好了，点击下载 <a href="/uploads/wechat.svg" target="_blank" rel="noopener">wechat.svg (1.6KB)</a>。微信订阅号的二维码怎么弄成 SVG 格式呢，安利个[网站](https://cli.im/weixin)，下载 SVG 格式的就行。最后，我参考了[这个代码](https://codepen.io/hj624608494/pen/dpQyJo)。

### 更改标签云（tagcloud）的颜色

如果你和我一样个性化了博客的整体布局颜色，那么默认的标签云页面可能看起来很丑，怎么更改？修改下文件：

```swig
{# 文件位置：~/blog/themes/next/layout/page.swig #}

{{ tagcloud({min_font: 13, max_font: 31, amount: 1000, color: true, start_color: '#9733EE', end_color: '#FF512F'}) }}
```

修改对应参数值即可，参数说明见 [Hexo 官方文档](https://hexo.io/zh-cn/docs/helpers.html#tagcloud)，颜色可以参考[这个网站](https://uigradients.com/)，自己去纠结……

### 点击侧栏头像回到博客首页

不知道为什么，我看到侧栏头像的第一反应是点击，然后心理预期会跳到博客首页，可惜也仅是预期，那么开始动手吧～首先要在..主题..配置文件中配置好，比如我把头像 `avatar.gif` 放在 `~/blog/source/uploads/` 下，则：

```diff
# 文件位置：~/blog/themes/next/_config.yml

# Sidebar Avatar
# in theme directory(source/images): /images/avatar.gif
# in site  directory(source/uploads): /uploads/avatar.gif
-#avatar: /images/avatar.gif
+avatar: /uploads/avatar.gif
```

然后编辑文件：

```diff
<!-- 文件位置：~/blog/themes/next/layout/_macro/sidebar.swig -->

+       <a href="/">
          <img class="site-author-image" itemprop="image"
               src="{{ url_for( theme.avatar | default(theme.images + '/avatar.gif') ) }}"
               alt="{{ theme.author }}" />
+       </a>
```

### 文章摘要图片

俗话说：「图文并茂」，现实中用笔书写文章实现起来比较困难，但在博客上可以很轻松实现😎。首先，文章摘要（excerpt）是指每篇文章（post）在页面（page）上显示的那部分内容，也就是 [Read More] 之前的文章内容。由于它会展示在页面，因此在每篇文章的文章摘要中加一张图片，页面看起来就很美观。但是有时候可能会出现一个问题：你想从文章中选一张图片作为文章摘要图片，而这张图片由于写作要求，必须添加在文章的末尾，这样点 [Read More] 查看文章时，这张图片就会重复出现了。咋办？

前提是在..主题..配置文件中：

```yml
# 文件位置：~/blog/themes/next/_config.yml

excerpt_description: false

auto_excerpt:
  enable: false
```

首先加代码：

```diff
<!-- 文件位置：~/blog/themes/next/layout/_macro/post.swig -->

      {% if is_index %}
        {% if post.description and theme.excerpt_description %}
          {{ post.description }}
          <!--noindex-->
          <div class="post-button text-center">
            <a class="btn" href="{{ url_for(post.path) }}">
              {{ __('post.read_more') }} &raquo;
            </a>
          </div>
          <!--/noindex-->
        {% elif post.excerpt  %}
          {{ post.excerpt }}
+          
+        {% if post.image %}
+        <div class="out-img-topic">
+          <img src={{ post.image }} class="img-topic" />
+        </div>
+        {% endif %}
+          
          <!--noindex-->
          <div class="post-button text-center">
            <a class="btn" href="{{ url_for(post.path) }}{% if theme.scroll_to_more %}#{{ __('post.more') }}{% endif %}" rel="contents">
              {{ __('post.read_more') }} &raquo;
            </a>
          </div>
          <!--/noindex-->
```

为了防止有的图片宽度不够导致风格不够统一，页面不美观，需要在 `custom.styl` 中加入：

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */

/* 自定义的文章摘要图片样式 */
img.img-topic {
    width: 100%;
}
```

最后编辑有这需求的相关文章时，在 `Front-matter`（文件最上方以 `---` 分隔的区域）加上一行：

```yaml
image: url
```

`url` 即图片的链接地址～

参考：

1. issue：<https://github.com/iissnan/hexo-theme-next/issues/1190>
2. 文章：<http://wellliu.com/2016/12/30/【转】Blog摘要配图/>

### 文章置顶

由于博客的首页可能是被浏览最多的页面，所以首页的前几篇文章被阅读的可能性比较大。可以利用这个特点，通过将自己认为重要的文章放在首页，从而让重要的文章被阅读的可能性增大😄。但是，默认的排序只有一个维度——时间，两种选择——正序和倒序，这就造成自己的得意之作被埋没了，怎么办呢，如何实现文章的置顶？

NexT 主题以前有过这个功能，然而由于一些 bugs（[issue](https://github.com/iissnan/hexo-theme-next/issues/415)）被去掉了。不过在这个丰富的 issue 中，我自己摸索出了一种解决方法，参考了 issue 中的那篇[文章](http://www.netcan666.com/2015/11/22/解决Hexo置顶问题/)。

首先移除默认安装的插件：

```s
~/blog $ npm uninstall hexo-generator-index --save
```

然后安装新插件：

```s
~/blog $ npm install hexo-generator-index-pin-top --save
```

最后编辑有这需求的相关文章时，在 `Front-matter`（文件最上方以 `---` 分隔的区域）加上一行：

```yaml
top: true
```

然后就行了。如果你置顶了多篇，怎么控制顺序呢？设置 `top` 的值（大的在前面），比如：

```yaml
# Post a.md
title: a
top: 1

# Post b.md
title: b
top: 10
```

那么文章 b 便会显示在文章 a 的前面。可是，没有任何标记啊，读者怎么知道文章置顶了😂～还好 NexT 原有的置顶功能有考虑到这个，且置顶的样式没有被移除，所以可以直接利用，编辑文件：

```js
// 文件位置：~/blog/node_modules/hexo-generator-index-pin-top/lib/generator.js

'use strict';
var pagination = require('hexo-pagination');
module.exports = function(locals){
  var config = this.config;
  var posts = locals.posts;
    posts.data = posts.data.sort(function(a, b) {
        if(a.sticky && b.sticky) { // 两篇文章sticky都有定义
            if(a.sticky == b.sticky) return b.date - a.date; // 若sticky值一样则按照文章日期降序排
            else return b.sticky - a.sticky; // 否则按照sticky值降序排
        }
        else if(a.sticky && !b.sticky) { // 以下是只有一篇文章sticky有定义，那么将有sticky的排在前面（这里用异或操作居然不行233）
            return -1;
        }
        else if(!a.sticky && b.sticky) {
            return 1;
        }
        else return b.date - a.date; // 都没定义按照文章日期降序排
    });
  var paginationDir = config.pagination_dir || 'page';
  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
```

也就是将插件的 `top` 全部替换为 NexT 原有的 `sticky`，然后将 `Front-matter` 中的 `top` 替换为 `sticky`，就能调用 NexT 主题原有的置顶样式了。

最后可以自定义一下样式：

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */

/* 自定义的文章置顶样式 */
.post-sticky-flag {
    font-size: inherit;
    float: left;
    color: rgb(0, 0, 0);
    cursor: help;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
}
.post-sticky-flag:hover {
    color: #07b39b;
}
```

已发现的 bug：新安装的插件无法实现..站点..配置文件中 `order_by: date`，即文章按时间从旧到新排列的配置，也就意味着文章只能按默认的时间从新到旧排列。

### 背景图片

1）CSS

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */

/* 背景图片 */
body::before {
    background-image: url(https://背景图.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    content: " ";
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -2;
}
```

2）jquery-backstretch

```diff
<!-- 文件位置：~/blog/themes/next/layout/_layout.swig -->

+  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-backstretch/2.0.4/jquery.backstretch.min.js"></script>
+  <script>
+  $("body").backstretch("https://背景图.jpg");
+  </script>
</body>
```

加入到文件最后面 `</body>` 前面即可。你可以浏览器按 F12 查看我的页面，就可以在 `</body>` 前发现。幻灯片等更多用法请自行查看 GitHub 上的 [README](https://github.com/jquery-backstretch/jquery-backstretch)。

### 动态效果

可以在..主题..配置文件 `_config.yml` 里的 `motion` 中配置，但是如果你和我一样更改了博客的背景色，可能不能达到很好的效果，怎么办呢？参考[这里](https://github.com/iissnan/hexo-theme-next/pull/1829/files)，修改下面两个文件的相应内容。

1. ~/blog/themes/next/source/css/_common/components/post/post.styl
2. ~/blog/themes/next/source/js/src/motion.js

### 相关╱热门╱推荐文章

https://io-oi.me/tech/related-popular-recommended-posts/

### MathJax 的静态显示（svg）

https://io-oi.me/tech/hexo-mathjax-svg/

### 加速 Hexo 博客

https://io-oi.me/tech/speed-up-hexo/

### 往归档页面加入 12 生肖

https://io-oi.me/tech/add-chinese-zodiac-to-next/

## 进阶 写出优雅文章

博客搭好了，只能说有个漂亮的外壳，内容丰富且颜值高的文章才是真正的精华。文章内容只能靠自己，不过这里教你几招提高文章颜值的方法。写文章前请先查看 Hexo 官方文档之[写作](https://hexo.io/zh-cn/docs/writing.html)，写得很棒！

### 文章的模版文件

如果你是在..站点..文件夹根目录用 `hexo new post <title>` 新建的文章，那么其实它就是将文章的模版文件 `post.md`「复制」了一份到 `~/blog/source/_posts/` 下，所以这也意味着：

1. 你可以直接通过在 `~/blog/source/_posts/` 下新建 `.md` 结尾的文件来写新的文章。
2. 你可以通过自定义文章的模版文件，从而每次命令行新建的文章都会有你自定义的内容。

注意：如果自己直接新建文件，一定要记得加上文件最上方的参数，即下面的相关内容，还有编码请用 UTF-8。

关于文件最上方的参数，参见 Hexo 官方文档的 [Front-matter](https://hexo.io/docs/front-matter.html) 和[页面变量](https://hexo.io/zh-cn/docs/variables.html#页面变量)，下面是我的总结：

```yaml
# ！！！！！！！！！！
# 每一项的 : 后面均有一个空格
# 且 : 为英文符号
# ！！！！！！！！！！

title:
# 文章标题，可以为中文

date:
# 建立日期，如果自己手动添加，请按固定格式
# 就算不写，页面每篇文章顶部的发表于……也能显示
# 只要在主题配置文件中，配置了 created_at 就行
# 那为什么还要自己加上？
# 自定义文章发布的时间

updated:
# 更新日期，其它与上面的建立日期类似
# 不过在页面每篇文章顶部，是更新于……
# 在主题配置文件中，是 updated_at

permalink:
# 若站点配置文件下的 permalink 配置了 title
# 则可以替换文章 URL 里面的 title（文章标题）

categories:
# 分类，支持多级，比如：
# - technology
# - computer
# - computer-aided-art
# 则为 technology/computer/computer-aided-art
# （不适用于 layout: page）

tags:
# 标签
# 多个可以这样写 [标签1,标签2,标签3]
# （不适用于 layout: page）

description:
# 文章的描述，在每篇文章标题下方显示
# 并且作为网页的 description 元数据
# 如果不写，则自动取 <!-- more -->
# 之前的文字作为网页的 description 元数据

keywords:
# 关键字，并且作为网页的 keywords 元数据
# 如果不写，则自动取 tags 里的项
# 作为网页的 keywords 元数据

comments:
# 是否开启评论
# 默认值是 true
# 要关闭写 false

layout:
# 页面布局，默认值是 post，默认值可以在
# 站点配置文件中修改 default_layout
# 另：404 页面可能用到，将其值改为 false

type:
# categories，目录页面
# tags，标签页面
# picture，用来生成 group-pictures
# quote？
# https://io-oi.me/tech/hello-world/

photos:
# Gallery support，用来支持画廊╱相册，用法如下：
# - photo_url_1
# - photo_url_2
# - photo_url_3
# https://io-oi.me/tech/hello-world/

link:
# 文章的外部链接
# https://io-oi.me/tech/hello-world/

image:
# 自定义的文章摘要图片，只在页面展示，文章内消失
# 此项只有参考本文 5.14 节配置好，否则请勿添加！

sticky:
# 文章置顶
# 此项只有参考本文 5.15 节配置好，否则请勿添加！

password:
# 文章密码，此项只有参考教程：
# http://shenzekun.cn/hexo的next主题个性化配置教程.html
# 第 24 节，配置好，否则请勿添加！
# 发现还是有 bug 的，就是右键在新标签中打开
# 然后无论是否输入密码，都能看到内容
```

灵活利用 permalink，如果你是一个和我一样希望文章 URL 中不会出现中文的人。

### 使用 Markdown（必读）

用 Hexo 写文章是直接用 Markdown 写的，而不是像 WordPress 有一个类似 Word 一样的文字编辑器，所以第一次用会感觉有点难，但你熟练之后，就会觉得文字编辑器都是辣鸡🌚...

#### Markdown 简介

Markdown 的目标是实现「易读易写」。

不过最需要强调的便是它的可读性。一份使用 Markdown 格式撰写的文件应该可以直接以纯文字发布，并且看起来不会像是由许多标签或是格式指令所构成。Markdown 语法受到一些既有 text-to-HTML 格式的影响，包括 Setext、atx、Textile、reStructuredText、Grutatext 和 EtText，然而最大灵感来源其实是纯文字的电子邮件格式。

因此 Markdown 的语法全由标点符号所组成，并经过严谨慎选，是为了让它们看起来就像所要表达的意思。像是在文字两旁加上星号，看起来就像\*\*强调\*\*。Markdown 的清单看起来，嗯，就是清单。假如你有使用过电子邮件，区块引言看起来就真的像是引用一段文字。[^5]

#### Markdown 教程

这是写文章必须掌握的技能哦，一开始可能比较懵，因为大脑没有相关概念，无法将 Markdown 语法「翻译」成相应样式，不过多写几篇就好啦🙊。

1. [Markdown Syntax Documentation](https://daringfireball.net/projects/markdown/syntax)
2. [Markdown 语法说明](http://markdown.tw/)
3. [Markdown Guide](https://www.markdownguide.org/)
4. [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)
5. [CommonMark](https://commonmark.org/)

#### 我个人的总结

1）文章内标题请从二级标题（`##`）开始！  
2）英语单词、数字左右看情况加上空格！  
3）Markdwon 文档写完一段回车后务必再回车一次空一行！

### 如何使用 emoji

在这个表情横行的时代，使用 emoji 似乎已经是日常。之前一直搜索相关插件，安装了很多，但都失败了。后来发现，直接 Copy & Paste 就能用😆，可以去[这个网站](https://www.emojicopy.com/) Copy。但是有个缺点，就是不同系统，不同浏览器，渲染的效果不同，有些甚至不能显示。为什么呢？因为这种方法 Copy 的是 Unicode，因此显示时有上面这个缺点，但是我们也可以直接调用图片，保证显示效果一致。另：无论..主题..配置文件中的 fancybox 的值是 true 还是 false，对下面这种方法都没太大影响✌。

首先安装插件：

```s
~/blog $ npm install hexo-filter-github-emojis --save
```

然后在..站点..配置文件的适当位置中加入：

```diff
# 文件位置：~/blog/_config.yml

githubEmojis:
  enable: true
-  className: github-emoji
+  idName: github-emoji
  unicode: false
  styles:
  localEmojis:
```

没错，加入的是 `idName` 这行而非 `className` 这行，为什么我要这样写？因为要编辑文件：

1. Ctrl + F 搜索 `class`，全部替换为 `id`。
2. Ctrl + F 搜索 `title`，更改相关代码。

如下：

```diff
# 文件位置：~/blog/node_modules/hexo-filter-github-emojis/index.js

    var codepoints = emojis[emojiName].codepoints
    if (options.unicode && codepoints) {
      codepoints = codepoints.map(function (code) {
        return '&#x' + code + ';'
      }).join('')

      return '<span id="' + options.idName + '" ' +
        styles +
-        ' title="' + emojiName +
-        '" data-src="' + emojis[emojiName].src +
+        ' data-src="' + emojis[emojiName].src +
        '">' + codepoints + '</span>'
    } else {
      return '<img id="' + options.idName + '" ' +
        styles +
-        ' title="' + emojiName + '" alt="' + emojiName + '" src="' +
+        ' alt="' + emojiName + '" src="' +
        emojis[emojiName].src + '" height="20" width="20" />'
    }
```

由于 NexT 主题的相关样式会干扰 emoji 图片的显示效果，所以要在 `custom.styl` 中加代码：

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */
/* 里面的 color 值请改为你博客的！ */

/* 自定义emoji样式 */
img#github-emoji {
    margin: 0px;
    padding: 0px;
    display: inline !important;
    vertical-align: text-bottom;
    border: none;
    cursor: text;
    box-shadow: none;
}
/* 文章超链接样式（为emoji特设） */
.post-body a {
    color: rgb(80, 115, 184);
    border-bottom: none;
    text-decoration: underline;
}
.post-body a:hover {
    color: rgb(161, 102, 171);
    border-bottom: none;
    text-decoration: underline;
}
/* 标签云页面超链接样式（为emoji特设） */
.tag-cloud a {
    color: rgb(80, 115, 184);
    border-bottom: 1px solid rgb(80, 115, 184);
    text-decoration: none;
}
.tag-cloud a:hover {
    color: rgb(161, 102, 171);
    border-bottom: 1px solid rgb(161, 102, 171);
    text-decoration: none;
}
/* 文章元数据中categories的样式（为emoji特设） */
a.categories {
    color: rgb(80, 115, 184);
    border-bottom: none;
    text-decoration: underline;
}
a.categories:hover {
    color: rgb(161, 102, 171);
    border-bottom: none;
    text-decoration: underline;
}
/* tabs标签（为emoji特设） */
.post-body .tabs ul.nav-tabs li.tab a {
    text-decoration: none;
}
/* 图片下方标题设置（为emoji特设） */
a.fancybox{
    text-decoration: none !important;
}
/* 按钮样式（为emoji特设） */
.btn {
    color: #fff !important;
    text-decoration: none !important;
    border: 2px solid #222 !important;
}
.btn:hover {
    color: #222 !important;
}
```

然后直接去 [Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/) 点一下自己想要的表情复制，再粘贴到自己的文章中即可👻～而且用途不止于 emoji，手机里的各种表情包，传到自己的云存储，然后按照插件 [README](https://github.com/crimx/hexo-filter-github-emojis) 中的写法：

```html
<img id="github-emoji" src="https://表情包.gif" height="30" width="30" />
```

改下 URL，看情况改下 height 和 width 的值即可啦，GIF 也可以哦～当然，还有萌即正义的[颜文字](http://www.yanwenzi.com/) (ﾉ*･ω･)ﾉ～

问题 | 解答
:---:|:---:
调用的是哪里的 emoji 图片？ | 由这个插件的 [README](https://github.com/crimx/hexo-filter-github-emojis) 可知，调用 [GitHub 的 API](https://api.github.com/emojis)，写法也是按照 GitHub 的😉～
为什么要将插件源码里的 `class` 改为 `id`？ | 按下 F12 可看到，开启 fancyBox 后，NexT 会为默认的图片标签（`img`）加上一个 `fancybox`的 `class`，里面有一个样式：`display: block !important;`，因为我们要让 emoji 显示在文字之间（`display: inline;`），但是由于默认的 `class` 已经加了 `!important`，所以必须用样式规则的应用优先权高于 `class` 的 `id`。
为什么要删除插件源码里的 `title`？ | 因为开启 fancyBox 后，NexT 会将图片的 `title` 显示在图片下方，显然不满足 emoji 的显示要求。
为什么要修改 `.post-body a` 的样式？ | 因为开启 fancyBox 后，NexT 会将图片标签包裹在一个 `a` 标签内，而 `a` 标签是有下划线的，emoji 下面竟然有根线？显然不满足要求。
加进 `custom.styl` 的其它一大堆代码是什么鬼？ | 补 bugs 😑...

### 插入音乐和视频

音乐的话，网易云音乐的外链很好用，不仅有可以单曲，还能有歌单，有兴趣的自己去[网易云音乐](https://music.163.com/)找首歌尝试。但是有一些音乐因为版权原因放不了，还有就是不完全支持 https，导致小绿锁不见了。要解决这些缺点，就需要安装插件👽。

#### 音乐

1）直接用 HTML 的标签，写法如下：

```html
<audio src="https://什么什么什么.mp3" style="max-height :100%; max-width: 100%; display: block; margin-left: auto; margin-right: auto;" controls="controls" loop="loop" preload="meta">Your browser does not support the audio tag.</audio>
```

2）用插件，有显示歌词功能，也美观。首先在..站点..文件夹根目录安装插件：

```s
~/blog $ npm install hexo-tag-aplayer --save
```

然后文章中的写法：

```
{% aplayer "歌曲名" "歌手名" "https://什么什么什么.mp3" "https://封面图.jpg" "lrc:https://歌词.lrc" %}
```

另外可以支持歌单：

```s
{% aplayerlist %}
{
    "autoplay": false,
    "showlrc": 3,
    "mutex": true,
    "music": [
        {
            "title": "歌曲名",
            "author": "歌手名",
            "url": "https://什么什么什么.mp3",
            "pic": "https://封面图.jpg",
            "lrc": "https://歌词.lrc"
        },
        {
            "title": "歌曲名",
            "author": "歌手名",
            "url": "https://什么什么什么.mp3",
            "pic": "https://封面图.jpg",
            "lrc": "https://歌词.lrc"
        }
    ]
}
{% endaplayerlist %}
```

里面的详细参数见 [README](https://github.com/MoePlayer/hexo-tag-aplayer) 和这插件的「母亲」Aplayer 的[官方文档](https://aplayer.js.org/)。关于 [LRC](https://baike.baidu.com/item/lrc/46935) 歌词，可以用[工具](https://www.zhihu.com/question/27638171)下载网易云音乐的歌词，另发现暂时不支持 `offset` 参数。当然，如果那歌词很操蛋，有错误（比如字母大小写和标点符号乱加）或者时间完全对不上，然后你也和我一样是个完美主义者，那接下来就是令人窒息的操作了，一句一句自己查看修改……

![lingrenzhixidecaozuo.jpg](/images/lingrenzhixidecaozuo.jpg)

什么，你想把网易云的几百首歌手动同步到博客😨？慢慢慢，有一种[非常简单的方法](https://github.com/MoePlayer/hexo-tag-aplayer#meingjs-support-new-in-30)，此这种方法也支持单曲，将参数里的 `playlist` 更改为 `song` 即可，非常建议食用！更多功能请仔细阅读 README。

#### 视频

1）直接用 HTML 的标签，写法如下：

```html
<video poster="https://封面图.jpg" src="https://什么什么什么.mp4" style="max-height :100%; max-width: 100%; display: block; margin-left: auto; margin-right: auto;" controls="controls" loop="loop" preload="meta">Your browser does not support the video tag.</video>
```

2）用插件，可支持弹幕，首先在..站点..文件夹根目录安装插件：

```s
~/blog $ npm install hexo-tag-dplayer --save
```

然后文章中的写法：

```
{% dplayer "url=https://什么什么什么.mp4" "https://封面图.jpg" "api=https://api.prprpr.me/dplayer/" "id=" "loop=false" %}
```

要使用弹幕，必须有 `api` 和 `id` 两项，并且若使用的是官方的 api 地址（即上面的），id 的值不能与[这个列表](https://api.prprpr.me/dplayer/list)的值一样。id 的值自己随便取，唯一要求就是前面这点。如果唯一要求难倒了你，可以使用[这个工具](http://tool.oschina.net/encrypt?type=2)将一段与众不同的文字😂生成一段看起来毫无意义的哈希值，这样看起来是不是好多了。

当然，这个插件的功能还有很多，可以去 [README](https://github.com/MoePlayer/hexo-tag-dplayer) 和这插件的「母亲」Dplayer 的[官方文档](https://dplayer.js.org/)看看。

### 好玩的写作样式

用一些特殊的样式，可以增加文章的可读性。不过也不是越多越好，没必要写一篇文章就把下面的样式全部用一遍，这样只会适得其反，从下面的样式中选几个自己觉得比较好的、经常会用的就行。而且写博客重点是文章的文字内容，而不是这些样式，样式只是为了让文章更美观，更适合阅读。这和我们用 Markdown 写文章是一样的道理，用 Markdown 而不是直接写 HTML 代码，就是为了将更多时间花在文字上🐒。

#### 主题自带样式 代码块高亮

先看效果（注意：我已从 Hexo 迁移到了 Hugo，因此此效果无法展示）：

```java
// 代码来自这：https://highlightjs.org/static/demo/

/**
 * @author John Smith <john.smith@example.com>
*/
package l2f.gameserver.model;

public abstract class L2Char extends L2Object {
  public static final Short ERROR = 0x0001;

  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}
```

这里指的是 <code>\`\`\`</code> 代码块，而不是行内代码块（<code>\`代码\`</code>），它的用法如下：

<code>\`\`\`[language] [title] [url] [link-text]</code>

`代码`

<code>\`\`\`</code>

- [language] 是代码语言的名称，用来设置代码块颜色高亮，非必须；
- [title] 是顶部左边的说明，非必须；
- [url] 是顶部右边的超链接地址，非必须；
- [link text] 如它的字面意思，超链接的名称，非必须。

亲测这 4 项应该是根据空格来分隔，而不是 `[]`，故请不要加 `[]`。除非如果你想写后面两个，但不想写前面两个，那么就必须加 `[]` 了，要这样写：`[] [] [url] [link text]`。

首先关于代码块颜色高亮，高亮的模式可以在..主题..配置文件中设置：

```yml
# 文件位置：~/blog/themes/next/_config.yml

# Code Highlight theme
# Available value:
#    normal | night | night eighties | night blue | night bright
# https://github.com/chriskempson/tomorrow-theme

highlight_theme: normal
```

要颜色正确高亮，代码语言的名称肯定要写对，各种支持语言的名称可以查看[这篇文章](https://almostover.ru/2016-07/hexo-highlight-code-styles/)。当然，如果你和我一样懒，可以在..站点..配置文件 `_config.yml` 中设置自动高亮：

```diff
# 文件位置：~/blog/_config.yml

highlight:
  enable: true
  line_number: true
# 代码自动高亮
-  auto_detect: false
+  auto_detect: true
```

咦？发现了什么没有😳，红色 `-` 和绿色 `+` 的样式哪来的？哈哈哈，原来这也是一种语言，叫 `diff`，所以你只需在 [language] 这写 `diff`，然后在相应代码前面加上 `-` 和 `+` 就行了。

当然，要是你不满意顶部的文字样式，也可以自己在 `custom.styl` 自定义：

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */

/* 文章 ``` 代码块顶部样式 */
.highlight figcaption {
    margin: 0em;
    padding: 0.5em;
    background: #eee;
    border-bottom: 1px solid #e9e9e9;
}
.highlight figcaption a {
    color: rgb(80, 115, 184);
}
```

参考了 Hexo 官方文档的[标签插件](https://hexo.io/zh-cn/docs/tag-plugins.html#代码块)页面，这个页面还有更多的 Hexo 标签插件（Tag Plugins）的用法，请自行查看。

#### 主题自带样式 各种标签

https://theme-next.org/docs/tag-plugins/

#### 自定义样式 引用

由于是自定义的样式，故要自己将 CSS 代码加到 `custom.styl` 中。为什么可以自定义呢？如果你是一个和我一样的小白，可以[点击这里](http://www.divcss5.com/rumen/r3.shtml)了解了解 CSS 中 `id` 和 `class` 的知识。

需加入 `custom.styl` 的代码：

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */

/* 自定义的引用样式 */
blockquote.question {
    color: #555;
    border-left: 4px solid rgb(16, 152, 173);
    background-color: rgb(227, 242, 253);
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    margin-bottom: 20px;
}
```

1）文字颜色改 `color` 的值  
2）背景色改 `background-color` 的值  
3）边框颜色和粗细改 `border-left` 的值

使用：

```html
<blockquote class="question">内容</blockquote>
```

## 结尾

其实写这篇文章时，犯了一个很大的错误，把定制（customization）写成了优化（optimization），本文的内容都是个性化的定制，而非优化🌚... 然后毕竟只是小白，本文如有错误，欢迎评论指出～也欢迎你把这篇文章加入收藏夹，毕竟 NexT 主题一直在更新，会有一些新的功能和配置，这篇文章自然也会一直保持更新😄～

不知道这篇文章有木有照亮你呢？为修改这篇文章博主光通宵就来了两次，如果你觉得这篇文章很赞，欢迎分享本文给更多像我一样的小白看到！感谢😘 φ(≧ω≦*)♪～

最后如果引用本文的内容，麻烦..留个本文的链接..，因为如果读者或我自己发现文章有错误，我会在这里更正，留个本文的链接，防止我暂时的疏漏耽误了他人宝贵的时间。

---

[^1]: 参考：<https://github.com/ahonn/hexo-theme-even/issues/69>
[^2]: 来源：<http://lovekernel.com/2017/hexo博客构建笔记/>
[^3]: 参考：<http://lovekernel.com/2017/hexo博客构建笔记/>
[^4]: 参考：<https://leaferx.online/2017/06/16/use-gulp-to-minimize/>
[^5]: 来源：<http://markdown.tw/>
