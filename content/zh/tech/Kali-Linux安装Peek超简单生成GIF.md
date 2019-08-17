+++
title = "Kali Linux 安装 Peek 超简单生成 GIF"
date = "2017-11-05T00:47:32+08:00"
tags = ["linux"]
slug = "simple-gif-recorder-in-linux"
+++

![simple-gif-recorder-in-linux-title.gif](/images/simple-gif-recorder-in-linux-title.gif)

有时候想要将屏幕上的某一区域的操作录制下来，但需要的不是视频而是 GIF，这时怎么办呢？使用 [Peek](https://github.com/phw/peek)。

由于 Kali 是基于 Debian 的，因此按照 README 中 Debian 的方法，首先安装依赖：

```
root@kali:~# apt-get install cmake valac libgtk-3-dev libkeybinder-3.0-dev libxml2-utils gettext txt2man
```

再编译包：

```
root@kali:~# git clone https://github.com/phw/peek.git
root@kali:~# mkdir peek/build
root@kali:~# cd peek/build
root@kali:~# cmake -DCMAKE_INSTALL_PREFIX=/usr -DGSETTINGS_COMPILE=OFF ..
root@kali:~# make package
```

最后安装包：

```
root@kali:~# dpkg -i peek-x.y.z-Linux.deb
```
