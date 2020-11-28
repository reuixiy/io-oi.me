+++
title = "使用 SSH 连接到 GitHub（多帐号）"
date = "2019-10-07T20:19:20+08:00"
tags = ["git"]
slug = "ssh-with-multiple-github-accounts"
gitinfo = true
+++

![github-ssh.png](/images/github-ssh.png "通过 SSH 克隆仓库")

我们克隆 GitHub 上的仓库时，一般是通过默认的 HTTPS 的方式，而非上面这种 SSH 的方式。对于克隆仓库的话，我们使用起来是感受不到这两种方式的差别的。但是，当我们要将本地的改动提交到 GitHub 的时候，使用 SSH 就会比使用 HTTPS 方便很多——我们无需每次输入用户名和密码🐶...

## 单帐号

```s
$ ssh-keygen -t rsa -b 4096 -C "reuixiy@gmail.com"
```

怎样使用 SSH 呢？首先，你需要通过以上命令生成 SSH 密钥对。当然，将上面的邮箱地址改为你自己在 GitHub 上的[邮箱地址](https://github.com/settings/emails)。然后，如果你是第一次生成的话，一路回车即可（口令 passphrase 非必须）。

之后，`cat ~/.ssh/id_rsa.pub` 查看生成的公钥并复制，再去 GitHub 上[设置](https://github.com/settings/keys)一个 New SSH key，标题随便起一个（比如：我的电脑😺），然后粘贴公钥即可。

最后，如果你 `git clone` 或 `git remote add` 的是 HTTPS 的地址[^1]，那么要修改仓库的远程仓库链接地址为 SSH 地址，比如：

```s
~/hugo-theme-meme $ git remote set-url origin git@github.com:reuixiy/hugo-theme-meme.git
```

此外，当你本地第一次连接 GitHub 的服务器时，可能会有警告信息，输入 `yes` 回车即可。

## 多帐号

```s
# 帐号一
$ ssh-keygen -t rsa -b 4096 -C "reuixiy@gmail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/home/archie/.ssh/id_rsa): /home/archie/.ssh/id_rsa_reuixiy

# 帐号二
$ ssh-keygen -t rsa -b 4096 -C "yixiuer.me@gmail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/home/archie/.ssh/id_rsa): /home/archie/.ssh/id_rsa_yixiuer
```

特别..注意..一下，这里你可不要直接默认回车了，当你看到以下提示时：

```s
Enter file in which to save the key (/home/archie/.ssh/id_rsa): 
```

注意修改一下默认的 `id_rsa`，建议在后面加上你的 GitHub 用户名，比如修改为 `id_rsa_reuixiy`，见我..上面..的操作。

---

然后，我们要将生成的两个密钥添加到 ssh-agent：

```s
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_rsa_reuixiy
$ ssh-add ~/.ssh/id_rsa_yixiuer
```

接下来，添加一个 `config` 文件配置下 SSH：

```s
$ vim ~/.ssh/config
```

输入以下内容（自行修改 `host` 和 `IdentityFile`）：

```haskell
host reuixiy.github.com
    Hostname github.com
    User reuixiy
    IdentityFile ~/.ssh/id_rsa_reuixiy

host yixiuer.github.com
    Hostname github.com
    User yixiuer
    IdentityFile ~/.ssh/id_rsa_yixiuer
```

---

类似，修改下相应仓库的远程仓库链接地址，比如：

```s
# 帐号一
~/hugo-theme-meme $ git remote set-url origin git@reuixiy.github.com:reuixiy/hugo-theme-meme.git

# 帐号二
~/yixiuer.me $ git remote set-url origin git@yixiuer.github.com:yixiuer/yixiuer.me.git
```

..特别注意..：主机名分别是 `reuixiy.github.com` 和 `yixiuer.github.com`，而不再是默认的 `github.com` 了，以后克隆仓库时也要注意，修改为帐号的相应主机名。

最后，将相应的公钥添加到你的相应 GitHub 帐号，成功！🎉🎉🍻

## 参考

1. [Connecting to GitHub with SSH | GitHub Help](https://help.github.com/en/articles/connecting-to-github-with-ssh)
2. [Use multiple ssh-keys for different GitHub accounts on the same computer | Medium](https://medium.com/@xiaolishen/use-multiple-ssh-keys-for-different-github-accounts-on-the-same-computer-7d7103ca8693)
3. [Git 多账号配置 | 蒋士正的博客](https://steflerjiang.github.io/2016/12/16/git多账号配置/)

---

[^1]: 如果你不记得了，可以查看一下仓库下的 `.git` 文件夹下的 `config` 文件确认一下。
