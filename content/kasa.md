---
title: Using an $8 smart outlet to avoid brainrot
slug: kasa
date: 2025-06
description: I used a smart outlet as a physical interface to blocking websites.
tag: project
---

I wrote a small [script](https://github.com/NWChen/laptop-brick) that runs in the background, polling for the state of an [$8 smart plug](https://www.kasasmart.com/us/products/smart-plugs).

![](https://cdn.thewirecutter.com/wp-content/media/2024/08/smart-plug-2048px-2206.jpg)

It's got a switch on the side to manually toggle the switch on and off. It connects to WiFi, so you can read the state of the plug via API.

When you turn the switch on, the script updates `/etc/hosts` to effectively block websites of your choosing:

```
127.0.0.1 www.twitter.com
127.0.0.1 x.com
127.0.0.1 instagram.com
127.0.0.1 youtube.com
127.0.0.1 reddit.com
```

You can plug the switch into any outlet, ideally one far away from you. Now, whenever I want to visit a website in my blocklist, I have to physically get up and turn off the switch. Alternatively, I could just manually edit `/etc/hosts`, but this additional step adds just enough friction to make me reconsider reflexively distracting myself.