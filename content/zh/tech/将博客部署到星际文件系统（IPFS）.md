+++
title = "将博客部署到星际文件系统（IPFS）"
date = "2019-09-18T15:13:56+08:00"
tags = ["ipfs", "decentralized", "hugo", "git", "foss"]
slug = "host-your-blog-on-ipfs"
description = "以持续集成的方式将你的博客部署到 IPFS 上，拥抱去中心化和 Web 3.0 🌎！"
gitinfo = true
+++

[^1]![planet.jpg](/images/planet.jpg)

在这篇文章中，我将主要介绍如何将你的..静态..博客以持续集成的方式部署到星际文件系统 IPFS 上，也会简单介绍一下 IPFS 的使用。本文中，我使用的 SSG[^2] 是 [Hugo](https://gohugo.io/)，使用的持续集成服务由 [Netlify](https://www.netlify.com/) 提供，博客的源码可以在 [GitHub](https://github.com/reuixiy/io-oi.me) 上找到。另，提醒一下，与[零网](/tech/first-exploration-of-the-zeronet/)一样，IPFS 默认[不匿名](https://medium.com/pinata/ipfs-privacy-711f4b72b2ea)👓，且对 Tor 的支持[还在开发中](https://github.com/ipfs/go-ipfs/issues/6430)。

**说明**：最近发现 Cloudflare 的 IPFS 服务好像挂了，需要等待非常长的时间才能获取到最新内容，因此本博客已暂时放弃部署在 IPFS 上。

## 前言

一年前的昨天🧐，知名的互联网基础设施服务提供商 Cloudflare [宣布](https://blog.cloudflare.com/distributed-web-gateway/)开始支持 IPFS Gateway，作为其[分布式互联网网关](https://www.cloudflare.com/distributed-web-gateway/)项目的一部分。关于分布式互联网（Distributed Web，以下简称 D 网），它的到来很有可能会将我们带向 [Web 3.0](https://medium.com/@matteozago/why-the-web-3-0-matters-and-you-should-know-about-it-a5851d63c949) 时代，一个全新的互联网时代！而 D 网所具有的去中心化将会带我们走向新的自由之路——无审查，无高墙。👉🌎🌍🌏💫

<video src="QmYy7aHdWkP3tj6orwm4nqCtFR2bWMFk6MaMHwjD7Yi35b"></video>

## 起因

浏览 Twitter 时发现了 @GoHugoIO 的一条[推文](https://twitter.com/GoHugoIO/status/1171680213786382337)，IPFS 四个字母激起了我的兴趣🐭（之前..轻微..了解过，印象只限于这四个字母），快速浏览一遍[链接的文章](https://withblue.ink/2019/03/20/hugo-and-ipfs-how-this-blog-works-and-scales.html)之后，去看了他之前写的一篇[详细教程](https://withblue.ink/2018/11/14/distributed-web-host-your-website-with-ipfs-clusters-cloudflare-and-devops.html)，打开 IPFS 的[官网](https://ipfs.io/)，决定这次一定要尝试一下 IPFS！🕳️🦆

## 正文

文章的正文分为两个部分：持续集成和原生部署，第一部分是文章的主体，第二部分供感兴趣的读者研究。

当你按照此文章将博客成功部署到 IPFS 上后，你的博客将：

1. ⚡拥有全球范围的高速 CDN，国内也有不错的访问速度（Cloudflare）
2. 🌤️无需支出且永远在线（如果你不需要域名的话）
3. 🛸走向未来

### 持续集成

如果你只是想直接通过持续集成的方式部署博客，那么你是无需在自己的电脑（本地）上安装 IPFS 的，你甚至可以完全不用接触 IPFS。但是，你的电脑必须安装 [Git](https://git-scm.com/downloads) 和 [Node.js](https://nodejs.org/zh-cn/download/)。如果你是一个程序员或之前有尝试过搭建静态博客，那么你对它们应该并不陌生。

#### 准备环境

首先是 Git，我们要将博客所在的文件夹初始化成一个 Git 仓库。注意，如果你之前已经初始化过了，请跳过这一步。怎么确定是否已经是一个 Git 仓库呢🤔？打开终端╱命令行，然后进入你的博客文件夹，输入 `git status` 然后回车，如下：

```
~/blog $ git status
fatal: not a git repository (or any parent up to mount point /)
```

如果你得到的输出如上，那么你的博客文件夹就不是一个 Git 仓库，需要进行初始化。否则，请跳过此步。Git 的初始化也很简单，输入以下命令即可：🐣

```
~/blog $ git init
```

然后，我们新建一个 `.gitignore` 文件，告诉 Git 忽略一些无关的文件。怎么确定哪些文件是无关的呢🤔？打开你的文件浏览器，设置显示隐藏文件，然后观察观察。由于不同系统、不同 SSG 会产生不同的「垃圾文件」，因此这里也给不出一个万能的列表🤷‍♂️，但你可以参考下方我给出的，然后结合自己的情况，把相关内容加入，如下：

```sh
# SSG 生成的文件所在目录
public

# Node.js
node_modules

# Hugo
resources

# Hexo
db.json
.deploy*
*.log

# macOS 系统
.DS_Store

# 老版本的 Windows 系统
Thumbs.db

# ipfs-deploy
.env
```

接下来，我们熟悉下 Git 的工作流程：🐥

```sh
# 配置下当前仓库的 Git 用户信息
~/blog $ git config user.name "reuixiy"
~/blog $ git config user.email "reuixiy@gmail.com"
# 名字随便，但建议与 GitHub 上保持一致
# 邮箱地址必须与你 GitHub 上的邮箱一致：
# https://github.com/settings/emails

# 添加 GitHub 上的远程仓库（需要先去 GitHub 上新建一个仓库）
~/blog $ git remote add origin https://github.com/reuixiy/io-oi.me.git

# 添加所有改动
~/blog $ git add -A

# 提交改动
~/blog $ git commit -m "init"

# 首次上传到远程仓库
~/blog $ git push -u origin master
```

最后，提示几点 Git 的基本使用：🐤

```sh
# 查看当前的状态
~/blog $ git status

# 添加并提交改动（「文件」由以上获取）
~/blog $ git add <文件> <文件> ...
~/blog $ git commit -m "init"
# 注意：
# 1. 你可以直接 `git add -A` 添加所有
# 2. `-m` 的意思是提交的修改说明，即后面的内容
# 3. 如果你一次修改了多个文件，而每个文件有不同的修改说明，
#    那么你可以分别 add 后 commit

# 查看所有的 commit 历史
~/blog $ git log
```

---

然后是 Node.js，我们也要初始化一下博客所在的文件夹，即生成 `package.json` 文件。同上，如果已经初始化过了（该文件已存在），则请跳过此步。🦘

初始化也很简单，输入以下命令即可：

```
~/blog $ npm init
```

当然，这样会出来一个交互界面，你需要填写相关的信息。如果你不需要这个交互界面😎，你可以直接 `npm init -y`，这样会将默认设置写入，然后你可以直接打开 `package.json` 文件编辑相关内容。如果你不确定，可以参考一下[本博客的该文件](https://github.com/reuixiy/io-oi.me/blob/master/package.json)。

#### 安装模块

接下来，我们要安装 [ipfs-deploy](https://github.com/ipfs-shipyard/ipfs-deploy) 模块，它就是将博客部署到 IPFS 上的主角。输入以下命令：

```
~/blog $ npm install ipfs-deploy --save-dev
```

稍等片刻即可，当然，如果很慢很慢，请科学上网后尝试😷。如果你是在当前目录初次使用 npm 安装模块，那么你会发现多了一个 `node_modules` 文件夹和一个 `package-lock.json` 文件。关于文件夹，这就是你安装的模块所在的目录；关于文件，这是自动生成的该模块及其依赖的详细版本信息，不用管它，也请不要编辑它。同时，你会发现 `package.json` 文件多了几行，它的作用是告诉 Node.js 我们所需的模块，在这里的话也就是 `ipfs-deploy`。

细心的你可能会问：我们之前将 `node_modules` 加入了 Git 的忽略列表，这意味着这个文件夹是不会上传到 GitHub 的，而它是我们安装的模块所在的目录，这怎么行呢🤔？这就是 `package.json` 文件的作用以及在安装模块后它多了几行的原因了——如此我们无需上传整个很大的文件夹，而只不过在使用时多了一条 `npm install --save-dev` 的命令，以重新安装我们所需的模块。而 Netlify 的持续集成服务会自动检查 `package.json` 的改动并在它的容器上安装或移除相应模块，所以我们无需上传 `node_modules` 文件夹。另外，如果你要备份博客的话，这样也会省力不少。🌩️

#### 配置部署

首先，修改 `package.json` 文件，在 `scripts` 内添加两条命令：

```json
"scripts": {
  "build": "hugo --gc --minify --cleanDestinationDir",
  "ipfs-deploy": "./node_modules/ipfs-deploy/bin/ipfs-deploy.js -p infura public -p pinata public -u pinata -d cloudflare -C -O"
}
```

第一条 `build` 即构建命令，不同的 SSG 有不同的命令，上面给出的例子是 Hugo 的，如果你使用的是 Hexo，那么就是 `hexo clean && hexo g`。第二条 `ipfs-deploy` 就是将博客部署到 IPFS 的命令，里面的参数说明可通过以下命令查看：

```
~/blog $ ./node_modules/ipfs-deploy/bin/ipfs-deploy.js --help
```

---

🦕我们还需要添加一个 `.env` 文件，它是 ipfs-deploy 所需的环境变量，如下：

```conf
IPFS_DEPLOY_PINATA__API_KEY=
IPFS_DEPLOY_PINATA__SECRET_API_KEY=

IPFS_DEPLOY_CLOUDFLARE__API_EMAIL=
IPFS_DEPLOY_CLOUDFLARE__API_KEY=
IPFS_DEPLOY_CLOUDFLARE__ZONE=example.com
IPFS_DEPLOY_CLOUDFLARE__RECORD=_dnslink.example.com
```

注意⛔：这个文件包含重要信息，千万不要把它上传到 GitHub 上！请务必将 `.env` 添加到 `.gitignore` 文件！

那么，这个文件怎样填写呢？1️⃣前两项，先去 [Pinata](https://pinata.cloud/) 注册，注册完成你应该就能看到你的 API KEY 和 SECRET API KEY，将之分别填入以上文件。2️⃣中间两项，你要去 [Cloudflare](https://www.cloudflare.com/) 注册，然后将你注册的邮箱填入上方，接下来去[这里](https://dash.cloudflare.com/profile/api-tokens)获取你的 API Key 并填入上方。3️⃣最后两项，是有关域名的，如果你还没有一个域名，赶紧去购买[^3]一个吧！怎么填写呢？将 `example.com` 替换为你的域名即可，如果你的博客使用的是子域名，那么只需设置..最后一项..为 `_dnslink.blog.example.com`。

[^4]![pinata-pricing.png](/images/pinata-pricing.png "Pinata 每个月有 1GB 的免费容量")

你可能会好奇 Pinata 提供的是什么服务🤔，以及为什么我们要使用它。Pinata 提供的是 Pinning 服务。简单来说，就是将你的文件上传到 IPFS 网络上，并且会同步到它建立的众多 IPFS 节点上（[IPFS 集群](https://cluster.ipfs.io/)[^5]）。如此，当 IPFS 上的任一个节点想要下载你的这个文件时，速度才有保证。我们之所以需要它，是因为 Cloudflare 的 IPFS Gateway 其实只是一种「缓存」服务，让我们能够利用 Cloudflare 的全球节点高速访问 IPFS 网络上的内容，但其服务器不会永久保存 IPFS 网络上的文件（技术上直白一点就是它不是 `ipfs add`）。

在这里，你可能会问：Pinning 是什么意思🤔？[Pinning](https://docs.ipfs.io/guides/concepts/pinning/) 是 IPFS 的一个术语，你可理解为「钉定」📌的意思。一个 IPFS 节点不是一块本地硬盘，节点的存储空间是有限的（默认是 10GB）。当节点存储的文件总大小超出了这个值后，节点就会自动删除一些文件（清「缓存」），而 Pinning 就告诉节点：该文件很重要，请不要清除它🥺！如此，节点就会保留你的文件。你的文件没被清除，它就依然能够被其它节点访问到，你的文件在 IPFS 网络上的可访问性就得到了保证。

你可能又会问：为什么要使用 Pinning 服务提供商的服务，本地不是可以直接使用 `ipfs add`[^6] 将文件添加到 IPFS 网络上吗😳？不不不，`ipfs add` 只是将你的文件按照算法分割成一个个大小为 256KB 的 IPFS 对象[^7]，然后添加到本地节点。也就是说，它并不会将你的文件上传到 IPFS 网络，甚至在你运行 IPFS 的守护进程（`ipfs daemon`）后，你的文件也不会被主动上传到 IPFS 网络。这样的做法是合理且很好理解的，换位思考一下就好了😃，比如：你的电脑作为一个节点，你肯定不会希望大量你不需要的数据同步到本地，你只会去同步你需要的数据（即你访问的 Hash 地址）。IPFS 是一个民主的世界，它不会强制要求每个节点必须同步其它节点的数据。如果一个节点需要某个文件，该节点就高举该文件的 Hash 并在 IPFS 网络中大喊一声🗣：你们谁有这个文件啊？然后 IPFS 网络回应🙋‍♂️：我有！我有！……于是该节点就快速获取到该文件了。

但是，目前的 IPFS 节点数量虽已不少但还远远不够，且绝大部分人还是通过第三方提供的 IPFS Gateway 来访问你的博客的，而不是通过本地 IPFS 节点🤦‍♂️。这样的话，一旦提供 IPFS Gateway 服务的服务器清除了你的文件，你的博客就无法访问了。除非，你本地每周 7 天每天 24 小时一直运行着 `ipfs daemon`。但是，即使这样其实也远远不够，举个例子：你的文件不幸被 Cloudflare 的 IPFS Gateway 的服务器清除，而正好此时有一个读者点开了你的博客，此时会发生什么呢？该服务器会重新去 IPFS 网络寻找🕵️‍♂️，但此时的情况就如下图了：

[^8]![one-ipfs-node-only.png](/images/one-ipfs-node-only.png)

这就意味着你的读者可能要等待很久很久才能打开你的博客，如此你的博客的用户体验将会极差。因此，为了保证博客的可访问性，你就必须[^9]要使用 Pinata 或其它服务提供商提供的 Pinning 服务了，至少目前是如此。🐢

你可能会说：你上面说得都很不错，但我为什么还要使用中心化的服务🤔？IPFS 不是去中心化的分布式网络吗🤔？

1. IPFS 仍处于起步阶段，节点数量虽已不少但还远远不够；
2. IPFS 的应用还在起步，浏览器还不支持直接访问 IPFS 网络；
3. 博客读者目前是通过第三方提供的 IPFS Gateway 访问的，即读者未加入 IPFS 网络，这也就无法发挥 P2P 的优势，而必须依赖第三方提供的中心化的服务。

但是，IPFS 的前景不容置疑💡。如果你使用过 P2P 下载软件下载过电影，你就能理解，几乎你需要的每部电影都能以极高的速度下载完，且给你提供数据的节点遍布全球。需要注意的是，这还仅仅是在极客圈子内呢，而未来，当每个互联网用户都加入 P2P 的世界，那会是怎么样的呢？那就是 Web 3.0 的世界了，那就是 IPFS 取代 HTTP 的时候了。那时，人人的手机、电脑都是一个服务器；那时，没有中心化的组织掌控你的隐私信息；那时，世界不再有高墙，互联网真正实现了世界互联。👉🌎🌍🌏💫

除了 [Pinata](https://pinata.cloud/)，类似的 Pinning 服务提供商还有：

1. https://infura.io/
2. https://www.eternum.io/
3. https://globalupload.io/

其中，第二个需要注册付费才能使用，第三个可以免注册免费上传，但是不会 Pinning，且单个文件的最大上传限制是 50MB。至于第一个，它就比较奇葩了，它虽然提供服务，但目前它连个上传的界面都没有提供，你怎么上传呢？直接通过它提供的 [API](https://infura.io/docs/ipfs/post/add)。但是，它也最良心❤️，它完全免费，它不用注册，它几乎没有任何限制，无论是请求数还是文件的大小，它不会 unpinning 你 add 的文件——甚至目前连一个 unpinning 的途径都没提供给你🤦‍♂️！但比较可惜的是，它的 API 经常请求失败，且虽然它是 ipfs-deploy 的默认支持的 pinner，但我在使用时它好像有个奇怪的 bug 🐞，这个 bug 会导致上传到 Infura 的文件与实际的不一致，故我在上面的 `package.json` 里面写的 `ipfs-deploy` 命令并没有将文件同时上传到 Infura，而只是把文件 add & pin 到了 Pinata 上，然后只将文件的 Hash 值 pin 到 Infura 上。但这样其实是完全可行的，甚至更完美，因为只要将文件的 Hash 值 pin 了，运行的 IPFS 程序会自动去 IPFS 网络中下载该文件，而我们本地就只需上传一遍。让我们一起为 Infura 的服务器祈祷吧！🤣

在这里我再给你提供一个福利——[DTube](https://d.tube/)，它可以作为一个免费的存放博客视频的网络硬盘📺。作为一个静态博客的博主，你是否经常为视频或图片发愁？这两者的体积较大，加载速度的快慢又很影响博客的阅读体验。对于视频🎦，肯定不适合加入博客的仓库；使用七牛云 KODO、阿里云 OSS 等的服务的话又得支出；将之上传到视频网站然后用其提供的代码嵌入到博客内又太麻烦且不够简洁，再加上国内的视频网站会将你的视频加上水印，且播放时还有很长的广告时间，视频的质量也不高，而 YouTube 国内又无法访问，故也不适合。但是，你可以上传到 DTube，一个基于 [Steem](https://steem.com/) 和 IPFS 的去中心化的视频网站。DTube 现在可以免注册免费上传视频[^10]，且目前还未加入 GFW 名单，国内也有很高的访问速度（有时会抽风🙃）。使用方法很简单，网站左方点击 Upload 后直接把你的视频拖拽上去，然后等待视频上传以及转码⏳，成功后在 Advanced 就能看到原视频以及转码后的视频的 Hash 值（IPFS 地址），最后打开 `https://video.dtube.top/ipfs/Hash` 就能看到你上传的视频了，而这个 URL 即是你需要的视频外链地址。至于图片🖼️，由于我们使用的是 Cloudflare 的 IPFS Gateway，而 Cloudflare 在国内的访问速度其实很不错（比 GitHub Pages 和 Netlify 的要好很多），所以我们无需担心。

另外还有一点，我们可以利用这些第三方服务支持 IPFS 的匿名🕶️。虽然目前 IPFS 本身并不支持匿名，但我们可以通过这些第三方提供的服务达到匿名的目的，比如你通过 Tor 去访问以上提到的这些网站，然后通过它们将你的文件上传到 IPFS 上，你是不是就实现了自己在 IPFS 上的匿名呢👀。

---

回到正文🤣，接下来你必须将你的域名移交给 Cloudflare 管理（即将域名服务器地址修改为 Cloudflare 提供的地址），为什么呢🤔？因为我们是通过 [DNSLink](https://dnslink.io/) 来实现将域名「解析」到 IPFS 的，说白了就是添加一条包含了 SSG 生成的文件夹（即 `public`）的 Hash 值——即 IPFS 上的「URL」，因为 IPFS 是内容寻址，即通过内容的 Hash 值寻址——的 DNS 记录。而 SSG 每构建一次，`public` 文件夹的 Hash 值就会改变（如果博客有修改的话），因此如果你想保证读者能够及时获取到博客的最新版本，你就必须在每次发布博客的同时更新这条 DNS 记录。这种重复的无聊工作肯定不应该手动操作💩，而应该交给程序自动化处理🤖，这就是 ipfs-deploy 的一个很重要的功能了，而它目前仅支持 Cloudflare。另外，Cloudflare 支持裸域名（即直接 `example.com`）CNAME。综上，目前我们必须将域名移交给 Cloudflare 管理。操作的流程如下：

1. 在 Cloudflare 注册后点击 Add a Site，输入你的域名后按流程走🕺
2. 去你的域名服务商修改域名服务器的地址，设置好后可以用 Google 提供的[工具](https://developers.google.com/speed/public-dns/cache)清空域名的 NS 缓存以加速
3. 回到 Cloudflare，点击 Check 或 Re-check now，然后等待几分钟，刷新页面可以看到成功提示
4. 设置 DNS，删除原有的一些没用的值（如 A 记录和 AAAA 记录），然后添加一条 CNAME：Add record > Type: `CNAME`, Name: `example.com`, Target: `cloudflare-ipfs.com` > Save
5. SSL/TLS > Edge Certificates > Always Use HTTPS 🔒

你可能会问：可以将 `cloudflare-ipfs.com` 替换为别的 [IPFS Gateway](https://ipfs.github.io/public-gateway-checker/) 地址吗🤔？可以，但是这会有一个 SSL 证书（即 HTTPS）的问题。我们是通过 IPFS Gateway 获取 IPFS 上的内容的，它的作用就是一个网关🔗，连接了 HTTP 和 IPFS，让我们能够使用目前的浏览器方便地访问 IPFS 上的内容。其实，这就是我们添加的这条 CNAME 的作用，将你的域名重定向到安装了 IPFS Gateway 的服务器。以上面添加的这条 CNAME 为例，当一个读者通过浏览器点开 `example.com` 后，浏览器去问 DNS 服务器🗣：这个域名的 IP 地址是什么啊？DNS 服务器找到一条 CNAME 记录，指向 `cloudflare-ipfs.com` 并且它的 IP 地址是 `104.18.253.167`，于是 DNS 服务器告诉浏览器🗣：IP 地址是 `104.18.253.167`！于是浏览器向这个 IP 地址发起一个 HTTP 请求，这就成功地将你的域名重定向到安装了 IPFS Gateway 的服务器了。之后发生了什么呢🤔？安装了 IPFS Gateway 的服务器会通过 HTTP 请求里的 Header 信息获取到访问的域名是 `example.com`，然后它去查询该域名的 DNS 记录，读取到 `dnslink` 后，就会获取里面包含的 Hash 值（IPFS 地址），最后服务器去 IPFS 网络中获取到相应内容并通过 HTTP 返回给浏览器，浏览器将获取的内容渲染，该读者就能开始开心地阅读你的博客了😜～以上，可见如果你的博客想要实现 HTTPS，你 CNAME 指向的支持 IPFS Gateway 的服务器就必须要有属于你的域名的 SSL 证书，而目前好像只有 Cloudflare 的 IPFS Gateway 才会提供这项服务——为你的域名生成相应的 SSL 证书。

---

再次回到正文🤣，完成以上步骤后，我们可以先在本地测试一下，执行命令：

```
~/blog $ npm run build && npm run ipfs-deploy
```

稍等片刻，提示成功后，你可以先点开显示的 URL 地址预览。如果你发现画风完全不对💩，那是因为你的博客的使用的是绝对链接而不是相对链接。博客之前是 `https://example.com/` 而现在是 `https://a.com/ipfs/example.com/`，这就会导致大量用绝对链接的文件 404，比如：绝对链接 `/css/main.css` 请求的地址其实是 `https://a.com/css/main.css`，而实际上该文件的正确的有效的地址却是这样的 `https://a.com/ipfs/example.com/css/main.css`。怎么解决呢？将它变成相对链接即可，如上面的链接如果是 `./css/main.css`，那就没问题了。这要如何实现呢？如果你使用的 SSG 是 Hugo，使用的主题是 [MemE](https://github.com/reuixiy/hugo-theme-meme)，那就简单了，直接在配置文件 `config.toml` 中配置 `relativeURLs = true`、`enableForceHTTPS = true`，然后添加[一个文件](https://github.com/reuixiy/io-oi.me/blob/master/assets/scss/base/_glyph-correction.scss)，将字体链接定制为相对链接（如果你开启了「中文标点符号字形纠正」的话）即可。对于其它的 SSG 和主题，我就不清楚了，不过你可以参考下面的两个链接：

1. https://developers.cloudflare.com/distributed-web/ipfs-gateway/updating-for-ipfs/
2. https://medium.com/pinata/how-to-easily-host-a-website-on-ipfs-9d842b5d6a01

但是，如果你是直接通过自己的域名访问，以上这个问题是不会存在的😀。现在，浏览器打开一个新的匿名标签页，按下 F12 再访问你的博客。恭喜你，你的博客已经成功部署到 IPFS 上了！你可以通过浏览器的控制台手动检查下 Header 信息，如下图：

![host-your-blog-on-ipfs.png](/images/host-your-blog-on-ipfs.png)

---

接下来，配置下 Netlify 以实现持续集成。先去 [Netlify](https://app.netlify.com/signup/) 注册，推荐直接用 GitHub 的帐号，然后按照提示授权、选仓库……好了后前往 Site settings > Build & deploy > Environment 添加 6 个环境变量，名字和值分别对应 `.env` 文件里的值。然后需要新建一个 `netlify.toml` 文件，添加一些持续集成所需的设置：

```toml
[build]
  publish = "public"
  command = "npm run build"

[build.environment]
  HUGO_VERSION = "0.64.0"
  HUGO_ENV = "production"
  HUGO_ENABLEGITINFO = "true"

[context.production]
  command = "npm run build && npm run ipfs-deploy"

[[redirects]]
  from = "https://io-oi.netlify.com/*"
  to = "https://io-oi.me/:splat"
  force = true
```

1️⃣ `build` 即构建相关的设置，`publish` 即我们要发布的文件夹（其实这个已经没必要了，因为我们现在是部署在 IPFS 上，而非 Netlify 的服务器上），`command` 即要执行的命令，我们直接用 npm 执行写在 `package.json` 里的命令即可。

2️⃣ 这是一些环境的设置，如果你使用的是 Hugo，则加上，否则可以删除。

3️⃣ 将 Netlify 给我们提供的子域名重定向到我们自己的域名，加上有利于 SEO，请将 `io-oi`[^11]和 `io-oi.me` 替换为你自己的值。

如果你对这个文件还有疑问，可以参考 Netlify 的文档：

1. https://www.netlify.com/docs/continuous-deployment/
2. https://www.netlify.com/docs/netlify-toml-reference/

---

最后一步，提交到 GitHub：

```
~/blog $ git add -A
~/blog $ git commit -m "Deploy to IPFS"
~/blog $ git push
```

去 Netlify 上查看下部署日志，成功完成！🎉🎉🍻

### 原生部署

这里的原生部署是指直接通过本地安装的 IPFS 软件将博客部署到 IPFS 网络上，不使用任何中心化的服务，但目前也不适合生产环境。通过本节，你对 IPFS 的理解会更深，对上文内容的理解也会更深。如果你还不知道 IPFS 是什么，可以去[官网](https://ipfs.io/)或观看[这个视频](https://www.youtube.com/watch?v=5Uj6uR3fp-U)了解一下。

#### 安装

首先，怎么安装呢？如果你和我一样，使用的是 [Arch Linux](/tech/hello-arch-linux/) 系统，那么：

```
$ sudo pacman -S go-ipfs
```

对于其它系统的读者，见：<https://docs.ipfs.io/introduction/usage/>

#### 开始

安装好后，先初始化自己的 IPFS 节点：

```
$ ipfs init
initializing ipfs node at /home/archie/.ipfs
generating 2048-bit RSA keypair...done
peer identity: Qmcpo2iLBikrdf1d6QU6vXuNb6P7hwrbNPW9kLAH8eG67z
```

稍等片刻，会输出一些信息，第三行就是你的节点 ID 了，它是一段杂乱的 Hash 值，它是唯一的🦄，但你无需记住它，通过 `ipfs id` 命令你可以随时查看它。如果你运行了 `ipfs id`，你会发现输出的除了 ID，还个叫 Public Key 的东西，它是一段更长的 Hash 值，这是你的节点的公钥。此时，好奇的你可能会问：那么私钥在哪里呢🤔？在上面第一行的文件夹里的 `config` 文件内。

#### 添加

需要..特别注意..，添加是指将你的文件或文件夹按照算法分割成一个个大小为 256KB 的 IPFS 对象，然后添加到本地 IPFS 节点，而不是指将你的文件上传到 IPFS 网络。

```
~/blog $ ipfs add -rQ public
```

你可以用以上命令将你的文件夹添加到 IPFS。其中，`r` 参数的意思是递归添加（recursive），如果你添加的只是一个文件，则可以不要；`Q` 参数的意思是安静输出（quiet），且只会返回最后生成的那个 Hash，即我们添加的文件夹的 Hash；`public` 就是我们要添加的文件夹的名字了。稍等片刻后你应该就能看到一段 Hash 值，这就是我们添加的文件夹的 IPFS 地址。

#### 发布

要想发布我们的文件，我们首先要将自己的电脑变成一个 IPFS 节点，即要在本地运行 IPFS 服务，输入以下命令：

```
$ ipfs daemon
```

稍等片刻，最终输出 `Daemon is ready` 时，就说明成功了。你可能会注意到以下输出：

```
API server listening on /ip4/127.0.0.1/tcp/5001
WebUI: http://127.0.0.1:5001/webui
Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
```

1️⃣ 本地的 API 服务，有一些 `ipfs` 命令需要该服务。

2️⃣ 一个人性化的网页用户界面，会显示 IPFS 运行的一些信息，也可以编辑 IPFS 的一些配置。

3️⃣ IPFS Gateway 服务，如果你阅读了上文，对它应该不陌生，这也意味着你此时可以直接通过 <http://127.0.0.1:8080/ipns/io-oi.me/> 来访问我的博客😝！当然，初次访问可能要等待较长时间。

接下来，我们就来将我们的文件「发布」出去👨‍💻，访问 `https://cloudflare-ipfs.com/ipfs/Hash`[^12]。稍等片刻，你的文件就成功地「发布」到 Cloudflare 的 IPFS Gateway 的服务器上了。这时，你应该就能明白我为什么要在「发布」两字左右加上引号了，因为这是..被动..而不是主动的🤪。什么意思呢？打个比方：你在街上发传单，你将传单一张一张递给路人，这叫做发布。而现在的情况呢，你在街上发传单，突然你发现一个路人老远老远就对着你大喊🗣：给我一张传单啊！同时快速冲到你面前并直接抽一张就跑了😳，而你只是站在那😳，这当然不能叫发布了🙃。

---

但是，细心的你可能会发现一个问题，你的博客每修改一次，SSG 生成的文件夹的 Hash 值（IPFS 地址）就会改变一次，我总不能每更新一次博客就去通知一遍读者我博客的最新 IPFS 地址吧😨！何况这也是完全不可能的啊😰！是的，IPFS 考虑到了这个问题，并提出了 [IPNS](https://docs.ipfs.io/guides/concepts/ipns/) 的解决方案[^13]。运行以下命令：

```
$ ipfs name publish --lifetime 999999h --ttl 300s <hash>
```

`lifetime` 参数的作用是指定该记录的有效时间，默认是 `24h` 即 24 小时，上面这个是我测试得到的最大值🤖；`ttl` 即 Time To Live，解释[见这](https://jaminzhang.github.io/dns/DNS-TTL-Understanding-and-Config/)；`<hash>` 即你的博客最新版的 Hash 值。稍等片刻后，你会得到一个输出，比如：

```
Published to Qmcpo2iLBikrdf1d6QU6vXuNb6P7hwrbNPW9kLAH8eG67z: /ipfs/<hash>
```

后面那个 Hash 即是你的输入值，而前面那个 Hash 呢，它其实就是你 `init` 时得到的 IPFS 节点 ID。这样，你每次更新博客时，只需先 `ipfs add` 最新版本的 `public` 文件夹，得到 `<hash>`，然后 `ipfs name publish <hash>` 就行。而你也只需告诉朋友你的节点 ID 即可，不过..注意..提醒一下他：这是 IPNS 地址，而不是 IPFS 地址，所以你访问的时候要注意啦👈！

以上命令执行成功后，可以在本地打开 `http://127.0.0.1:8080/ipns/Hash` 测试一下。当然，前提是你的 `ipfs daemon` 正在本地运行。然后，你也可以打开 `https://ipfs.io/ipns/Hash` 测试一下。目前我的测试结果是，本地没问题，但其它 IPFS Gateway 没有成功过，应该是 IPNS 目前还有一些问题🤦‍♂️……

---

此时，机智的你可能又会想到一个问题：我有两个博客，而一台电脑只能有一个节点 ID，我总不能再买一台电脑吧🤷‍♂️？很对！但其实，`ipfs name publish` 是可以指定 IPNS 地址的，只不过它的默认值是节点 ID。我们可以用以下命令生成一个新的 IPNS 地址：

```
$ ipfs key gen --type=rsa --size=2048 io-oi.me
```

当然，将上面的 `io-oi.me` 替换为你喜欢的名字（下同），然后使用时：

```
$ ipfs name publish --lifetime 999999h --ttl 300s --key io-oi.me <hash>
```

更多使用参数和说明见：

1. https://docs.ipfs.io/reference/api/cli/#ipfs-key
2. https://docs.ipfs.io/reference/api/cli/#ipfs-name-publish

---

注意⛔：如果你使用了 IPNS，请务必备份节点的私钥和生成 IPNS 地址时生成的 Key！它们分别存储在你 [`init`](#开始) 时显示的目录下的 `config` 文件和 `keystore` 文件夹内，请务必备份！

#### 清除

如果你有电脑洁癖，你可能会问：我要怎样清理本地 IPFS 节点的「垃圾」呢🤔？

首先，IPFS 本地节点的默认最大存储空间是 10GB，如果超过这个值，IPFS 会自动将没有钉定（Pinning）的文件删除一部分，你可以将它理解为 IPFS 的清除机制。但是，如果你想手动将所有没有钉定的文件删除，你可以使用以下命令：

```
$ ipfs repo gc
```

然后，对于你添加（`ipfs add`）的文件，IPFS 会自动将它们钉定，所以以上命令并不能将它们清除，你需要执行：

```
$ ipfs add -rQn <文件>
$ ipfs pin rm <hash>
$ ipfs repo gc
```

1️⃣ 如果你忘记了你添加的文件的 Hash，你可以通过该命令查看，但注意该命令必须在该文件的所在目录下执行。

2️⃣ 取消该文件的钉定，默认是递归的，因此无需添加 `-r` 参数。

3️⃣ 清空本地 IPFS 节点上所有没被钉定的文件。

---

如果你添加过该文件很多次，且期间你对这个文件进行了修改，导致该文件每次的 Hash 值都不一样，进而导致钉定的也不一样，那么你可以通过以下命令查看你钉定过的所有 Hash：

```
$ ipfs pin ls -t recursive
```

如果你添加过实在太多了，而你现在只想将它们全部清除，那么：

```
$ ipfs pin ls -t recursive | cut -d ' ' -f1 | xargs -n1 ipfs pin rm
$ ipfs repo gc
```

需要注意的是，执行清空命令会将 WebUI 的网页也删除，所以执行后你下一次打开 WebUI 时可能就要多等待一会儿了🐶。

## 说明

我的博客就是通过本文介绍的持续集成的方法部署到 IPFS 上的，经过一段时间的使用，体验还是非常棒的！由于访问通过的是 Cloudflare 的 IPFS Gateway，加载速度肯定是有保证的。博客每次更新部署完后，也都能及时获取到最新版本，我测试的结果是一分钟之内，绝大多数时候！⚡

但没有什么是完美的🙊，通过这篇文章的方法将博客部署到 IPFS 上也是如此，目前已知的问题：

1. 无法定制 404 页面
2. Cloudflare 上看不到浏览统计信息；不支持强制跳转到 HTTPS
3. Cloudflare 的 IPFS Gateway 会 403 视频

对于第三个问题，是只对你将视频直接存放在博客的仓库，且在博客中用相对链接作为视频的 URL 有影响的，解决方法就是在该视频链接前加上其它 IPFS Gateway 地址，比如 `https://gateway.pinata.cloud` 😉。

对于本博客呢，还有个页面重定向的问题。我的博客之前进行过一次[重构](/tech/redesign-this-blog-under-minimalism/)，改变了 URL 结构，导致原来的文章链接大量 404，这是很不利于 SEO 的。[后来](/tech/deploy-static-site-to-netlify/)，我通过 Netlify 的 [Redirect](https://www.netlify.com/docs/redirects/) 功能解决了，但现在我将博客部署在了 IPFS 上，它自然就失效了。尝试了一下 Cloudflare 的 Page Rules，也不起作用。但还好 Hugo 有一个叫 [Aliases](https://gohugo.io/content-management/urls/#aliases) 的功能，这个问题也就很快得到了解决👽。

---

最后将我参考过的一些链接贴出来，但文中出现过的，这里就不再列举了🐷...

1️⃣ IPFS

1. [IPFS](https://ipfs.io/)
2. [IPFS Demo | YouTube](https://www.youtube.com/watch?v=8CMxDNuuAiQ)
3. [IPFS for Websites | IPFS Documentation](https://docs.ipfs.io/guides/examples/websites/)
4. [The Complete Beginner’s Guide to Deploying Your First Static Website to IPFS | Interplanetary Gatsby](https://interplanetarygatsby.com/ipfs-deploy/)
5. [Connecting Your Website | Cloudflare](https://developers.cloudflare.com/distributed-web/ipfs-gateway/connecting-website/)
6. [Serve your FaunaDB Single Page App from IPFS | Fauna](https://fauna.com/blog/serve-your-faunadb-single-page-app-from-ipfs)
7. [How to Easily Host a Website on IPFS | Pinata](https://medium.com/pinata/how-to-easily-host-a-website-on-ipfs-9d842b5d6a01)
8. [A Weekend With IPFS | A Weekend With](https://medium.com/a-weekend-with/a-weekend-with-ipfs-9f2647fc231)
9. [Ten terrible attempts to make the Inter Planetary File System human-friendly | Hacker Noon](https://hackernoon.com/ten-terrible-attempts-to-make-the-inter-planetary-file-system-human-friendly-e4e95df0c6fa)
10. [IPFS: The Internet Democratised | Tony Willenberg](https://medium.com/@tonywillenberg/web-3-0-a-truly-democratised-internet-f4b06cb4077b)
11. [IPFS：替代 HTTP 的分布式网络协议 | InfoQ](https://www.infoq.cn/article/ipfs)
12. [IPFS：你上的可能是一个假的互联网](http://www.sohu.com/a/236612222_100184288)

2️⃣ Web 3.0

1. [站在 Web3.0 理解 IPFS 是什么 | 深入浅出区块链](https://learnblockchain.cn/2018/12/12/what-is-ipfs/)
2. [Web3.0：能否开启未来 10 年创新创业创富大门？（上） | 碳链价值](https://www.ccvalue.cn/article/650.html)
3. [Web3.0：能否开启未来 10 年创新创业创富大门？（下） | 碳链价值](https://www.ccvalue.cn/article/690.html)

## 结尾

开头说「也会简单介绍一下 IPFS 的使用」，结果本文几乎成了一篇 IPFS 的详细科普文章🤪…… Anyway，也算是通过这个有用的实例来普及下 IPFS 吧。毕竟，IPFS 是未来，D 网是未来，Web 3.0 是未来，而我们——必须拥抱未来！

同时，希望大家多多分享传播这篇文章😘，让更多的人了解到 IPFS 并去使用 IPFS！当然，我也非常希望大家以后在自己的电脑上多多 `ipfs daemon`，并通过 <http://127.0.0.1:8080/ipns/io-oi.me/> 来访问我的博客哦😝！

最后，我只是一个爱探索的小白👶，如果文中有任何错误、可提高之处，或者你有任何问题，欢迎去 GitHub 提 [Issue](https://github.com/reuixiy/io-oi.me/issues) 讨论或直接修正后提交 PR。在这里，我也诚邀广大读者与我一起编辑这篇文章😃，因为这也是去中心化的内涵之一：汇聚人人的力量。即将到来的，是一个共同创造的时代！🛸

---

[^1]: Photo by NASA ([Unsplash](https://unsplash.com/photos/Q1p7bh3SHj8)).
[^2]: 静态网站生成器，[Static Site Generator](https://www.staticgen.com/)，简称 SSG。
[^3]: 如果想省去备案的麻烦，就不要到国内的域名服务商注册，选择一些国外的大公司，比如 [GoDaddy](https://sg.godaddy.com/zh/)。
[^4]: 由于总容量有限，请留意你的[当前使用量](https://www.pinata.cloud/pinexplorer)。
[^5]: 你也可以自建 IPFS 集群，ipfs-deploy 也提供了相应的部署功能，可以去看一下开头提到的那篇[详细教程](https://withblue.ink/2018/11/14/distributed-web-host-your-website-with-ipfs-clusters-cloudflare-and-devops.html)。
[^6]: 该命令会同时将添加的文件 Pinning 在本地节点。
[^7]: IPFS Object，你可以理解为区块，但在 IPFS 中这是[两个不同的概念](https://docs.ipfs.io/guides/examples/blocks/)。另，`ipfs add` 的详细细节可看[这篇文章](https://medium.com/textileio/whats-really-happening-when-you-add-a-file-to-ipfs-ae3b8b5e4b0f)。
[^8]: 来源：<https://medium.com/pinata/dedicated-ipfs-networks-c692d53f938d>
[^9]: 突然想到也不是必须，如果你有一个服务器的话（树莓派其实就行），让它一直运行 `ipfs daemon`，然后写一个脚本定时发起一个包含了你最新版博客的 Hash 值的 GET 请求（比如：`curl -m 42 "https://ipfs.io/ipfs/$hash"`）到所有的 [Public IPFS Gateway](https://ipfs.github.io/public-gateway-checker/)，这样你的博客就不会被清除了。你甚至可以直接将你的博客放到树莓派上，然后写一个脚本将一切流程自动化。这样的架构，与直接将树莓派作为网站的服务器，然后通过内网穿透工具实现公网访问相比，现代了不少！不过注意这样并不匿名，因为 DHT 会将你的 IP 地址[直接暴露](https://www.reddit.com/r/ipfs/comments/5q9v7p/eli5_can_anyone_track_my_ip_if_i_share_a_file/)。
[^10]: DTube 会将你的视频上传到它的 IPFS 集群（相当于 CDN）上。需要注意的是，目前 DTube 的上传功能好像还不太稳定，如果出现点击上传后没反应或者压根没有上传，请刷新页面后重试。另外，我发现目前如果你上传没有音频的视频，上传后 DTube 没有反应。我目前的解决方案是使用文中提到的[这个地址](https://globalupload.io/)上传并获取到 Hash 值，然后通过访问 `https://video.dtube.top/ipfs/Hash` 实现 DTube 上的同步。当然，为了保证文件的可访问性，还是建议通过 Pinata [上传](https://www.pinata.cloud/pinataupload)。
[^11]: 如果你没有自定义 Netlify 的子域名，那么这个是默认的一个很丑的字符串。
[^12]: 用你的[添加](#添加)后得到的 Hash 值替换 `Hash`，你也可以将 `cloudflare-ipfs.com` 替换为任何 [IPFS Gateway](https://ipfs.github.io/public-gateway-checker/) 地址。
[^13]: 另一个解决方案就是 [DNSLink](https://dnslink.io/)，我在上文提到过，它目前可用于生产环境，但依赖于现有的中心化的域名系统。
