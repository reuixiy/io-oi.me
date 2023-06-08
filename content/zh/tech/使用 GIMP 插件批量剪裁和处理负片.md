+++
title = "使用 GIMP 插件批量剪裁和处理负片"
date = "2023-05-01T23:37:08+08:00"
tags = ["gimp", "film", "photograph"]
slug = "batch-crop-and-process-negatives-with-gimp"
gitinfo = true
+++

本篇技术博客文章由 ChatGPT（GPT-4）编写。本文将介绍如何使用 GIMP 插件来批量剪裁、处理负片，插件支持 .jpg 和 .jpeg 文件格式，用户可以选择是否对图像进行剪裁、去色处理。

如果您曾经需要手动剪裁和处理多张负片，您就知道这需要花费大量的时间和精力。幸运的是，有了 Batch Crop and Process Negatives GIMP 插件，您可以自动化该过程，节省大量时间和精力。

**更新**：可以使用 [digiKam](https://www.digikam.org) 批量处理 RAW 格式的负片，具体方法请参考[使用 digiKam 批量处理 RAW 格式的负片](https://t.me/yixiuer/1171)。

![color-film-strips-under-sunlight.png](/images/color-film-strips-under-sunlight.png "(Midjourney) Color film strips under the sunlight, half negative color, half positive color, nostalgic, overexposed. --ar 3:2 --v 5")

## 安装

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from gimpfu import *
import os

def batch_crop_and_process_negatives(input_directory, output_directory, convert_to_bw, x=0, y=0, width=0, height=0):
    # 获取输入文件夹中的所有JPG文件
    input_files = [f for f in os.listdir(input_directory) if f.lower().endswith((".jpg", ".jpeg"))]

    for input_file in input_files:
        # 打开输入文件
        image_path = os.path.join(input_directory, input_file)
        image = pdb.gimp_file_load(image_path, image_path)
        drawable = pdb.gimp_image_get_active_layer(image)

        # 判断是否需要剪裁
        if width > 0 and height > 0:
            # 剪裁图像
            pdb.gimp_image_crop(image, width, height, x, y)

        # 是否去色
        if convert_to_bw:
            pdb.gimp_desaturate_full(drawable, DESATURATE_LUMINOSITY)

        # 反相
        pdb.gimp_invert(drawable)

        # 自动调整色阶
        pdb.gimp_levels_stretch(drawable)

        # 保存处理后的文件
        output_path = os.path.join(output_directory, input_file)
        pdb.gimp_file_save(image, drawable, output_path, output_path)

        # 关闭图片
        pdb.gimp_image_delete(image)

register(
    "python_fu_batch_crop_and_process_negatives",
    "Batch Crop and Process Negatives",
    "Crops, inverts colors, and adjusts levels of all JPEG images in the input directory, then saves them in the output directory.",
    "OpenAI",
    "OpenAI",
    "2023",
    "Batch Crop and Process Negatives...",
    "",
    [
        (PF_DIRNAME, "input_directory", "Input directory", ""),
        (PF_DIRNAME, "output_directory", "Output directory", ""),
        (PF_BOOL, "convert_to_bw", "Convert to black and white", False),
        (PF_INT, "x", "Crop X offset", 0),
        (PF_INT, "y", "Crop Y offset", 0),
        (PF_INT, "width", "Crop width", 0),
        (PF_INT, "height", "Crop height", 0),
    ],
    [],
    batch_crop_and_process_negatives,
    menu="<Image>/Filters/Custom"
)

main()
```

1. 安装 GIMP 图像处理软件。
2. 将上述代码复制到一个名为 `batch_crop_and_process_negatives.py` 的文件中。
3. 将该文件放置在 GIMP 的插件目录下。通常，该目录位于以下位置：
   - Windows: `C:\Users\<用户名>\AppData\Roaming\GIMP\<版本号>\plug-ins`
   - macOS: `~/Library/Application Support/GIMP/<版本号>/plug-ins`
   - Linux: `~/.config/GIMP/<版本号>/plug-ins`
4. 确保文件具有可执行权限（在 macOS 和 Linux 系统上）。
5. 重新启动 GIMP。

## 使用

1. 启动 GIMP。
2. 点击菜单栏中的「Filters」（滤镜）>「Custom」（自定义）>「Batch Crop and Process Negatives...」。
3. 在弹出的对话框中，设置以下参数：
   - Input directory（输入目录）：包含要处理的 .jpg 和 .jpeg 图像文件的文件夹。
   - Output directory（输出目录）：处理后的图像将保存到该文件夹。
   - Convert to black and white（转换为黑白）：勾选此选项以将图像转换为黑白模式。
   - Crop X offset（剪裁 X 偏移）：剪裁区域距离图像左侧的距离。
   - Crop Y offset（剪裁 Y 偏移）：剪裁区域距离图像顶部的距离。
   - Crop width（剪裁宽度）：剪裁区域的宽度。
   - Crop height（剪裁高度）：剪裁区域的高度。
4. 点击「OK」开始处理。插件将遍历输入目录中的所有图像文件，按照设置的参数进行剪裁和处理，然后将结果保存到输出目录。

## 获取剪裁参数

剪裁是可选的，剪裁参数（Crop X offset、Crop Y offset、Crop width、Crop height）的默认值为 0，如果您不输入具体参数值，插件将不会对图像进行剪裁。

要确定剪裁参数，您可以先在 GIMP 中手动剪裁一张图片，然后获取所需的参数值。

1. 在 GIMP 中打开一张需要剪裁的图片。
2. 选择「矩形选择工具」（快捷键 `R`）。
3. 在图片上绘制一个矩形区域，表示您想要剪裁的部分。
4. 在「工具选项」窗口中，您可以看到「位置」和「大小」参数。其中，位置对应于 Crop X offset 和 Crop Y offset，大小对应于 Crop width 和 Crop height。
5. 将这些参数值输入插件对话框中的相应字段。

## 注意事项

- 为确保一致的剪裁，请确保所有图像均采自相同位置。
- 该插件仅支持 .jpg 和 .jpeg 文件格式。
- 该插件将处理后的图像保存到输出目录中，不会更改原始图像。
- 处理大量图像时，该插件可能需要一些时间才能完成，请耐心等待。
- 在插件运行时，请避免在 GIMP 中执行其他操作，以免干扰插件运行。

通过使用此插件，您可以轻松地批量剪裁和处理多个图像，无需手动对每个文件进行相同的操作。希望这对您的工作有所帮助！