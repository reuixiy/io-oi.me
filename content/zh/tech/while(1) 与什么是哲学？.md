+++
title = "while(1) 与什么是哲学？"
date = "2019-12-30T01:37:02+08:00"
description = "Philosophy is not an infinite loop inside, philosophy is a finite code outside."
tags = ["philosophy", "ideas"]
slug = "what-is-philosophy"
dropCap = false
+++

## workflow

```sh
$ vim philosophy.c
$ # input the code
$ gcc philosophy.c -o philosophy && ./philosophy | head -n 10
```

## en

```c
#include <stdio.h>
#include <string.h>

int main () {
    char question[] = "What is ";
    char idea[]     = "philosophy";
    char prefix[]   = "philosophy of ";
    char symbol[]   = "?";

    char iteration[42] = ""; // assume 42 is infinite ∞

    while(1) {
        printf("%s%s%s%s\n", question, iteration, idea, symbol);
        strcat(iteration, prefix); // a logical bug it is
    }
}
```

> What is philosophy?  
> What is philosophy of philosophy?  
> What is philosophy of philosophy of philosophy?  
> What is philosophy of philosophy of philosophy of philosophy?  
> ...

## zh

```c
#include <stdio.h>
#include <string.h>

int main () {
    char question[] = "什么是";
    char idea[]     = "哲学";
    char suffix[]   = "的哲学";
    char symbol[]   = "？";

    char iteration[42] = ""; // assume 42 is infinite ∞

    while(1) {
        printf("%s%s%s%s\n", question, idea, iteration, symbol);
        strcat(iteration, suffix);
    }
}
```

> 什么是哲学？  
> 什么是哲学的哲学？  
> 什么是哲学的哲学的哲学？  
> 什么是哲学的哲学的哲学的哲学？  
> ……

## idea

Philosophy is not an infinite loop inside, philosophy is a finite code outside.

哲学不是里面的无限循环，哲学是外面的有限代码。

---

更多：<https://github.com/reuixiy/philosophy>
