+++
title = "Hello, World!"
date = "2010-01-01T00:00:00+08:00"
tags = ["hexo"]
description = "for testing something new only"
slug = "hello-world"
dropCap = false
gitinfo = true
aliases = ["/tech/test/"]
+++

![hello-world.jpg](/images/hello-world.jpg)

## video

```html
<video src="https://什么什么什么.mp4" controls></video>
```

<video src="QmeNUnncXEUSmMjrQ3ZKQhmChyh3AfiyKQ3YZXcss686Rq"></video>

[视频来源](http://www.acesheep.com/)，被我用在了 <a href="/404.html" target="_blank" rel="noopener">404</a> 页面。

## image

有说明文字（caption）的图片～

![hexo-next-optimization-title.jpg](/images/hexo-next-optimization-title.jpg "Coldplay")

https://github.com/iissnan/hexo-theme-next/pull/279

## gallery

Front-matter：

```yaml
photos:
- photo_url_1
- photo_url_2
- photo_url_3
- photo_url_4
- photo_url_5
- photo_url_6
```

效果：

![gallery.jpg](/images/gallery.jpg)

## group-pictures

Front-matter：

```yaml
type: picture
```

Usage：

```md
{% gp 4-3 %}
![photo_alt_1](photo_url_1)
![photo_alt_2](photo_url_2)
![photo_alt_3](photo_url_3)
![photo_alt_4](photo_url_4)
{% endgp %}
```

效果：

![group-pictures.jpg](/images/group-pictures.jpg)

https://github.com/iissnan/hexo-theme-next/blob/master/scripts/tags/group-pictures.js

## link

Front-matter：

```yaml
link: url
```

效果：

![link.jpg](/images/link.jpg)

## quote？

阅读主题的源代码发现的：~/blog/themes/next/layout/_macro/post.swig，有没有不确定，用法不确定……

Front-matter：

```yaml
type: quote
```

效果：

![quote.jpg](/images/quote.jpg)
