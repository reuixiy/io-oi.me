+++
title = "HTTPS 和 TLS 证书"
date = "2021-01-26T16:38:05+08:00"
tags = ["devops", "pwa"]
slug = "https-tls"
gitinfo = true
+++

HTTPS 是 [PWA] 的基本要求之一，这里我们考察一下 HTTPS 和 TLS 证书及其申请流程。本文偏实用，即 TLS 证书的申请。

## 写在前面

TLS 是 SSL 被 IETF 标准化后的名字，最新版本是 [TLS 1.3]。目前绝大部分网站使用的应该都是 TLS，所以目前 CA 签发的证书技术上严格来说应该都是 TLS 证书。

## HTTPS/TLS

HTTP 与 HTTPS 的不同就在于增加的 TLS 传输层安全协议，HTTPS 的解释和 TLS 的原理可以参考以下几篇文章：

- [超文本传输安全协议 | 维基百科](https://zh.wikipedia.org/wiki/超文本传输安全协议)
- [什么是 HTTPS？ | Cloudflare](https://www.cloudflare.com/zh-cn/learning/ssl/what-is-https/)
- [HTTPS | Interview](https://hadyang.github.io/interview/docs/basic/net/https/)
- [深入理解 HTTPS 工作原理 | 掘金](https://juejin.cn/post/6844903830916694030)
- [传输层安全性协议 | 维基百科](https://zh.wikipedia.org/wiki/傳輸層安全性協定)
- [HTTPS 详解二：SSL/TLS 工作原理和详细握手过程 | SegmentFault](https://segmentfault.com/a/1190000021559557)
- [HTTPS 精读之 TLS 证书校验 | 知乎](https://zhuanlan.zhihu.com/p/30655259)

## 证书

对于网站，只有使用受浏览器信任的第三方证书签发机构（CA）签发的有效（证书是有期限的）证书才能正常使用，不然浏览器会跳出警告甚至直接阻止用户访问该网站。

目前，主流浏览器 Chrome/Firefox/Safari 信任的 CA 应该都是国外的，国内相关服务提供商（比如阿里云、腾讯云、华为云）应该都是这些 CA 的代理╱中介。

TLS 证书的解释和 Let’s Encrypt 证书的申请可以参考以下几篇文章：

- [什么是 SSL 证书？ | Cloudflare](https://www.cloudflare.com/zh-cn/learning/ssl/what-is-an-ssl-certificate/)
- [使用 acme.sh 免费申请 HTTPS 证书 | HelloDog](https://wsgzao.github.io/post/acme/)
- [Let’s Encrypt 证书生成流程 | Easy HTTPs](https://easy.zhetao.com/easy-https-lets-encrypt-content-115)
- [Let’s Encrypt，免费好用的 HTTPS 证书 | Jerry Qu 的小站](https://imququ.com/post/letsencrypt-certificate.html)
- [细说 CA 和证书 | 小胡子哥的个人网站](https://www.barretlee.com/blog/2016/04/24/detail-about-ca-and-certs/)

## 证书申请

目前证书按验证级别的不同大概分三种类型，DV、OV、EV，参考：

- [SSL 证书的类型 | Cloudflare](https://www.cloudflare.com/zh-cn/learning/ssl/types-of-ssl-certificates/)
- [What Are The Different Types of SSL Certificates? | GlobalSign](https://www.globalsign.com/en/ssl-information-center/types-of-ssl-certificate)

我们这里要申请的 DV 级别的证书，CA 在签发的时候只需要验证我们对「域」的控制权╱所有权。

只有顶级域名或公网 IP 才能获得受主流浏览器默认信任的 CA 签发的证书。

**特别提醒**：申请 CA 签发的 TLS 证书时，验证的不是主机的身份，而是我们对域的控制权。对主机身份的验证，是 TLS 协议的内容，通过非对称加密算法来实现。

### 申请

我们在 [Let’s Encrypt] 这个 CA 申请永久免费的 TLS 证书，通过 ACME 客户端以 Let’s Encrypt 提出的 ACME 协议自动申请证书。..先决条件..是，拥有一个属于自己的域名。

[ACME] 协议是 Let’s Encrypt 这个组织为了节约运营成本而提出的，用自动化的程序流程解决传统证书申请中存在的人工流程，以及证书的自动更新问题，目前已经是一项 IETF 标准。

ACME 主要提供两种验证方式，HTTP 方式和 DNS 方式，介绍可以参考 [Challenge Types]。由于 HTTP 方式需要有公网可访问的 80 端口，为了本地测试的方便，此处我们采用传统手动 DNS 方式来通过 CA 在签发证书时要求的验证。

我们此处使用的 ACME 客户端是 [acme.sh]，

```sh
# 下载脚本
git clone --depth 1 https://github.com/acmesh-official/acme.sh.git && \
cd acme.sh

# 申请证书（注意将 example.com 修改为自己要申请证书的域名）
./acme.sh --issue -d example.com --dns \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

网络正常的情况下，稍等片刻，会输出一条 TXT 类型的 DNS 记录，需要我们手动将之增加到域名的 DNS 记录列表。

添加好后，再稍等一会儿，运行：

```sh
# 更新证书（注意将 example.com 修改为自己要申请证书的域名）
# 特别提醒：不要使用自己已上线的域名来实验
./acme.sh --renew -d example.com --dns \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

稍等片刻，TLS 证书应该就已经申请成功了！导出证书所需要的文件应该就会放在 `~/.acme.sh/example.com/`（比如）。

### 检验

我们可以在本地通过浏览器来检验我们的证书，不过首先我们需要在本地运行一个 Web Server，这里以 Nginx 为例，参考 [Install the cert to Apache/Nginx]。

首先，在本机上安装好 Nginx，然后我们导出 Nginx 需要的证书文件和私钥：

```sh
# 导出私钥和证书（注意将 example.com 修改为相应域名，下同）
./acme.sh --install-cert -d example.com \
--key-file       cert.key \
--fullchain-file cert.pem
```

接下来，将证书和私钥..移动..到 `/etc/nginx/`：

```sh
sudo mv cert.* /etc/nginx/
```

并修改 `/etc/nginx/nginx.conf`，在底部加入：

```nginx
http {
    # HTTPS server
    server {
        listen       443 ssl;
        server_name  example.com;

        ssl_certificate      cert.pem;
        ssl_certificate_key  cert.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
    }
}
```

然后，往 `/etc/hosts` 文件追加一行：

```sh
sudo echo '127.0.0.1  example.com' > /etc/hosts
```

最后 `sudo systemctl restart nginx` 并在浏览器打开 https://example.com 就可以成功测试！

## 其它

以上仅仅测试了证书的简单申请和检验，生产环境下证书的申请和部署，HTTPS 的启用，证书的自动更新和自动部署，均未涉及。

几个链接：

- [SSL 证书为什么有期限？ | 知乎](https://www.zhihu.com/question/20803288)
- [localhost 证书 | Let’s Encrypt](https://letsencrypt.org/zh-cn/docs/certificates-for-localhost/)
- https://crt.sh



[PWA]: https://web.dev/progressive-web-apps/
[TLS 1.3]: https://tools.ietf.org/html/rfc8446
[Let’s Encrypt]: https://letsencrypt.org/
[ACME]: https://tools.ietf.org/html/rfc8555
[Challenge Types]: https://letsencrypt.org/docs/challenge-types/
[acme.sh]: https://github.com/acmesh-official/acme.sh
[Install the cert to Apache/Nginx]: https://github.com/acmesh-official/acme.sh#3-install-the-cert-to-apachenginx-etc
