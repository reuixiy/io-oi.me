+++
title = "在开发一个 Hugo 主题"
tags = ["hexo", "hugo"]
date = "2019-07-05T21:31:32+08:00"
slug = "developing-a-hugo-theme"
+++

![developing-a-hugo-theme-gohugo.png](/images/developing-a-hugo-theme-gohugo.png "Hugo")

这些天在开发一个 Hugo 主题[^1]，目标是从 Hexo 平滑地迁移到 Hugo，并保留博客现有的结构、样式、功能……为什么要迁移到 Hugo 呢？因为相比 Hugo 的生成速度，Hexo 实在是太慢了，最重要的是 Hugo 更为极简主义，而 Hexo 的依赖包……

由于是代码小白，所以开发起来也没有捷径，先去找现有的 Hugo 主题，然后观察，最后结合文档自己从零慢慢构建。这些天来，摸清了 Hugo 使用的 Go Template 的基本语法[^2]，弄清了 Hugo 内的基本数据结构，学会了使用 Hugo 的一些基本函数，理清了 Hugo 的一些基本概念以及其与 Hexo 的[异同](/tech/hugo-vs-hexo/)……

开发进度呢？仅仅是一个未完成的 Atom 的模板……因为我是个完美主义者，而要完美，就必须弄懂每一行代码，弄明白每一项功能。而作为代码小白，要了解、要学习的东西就可多了，你可以看看下方我的浏览器截图中满满的标签页，以及我的可怜的内存……不过未来的开发进度应该会更快，因为该要的知识也摸得差不多了，应该。还有就是我一边开发，一边把遇到的坑╱总结╱文档写了，毕竟这可能是我的第一个开源项目，所以好好写，一来对将来的用户友好，二来希望对想开发 Hugo 主题的人提供一点我的开发经验，以利于他们自己的开发，从而让更多的人加入 Hugo。

![developing-a-hugo-theme-config.png](/images/developing-a-hugo-theme-config.png "config.toml")

![developing-a-hugo-theme-chrome.png](/images/developing-a-hugo-theme-chrome.png "满满的标签页")

![developing-a-hugo-theme-ram.png](/images/developing-a-hugo-theme-ram.png "可怜的内存")

[^3]![developing-a-hugo-theme-atom.png](/images/developing-a-hugo-theme-atom.png "Atom 模板")

Anyway，敬请期待吧～

---

[^1]: 已开发完成，主题的最终名字叫 [MemE](/tech/documentation-of-hugo-theme-meme/)。
[^2]: 可参考官方文档的 [Introduction to Hugo Templating](https://gohugo.io/templates/introduction/) 入门，可参考 Régis Philibert 写的[相关教程](https://regisphilibert.com/tags/hugo/)。
[^3]: 推荐安装相应的[语法高亮插件](https://gohugo.io/tools/editors/)，以更高效开发，博主后来开发时使用的是 VS Code 的 [Hugo Language and Syntax Support](https://marketplace.visualstudio.com/items?itemName=budparr.language-hugo-vscode)。
