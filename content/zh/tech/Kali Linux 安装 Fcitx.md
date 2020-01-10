+++
title = "Kali Linux 安装 Fcitx"
date = "2017-10-03T15:11:33+08:00"
tags = ["linux"]
slug = "install-fcitx-in-kali-linux-to-input-chinese"
dropCap = false
+++

![install-fcitx-in-kali-linux-to-input-chinese-title.jpg](/images/install-fcitx-in-kali-linux-to-input-chinese-title.jpg "使用 Fcitx 在 Kali Linux 上优雅地输入中文")

## 安装

```s
root@kali:~# apt-get update
root@kali:~# apt-get install fcitx fcitx-googlepinyin
```

## 配置

1）鼠标右键点击托盘键盘图标，选择 Configure[^1]。

2）点击左下角的加号，找到最后一项，选中 Google Pinyin，确定。

3）更多配置可以自己尝试，或者查看 [Arch Wiki](https://wiki.archlinux.org/index.php/Fcitx)。

## 美化

鼠标右键点击托盘键盘图标，鼠标移到 skin，可以看到自带三种皮肤：default、classic、dark。个人觉得就 dark 还看得过去，特别是 Kali 默认的暗色主题，用 dark 很合适。当然，如果你把 GNOME 主题换成了雪白雪白的，那么 dark 估计就不行了，咋整呢？

### solution 1

安装 GNOME Shell 插件[^2]，[Input Method Panel](https://extensions.gnome.org/extension/261/kimpanel/)，插件安装方法见[这篇文章](/tech/how-to-install-gnome-shell-extensions/)。

效果超赞的，直接和主题相配。

### solution 2

博主 Google 到 GitHub 一个漂亮的 [Material Design](https://material.io/) 风格的皮肤，首先[下载](https://github.com/ootaharuki99/fcitx-skin-material)，然后将 material 文件夹移动到 `/usr/share/fcitx/skin/` 目录下，托盘图标右键 skin 即可换皮肤。

1）托盘的图标太亮。将 `/usr/share/fcitx/skin/classic/` 目录下的 active.png 和 inactive.png 复制到 `/usr/share/fcitx/skin/material/` 目录，替换即可。

2）字体太大、输入英文时颜色不好分辨。修改文件：

```c
// 文件位置：/usr/share/fcitx/skin/material/fcitx_skin.conf

FontSize=11
MenuFontSize=10
TipColor=220 220 220
InputColor=170 170 170
```

### solution 3

要是你还是觉得不行，有能力可以[自己制作皮肤](https://forum.suse.org.cn/viewtopic.php?f=16&t=731)😂～

## 未解决问题

[Wine QQ](https://phpcj.org/wineqq/) 无法输入中文，暂时未解决，三个提示：

1. 在其它窗口输入，然后复制粘贴。
2. 可能有用的[解决方法](https://wiki.archlinux.org/index.php/Tencent_QQ)。
3. 直接 `cd` 到相应目录下，命令行 `wine` 启动，查看报错信息。

---

[^1]: 图文教程：<https://www.zhihu.com/question/53215310/answer/209703807>
[^2]: 浏览官网发现的：<https://fcitx-im.org/wiki/Fcitx>
