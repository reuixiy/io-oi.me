+++
title = "如何安装 GNOME Shell 插件？"
date = "2017-10-02T19:38:39+08:00"
tags = ["linux"]
slug = "how-to-install-gnome-shell-extensions"
+++

![how-to-install-gnome-shell-extensions-title.jpg](/images/how-to-install-gnome-shell-extensions-title.jpg "我的桌面截图")

感谢开源，让 Linux 下有了 GNOME 桌面环境，感谢开源，有了许多「外挂」似的 GNOME Shell 插件，开起后效果绝对秒杀 Windows！问题是：怎么安装 [GNOME Shell Extensions](https://extensions.gnome.org/) 呢？

## 源码包安装（推荐）

这种安装方式的好处就是可以获取到插件的最新版本。要怎么操作呢？直接 `git clone` 其源码，然后按照 README 中的说明自己编译安装，大部分直接 `make install` 即可，少部分可能要自己手动操作一下，详见各自的 README。

## 浏览器插件安装

最好用 Firefox，我在 Chrome 下测试没用。打开 GNOME Shell Extensions 网站，会有个提示啥允许好像，然后 `Allow` 即可，刷新页面即可安装。

## 下载安装包安装

直接去 GNOME Shell Extensions 的网站上下载安装包，然后解压缩，重命名（删除邮箱后面的字符）后复制到目录 `~/.local/share/gnome-shell/extensions/` 下，然后 alt + f2 重启 GNOME，再打开 Tweaks，应该就能在 Extensions 上看到。

## apt-get 方式

```
apt-get update
apt-cache search gnome-shell-extension
apt-get install gnome-shell-extension-插件名
```

不过只能搜到少部分，另还可以安装下面这个包，里面有一些插件：

```
apt-get install gnome-shell-extensions
```

安装好后，点击按钮打开即可，如果有设置按钮，可以设置，并且如果有错误则会显示报错信息。

## 安利几个插件

名字 | 功能 | 说明
:---:|:---:|:---:
[Redshift](https://extensions.gnome.org/extension/685/redshift/) | 护眼模式 | 安装配置方法见这篇[文章](/tech/configure-redshift-in-linux/)
[Topicons plus](https://extensions.gnome.org/extension/1031/topicons/) | 将左下脚的托盘图标放在顶栏 | *
[Simple net speed](https://extensions.gnome.org/extension/1085/simple-net-speed/) | 顶栏实时网速显示 | *
[Openweather](https://extensions.gnome.org/extension/750/openweather/) | 顶栏显示天气 | *
[EasyScreenCast](https://extensions.gnome.org/extension/690/easyscreencast/) | 录屏 | *
[Coverflow alt-tab](https://extensions.gnome.org/extension/97/coverflow-alt-tab/) | 效果超赞的 alt-tab 切换效果 | *
[Dash to Dock](https://extensions.gnome.org/extension/307/dash-to-dock/) | 自己试试，突然无法表达😂 | *
[Workspaces to Dock](https://extensions.gnome.org/extension/427/workspaces-to-dock/) | 自定义工作区 | *
[Blyr](https://extensions.gnome.org/extension/1251/blyr/) | 毛玻璃效果 | *
[Proxy Switcher](https://extensions.gnome.org/extension/771/proxy-switcher/) | 快速切换系统代理 | 科学上网时有用
