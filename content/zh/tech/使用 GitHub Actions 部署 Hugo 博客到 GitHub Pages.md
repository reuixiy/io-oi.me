+++
title = "使用 GitHub Actions 部署 Hugo 博客到 GitHub Pages"
date = "2020-08-16T21:30:32+08:00"
tags = ["hugo"]
slug = "deploy-hugo-to-github-pages-via-github-actions"
gitinfo = true
+++

近期博主有了[简化博客](/tech/simplify-my-blog/)的想法，于是打算从 Netlify 回到 GitHub Pages，并采用 GitHub Actions 实现博客的持续集成部署。

为了践行极简，博主自己写了一个 Action，使用 Arch Linux 作为 Docker 容器的基础镜像，见 [reuixiy/hugo-deploy](https://github.com/reuixiy/hugo-deploy)。

如果你之前使用过 GitHub Pages，可前往 GitHub 参考 [README.md](https://github.com/reuixiy/hugo-deploy/blob/master/README.md) 直接使用；如果没有，则可以参考下方的详细教程。

## Prerequisites

- Git
- GitHub
- SSH

## Tutorial

1. **Git 你的 Hugo 站点**

   参见 <https://io-oi.me/tech/host-your-blog-on-ipfs/#准备环境>。

2. **GitHub 上新建仓库**

   要使用 GitHub Pages，必须先新建一个 `<username>.github.io` 的仓库。
   
   参见 [Types of GitHub Pages sites](https://docs.github.com/en/github/working-with-github-pages/about-github-pages#types-of-github-pages-sites)。

3. **通过 SSH 连接 GitHub**

   参见 <https://io-oi.me/tech/ssh-with-multiple-github-accounts/#单帐号>。

4. **推送源码到 GitHub**

   这里，我们区分一下，我们要推送的是源码，而..不是..生成的 `public` 文件夹。

   ```bash
   git remote add origin git@github.com:username/username.github.io.git
   git push -u origin master
   ```

5. **新建 Workflow 配置文件**

   ```yml
   # .github/workflows/build.yml

   name: build

   on:
     push:
       branches:
       - master

   jobs:
     build:
       runs-on: ubuntu-latest

       steps:
       - name: 'Building...'
         uses: reuixiy/hugo-deploy@v1
         env:
           DEPLOY_REPO: username/username.github.io
           DEPLOY_BRANCH: build
           DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
           # https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
           TZ: Asia/Shanghai
   ```

   需修改 `env` 下的键的值，说明如下：

   - `DEPLOY_REPO`，部署的 GitHub Pages 仓库
   - `DEPLOY_BRANCH`，部署在 GitHub Pages 仓库的分支
   - `DEPLOY_KEY`，部署所需的 SSH 私钥

6. **配置公钥和密钥到仓库**

   首先，生成新的 SSH public/private key pair：
   
   ```bash
   # 修改 username 为你自己的 GitHub 用户名
   ssh-keygen -t rsa -b 4096 -C "username@users.noreply.github.com"
   # 注意：这次不要直接回车，以免覆盖之前生成的
   ```

   然后，将生成的公钥╱私钥的内容，分别复制和添加：

   - 公钥（比如 `id_rsa.pub`）

     前往 GitHub Pages 仓库，Settings > Deploy keys > Add deploy key。

     务必勾选 Allow write access。

   - 密钥（比如 `id_rsa`）

     前往 GitHub Pages 仓库，Settings > Secrets > New secret。

     Name 必须为 `DEPLOY_KEY`。

7. **推送改动到 GitHub**

   ```bash
   git add -A
   git commit -m "refactor: use hugo-deploy action"
   git push
   ```

   在 GitHub 上，打开你的源码仓库页面，在 Actions 处查看日志。顺利的话，一分钟内就能完成构建和部署。

   部署成功之后，前往 GitHub Pages 仓库，Settings > Options > GitHub Pages，将 Source 中的 Branch 选择为 `build`（`DEPLOY_BRANCH` 的值）。

   最后，打开 <https://username.github.io>，应该就能看到博客成功上线。

今后，我们在本地写好文章预览后，只需将改动推送到 GitHub 源码仓库，GitHub Actions 就会自动构建并部署 `public`，也即持续集成部署我们的博客。

## More

1. 如果你不想公开你的博客源码，可以新建一个私有仓库作为源码仓库，也支持 GitHub Actions。[^1]

2. 添加徽章（Badge）到 README.md

   ```md
   [![GitHub Actions](https://github.com/username/username.github.io/workflows/build/badge.svg)](https://github.com/username/username.github.io/actions)
   ```

3. 自定义域名，参见 <https://io-oi.me/tech/custom-domains-on-github-pages/>。

---

[^1]: 注意：此时公钥仍在 GitHub Pages 仓库中配置，密钥则在源码仓库中配置。
