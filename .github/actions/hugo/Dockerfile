FROM archlinux

RUN pacman -Syu --noconfirm hugo git openssh

RUN ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
