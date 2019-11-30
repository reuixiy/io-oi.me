+++
title = "记一次 sed 悲剧"
tags = ["linux"]
date = "2018-06-20T15:23:46+08:00"
slug = "a-tragedy-due-to-sed"
+++

![sed.png](/images/sed.png)

今天，一个 Linux 命令失误让我失去了博客的所有 Markdown 文档。很坑的命令，一共 77 篇 Markdown 文档，里面的内容全部变为了 `omments: true`，现在慢慢将这 77 篇从 HTML 页面敲成 Markdown 文档，估计大家看到这篇文章的时候，已经是一个月之后了……

为什么说这个命令坑呢？因为一般的 Linux 命令 `-字母` 表示某种功能选项，而 `" "` 或 `' '` 是文件名或者路径，而这个 `sed` 就不是这样了😶...

先来看看常见的 `ls`：

```txt
NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...
```

再看看 `sed`：

```txt
NAME
       sed - stream editor for filtering and transforming text

SYNOPSIS
       sed [OPTION]... {script-only-if-no-other-script} [input-file]...
```

发现了不同吧……我自以为 `i` 是 `insert` 的缩写，而插入嘛，肯定是从第一行开始呗（自以为），结果命令一敲回车，反应很快（高效的 `sed`），所以也没啥不好的感觉……结果一查看文件，真是个令人窒息的操作😶...

![sed-1.png](/images/sed-1.png "输入的命令")

![sed-2.png](/images/sed-2.png "得到的结果")

为什么插入的结果是 `omments: true` 呢？首字母 `c` 去哪了？首先，通过上面 Manual 中的内容我们知道 `" "` 里面的不是要插入的内容，而是操作脚本，那我再看看 Manual 中 `c` 的描述：

```txt
c \

text   Replace the selected lines with text, which has each embedded newline preceded by a backslash.
```

一大行，关键字 `Replace`，其它什么参数我都没加，为什么就将全部行替换了😨... 好吧，说到底还是我 Linux 知识不过关😭...
