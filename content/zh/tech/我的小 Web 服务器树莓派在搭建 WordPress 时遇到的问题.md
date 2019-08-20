+++
title = "我的小 Web 服务器树莓派在搭建 WordPress 时遇到的问题"
date = "2017-02-02T11:54:42+08:00"
tags = ["raspberry-pi"]
slug = "raspberry-pi-wordpress-blog-questions"
+++

![raspberry-pi-server.jpg](/images/raspberry-pi-server.jpg "树莓派")

宝宝只想用树莓派搭建个人博客玩玩啊，特么为啥如此麻烦？虽然遇到的问题，百度，Google，最后还是解决了😄～现将问题收集如下，希望对看到的人有用。我用树莓派搭建的网站的架构：Linux (Raspbian) + Nginx + MySQL + PHP + WordPress。

---

1）未能找到 WordPress 内容目录

找到 WordPress 的根目录，找到 `wp-config.php` 文件，在文件最后添加如下代码：

```php
/** Override default file permissions */
if(is_admin()) {
    add_filter('filesystem_method', create_function('$a', 'return "direct";' ));
    define( 'FS_CHMOD_DIR', 0751 );
}
```

2）WordPress 需要访问您网页服务器的权限，请输入您的 FTP 登录凭据以继续

在 `wp-config.php` 文件中添加：

```php
define("FS_METHOD","direct");
define("FS_CHMOD_DIR", 0777);
define("FS_CHMOD_FILE", 0777);
```

3）安装主题失败，无法创建目录

```s
$ sudo chmod -R 777 /var/www/html/
```

4）在 WordPress 中使用裁剪图片功能时，出现：「在裁剪您的图像时发生了错误。」

```s
$ sudo apt-get update
$ sudo apt-get install php5-gd
```

5）删除自豪的使用 WordPress

编辑：

```
wp-content/themes/twentyseventeen/template-parts/footer/site-info.php
```

6）上传文件失败，提示一个 http 错误

https://www.luozhengrong.com/servers/nginx/234.html

7）WordPress 如何去除 Google 字体？

https://www.zhihu.com/question/24762608?sort=created

8）WordPress 建站中 15 个常见的错误（启用缓存插件）

https://www.wpdaxue.com/wp-15-common-mistakes.html

---

这里教你一个秘诀：善用 Google，有些东西还真是百度半天一脸懵逼，Google 一下瞬间解决，为啥？

1. Google 能搜到比较新的个人博客的页面
2. Google 不卖药🙃

技术嘛，很多东东都有人玩过了，很多玩过了的大佬都会写自己的教程，放在自己的博客上。能自己写博客，质量要好点，还有些比较新的东东，大佬的博客不会让你失望。
