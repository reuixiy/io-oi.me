+++
title = "在 Web 使用 3D 图形头像"
date = "2021-10-23T19:09:39+08:00"
tags = ["web", "fantasy", "future"]
slug = "using-3d-avatar-in-the-web"
images = ["/images/3d-avatar.jpg"]
+++

随着硬件水平和软件环境的改善，Web 即将迎来自己的全新时代——一个 Web 3.0 时代！在 Web 这个[世界窗口](/tech/tiktok/)，我们将依旧开放地看到一个美好的未来世界。今天，我们走出第一步，使用 3D 图形作为我们在未来世界的自己。

<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>

<model-viewer src="/3d-graphics/reuixiy.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls camera-orbit="-18.9deg 85.8deg auto" autoplay animation-name="idle_eyes_2" environment-image="neutral" shadow-intensity="1" style="width: 100%; height: 420px"></model-viewer>

## 视野

随着分布式区块链应用的发展，[Web 3.0](/tech/host-your-blog-on-ipfs/) 变得越来越火热，从全球化的数字加密货币，到公开透明不可篡改的智能合约，数字计算而来的真实唯一和去中心化的自由向往，带给人们对未来交易和未来政治无限遐想。我不知道去中心化和真实性是否会是 Web 3.0 的关键因素，然而随着世界平面上缓缓升起的一座山峰，随数字计算而来的学习机器正在迅速让 3D 图形成为 Web 3.0 的不可或缺。

对比二十年前的照片，你可能觉得技术大有进展；对比十年前的照片，你可能觉得技术小有进展；对比两年前的照片，你可能会觉得技术没有进展——你甚至会相信未来不会有什么改变了。对于 Web，也是如此，然而当你在 Web 体验了 3D 图形后，你看着眼前的 Web 就如看着二十年前的网页——将二维图片作为头像是多么原始，我们每天所触碰的世界难道是平面吗？3D 图形是未来！

得益于硬件技术的发展，我们能传输和计算的信息量越来越大，我们在互联网交流文字、图片、音频、视频，我们的生活甚至人类的文明逐渐融入互联网。每种介质所能承载和传递的价值各有不同，3D 图形会有什么不同呢？对比现在十分流行的视频，视频只可以观看，3D 图形却可以交互浸玩，更有趣。在相同二维屏幕上，已能感受到 3D 图形的魅力，何况独有的 AR 体验和 VR 设备？

若与神经相接，那现在很酷的各种设备，是否也很原始呢？更不用说内容带给我们的体验感受。游戏和互联网已经让很多人沉迷，而当 3D 未来到来时，我们的时间维是在现实三维空间还是虚拟 3D 世界？那时候的虚拟又是否为现实？毕竟时间维所在即是真实。到那时，我们还需要物质实物吗？我们外出活动是否只为保持身体健康？至于物质工作，则通过控制机器实现。若医疗继续发展，我们终于可以无需运动保持健康，那我们仅需的物质实物不就只是一个囊舱吗？

又或我们应该直接放弃身体，仅仅需要保证大脑运转？又或我们可以选择离开生物体，迁移到硅基网络，成为机器里面的不朽灵魂？我们将明白智慧生命的本质？我们将推崇新的自由平等？还是理性的阶级等级？我们将通过电磁遨游这个宇宙？成为这个宇宙的[长子](https://yixiuer.me/excerpts/arthur-clarke-the-firstborn/)？我们是否还会怀恋祖先的碳基身体呢？我们意识中的时间尺度会从行星环绕周期膨胀等同到恒星生命周期吗？还是坍缩等同到粒子周期呢？我们甚至还会怀恋死亡？我们是否真能摆脱死亡走向终极自由呢？

## 建模

我们使用 [Ready Player Me](https://readyplayer.me/) 的服务，它可以根据二维照片生成可定制的 3D 图形，也就是我们需要的 Web 3.0 头像！

## 渲染

我们使用封装好的 [`<model-viewer>`](https://modelviewer.dev/) 组件实现 3D 图形在 Web 上的渲染，且支持调用设备的 AR 交互——全新体验！

```html
<script
  type="module"
  src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
></script>

<model-viewer
  src="/3d-graphics/reuixiy.glb"
  ar
  ar-modes="webxr scene-viewer quick-look"
  camera-controls
  camera-orbit="-18.9deg 85.8deg auto"
  autoplay
  animation-name="idle_eyes_2"
  environment-image="neutral"
  shadow-intensity="1"
  style="width: 100%; height: 420px"
></model-viewer>
```

## 链接

- [Polycam](https://poly.cam/) — 使用手机的 LiDAR 传感器建模
- [Blender](https://www.blender.org/) — The Freedom to Create
- [Wolf3D](https://wolf3d.io/) — Powering the next generation of online identities
- [Hubs](https://hubs.mozilla.com/) — Meet, share and collaborate together in private 3D virtual spaces
- [Decentraland](https://decentraland.org/) — Determine the future of the virtual world
- [Oculus](https://www.oculus.com/) — LIVE THE UNBELIEVABLE
- [Google AR & VR](https://arvr.google.com/) — Do more with what you see
- [Mozilla Mixed Reality](https://mixedreality.mozilla.org/) — Mixed Reality for the Open Web
- [Apple Augmented Reality](https://www.apple.com/augmented-reality/) — Dive into the world of augmented reality
- https://tech.fb.com/ar-vr/
- https://www.microsoft.com/en-us/mixed-reality/windows-mixed-reality
- https://threejs.org
- https://johwska.com
- https://github.com/BKcore/HexGL
