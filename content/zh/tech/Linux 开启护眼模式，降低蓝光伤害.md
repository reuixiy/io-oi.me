+++
title = "Linux 开启护眼模式，降低蓝光伤害"
date = "2017-10-02T17:45:47+08:00"
tags = ["linux"]
slug = "configure-redshift-in-linux"
dropCap = false
+++

![configure-redshift-in-linux-title.jpg](/images/configure-redshift-in-linux-title.jpg "Redshift")

## 前言

现在几乎每部手机都有护眼模式了，减少[蓝光](https://www.zhihu.com/question/29440984)，保护眼睛，人人有则，233333～现在 Windows 系统也自带了这样的功能，当然还有个大名鼎鼎的软件——[f.lux](https://justgetflux.com/)，Windows 下很好用，不过 Linux 下我没试过，因为我用了 [Redshift](https://github.com/jonls/redshift)。

## 安装

首先更新包信息：

```sh
root@kali:~# apt-get update
```

然后查找相关包：

```sh
root@kali:~# apt-cache search redshift
awscli - Universal Command Line Environment for AWS
gnome-shell-extension-redshift - redshift extension for GNOME Shell
gtk-redshift - transitional dummy package
plasma-applet-redshift-control - Adjusts the color temperature of your screen
redshift - Adjusts the color temperature of your screen
redshift-gtk - Adjusts the color temperature of your screen with GTK+ integration
sct - Set screen color temperature
```

要图形界面，安装 `redshift-gtk` 即可：

```sh
root@kali:~# apt-get install redshift-gtk
```

如果没有其它依赖的话，应该会安装 `redshift-gtk` 和 `redshift` 两个包。

## 配置

图形界面的配置就不说了，要开机自启，在托盘（tray）图标鼠标右键，设置开机启动即可。如果报错，可能是默认要系统开启 `Location`，在 Setting > Privacy > Location Services 这设置 `on` 开启即可。

当然，如果你不想这样，可以换一种模式，自己输入经纬，百度一下经纬，按格式（见下文）填入即可。或者自己写个配置文件手动配置，首先在目录 `~/.config/` 下新建文件 `redshift.conf`，然后写入：[^1]

```conf
[redshift]
location-provider=manual
temp-day=5500
temp-night=3700

[manual]
lat=39.90
lon=116.38
```

怎么写，可以输入命令查询：

```sh
root@kali:~# redshift -l manual:help
Specify location manually.

  lat=N		Latitude
  lon=N		Longitude

Both values are expected to be floating point numbers,
negative values representing west / south, respectively.
```

lat 就是经度，lon 是纬度，必须是浮点值，西经和南纬是负数。比如北京天安门广场，百度到：北纬 39°54′，东经 116°23′。一度（°）被分为 60 角分（′），换算一下：39 + 54 / 60 = 39.90，116 + 23 / 60 ≈ 116.38。[^2]

## GNOME Shell 插件

在 User Menu 会出来一个开关按钮：

![configure-redshift-in-linux-2.jpg](/images/configure-redshift-in-linux-2.jpg)

可以在 Tweaks 直接配置：

![configure-redshift-in-linux-3.jpg](/images/configure-redshift-in-linux-3.jpg)

挺方便的，插件地址：<https://extensions.gnome.org/extension/685/redshift/>

如果安装了redshift-gtk，建议先卸载再安装这个插件。上面查询到有 `gnome-shell-extension-redshift` 这个包，故直接 apt-get 安装：

```sh
root@kali:~# apt-get install gnome-shell-extension-redshift
```

然后打开 Tweak Tool 开启即可，如果显示 `error`，可能是由于未安装 `redshift` 这个包导致的，安装一下即可：

```sh
root@kali:~# apt-get install redshift
```

如果你想安装最新版插件按照方法可以参考[这篇文章](/tech/how-to-install-gnome-shell-extensions/)，另亲测 Kali Linux 下，不是 `apt-get` 方式安装的，按钮开关可能失效。

![configure-redshift-in-linux-4.jpg](/images/configure-redshift-in-linux-4.jpg)

最后，GNOME 好像已经内置了类似的功能😂（上图），在 Setting > Displays > Night Light。

---

[^1]: 参考：<https://wiki.archlinux.org/index.php/redshift#Configuration>
[^2]: 参考：<http://www.cnblogs.com/qumao5736/archive/2012/03/10/2389287.html>
