+++
title = "Powered by Hugo"
date = "2019-08-20T18:10:05+08:00"
tags = ["hugo", "hexo"]
gitinfo = true
+++

转眼间，博客将近荒废了两个月🤪... Anyway，从今天起，本博客就是「自豪地由 [Hugo](https://gohugo.io/) 驱动」了！🎉🎉 Farewell, Hexo~ 🐢

咦，为什么你从 Hexo 迁移到了 Hugo，博客的样式却几乎没变呢🤔？正如[前文](/tech/developing-a-hugo-theme/)所言，我为了从 Hexo 平滑地迁移到 Hugo，决定自己从零开始写一个 Hugo 主题，现在这个主题开发完成了，博客的样式自然也就..平滑..地转移了过来！

此外，博客还有了很多新的亮点呢！首先就是 Dark Mode，只需点击右上角的🌞，即可切换到🌙。然后，本博客终于也走上了持续集成的道路了，源码放在了 [GitHub](https://github.com/reuixiy/io-oi.me) 上，通过 Netlify 进行[部署](https://app.netlify.com/sites/io-oi/deploys)。如果你发现了本博客的文章中的任何错误（比如：错别字），只需去 GitHub 上编辑相应文件，然后提交 PR 即可。最后，博客有了个[英文站点](/en/)，但还没有任何文章，只有个首页和未完成的 ABOUT 页面，希望自己以后能够写几篇英文文章或者将已有的文章翻译成英文吧～🌱

![home-poetry-en.png](/images/home-poetry-en.png "仓促地翻译了一下博客的首页诗句")

然而，也并不是所有的功能都迁移了过来。比如：Service Worker 后台更新完成后的提示，代码块高亮的顶部文字。关于 Service Worker，本博客[之前](/tech/speed-up-hexo/)是通过 [hexo-service-worker](https://github.com/zoumiaojiang/hexo-service-worker) 这个插件来实现的，其通过 sw-precache 实现文件的预缓存，而现在博客是通过 gulp 来实现的，通过 [Workbox](https://developers.google.com/web/tools/workbox/) 实现文件的预缓存，因此可以说是一种升级，但可惜我的技术不足，~~没有实现~~（[已实现](/tech/pwa-via-workbox/)）更新完后的「通知」功能。至于代码块高亮的顶部文字，之前由于还年轻，以为这是 Markdown 的原生语法，故在文章中大量使用，现在[知道](https://daringfireball.net/projects/markdown/)这并不是原生语法，故我想着也没必要去实现，毕竟这样其实会给文章未来的迁移带来很大麻烦……

---

接下来，就来说说我开发的这个主题吧。主题的名字叫 [MemE](https://github.com/reuixiy/hugo-theme-meme)，含义是希望博客以及文章能够像[模因](https://t.me/yixiuer/413)一样传播、影响，当然，希望这个主题也是如此，并给你带来欢乐。至于功能、页面的元素，都是可配置的，且除了上文所提以及你所见的功能之外，还有 JSON-LD、KaTeX、首字下沉、段首缩排、Git 版本信息、相关文章等等。值得一提的是，主题为首页提供三种布局，除了本博客这种，还有我的[另一个博客](https://yixiuer.me/)的首页样式，以及常规的文章摘要视图。另外，由于我的博客之前的主题是基于 [NexT](https://github.com/theme-next/hexo-theme-next) 更改的，因此 MemE 也是继承了 NexT 的一些布局和样式的。

如何使用这个主题？如何自定义？如何使用 Hugo？如何从 Hexo 迁移到 Hugo？如何通过 Netlify 实现持续集成？主题的文档仍在码字中，我也将陆续写出几篇通俗易懂的教程，希望能够普及下 Hugo。当然，如果你比较心急，想马上探索 Hugo 和 MemE，可以自行去查看本博客在 GitHub 上的[仓库](https://github.com/reuixiy/io-oi.me)，以作参考。

最后，如果你之前访问过我的博客或者添加过我的博客到桌面，那么请稍等片刻以浏览最新版本，且建议科学上网后访问，速度会快很多！至于通过 RSS 订阅的读者，由于文章的 URL 变了（删除了 `.html` 后缀），所以你可能会发现本站的全部文章都为未读状态，在这里给你们说声抱歉😁...
