+++
title = "ENS 尝鲜"
date = "2020-04-01T18:51:47+08:00"
tags = ["decentralized"]
slug = "hello-ens"
+++

![hello-ens.jpg](/images/hello-ens.jpg "手机上 MetaMask 应用的截图")

Opera 浏览器[昨天宣布](https://twitter.com/opera/status/1244729646417170434)其最新 Android 版已经支持 IPFS——你现在可以通过 `ipfs://io-oi.eth` 来访问本博客了！

`.eth` 是什么域名呢？`.eth` 是 ENS（[Ethereum Name Service](https://docs.ens.domains/)）即以太坊域名服务的顶级域名，更多信息及注册流程见 [ens.domains](https://ens.domains/)。

接下来，本文将主要介绍一下这个博客是如何持续集成部署到 IPFS，并自动更新 ENS 记录，以实现 `io-oi.me` 与 `io-oi.eth` 的「同步」。

---

如何持续集成部署到 IPFS？请参见我之前写的文章《[将博客部署到星际文件系统（IPFS）](/tech/host-your-blog-on-ipfs/)》。

成功部署后，购买域名后，我们编辑一下 `package.json` 文件，利用 [ens-updater](https://github.com/TripleSpeeder/ens-updater) 这个工具实现 ENS 记录的自动更新，如下：

```diff
"scripts": {
- "ipfs-deploy": "./node_modules/ipfs-deploy/bin/ipfs-deploy.js -p pinata public -u pinata -d cloudflare -C -O"
+ "ipfs-deploy": "./node_modules/ipfs-deploy/bin/ipfs-deploy.js -p pinata public -u pinata -d cloudflare -C -O | ./node_modules/@triplespeeder/ens-updater/bin/ens-updater.js setContenthash ${ENS_NAME} ipfs-ns stdin --web3 https://mainnet.infura.io/v3/${INFURA_KEY}"
},
"devDependencies": {
  "ipfs-deploy": "^7.14.0",
+ "@triplespeeder/ens-updater": "^1.9.0"
}
```

然后前往 Netlify 的配置面板，新增三个环境变量，名字如下：

```
ENS_NAME
PRIVATE_KEY
INFURA_KEY
```

- 你购买的域名，比如 `io-oi.eth`
- 你购买域名时使用的钱包地址的私钥
- 提供连接到以太坊主网络的 Infura 的 API 地址

对于第三项，你需要前往 [Infura](https://infura.io/) 注册获取，创建一个新的项目后，其 `PROJECT ID` 即是我们需要的地址。

最后将改动提交到 GitHub，等待 Netlify 的持续集成服务自动运行完，就成功了！
