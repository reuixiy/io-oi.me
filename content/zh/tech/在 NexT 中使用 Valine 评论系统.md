+++
title = "在 NexT 中使用 Valine 评论系统"
tags = ["hexo"]
date = "2018-07-15T12:30:51+08:00"
slug = "use-valine-in-theme-next"
+++

![valine.jpg](/images/valine.jpg "简洁的 Valine")

本文包括 NexT 主题的 v5 和 v6 两个版本的使用方法，以及对 TopX 页面的兼容处理。

[Valine](https://valine.js.org/) 是一个基于国内 [BaaS](https://baike.baidu.com/item/BaaS)（后端即服务：Backend as a Service）提供商 [LeanCloud](https://leancloud.cn/) 的评论系统，有经典的昵称、邮箱、网址的评论框，支持 [Gravatar](https://cn.gravatar.com/) 头像，支持 Markdown，支持代码高亮等等。

这么好的评论系统，为什么我现在才开始使用呢？因为对于 NexT 主题，有一项重要功能——文章阅读量统计 leancloud_visitors 也是基于 LeanCloud 的，而之前 Valine 的代码与此功能有冲突，导致 F12 后 Console 看到一堆红色的 `error`，所以我暂时没有启用。另外，基于 LeanCloud 的 TopX 页面也是如此，甚至直接无法使用，生成的页面只有 `title` 和 `name`。Anyway，经过这个 [PR](https://github.com/theme-next/hexo-theme-next/pull/345/files)，现在这些问题都能解决了😄！

基础配置如注册 LeanCloud、配置安全域名、在 NexT 主题中启用等在这就不说了，请直接查看 Valine 的文档中的[相关内容](https://valine.js.org/quickstart.html)。下面主要说明下如何更新 Valine 以解决代码冲突问题。

## leancloud_visitors

首先，如果你的 NexT 是 v6，请直接 `git pull` 更新到最新版本即可。如果你自定义了一些功能，修改了主题的某些文件导致更新报错，别急，参考我的另一篇文章的 [2.3.2](/tech/hexo-next-optimization/#更新主题) 节更新即可。

如果你的 NexT 是和我一样的 v5，那么请按下面步骤进行更新。

1）编辑 valine.swig 文件，将旧的代码替换为[最新的](https://github.com/theme-next/hexo-theme-next/blob/master/layout/_third-party/comments/valine.swig)。

2）参考[这里](https://github.com/theme-next/hexo-theme-next/pull/345/files)，修改相关文件。

3）配置主题配置文件，先关闭 leancloud_visitors：

```diff
# 文件位置：~/blog/themes/next/_config.yml

leancloud_visitors:
-  enable: true
+  enable: false
```

然后开启 Valine 的文章阅读量统计：

```diff
# 文件位置：~/blog/themes/next/_config.yml

valine:
-  visitor: false
+  visitor: true
```

这样问题就解决了。

## TopX 页面

其实经过上面的操作，TopX 页面已经可以正常显示了，但是 F12 后：

![use-valine-in-theme-next-1.jpg](/images/use-valine-in-theme-next-1.jpg "红色 error")

好吧，仍有冲突，那么干脆不在 TopX 页面加载 Valine 的代码呗🐟，反正 TopX 页面也没开启评论。

编辑文件：

```diff
<!-- 文件位置：~/blog/themes/next/layout/_third-party/comments/valine.swig -->

- {% if theme.valine.enable and theme.valine.appid and theme.valine.appkey %}
+ {% if theme.valine.enable and theme.valine.appid and theme.valine.appkey and page.title !=== 'TopX' %}
```

注意：如果你的 TopX 页面的 title 不是 TopX 那么请修改为相应内容。
