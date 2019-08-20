+++
title = "为 NexT 添加相关╱热门╱推荐文章"
date = "2018-05-09T15:41:07+08:00"
tags = ["hexo"]
slug = "related-popular-recommended-posts"
dropCap = false
+++

本文主要针对下面两个 Hexo 插件的一些配置难点和个人定制，至于两个插件的安装和基础配置，略去。

插件 | 说明 | 特点
:---:|:---:|:---:
[hexo-related-popular-posts](https://github.com/tea3/hexo-related-popular-posts) | 最新版本已集成，可以在..主题..配置文件 `_config.yml` 中配置。 | 可以利用 Google Analytics API 将高浏览量（热门）的文章按配置比例加入推荐列表。
[hexo-recommended-posts](https://github.com/huiwang/hexo-recommended-posts) | 主题尚未集成，但插件本身支持自动显示，自定义位置请查看 README。 | 可以与其它博客相关联，不限于自己博客。

## note 标签样式

1）hexo-related-popular-posts

编辑文件：

```diff
<!-- 文件位置：~/blog/themes/next/layout/_macro/post-related.swig -->

{% set popular_posts = popular_posts_json(theme.related_posts.params, post) %}
{% if popular_posts.json and popular_posts.json.length > 0 %}
+ <div class="post-body">
+ <div class="note primary">
  <div class="popular-posts-header">{{ theme.related_posts.title | default(__('post.related_posts')) }}</div>
  <ul class="popular-posts">
  {% for popular_post in popular_posts.json %}
    <li class="popular-posts-item">
      {% if popular_post.date and popular_post.date != '' %}
        <div class="popular-posts-date">{{ popular_post.date }}</div>
      {% endif %}
      {% if popular_post.img && popular_post.img != '' %}
        <div class="popular-posts-img"><img src="{{ popular_post.img }}" /></div>
      {% endif %}
      <div class="popular-posts-title"><a href="{{ popular_post.path }}" rel="bookmark">{{ popular_post.title }}</a></div>
      {% if popular_post.excerpt && popular_post.excerpt != '' %}
        <div class="popular-posts-excerpt"><p>{{ popular_post.excerpt }}</p></div>
      {% endif %}
    </li>
  {% endfor %}
  </ul>
+ </div>
+ </div>
{% endif %}
```

2）hexo-recommended-posts

如果你是按照 README 中的[这种方法](https://github.com/iissnan/hexo-theme-next/pull/2054/files)自定义的位置，那么类似：

```diff
<!-- 文件位置：~/blog/themes/next/layout/_macro/recommended_posts.swig -->

+ <div class="post-body">
+ <div class="note primary">
<div class="recommended_posts">
    {% set recommended_posts = recommended_posts(post, site) %}
    {% if recommended_posts.length > 0 %}
    <h1>{{ __('post.recommended_posts') }} </h1>
    <ul>
        {% for link in recommended_posts  %}
            <li><a href="{{ link.permalink }}">{{ link.title }}</a></li>
        {% endfor %}
    </ul>
    {% endif %}
</div>
+ </div>
+ </div>
```

## 热门文章

对于 hexo-related-popular-posts，如何配置 Google Analytics API 呢？前提是你的博客启用了 [Google Analytics](https://analytics.google.com/)，然后按照插件 [Wiki](https://github.com/tea3/hexo-related-popular-posts/wiki/More-Settings#popular-posts) 中的说明，去[这个页面](https://www.npmjs.com/package/ga-analytics)按照步骤去 [Google Developer Console](https://console.developers.google.com/) 启用 Analytics API，然后在凭据那创建一个服务帐号密钥凭据，然后：

![hexo-next-optimization-4.jpg](/images/hexo-next-optimization-4.jpg "下载 .p12 文件")

将 `.p12` 文件转换为 `.pem` 文件（the password is always “notasecret”）：

![hexo-next-optimization-5.jpg](/images/hexo-next-optimization-5.jpg "在 Linux 下输入命令")

并将这个 `.pem` 文件放到..站点..文件夹根目录下，接下来查看一下服务帐号的 ID：

![hexo-next-optimization-6.jpg](/images/hexo-next-optimization-6.jpg "查看入口")

博主不太记得具体流程，不记得要不要先创建服务帐号，所以给一张服务帐号的设置图：

![hexo-next-optimization-7.jpg](/images/hexo-next-optimization-7.jpg "设置入口")

接下来就是配置 Google Analytics，先去 [Google Analytics](https://analytics.google.com/)，点配置，然后：

![hexo-next-optimization-8.jpg](/images/hexo-next-optimization-8.jpg)

添加新用户，注意权限：

![hexo-next-optimization-9.jpg](/images/hexo-next-optimization-9.jpg)

在..站点..配置文件中加入：

```yml
# 文件位置：~/blog/_config.yml

popularPosts:
  googleAnalyticsAPI:
    clientId: analytics-api@notional-arc-190007.iam.gserviceaccount.com
    serviceEmail: analytics-api@notional-arc-190007.iam.gserviceaccount.com
    key: /google-services-private-key.pem
    viewId: 165363044
```

查看 viewId：

![hexo-next-optimization-10.jpg](/images/hexo-next-optimization-10.jpg "入口")

![hexo-next-optimization-11.jpg](/images/hexo-next-optimization-11.jpg)

最后，在..主题..配置文件中配置比例：

```yml
# 文件位置：~/blog/themes/next/_config.yml

maxCount: 5
PPMixingRate: 0.2
```

也就是高浏览量的文章占 5 篇中的 1 篇。

## 将两个插件的特点结合

即，将热门文章与外链推荐结合。如果你是最新的主题，那么参考[这里](https://github.com/theme-next/hexo-theme-next/pull/109/files)，将添加的代码和文件全部删除。再参考[这里](https://github.com/iissnan/hexo-theme-next/pull/2054/files)，将添加的代码和文件全部添加。

然后将下面的内容替换原文件中的内容：

```html
<!-- 文件位置：~/blog/themes/next/layout/_macro/recommended_posts.swig -->

<div class="post-body">
<div class="note primary">
<div class="recommended_posts">
     {% set recommended_posts = recommended_posts(post, site) %}
     <h4 class="recommended">{{ __('post.recommended_posts') }} </h4>
     <ul class="recommended-ul">
         {{ popular_posts( { maxCount: 5 , ulClass: 'popular-posts' , PPMixingRate: 0.4 , isDate: false , isImage: false , isExcerpt: false } , post ) }}
         {% for link in recommended_posts  %}
             <li><a href="{{ link.permalink }}" target="_blank">{{ link.title }}</a></li>
         {% endfor %}
     </ul>
</div>
</div>
</div>
```

再编辑文件：

```diff
// 文件位置：~/blog/node_modules/hexo-related-popular-posts/lib/helper.js

module.exports = ( inPost, inOptions, inHexo ) => {
    const listJson   = require('./list-json.js')
    const lj         = listJson.getList(inOptions, inPost, inHexo)
    let returnHTML   = ''

    let generateHTML = (list) => {
        let ret = ''
        ret += `<li class="${lj.class}-item">`

        if (list.date && list.date != '') {
            ret += `<div class="${lj.class}-date">${list.date}</div>`
        }

        if (list.img && list.img != '') {
            ret += `<div class="${lj.class}-img"><img src="${list.img}" /></div>`
        }
-        ret += `<div class="${lj.class}-title"><h3><a href="${list.path}" title="${list.title}" rel="bookmark">${list.title}</a></h3></div>`
+        ret += `<div class="${lj.class}-title"><a href="${list.path}" rel="bookmark">${list.title}</a></div>`
        if (list.excerpt &&  list.excerpt != '') {
            ret += `<div class="${lj.class}-excerpt"><p>${list.excerpt}</p></div>`
        }

        ret +=  `</li>`
        return ret
    }

    for (let i=0; i < lj.json.length; i++) {
        returnHTML += generateHTML(lj.json[i])
    }

-    if (returnHTML != '') returnHTML = `<ul class="${lj.class}">${returnHTML}</ul>`
+    if (returnHTML != '') returnHTML = `<div>${returnHTML}</div>`

  return returnHTML
}
```

然后往 `custom.styl` 里加入：

```css
/* 文件位置：~/blog/themes/next/source/css/_custom/custom.styl */

/* 自定义的推荐文章样式 */
h4.recommended {
    margin-top: 5px !important;
    border-left: none !important;
    margin-left: 0px !important;
    padding-left: 0px !important;
}
@media (max-width: 767px) {
    .recommended-ul {
        margin-left: -40px;
    }
}
.recommended_posts {
    margin-top: 15px;
}
```

最后贴出我的站点配置文件的相关配置：

```yml
# 文件位置：~/blog/_config.yml

popularPosts:
  googleAnalyticsAPI:
    clientId: analytics-api@notional-arc-190007.iam.gserviceaccount.com
    serviceEmail: analytics-api@notional-arc-190007.iam.gserviceaccount.com
    key: /google-services-private-key.pem
    viewId: 165363044
  cache:
    path: hexo-popular-related-posts-cached.json

recommended_posts:
  server: https://api.truelaurel.com
  timeoutInMillis: 5000
  internalLinks: 1
  externalLinks: 1
  fixedNumber: false
  autoDisplay: false
  excludePattern: [davidfnck.com]
```

当然，有个小 bug，由于 hexo-recommended-posts 的 `internalLinks` 不能为 0，所以最终在由两个插件共同生成的推荐列表中就可能会重复 1 篇文章。
