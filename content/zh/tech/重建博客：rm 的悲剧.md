+++
title = "重建博客：rm 的悲剧"
date = "2017-08-21T11:00:49+08:00"
tags = ["linux"]
slug = "rebuild-this-blog-due-to-rm"
dropCap = false
+++

![rebuild-this-blog-due-to-rm-title.jpg](/images/rebuild-this-blog-due-to-rm-title.jpg)

2017.08.07 下午，昏昏欲睡的我，还在折腾电脑的驱动。紧张地 Google 解决方法，直接 Copy 一条命令回车，没想到这一操作就宣告了我博客的死亡😭😭😭...

## 死亡的味道

回车后，过了很久，当时也没太在意，继续操作。一会重启系统，感觉画风不对😶，桌面变了，后脑勺一凉，开终端，`ls` 一看，没了，我的「家」都没了……机智的我赶紧敲了一条 `history` 命令，看到（别问我为啥还能看到，神特么知道）：

```
rm -rf ~/ .local/...
```

发现了没，`~/` 后面多了个空格，卧槽！那个网站上贴这行代码的人！￥%×%%&×%&×%&×￥%……#%……&×%&（×……&+）——+（——）（&（×！

## 删而后重建

之后试着恢复数据，无奈失败。把自己的「家」都给删了，半年多在这系统上的努力都废了，特别是博客文件夹，想到还要从 0 开始弄，头皮发麻……

无奈归无奈，还好我电脑双系统，第二天就进 Windows 下载镜像烧 U 盘，重装系统，顺便（当然没那么顺便🙃）把引导由 BIOS + MBR 改为 UEFI + GPT[^1]。

最后终于进了新 Linux 系统，更新系统，解决驱动问题，装软件。接下来就是重新搭建 Hexo，优化 NexT 主题，将网站上的 38 篇文章全部写成 Markdown 文档。

## 折腾新成果

1）博客方面

规范了 Markdown 文档，可以更美观地使用 emoji 😛，添加 <a href="/404.html" target="_blank" rel="noopener">404</a> 页面，使用插件使音乐支持歌词，视频支持弹幕……更多点击[打造个性超赞博客 Hexo + NexT + GitHub Pages 的超深度优化](/tech/hexo-next-optimization/)查看。

2）系统方面

装了最新的 [Wine QQ](http://phpcj.org/wineqq/)，深刻了解数据的重要性和 `rm` 的可怕😂...

3）其它方面

熟悉了 UEFI + GPT，自己重装系统的能力又得到了巨大提升🤪...

---

[^1]: <https://www.linuxdashen.com/linux用户的uefi固件指南>
