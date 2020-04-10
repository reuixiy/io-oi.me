+++
title = "Linux 变 macOS"
date = "2017-10-03T15:05:22+08:00"
tags = ["linux"]
slug = "make-linux-looks-like-macos"
+++

![make-linux-looks-like-macos-title.jpg](/images/make-linux-looks-like-macos-title.jpg)

苹果的产品对美都有极致追求，macOS 更是如此，但作为一个喜欢 Linux 开源之美，又喜欢苹果之美，且还是个..屌丝..的我，怎么把 Linux 变 macOS？

## 视频预览

<video src="QmX4oWx1HhpXvx1ToPZvRB2Dua9dFJcXkjS9QScxXkDDvR"></video>

## 题外话

折腾的原因呢，安装的网易云音乐，有一些歌曲不能播放，很怪，于是 Google 了一大堆，说要安装 gstreamer，于是安装了一大堆 gstreamer 相关的包。

但是，发现~~问题还是没有解决啊~~（已解决，安装新版，[参考](/tech/lyrics-messy-code-after-dist-upgrade/)），于是卸载呗……突然想起[百度经验](http://jingyan.baidu.com/article/6181c3e0bb9f7e152ff15361.html)上面的 apt-get 介绍，有个强力推荐，于是 `apt-get autoremove gstreamer* --purge` 卸载呗……卸载了好久啊，想起了之前 [rm 的悲剧](/tech/rebuild-this-blog-due-to-rm/)，然后真的又悲剧了😭😭😭... 产生了三个悲剧：

1. 导致 EasyScreenCast 没用
2. 导致文件浏览器（Nautilus）无法自动显示图片略缩图（thumbnails）
3. 悲剧它自己😣

首先第一个悲剧，EasyScreenCast 在 Tweaks 那显示 `Error`，提到什么 `Required Gst`，无奈只好 Google 这个插件，找到 GitHub 页面，看到依赖 gstreamer，恍然大悟，赶紧 `apt-get install gstreamer*` 安装，最后终于解决。

然后第二个悲剧，~~至今还没解决，只有安装 gThumb，点击一个文件夹的图片，然后会自动生成当前文件夹的 thumbnails，再重新加载文件夹，便能显示~~。已解决，`apt-cache search gstreamer`，把相关的包全部安装。

其中，折腾 EasyScreenCast 时，在 [Gnome Exitesions](https://extensions.gnome.org/) 看到很多插件，于是 Google `Top Gnome Exitesions`，点进一个 YouTube 视频，突然发现它的界面好好看啊！然后折腾 Theme 咯，突然想把自己一直 Globe Dark 的 GNOME 界面折腾成 [macOS](https://baike.baidu.com/item/Mac%20OS) 风格，于是……

![lingrenzhixidecaozuo.jpg](/images/lingrenzhixidecaozuo.jpg)

## Theme

进入正题，先把我的 GNOME Shell 版本贴出来：

```
root@kali:~# gnome-shell --version
GNOME Shell 3.26.2
```

如果你按下面操作，却达不到预期效果，这时就可以考虑一下这个因素了。如果你的 GNOME Shell 不是这个版本，甚至桌面环境都不是 GNOME，也不要紧，下面的不一定不能安装，可以自己去相关页面查看说明。

首先打开 Tweaks，在 Appearance 里 Themes 下面的 Applications（GTK+） 和 Shell 的主题都可以在 [gnome-look](https://www.gnome-look.org/) 网站上找到，可以找到自己喜欢的下载。

1）GTK+ 主题怎么安装呢？先去下载，然后解压（注意文件夹）放到 `/usr/share/themes/` 下，或者 `~/.themes/`（没有自己创建，且要安装 GNOME Shell 插件 [User Themes](https://extensions.gnome.org/extension/19/user-themes/)）下即可。

2）新加个 Theme，要关闭 Tweaks 再打开才能看到新加的，如果切换后没有效果，重启 GNOME，Alt + F2，输入 `r` 回车。

3）Shell 主题怎么安装呢？把下载来的里面包含 gnome-shell 的文件夹复制到上面所说的两个目录中的任意一个即可。另，GNOME Shell 插件安装方法见[这篇文章](/tech/how-to-install-gnome-shell-extensions/)。

### GTK+ & Shell Theme

下面的三个主题既有 GTK+ 又有 Shell 的主题，另：有 GitHub 地址，且会用 GitHub 的，尽量去相应目录直接 `git clone`，这样以后更新就可以直接 `git pull` 啦～

- Mc-OS-themes  
https://www.gnome-look.org/p/1241688/  
https://github.com/paullinuxthemer/Mc-OS-themes

- X-Arc-Collection  
https://www.gnome-look.org/p/1167049/  
https://gitlab.com/LinxGem33/X-Arc-White

- macOS themes  
https://www.gnome-look.org/p/1013490/  
https://github.com/B00merang-Project/macOS-Sierra

首先对于 Mc-OS-themes，把 McOS-YS-light-menus---2-themes.tar.xz、McOS-Shell-themes.tar.xz、Extra 1.3.tar.xz（里面有字体和壁纸）都下载，然后将 McOS-YS-light-menus---2-themes.tar.xz 解压的文件夹里面的 Gnome-Mc-OS-YS-light-menu-(transparent) 复制到上面所说的两个目录中的任意一个即可。

然后对于 X-Arc-Collection，下载 X-Arc-White-v1.4.5.zip，当然这是我现在看到的最新版，如果有新版就下载新版，如果你喜欢其它色调就下载其它色调，其它主题也一样😃～

此外，有些主题需要安装字体，把字体文件复制到 `/usr/share/fonts/truetype/` 或者 `~/.fonts/`（没有自己创建）下，然后 `fc-cache -f -v` 即可。字体的高级设置查看[这篇文章](/tech/hello-arch-linux/#安装字体)。

### Shell Theme

这个只是 Shell 的主题，没有 GTK+ 的，注意要想在 Tweaks 里面显示，必须将 gnome-shell 文件夹放到一个 GTK+ 主题的文件夹（在正确目录）的根目录下。

- Human  
https://www.gnome-look.org/p/1171095/

### Icons

下载 Date 最新的，别只看大小，因为压缩方式可能不同😜～

- Papirus  
https://www.gnome-look.org/p/1166289/  
https://github.com/PapirusDevelopmentTeam/papirus-icon-theme

- Shadow  
https://www.gnome-look.org/p/1012532/  
https://github.com/rudrab/Shadow

- La Capitaine  
https://www.gnome-look.org/p/1148695/  
https://github.com/keeferrourke/la-capitaine-icon-theme

- macOS  
https://www.gnome-look.org/p/1102582/

- Arc-X-Icons  
https://gitlab.com/LinxGem33/Arc-X-Icons

图标安装，直接将下载解压的文件夹放到 `/usr/share/icons/` 或 `~/.icons/`（没有自己创建）即可，另外也可以用页面上的 OCS-Store 安装，先按照[这个页面](https://www.linux-apps.com/p/1175480/)的提示安装这个软件，然后就可以在里面直接安装，OCS-Store 会默认安装到 `~/.local/share/icons/` 目录下。OCS-Store 是啥玩意？gnome-look 网站页面左上方有个叫 Opendesktop 的东东，看起来像是个强大的组织🙃～当然，有 GitHub 页面的，可以直接到相应目录，然后 `git clone`，以后更新起来比较简单。

### Terminal

https://github.com/Mayccoll/Gogh

### GDM 登录界面

GDM 登录界面只有通过替换 `/usr/share/gnome-shell/` 下的 gnome-shell-theme.gresource 文件实现更改（替换前务必先备份原文件），壁纸自定义可以通过[这种方法](https://wiki.archlinux.org/index.php/GDM)自己重新生成 gnome-shell-theme.gresource 实现，其它元素自定义困难。需要注意的是：这里的登录界面不是锁屏后的登录界面，锁屏后的登录界面壁纸可以在 Tweaks 中直接自定义。

建议直接 Google 搜索 gnome-shell-theme.gresource，找一个提供这一文件并且合自己口味 GTK+ 主题，比如 [Flat-Plat](https://github.com/nana-4/Flat-Plat)（下载后，先执行脚本安装主题，然后才会生成这个文件，再去 `/usr/share/themes/Flat-Plat/gnome-shell/` 下找这个文件），[X-Arc-White](https://gitlab.com/LinxGem33/X-Arc-White/blob/master/gnome-shell/gnome-shell-theme.gresource)（直接下载），然后将文件放到上文所提到的目录即可，壁纸可按上面链接中的方法自定义。

### 我的配置

类型 | 主题
:---:|:---:
GTK+ | Gnome-Mc-OS-YS-light-menu-(transparent)
Icons | Shadow
Shell Theme | X-Arc-White
GDM | X-Arc-White
Terminal | Gogh Aci

为啥 `GTK+` 用 Mc-OS-themes？附上页面上该作者的吐槽：

{{< quote en >}}

*This is a gnome-desktop-interpretation of Mac OSX. I’ve tried to implement the feel of OSX on the gnome-applications. In version 3.0 I’ve modernized it in every little detail. There is nothing (not a single item) that is not new. Resulting in a completely rewritten GTK.CSS-file four times bigger than the previous one, while the theme feels more responsive. I’ve also added a dark theme, so Terminal, Photo’s, and videos’s are automatically dark-themed. I’ve spend a great deal of time (3 months) and effort on this theme into fine-tuning it, so I hope you try before you judge!*

{{< /quote >}}

的确，这厮用了三个月，界面效果确与其它两个不同，自己对比一下其它两个即能感受出。正如作者所言，细节真的很棒，比如渐变！但是，Mc-OS-themes 自带的 Shell Theme 不咋地，所以我用了 OSX Arc White 的，没话说，就是赞！

1）`Icons` 我用的 Shadow，感觉很喜欢这个风格，虽然有些不太好辨认，但是很合我口味😁～

2）`Terminal` 用的 Gogh 的 Aci，然后自己再在 Performance > Profiles > Aci > Edit 自定义了一下。

3）`GDM` 用的 OSX Arc White 自带的（将 X-Arc-White/gnome-shell/gnome-shell-theme.gresource 复制到 /usr/share/gnome-shell/ 下，替换原来的，替换前记得先备份），与 Shell Theme 保持一致吧。

### “bugs”

类型 | 问题
:---:|:---:
Dash to Dock | 最右端（屏幕最右）有黑边，鼠标过去可以发现。

1）设置中 Customize opacity 改为 Fixed，并将下方的 Opacity 调为 0%；  
2）设置中关闭 Shrink the dash，或编辑文件：

```diff
/* 文件位置：/usr/share/gnome-shell/extensions/dash-to-dock@micxgx.gmail.com/stylesheet.css */

/* Shrink the dash by reducing padding and border radius */
#dashtodockContainer.shrink #dash,
#dashtodockContainer.dashtodock #dash {
-    border:1px;
+    border:0px;
    padding:0px;
}
```

## 细节呐

> 折腾不息！
>
> ——强迫症患者

### 顶栏 GNOME 图标顺序

安装了几个插件，将左下脚的托盘（Tray）图标弄上顶栏（Top bar），发现网速显示的插件左边空白太大😕，于是折腾，将它显示在右半部分的最左边。[^1]本来是可以直接更改 Simple net speed 插件的，但是它的代码看不懂，无奈只好从它左边的两个插件（Openweather，EasyScreenCast）入手。

已安装插件 | 插件的功能
:---:|:---:
Topicons plus | 将左下脚的托盘图标放在顶栏
Simple net speed | 顶栏实时网速显示
Openweather | 顶栏显示天气
EasyScreenCast | 录屏

首先文件位置取决于你安装插件的方式：

1. apt-get 方式安装的在 `/usr/share/gnome-shell/extensions/`
2. Firefox 网页安装的在 `~/.local/share/gnome-shell/extensions/`

1）修改 Openweather 插件，Ctrl + F 搜索 `WeatherPosition.RIGHT`，搜到三处，改两处：

```js
// 文件位置：/usr/share/gnome-shell/extensions/openweather-extension@jenslody.de/extensions.js

Main.panel._rightBox.insert_child_at_index(this.actor, 2);
```

2）修改 EasyScreenCast 插件，文件最后面，找到这行，添加内容：

```js
// 文件位置：/usr/share/gnome-shell/extensions/EasyScreenCast@iacopodeenosee.gmail.com/extensions.js

Main.panel.addToStatusArea('EasyScreenCast-indicator', Indicator, 1);
```

数字依情况而定，可以更改后，Alt + F2 输入 r 回车重启 GNOME 调试。另外，可能还需在 Tweaks 的 Extensions 里更改 Topicons plus 插件的 Tray offset 的值。

### Fcitx 输入法皮肤

直接查看 [Kali Linux 安装 Fcitx](/tech/install-fcitx-in-kali-linux-to-input-chinese/)。

٩(•̤̀ᵕ•̤́)ᵒᵏᵎᵎᵎᵎ～

最后，标题就是骗你的 2333...

---

[^1]: https://askubuntu.com/questions/453969/how-can-i-order-gnome3-shell-extensions-at-the-top
