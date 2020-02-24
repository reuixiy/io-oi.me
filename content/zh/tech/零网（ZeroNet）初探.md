+++
title = "零网（ZeroNet）初探"
date = "2017-09-01T09:33:18+08:00"
tags = ["zeronet", "decentralized"]
slug = "first-exploration-of-the-zeronet"
aliases = ["/technology/internet/zeronet/2017/09/01/first-exploration-of-the-zeronet.html"]
+++

<video src="QmRJasFuuyKG1RUEsz7k9A2ai6F7KHQwUXVYLaq4DXfkBc"></video>

听说有个暗网，现在接触了个零网……打开之后，首先感觉界面很棒，骚气的紫色，加上渐变，让人眼前一亮 (๑•̀ㅂ•́)و✧～网页下拉，很赞有木有，不过最让人眼前一亮的是右上角的小东东，鼠标按住它往左拉，会出现一个侧栏。别的不说，光是这 UI 就值得体验一下🐱！

## 介绍和安装

1）什么是 ZeroNet？

ZeroNet 是一个去中心化的类似于 Internet 的网络，由匈牙利的开发者使用 Python 制作，完全开源。网站特殊的 ZeroNet URL 可以使用一般的浏览器浏览，就像访问本地主机一样。ZeroNet ..默认并不匿名..，但是用户可以通过内置的 Tor 功能进行匿名化。ZeroNet 使用 Bitcoin 加密算法及 BitTorrent 网络。

ZeroNet 是一个利用比特币加密和 BT 技术提供不受审查的网络与通信的 BT 平台，ZeroNet 网络功能已经得到完整的种子的支持和加密连接，保证用户通信和文件共享的安全。使用 ZeroNet，你可以匿名上网，你可以在自己电脑搭建网站，但即使你关机，你的网站依然在全球存在，别人无法关闭你的网站。

2）防 DMCA Take down

由于 ZeroNet 去中心化的原因，国外有人制作了一个 ZeroNet 版本的海盗湾——Play，这个网站可让版权所有者头疼啦……一般的网站服务器都有 IP 地址，不抗投诉的 ISP 收到了向 IP WHOIS 滥用信箱发送的 DMCA 投诉信的话，你就要和你的网站说再见了……（俗称 DMCA Take down）。可用了 ZeroNet 后，并没有一台服务器是真实的服务器，任何访客都有可能成为服务器，还有些访客使用了 Tor，更找不到真正的。

3）使用 ZeroNet 的特点

1. 可以建自己的网站，且无需备案，无需审核，无需服务器。[^1]
2. 基于 P2P 原理，你只要建好并有足够的人浏览过，即使你自己关机，你的网站依然在全球存在，别人想关你站，也没门。
3. 基于 P2P 原理，支持内网穿透，也就是说你在内网也没关系，手机也没问题。
4. 基于比特币原理，账号很安全，谁也不知道你是谁，谁也盗不去。
5. 不需要域名，任何人访问都使用 `http://127.0.0.1:43110/字符串` 来访问。

以上摘改自：[ZeroNet 搭建全球网站](https://jwangkun.github.io/2016/04/18/ZeroNet搭建全球网站/)。

4）如何安装 ZeroNet？

安装很简单，按照网站的说明操作即可：

1. 官网：<https://zeronet.io/>
2. GitHub：<https://github.com/hellozeronet/zeronet>
3. 官方文档：<https://zeronet.io/docs/zh/>

使用起来也很简单，并且已支持中文了，点界面左上角的 `┇`，点击 zh 即可。一开始可能有点懵，但是多折腾折腾很快就能上手，里面也有中文论坛，有前辈写了很好的入门介绍。

5）在你尝试前的温馨提醒

和暗网一样，防审查和匿名带来的一个后果：里面有些内容可能会使你感到不适。我只能说，并不是所有的人都有你那么高尚，并不是所有的人都有和你一样的信仰，所以请保持你的高尚，尊重别人的信仰，相信自己的信仰。

最后附上我的零网博客地址：  
<http://127.0.0.1:43110/io-oi.bit/>  
公网可以通过[代理](https://zero.acelewis.com/)访问：  
https://zn.amorgan.xyz/io-oi.bit/

## 个人思考

去中心化是个很有意思的想法，去中心化的互联网可以通过 P2P[^2] 架构实现。自从基于 P2P 架构的加密货币——比特币火了之后，出现了很多 P2P 架构的文件传输应用，声称可以取代 HTTP 的 [IPFS](https://ipfs.io/)，文件同步工具 [Resilio Sync](https://www.resilio.com/)，以及这里所言的零网。

其实，P2P 架构的概念在 1969 年就已提出[^3]，但为什么去中心化的互联网没能发展起来？我觉得主要是：

1. 技术限制
2. 政府限制

版本控制问题，事件处理时间过长，同步的垃圾数据量太多，隐私数据的安全性等等，这些技术问题正在不断被解决（开源有很大功劳），这也是现在去中心化的互联网应用得以迅速发展的主要原因。

然而，随着去中心化的互联网的发展，我觉得技术问题将逐渐变得不那么重要，主要的问题将是与政府的冲突。冲突何在？政府的职责之一就是监管，不知为什么，个人总感觉这是去中心化的死对头。

最后，安利一篇我在零网看到的一篇很好的[文章](http://127.0.0.1:43110/19fZz85PJXLAuwpGWe2fLEnU6Z1heprFFJ/?Post:24)。此外，对于去中心化，我在我的另一个博客写了一篇文章——《[集权管理与去中心化](https://yixiuer.me/original/centralization-and-decentralization/)》。

---

[^1]: 参考：<https://www.zhihu.com/question/37439960>
[^2]: https://en.wikipedia.org/wiki/Peer-to-peer
[^3]: https://en.wikipedia.org/wiki/Peer-to-peer#cite_ref-5
