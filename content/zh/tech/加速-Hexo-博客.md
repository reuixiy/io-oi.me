+++
title = "加速 Hexo 博客"
date = "2018-05-30T13:10:50+08:00"
tags = ["hexo"]
slug = "speed-up-hexo"
+++

![speed-up-hexo.png](/images/speed-up-hexo.png)

尝试在博客利用 [InstantClick](https://github.com/dieulot/instantclick/) 和 Hexo 的两个插件 [hexo-service-worker](https://github.com/zoumiaojiang/hexo-service-worker)、[hexo-filter-optimize](https://github.com/theme-next/hexo-filter-optimize) 让博客快如闪电⚡。

## InstantClick

介绍请看官网，先下载我修改后的 [instantclick.js](https://yixiuer.me/instantclick.js)（浏览器右键保存为），再放到`~/blog/themes/next/source/js/src/`下，然后添加代码：

```diff 文件位置：~/blog/themes/next/layout/_layout.swig
+ <script type="text/javascript" src="/js/src/instantclick.js" data-no-instant></script>
+ <script data-no-instant>InstantClick.init();</script>
</body>
</html>
```

可能会有一些问题，比如与 FancyBox、Google Analytics 等等的兼容问题，解决方法自行查看官网的文档或 Google。

## Hexo 插件

先在站点文件夹根目录安装：

```[] 所在目录：~/blog/
$ npm install hexo-service-worker hexo-filter-optimize --save
```

然后在站点配置文件中配置：

```yml 文件位置：~/blog/_config.yml
# offline config passed to sw-precache.
service_worker:
  maximumFileSizeToCacheInBytes: 5242880
  staticFileGlobs:
  - public/instantclick.js
  - public/fonts/chinese-zodiac.woff2
  - public/about/index.html
  - public/life/*
  - public/tech/*
  - public/favicon.ico
  - public/manifest.json
  stripPrefix: public
  verbose: false
  runtimeCaching:
    - urlPattern: /**/*
      handler: cacheFirst
      options:
        origin: io-oi.me

filter_optimize:
  enable: true
  # remove static resource query string
  #   - like `?v=1.0.0`
  remove_query_string: true
  # remove the surrounding comments in each of the bundled files
  remove_comments: true
  css:
    enable: true
    # bundle loaded css file into the one
    bundle: true
    # use a script block to load css elements dynamically
    delivery: true
    # make specific css content inline into the html page
    #   - only support the full path
    #   - default is ['css/main.css']
    inlines:
    excludes:
  js:
    # bundle loaded js file into the one
    bundle: true
    excludes:
  # set the priority of this plugin,
  # lower means it will be executed first, default is 10
  priority: 12
```

1）`staticFileGlobs`是首次加载时主动缓存的文件，我给出的只适合我的博客，请自行修改。怎么修改呢？`hexo g`之后去`~/blog/public/`目录下查看生成的文件，需要主动缓存则加上。当然，建议**不要**将博客的首页`public/index.html`加上去，这样如果以后想去除或想更新为 [Workbox](https://developers.google.com/web/tools/workbox/) 才有可能，否则已访问过你的网站的用户可能永远都无法更新，除非他手动清除浏览器的缓存。需注意的是，如果不加上首页，可能会导致无法离线访问。

2）`origin`修改为你的博客域名，更多说明请查看 GitHub 上的 README。

3）要使用 Service Worker 博客必须 HTTPS。

···

最后，`deploy`到 GitHub 上查看效果，Enjoy it! ☕
