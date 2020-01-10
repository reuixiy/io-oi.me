+++
title = "将 Hexo 静态博客部署到 Netlify"
tags = ["hexo"]
date = "2019-06-09T16:27:01+08:00"
slug = "deploy-static-site-to-netlify"
dropCap = false
gitinfo = true
+++

[^1]![netlify.png](/images/netlify.png "开箱即用的 Netlify")

## 前言

我的这个博客一直都是部署在 GitHub Pages 上的，且用的是最原始的方式，即先在自己的电脑上安装 Hexo，然后本地调试，最后 `hexo d` 将 `hexo g` 生成的 `public` 文件夹部署到 GitHub Pages 上。为什么说这种方式原始呢？因为这种方式直接将生成的可以运行的实际代码（生产版）发布到 GitHub 上，而不是源码（开发版），没有利用 GitHub 来对源码进行版本控制，这就不利于博客未来的维护、更新、开发，以及可能的开源开发。可以说，这种原始的方式所带来的弊端开始逐渐困扰我，它让我现在无法回溯自己对博客所做过的修改，也就让我现在很难将自己的博客开源出去，分享给大家🤕...

为什么我当时采用的是这种如此原始的方式呢？因为我是代码小白……后来，在阅读他人的博客时，多次看到有人利用 Travis CI 去部署博客，于是慢慢地了解到软件开发中持续集成（Continuous Integration，简称 CI）的概念。但是，作为一个野生的伪程序员，我直到..现在..，才意识到它的意义。因此，在这篇文章中，我使用的还是最原始的方式——直接部署 `public` 到 Netlify，而非源码，需读者注意。如果你想使用更为现代的持续集成的方式来部署博客到 Netlify，请自行 Google 相关文章，自行尝试。此外，如果你是萌新，可以阅读我之前写的[另一篇文章](/tech/hexo-next-optimization/)。

## 简介

什么是 Netlify 呢？[官网](https://www.netlify.com/)。相比 GitHub Pages 的静态页面托管服务，Netlify 提供的服务可谓专业，自带 CI、支持自定义页面重定向、自定义插入代码、打包和压缩 JS 和 CSS、压缩图片、处理图片、CMS 等等，最值得一提的是 Netlify 也支持自定义域名免费 HTTPS（你也可以上传自己的证书），且是通配符证书 + TLS 1.3，甚至提供了完整的 DNS 服务，有自动的 [www](https://www.netlify.com/docs/custom-domains/#domain-redirects) 跳转，以及超简单的子域名配置界面。此外，Netlify 每月也有 [100GB](https://www.netlify.com/pricing/) 的流量，也自带了全球的 [CDN](https://www.netlify.com/blog/2016/04/15/make-your-site-faster-with-netlifys-intelligent-cdn/) 服务，还支持了 GitHub Pages 官方不支持的 [HTTP/2](https://www.netlify.com/blog/2015/10/20/netlify-news-no.-6/)、[IPv6](https://www.netlify.com/blog/2018/11/26/announcing-ipv6-support-on-the-netlify-application-delivery-network/)（需手动开启）。

![netlify-wildcard-ssl-tls.png](/images/netlify-wildcard-ssl-tls.png "通配符证书 + TLS 1.3")

![netlify-http2.png](/images/netlify-http2.png "HTTP/2")

其实，以上这些特点都是我在尝试 Netlify 之后发现的，而我之所以会去尝试 Netlify，是因为我发现 GitHub Pages 近期变得不稳定，很多时候最大下载速度只有 20~30KB/s（未科学上网），因此我今天就找到了 Netlify，部署后自己实际体验下，效果也并不是太好🙃...

## 部署

正如我之前所说的「本文还是使用最原始的方式——直接部署 `public` 到 Netlify，而非源码」，而我之前已经将 `public` 部署在了 GitHub，故这里就直接使用 GitHub 仓库的代码部署到 Netlify。此外，虽然 Netlify 的网站可以通过直接将 `public` 文件夹拖拽上去部署，但我还是更喜欢通过键盘控制..终端..而非鼠标控制界面来部署，而由于历史原因，我也无法直接抛弃 GitHub Pages。

![netlify-upload-folder-to-deploy.png](/images/netlify-upload-folder-to-deploy.png "Netlify 可直接拖拽文件部署")

首先肯定是去[注册](https://app.netlify.com/signup/)，推荐直接用 GitHub 的帐号，然后按照提示授权、选仓库，具体的操作流程我记不清了，也没截图，但印象中应该不难，尽管 Netlify 目前只提供英文界面，但其界面和交互还是相当友好的。

第一次部署好后，会让你设置域名，直接输入自己的域名，然后默认即可。接下来设置 DNS，如下图，点击右方的三个点 ：

![set-up-netlify-dns.png](/images/set-up-netlify-dns.png "Set up Netlify DNS")

然后按提示，去你的域名服务商的管理界面将域名服务器（DNS 服务器）修改为 Netlify 提供的地址，如下图：

![set-up-netlify-dns-in-godaddy.png](/images/set-up-netlify-dns-in-godaddy.png "GoDaddy 截图")

修改域名服务器成功后，稍等片刻，应该就能进入 Netlify 的 DNS 面板（Panel）了，进入后点击右侧绿色按钮启用 IPv6。如果你的博客想要保留 `www` 开头且希望裸域名访问会自动跳转到 `www` 怎么办？直接在上面的界面中，点击 `www` 开头的右方的三个点，Set as primary domain 即可，方便快捷。

接下来设置 HTTPS，这个其实 Netlify 是会自动为我们设置的，但是由于域名服务器的缓存原因（更改的 DNS 不能及时生效），这个时间可能会需要很久，因此可以去[文档](https://www.netlify.com/docs/ssl/#troubleshooting)中提到的 Google 的[这个网站](https://developers.google.com/speed/public-dns/cache)去清空缓存，以加速这一过程。我一开始等待了两个多小时，吃完午饭回来发现还没成功，于是根据提示去看文档，才发现了这个秘诀，清空后证书马上就生成好了，Google 大法好！

![netlify-https.png](/images/netlify-https.png "HTTPS")

OK！由于我是直接部署 `public` 到 Netlify，而非持续集成，因此部署就完成了！对了，还有一件事……你会发现自动生成的名字可能会很丑，在通用设置中点击 Change site name 即可修改！

由于更改了 DNS，因此 GitHub Pages 上可能就会报错，但无妨，反正添加的 CNAME 会将 reuixiy.github.io 重定向到 io-oi.me。因此，你现在可以通过以下三个域名访问本博客：

1. https://io-oi.me/
2. https://io-oi.netlify.com/
3. https://reuixiy.github.io/

![github-pages-https-error.png](/images/github-pages-https-error.png "GitHub Pages 报错")

## 扩展

由于我最近对此博客的[重构](/tech/redesign-this-blog-under-minimalism/)改变了博客的 URL 结构，导致以前的博文链接 404 了，这对读者及博客的影响都很不好。正巧 Netlify 居然提供了自定义页面重定向的功能，我赶紧去 Google Analytics 将之前的博文链接中访问量最高的 7 个找出来，然后利用 Netlify 重定向到新的链接地址！另根据提示，貌似加上下方这个重定向有利于 SEO，于是也一起加上了。

![netlify-redirect-seo.png](/images/netlify-redirect-seo.png "提示信息")

```yml
# 文件位置：~/blog/source/netlify.toml

[[redirects]]
  from = "https://io-oi.netlify.com/*"
  to = "https://io-oi.me/:splat"
  force = true

[[redirects]]
  from = "/technology/computer/computer-aided-art/2017/06/09/hexo-next-optimization.html"
  to = "/tech/hexo-next-optimization.html"

[[redirects]]
  from = "/technology/internet/zeronet/2017/09/01/first-exploration-of-the-zeronet.html"
  to = "/tech/first-exploration-of-the-zeronet.html"

[[redirects]]
  from = "/technology/computer/system-software/2018/12/11/hello-arch-linux.html"
  to = "/tech/hello-arch-linux.html"

[[redirects]]
  from = "/technology/computer/computer-aided-art/2018/05/30/speed-up-hexo.html"
  to = "/tech/speed-up-hexo.html"

[[redirects]]
  from = "/technology/computer/computer-aided-art/2018/07/18/custom-domains-on-github-pages.html"
  to = "/tech/custom-domains-on-github-pages.html"

[[redirects]]
  from = "/beautiful/share/2018/12/11/noto-serif-sc-added-on-google-fonts.html"
  to = "/tech/noto-serif-sc-added-on-google-fonts.html"

[[redirects]]
  from = "/the-philosophy-of-web-typography/text-indent-or-margin.html"
  to = "/tech/the-philosophy-of-web-typography-text-indent-or-margin.html"
```

---

下面是我搜索到的一些文章，我自己还未研究，也还未尝试，但也贴出来分享给大家🤪...

1）持续集成：  
[A Step-by-Step Guide: Hexo on Netlify | Netlify](https://www.netlify.com/blog/2015/10/26/a-step-by-step-guide-hexo-on-netlify/)

2）CMS：  
[Hexo Netlify CMS | 简书](https://www.jianshu.com/p/817f0c55d534)  
[Netlify CMS | Open-Source Content Management System](https://www.netlifycms.org/)

3）图片处理：  
[Image Transformation | Netlify](https://www.netlify.com/docs/image-transformation/)

4）其它静态页面托管服务平台：  
[免费部署自己的网站 Netlify/GitHub/ZEIT/Heroku | 哔哩哔哩](https://www.bilibili.com/video/av51846868/)  
[博客迁移至 ZEIT Now | 白玉为堂金为马](https://www.noddl.me/2019/03/28/blog-migrate/)

5）其它静态博客架构：  
[搭建 Gatsby 博客 | CRIMX BLOG](https://blog.crimx.com/archives?search=%23Gatsby)

## 参考

[Deployment | Hexo](https://hexo.io/docs/one-command-deployment#Netlify)  
[Hexo 持续部署最佳实践：Netlify+IDEA+GitHub | SegmentFault 思否](https://segmentfault.com/a/1190000017472270)  
[Hexo、Netlify 搭建静态网站 | www.ferock.net](https://www.ferock.net/hexo-netlify快速搭建个人博客/)

[为什么要使用版本控制系统？ | Tower](https://www.git-tower.com/learn/git/ebook/cn/command-line/basics/why-use-version-control)  
[持续集成是什么？ | 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)  
[在一些开源框架中，dist 文件夹是什么意思 | SegmentFault 思否](https://segmentfault.com/q/1010000002712805)

[Custom Domains | Netlify](https://www.netlify.com/docs/custom-domains/)  
[Redirects | Netlify](https://www.netlify.com/docs/redirects/)  
[netlify.toml Reference | Netlify](https://www.netlify.com/docs/netlify-toml-reference/)

---

[^1]: 截图自：<https://www.netlify.com/products/>
