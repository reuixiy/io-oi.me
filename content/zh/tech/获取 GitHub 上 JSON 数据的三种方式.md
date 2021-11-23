+++
title = "获取 GitHub 上 JSON 数据的三种方式"
date = "2021-11-24T00:02:17+08:00"
tags = ["web"]
slug = "fetch-json-data-on-github-in-three-approaches"
+++

JSON 是 Web 中数据表示和传输最通用的格式，GitHub 是程序员所热爱的极乐开源社区，有时候我们在仓库存放一些 `.json` 文件，或者通过 GitHub Actions 自动构建输出一些 `.json` 文件，作为一个轻量数据源，那么我们如何去获取呢？

```js
const REPO = 'reuixiy/io-oi.me'
const BRANCH = 'build'
const FILE_PATH = 'foo/bar.json'
```

```js
// 1. raw.githubusercontent.com

`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${FILE_PATH}`
```

这种方式最简单，但是由于该域名在国内访问不畅，有时可能会带来麻烦，可以尝试以下两种方案。

```js
// 2. api.github.com

`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`

async function getFooBar() {
  const res = await fetch(URL, {
    // Required headers
    headers: {
      // See https://docs.github.com/en/rest/overview/media-types
      Accept: 'application/vnd.github.v3.raw',
      // See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication
      // Authorization: 'token ${GITHUB_TOKEN}',
    },
  })
  const fooBar = await res.json()

  return fooBar
}
```

这个域名目前在国内访问通畅，但是需要额外的 `headers`，且未验证的客户端每小时有 60 次请求限制。

```js
// 3. github.io

`https://<username>.github.io/<repository>/${FILE_PATH}`
```

这种方式就是将 `.json` 文件部署到 GitHub Pages，可访问性和速度都不错，参考 https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages
