+++
title = "解决 Win10 下 DNS 问题导致的无法上网"
tags = ["win10"]
date = "2019-06-12T13:35:32+08:00"
slug = "win10-dns-problem"
+++

最近有好几个朋友叫我去帮忙看下他们的电脑，说「上不了网、提示错误、打不开软件」等等，结果我发现都是一样的问题——DNS，我打开手机 Google 一下一会儿就给解决了。虽然我早就不用 Windows 10 了，但预防将来可能还会有朋友遇到这样的问题，于是便写篇文章放博客记录下来，以便不时之需。

[^1]![win10-dns-problem.png](/images/win10-dns-problem.png "DNS_PROBE_POSSIBLE")

关于适配器设置 IP 地址和 DNS 服务器地址的操作这里就不重复了，直接百度 `win10 dns` 找一条看看即可，如果你的设置已经是..自动获得..但问题仍没有解决，那么请看下文。

---

1）以管理员身份运行 CMD

1. 左下角的开始菜单然后鼠标右键
2. 开始菜单搜索 `cmd` 找到「命令提示符」然后鼠标右键
3. 若上面两种方法均不可用，则打开文件浏览器去 C 盘 Windows > System32 搜索 `cmd.exe`，然后鼠标右键

2）分别输入以下命令并回车[^2]

```
> ipconfig /flushdns 
> ipconfig /registerdns 
> ipconfig /release 
> ipconfig /renew
> netsh winsock reset
```

1. 如果无法输入，记得 `shift` 切换到英文输入状态
2. 输入第一条回车后，可按键盘方向键「上」然后修改

3）重启

---

好了！这样应该就解决了！不管是网页打不开 QQ 能打开，还是连 QQ 竟然也打不开，都能解决。再也不用抱着电脑去电脑店，结果被建议重装系统……再也不用担心这样所导致的一切损失和麻烦了！👶

---

[^1]: 原图 Google 自[网络](http://p.ssl.qhimg.com/t015f086bdb5f7e7288.jpg)，经过[这个工具](https://github.com/nagadomi/waifu2x)处理。
[^2]: 参考①：<https://sofree.cc/win10-dns-internet/>  
参考②：<https://blog.csdn.net/weixin_44090160/article/details/85034839>
