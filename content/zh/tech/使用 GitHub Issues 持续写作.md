+++
title = "使用 GitHub Issues 持续写作"
date = "2019-12-03T22:36:48+08:00"
tags = ["blogging", "foss", "ideas"]
slug = "continuous-writing-with-github-issues"
gitinfo = true
+++

不知你是否会为写作而发愁？当你突然闪出一个好想法时，却没有写作的时间；当你坐在书桌前准备写作时，却只有空空的无奈。在此，我激动地向你介绍一种现代的写作方式——使用 GitHub Issues ..持续写作..！[^1]

---

什么是 GitHub Issues 呢？[GitHub](https://github.com/) 是全球著名的通过 Git 进行版本控制的软件源代码托管服务平台[^2]，而 [GitHub Issues](https://help.github.com/en/github/managing-your-work-on-github/about-issues) 则是一种用来管理 GitHub 上的工作项目中的各种想法、改进、任务或漏洞的追踪方式，目前的官方中文译名为「[议题](https://help.github.com/cn/github/managing-your-work-on-github/about-issues)」。

什么是持续写作呢？持续写作是一种通过对想法的持续追踪、持续构建来协助写作的写作方式，英文为 Continuous Writing，简写为 CW。这是一个我自创的术语，由现代软件开发中的 [CI/CD](https://www.redhat.com/zh/topics/devops/what-is-ci-cd) 概念所激发。

因此，文题「使用 GitHub Issues 持续写作」可以理解为使用 GitHub 的议题来对你的想法进行持续追踪、持续构建，从而促进你的写作。这种方式的巧妙之处就在于将现代的软件开发模式直接借用于写作，从而成就现代的写作模式。

---

听起来可能会有点摸不着头脑，下面就以采用持续集成方式部署的博客为例，简单描述下这种现代的写作模式的具体流程：

1. Eureka！闪出新想法！
2. 去 GitHub 新建一个议题，标题为文章名，描述为想法内容或文章纲要[^3]；
3. 时间匆忙，暂时搁置；
4. Eureka！闪现这个想法的另一方面！
5. 打开 GitHub 上的该议题，在底部添加一条评论补充；
6. 重复 3、4、5；
7. 整理成一篇文章并自动发布；[自动关闭议题](https://help.github.com/cn/github/managing-your-work-on-github/closing-issues-using-keywords)。

更棒的是，由于 GitHub 是一个网站，因此可以随时随地用手机编辑！这将会极大地促进并优质化写作，因为这利用了每一零碎时间，抓住了每一突发奇想，完善了文章的每一细节，进而解决了创作难的问题！以后我们出去溜达无聊时，就可以拿起手机，看看自己在 GitHub 上的议题列表，随时随地写作！相比于博客部署上的持续集成，这可以称为文章创作上的持续写作！现代的写作，也是持续化的！当你有了个想法，发个推特，可能就石沉大海了；但你新建个议题，就可以持续构建这个想法。这就避免了碎片化的知识，解决了现在流行的各种知识平台的弊端，深度化了知识，也许这可以称为 GitIdea。

而且，GitHub Issues 是完全支持再编辑的，并能看到每个历史版本，这就日志化了文章的写作全过程。还有，GitHub Issues 还支持[标签](https://help.github.com/cn/github/managing-your-work-on-github/about-labels)，这意味着你可以分类组织你的所有想法；GitHub Issues 还支持[固定](https://help.github.com/cn/github/managing-your-work-on-github/pinning-an-issue-to-your-repository)，这意味着你可以置顶重要的想法；GitHub Issues 还支持[引用](https://help.github.com/cn/github/writing-on-github/basic-writing-and-formatting-syntax#referencing-issues-and-pull-requests)，这意味着你可以联系不同想法；GitHub Issues 还支持[任务列表](https://help.github.com/cn/github/managing-your-work-on-github/about-task-lists)，这意味着你可以管理文章的完成进度；GitHub Issues 还支持[项目板](https://help.github.com/cn/github/managing-your-work-on-github/about-project-boards)，这意味着你可以制定你的写作计划；GitHub Issues 还支持[里程碑](https://help.github.com/cn/github/managing-your-work-on-github/about-milestones)，这意味着你可以监督自己的写作进度。因此，这难道不是一个现代且完善的写作管理系统吗？

还有，GitHub Issues 还是一个现代的笔记系统！除了支持手机方便编辑，除了上面所说的各种现代特点，它还支持 Markdown！读书笔记、课堂笔记、电影感悟……直接新建一个仓库，然后开始 Issue 即可！相比一条说说或一条朋友圈，这能够持续追踪你的各种记录，不仅避免了碎片化知识，甚至还可能汇聚成一个属于自己的体系！更重要的是，GitHub Issues 是基于网页的，这非常利于传播！想法的价值在于传播，使用 GitHub Issues，轻松方便地分享和传播你的想法！GitHub 的仓库还支持[关注](https://help.github.com/cn/github/receiving-notifications-about-activity-on-github/watching-and-unwatching-repositories)，且有邮件通知！此外，还可以使用 [RSSHub](https://docs.rsshub.app/en/programming.html#repo-issues) 通过 RSS 来订阅 Issues！这意味着你完全可以新建一个仓库，然后将 GitHub Issues 当 Microblog 来用，什么朋友圈、空间、微博、推特、TG 频道都弱爆了！这是一种全新的记录方式！这是一种现代的记录方式！

---

此外，上面讲的只是使用 GitHub Issues 来管理并持续追踪你的..想法..。如果你还使用 GitHub 来管理自己写好的..文章..，并使用持续集成的方式发布文章，那么这就彻底持续化了写作，也许这就可以称为..广义持续写作..。下面继续采用上方的例子，简单描述下广义持续写作的剩余流程：

8. 闪现新方面或自己发现错误╱读者反馈；
9. 自己重开议题并添加评论╱前往 GitHub 新建一个议题供讨论；
10. 改正文章内容并自动发布；[引用议题](https://help.github.com/cn/github/writing-on-github/basic-writing-and-formatting-syntax#referencing-issues-and-pull-requests)╱[自动关闭议题](https://help.github.com/cn/github/managing-your-work-on-github/closing-issues-using-keywords)。

这意味着什么呢？这意味着你的文章从开始的一个想法到后来的一篇文章再到未来的一篇完美文章都是完全日志化的！你可以回顾文章的完整写作历史！最后，由于我们使用的是 GitHub，我们就直接享有了开源模式的优势——可以汇聚人人的力量，多人持续写作！🛸

---

[^1]: 说明：本文即采用持续写作的方式创作并发布，见 [#10](https://github.com/reuixiy/io-oi.me/issues/10)。
[^2]: 来源：<https://zh.wikipedia.org/wiki/GitHub>  
科普：<https://www.zhihu.com/question/20070065/answer/79557687>
[^3]: 因为想法刚出来时大脑比较活跃，想得比较全面，不片面。
