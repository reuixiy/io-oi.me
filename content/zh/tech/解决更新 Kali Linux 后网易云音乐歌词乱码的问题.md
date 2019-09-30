+++
title = "解决更新 Kali Linux 后网易云音乐歌词乱码的问题"
date = "2017-09-23T11:20:26+08:00"
tags = ["linux"]
slug = "lyrics-messy-code-after-dist-upgrade"
dropCap = false
+++

![lyrics-messy-code-after-dist-upgrade.jpg](/images/lyrics-messy-code-after-dist-upgrade.jpg)

## 旧方法

前几天 `apt-get dist-upgrade` 一下，然后打开网易云音乐发现歌词和一些项目显示乱码了。据说是 Qt5.9 造成的[^1]，解决方法：

```
wget http://download.qt.io/archive/qt/5.8/5.8.0/qt-opensource-linux-x64-5.8.0.run
chmod +x qt-opensource-linux-x64-5.8.0.run
sudo ./qt-opensource-linux-x64-5.8.0.run
```

然后弹出安装界面，一直默认即可，最后：

```
vim /usr/share/applications/netease-cloud-music.desktop

Exec=env LD_LIBRARY_PATH=/opt/Qt5.8.0/5.8/gcc_64/lib netease-cloud-music %U --no-sandbox
```

## 新方法

安装[新版](https://music.163.com/#/download)，下载 ubuntu16.04（64 位）即可。可能会无法打开，怎么办呢？编辑文件[^2]：

```
vim /usr/share/applications/netease-cloud-music.desktop
```

然后：

```diff
- Exec=netease-cloud-music %U
+ Exec=sudo netease-cloud-music %U
```

٩(•̤̀ᵕ•̤́)ᵒᵏᵎᵎᵎᵎ

---

[^1]: https://bbs.archlinuxcn.org/viewtopic.php?id=5021
[^2]: http://www.kali.org.cn/thread-27612-1-1.html
