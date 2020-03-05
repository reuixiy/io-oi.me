+++
title = "简单实现 Google Fonts 的异步加载"
date = "2020-03-05T21:22:26+08:00"
tags = ["web", "typography"]
slug = "loading-google-fonts-async"
+++

在 Web 中，中文一般是不推荐使用网络字体的——因为汉字庞大的字符数让中文网络字体的体积异常庞大。但是，如果你经常浏览国外的英文网站，你会发现——使用了网络字体的网页是真的很美！所以，为何中文网页不能一样美呢？

技术进步带来的字体子集化和用户网络带宽的普遍提升，中文网页其实已经可以开始尝试网络字体了。不知你是否注意到，[苹果的中文官网](https://www.apple.com.cn/)其实就已经在使用中文网络字体了。就在昨天[^1]，[Google Fonts](https://fonts.google.com/) 推出了全新的设计，以庆祝其 10 岁的生日，而其中一个重要的新亮点，就是添加了可变字体（Variable Fonts）的支持。

所以，中文网络字体的普及是刻不容缓的。这需要字体设计师的努力，也需要网页开发者的努力。作为开发者，尝试使用网络字体其实也是我们的一个职责——*Making the Web Beautiful!*

---

[^2]![google-fonts-optimization-comparison.png](/images/google-fonts-optimization-comparison.png "前后对比")

```html
- <link rel="stylesheet" href="style.css">
+ <link rel="stylesheet" href="style.css" media="print" onload="this.media='all'">
```

参考：

1. [Defer non-critical CSS | web.dev](https://web.dev/defer-non-critical-css/)
2. [Can I use `<link rel="preload">`?](https://caniuse.com/#feat=link-rel-preload)
3. [loadCSS | GitHub](https://github.com/filamentgroup/loadCSS)
4. [How to load CSS Asynchronously | Stack Overflow](https://stackoverflow.com/a/46750893/8889158)
5. [The Simplest Way to Load CSS Asynchronously | Filament Group, Inc.](https://www.filamentgroup.com/lab/load-css-simpler/)

---

[^1]: https://twitter.com/googlefonts/status/1234967000193150978
[^2]: 测试前需要前往 Network 将 `Disable cache` 勾选。
