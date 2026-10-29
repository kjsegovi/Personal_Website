---
title: "My homelab and what runs on it"
summary: "An OptiPlex for storage, a converted ThinkPad for hosting, a Framework for local AI, and two Raspberry Pis for monitoring and Headscale."
slug: structuring-a-home-lab
topics: [Homelab, Storage, Development]
state: draft
publishedAt: null
updatedAt: null
---
My homelab has a Dell OptiPlex, a ThinkPad I've converted into a server, a Framework, and two Raspberry Pis. I removed the ThinkPad's display and battery when I converted it.

Owning my data was the main reason I wanted this setup. I also wanted to get into networking and host my own projects without paying for deployments. The machines now cover household storage, site hosting, and local AI.

## The OptiPlex: TrueNAS and Immich

The OptiPlex runs Proxmox, with TrueNAS handling storage. It holds backups from my MacBook, my fiancée's MacBook, and both our phones. Immich is also hosted here and stores photos for both of us. The data also stays on the original devices and in iCloud.

I want this machine to concentrate on the NAS. If I break an application deployment, I don't want our data caught up in it. Proxmox can keep workloads in separate virtual machines, but those VMs still depend on the same physical host. A host restart or hardware problem can affect everything running on it. For site hosting, I prefer a separate computer so changes there are less likely to interfere with the machine holding our files.

## The ThinkPad: hosting and deployments

The ThinkPad hosts my sites and handles CI/CD. [Course Studio](/projects/course-authoring-systems/) is one of the projects running there: an author supplies source material, works with an assistant to prepare a course, reviews it, and downloads a package for Torus or Canvas.

There are several parts behind the website. A Rust API manages projects and revisions, a worker handles queued jobs, and an MCP adapter connects the authoring tools to an assistant. PostgreSQL stores the workflow, while uploaded files and generated artifacts live in object storage. The application has data to preserve as well as software to update.

Updates go through my local GitLab CI/CD pipeline. After I push a change, it runs tests, builds the app, and restarts it with the new version.

## The Framework: local AI and games

The Framework is where I mostly mess around with local AI. I'm currently running [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) with Q4 quantization. I like being able to try an agentic model on hardware I control. The Framework also runs games.

## The Raspberry Pis: monitoring and Headscale

One Pi handles monitoring across service availability, machine health, and network traffic. I want to see whether a service is reachable, how the machines are doing, and what's happening on the network.

The other Pi runs [Headscale](https://headscale.net/stable/), a self-hosted implementation of the Tailscale control server. That gives the remote-access setup its own machine too.
