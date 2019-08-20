+++
title = "Linux + Windows 双系统，GRUB 突然不见了？！"
date = "2017-11-04T10:19:40+08:00"
tags = ["linux"]
slug = "how-to-reinstall-grub"
+++

![how-to-reinstall-grub-title.jpg](/images/how-to-reinstall-grub-title.jpg)

电脑一次睡眠未醒死机，强制重启后，长时间的等待给了我一种不好的预感。果然，发现没了熟悉的 GRUB 界面，反而直接进 Win10，进 BIOS 一看，发现没有 GRUB 的启动项了😱...

## 故障描述

首先贴出环境，电脑的引导是 UEFI + GPT，系统是 Kali Liunx + Windows 10。Linux 下笔记本电脑盖上后睡眠，有时候会「醒不来」，打开后电脑 CPU 风扇狂转，只有长按电源键强制断电。前些天又是这样，长按断电关机重启后，一段长时间的等待给了我一种不好的预感，然后发现 GRUB 界面没了，开机直接进 Windows 10，进 BIOS 发现 GRUB 的启动项没了😭...

## 原因分析

一开始赶紧拿起手机打开 Google，emmm... 输入什么关键字好呢？大脑一片空白，想着 BIOS 里的 GRUB 的启动项没了，那就恢复一下呗，就和恢复 Windows 的启动项一样。但是行动后，发现常用来帮别人重装系统的 U 盘——[微 PE](http://www.wepe.com.cn/) 的 WinPE 中的工具好像没办法，它只能恢复 Windows 的启动项。

行动受挫后才突然开窍，开机后的操作系统启动管理器是 Linux 下的 GRUB，进 Windows 也是通过 GRUB，应该要在 Linux 环境下重建 GRUB，而不是通过 WinPE 下修复 Windows 的工具。于是 Google `重建 GRUB U 盘`，期间阅读分析搜索的结果，多次修改关键字，最后终于搜到有用的文章，并将问题顺利解决😃。

Google 到的有用文章：

1. [重新安装 grub-efi](https://zhiwei.li/text/2016/01/05/重新安装grub-efi/)
2. [How to Repair, Restore, or Reinstall GRUB 2 with a Ubuntu Live CD or USB](http://howtoubuntu.org/how-to-repair-restore-reinstall-grub-2-with-a-ubuntu-live-cd)

看了第一篇文章中博主的分析，分析下我的原因：强制断电导致 BIOS 损坏，于是开机后主板自动从备份 BIOS 里恢复，EFI 启动记录就丢失，然后 GRUB 就消失了。

## 修复故障

1）准备 U 盘

先默默去 Windows 下载 Kali Linux，通过 [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) 写进另一个 U 盘，然后重启狂按 ESC 启动 U 盘，进 Kali Live 系统。

2）挂载硬盘

因为用的是 U 盘中的系统，所以要先挂载电脑的硬盘到当前系统，先 `lsblk` 查看硬盘，再 `fdisk -l /dev/sda` 查看硬盘分区，最后挂载 Linux 系统的根分区，比如我的硬盘是 `sda`，Linux 系统的根分区是 `sda6`，则：

```
mount /dev/sda6 /mnt
```

Now bind the directories that grub needs access to to detect other operating systems, like so.

```
mount --bind /dev /mnt/dev
mount --bind /dev/pts /mnt/dev/pts
mount --bind /proc /mnt/proc
mount --bind /sys /mnt/sys
```

3）安装 GRUB

先用 `chroot` 命令改变程序执行时所参考的根目录位置：

```
chroot /mnt
```

安装 GRUB：

```
grub-install /dev/sda
grub-install --recheck /dev/sda
update-grub
```

退出后重启：

```
exit && reboot
```

开机时按 ESC 应该就可以看到 GRUB 的启动项了，如果不是默认，自己进 BIOS 修改一下启动项顺序就行。
