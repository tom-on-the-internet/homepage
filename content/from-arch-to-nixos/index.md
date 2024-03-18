---
title: From Arch Linux to NixOS
date: "2022-07-10"
display_toc: true
tags: [Arch Linux, Linux, NixOS]
---

## Warning

I'm leaving this article up as a time capsule, but wow. As of 2024 I'm on PopOS and hoping to move to MacOS. Things change. I still think Arch and NixOS are incredible.

## I love Arch Linux

Arch Linux felt like the last operating system I would ever use.

When I started using Arch Linux in 2020, it was because I wanted to understand how my operating system worked. I was told that with Arch Linux, all you got was a command prompt. You had to figure everything else on your own. That sounded insane, but intriguing.

I quickly fell in love with Arch. I learned more about how my computer works in my first few months on Arch than I did in the year I spent on Ubuntu. Everything started coming into focus. Window managers, compositors, hotkey daemons, notification managers... I began to see these as separate parts of an operating system and the monolith broke apart.

I could configure everything, exactly how _I_ wanted it. If I wanted my computer to do something, it had no choice but to oblige. Complete control.

## Trapped in the whirlwind

I have two computers: my personal computer and my work computer. Both ran Arch Linux. I kept them in sync as much as possible. I was a responsible Arch user. I had scripts, dotfiles, and git repos. When I made a change to one system, I made changes to the other. At least, I tried to. Some changes were easy to keep in sync: changes to vim, keyboard shortcuts, etc.

But some changes were hard to keep in sync. I would attempt to install and configure a piece of software, and fail. And then try again and succeed. But not all the configuration made it across to my other system. The systems started to drift. Small differences in behaviour reminded me that I was running two systems which were mostly the same, but not quite.

The complexity felt manageable until I had to reinstall Arch Linux. The initial installation was easy, but then came the system setup. Making sure I installed all the same packages, modules, languages, versions, extensions, fonts... Configuring, tweaking, changing settings... a fresh install of Arch Linux only took a couple hours, but the configuration always took at least another week.

## Have you heard of NixOS

I don't remember where I first heard of NixOS... it might have been Reddit, or maybe Hacker News. But I do remember that the commenter mentioned they left Arch Linux for NixOS. This surprised me. Arch felt like the endgame... what could attract someone elsewhere? **Declarative configuration**.

Later, a coworker mentioned that they use NixOS. I said I was on Arch. They told me that they _used to_ use Arch, but had switched to NixOS. Why? Again, **declarative configuration**.

NixOS is similar to Arch Linux in many ways. They are both systemd based Linux operating systems that don't ship with a desktop environment. They both have a massive number of packages available.

But NixOS is different than nearly every other operating system because of how you define system configuration.

## What is system configuration

When you first install an operating system, it asks you for your username. It also asks where you live and what language you speak. That's system configuration.

After the installation is complete, how do you tell your system you live somewhere different? How do you tell your system you want to add a user? If you're on a Mac, you look in system settings. If you are on Arch you jump into a terminal.

But on NixOS, your system configuration is declarative. You define how you want your system to behave, and when you want to change this behaviour you edit and reapply.

Here is a small, non-exhaustive list of things that my NixOS system knows about:

- audio/video (pipewire)
- bootloader
- displays
- environment variables
- git configuration
- hostname
- keyboard layout
- language
- location
- mounting disks
- shell
- software (every piece of software I use is declared)
- terminal
- users
- window manager

With NixOS, I have a declarative configuration of how my entire system should behave. Every tweak I make to my system is in my configuration files. This means that reinstalling takes an hour or two, not a week or two.

Configuration can be customized to work with different computers, too. So, my work computer and personal computer share most settings, but not all. So, if I like a piece of software, I can ensure it'll be installed on my other computer the next time I use it.

## How does a declarative system work

I don't know. Not really. I'm still too new with NixOS. But let me describe it a bit.

NixOS uses a language called Nix to describe system configuration. So, my system configuration is all written in Nix.

> The Nix expression language is a pure, lazy, functional language. Purity means that operations in the language don't have side-effects (for instance, there is no variable assignment). Laziness means that arguments to functions are evaluated only when they are needed. Functional means that functions are “normal” values that can be passed around and manipulated in interesting ways. The language is not a full-featured, general purpose language. Its main job is to describe packages, compositions of packages, and the variability within packages.

Here's a small section of one Nix file.

```nix
{ config, lib, pkgs, inputs, user, location, ... }:

{
  imports = [
    ../modules/dropbox
    inputs.kmonad.nixosModules.default
    ../modules/desktop/sway/sway.nix
    ../modules/desktop/sway/waybar.nix
  ];

  users.users.${user} = {
    isNormalUser = true;
    extraGroups = [
      "audio"
      "camera"
      "docker"
      "kvm"
      "lp"
      "networkmanager"
      "scanner"
      "video"
      "wheel"
    ];
    shell = pkgs.zsh;
  };

  security.sudo.wheelNeedsPassword = false;

  time.timeZone = "Canada/Eastern"; # Time zone and internationalisation
  i18n = { defaultLocale = "en_US.UTF-8"; };

  console = {
    font = "ter-powerline-v24b";
    packages = [ pkgs.terminus_font pkgs.powerline-fonts ];
  };
};
```

I expect that you can probably deduce most of what is happening in that snippet, but the Nix language definitely takes getting used to.

If I want to make a change to my system configuration, I edit a file and reapply the changes. I _don't_ modify system configuration myself. I _don't_ install packages myself. I tell Nix the state of the system I would like to see, and Nix handles the changes.

## Day to day differences

Running a NixOS system feels a lot like running an Arch Linux system. I can use all the same software and configure however I want. But the configuration is centralized and can be reapplied at any time.

So, in some ways NixOS is just like Arch. But in terms of configuration, it feels much safer. I don't feel afraid of breaking my system, because I can always _easily_ revert to a working version. So I'm more adventurous. I can try installing something that might break my audio setup, but if things go wrong, I revert and I'm back to where I was. And reverting doesn't mean uninstalling software, removing environment variables, and praying. Removing means reverting my last git commit and reapplying.

If I want to temporarily install a program, I use `nix-shell`. `nix-shell` allows me to install a program in a sandboxed environment. For example, if I want to try out `figlet`, I can run `nix-shell -p figlet`. I'll be put into a new shell where the `figlet` program is in my path. When I exit that shell, `figlet` is gone.

Another significant difference is the contents of `/bin` and `/usr/bin`.

My `/bin` directory contains a single entry: `sh -> /nix/store/kqbccy5vkrnbx0jb2klzx1sl4cjxpvzh-bash-interactive-5.1-p16/bin/sh`. It's a symlink for `sh` that points to the Nix Store. The Nix Store is where nix _stores_ all my packages. It's readonly. I don't touch it. `sh` is kept in `/bin` because that's where many programs expect a POSIX compliant shell to live.

My `/usr/bin` directory also contains a single entry: `env -> /nix/store/ib7q40m9vbkvqmq6lbmcwvmzxqnfmzs7-coreutils-stage4-9.1/bin/env`. Like `sh`, many programs expect `env` to be found in `/usr/bin`, so NixOS puts it there. Other than that, my "bin" directories are empty.

## The Nix Store

The Nix Store is located at `/nix/store` and it's where NixOS stores all of the packages. My Nix Store has 29749 entries right now. They have names like `82ydl9vg4n1pnqmj4a7p5s5hv7ns9ycr-home-manager-path/bin/mako`. They are symlinked to wherever the need to be.

In `/etc/profiles/per-user/tom/bin` I have 226 entries. One of them is `mako -> /nix/store/82ydl9vg4n1pnqmj4a7p5s5hv7ns9ycr-home-manager-path/bin/mako`. You might notice that this entry points to mako from the Nix Store.

So, my programs are all taken care of for me by Nix.

## This sounds more complicated than Arch

NixOS is fundamentally more complicated than Arch Linux. Instead of doing things the "Linux way", I need to do things the NixOS way. But I think the trade off is worth it. Sometimes additional complexity is worth it.

Here's an example of the additional complexity that I think is worth it. If I wanted to install and configure git on Arch, I would use the package manager to install the git binary, and then create a `.gitconfig` file in the appropriate directory. If anything went wrong, I could review the git documentation on gitconfig.

On NixOS, instead of installing the binary myself and configuring git, I write an expression.

```nix
{
  programs = {
    git = {
      enable = true;
      delta = { enable = true; };
      extraConfig = {
        init = { defaultBranch = "main"; };
        help = { autocorrect = "immediate"; };
      };
    };
  };
}
```

This is more complicated because I need to learn the Nix language and review the Nix docs on how install and configure git. The advantage is that because this configuration is stored in version control, I never actually have to setup git myself again. On a new system, NixOS will do it for me. Like I said, it's a trade off.

## What I don't love about NixOS

I've been able to do everything on NixOS that I could on Arch (and more, because I'm not afraid of breaking things), but some things have been very difficult on NixOS.

1. Installing an obscure npm package globally can be very challenging.
1. Because NixOS manages all my dotfiles, tweaking my dotfiles requires a system rebuild. This is fast, but not as fast as just modifying a file. Honestly, I thought this would be a bigger nuisance than it has been.
1. Configuring Neovim was an real challenge. I'm happy with where I landed, but it wasn't easy to get there.
1. There is a lot of change happening in the Nix ecosystem. As a new user, this can be confusing.

## What I love about NixOS

NixOS can do things that Arch Linux can't, and can do many things that Arch can do, but in a more convenient way.

1. Testing out new configurations is very easy.
1. Testing out new software is very easy.
1. I can roll back to working versions of my system.
1. I can share configurations between my computers.
1. I can read other NixOS users' configuration files. I love reading other people's dotfiles, and with NixOS I can see how they configured their entire operating system.
1. I don't have to worry about Python anymore. I'm not a Python developer, and yet on Arch I constantly had Python programs breaking and I had to fix them. NixOS packages sandbox their dependencies, so this is no longer an issue. Python isn't in my path, but many programs I have installed are using their own versions of Python.

## Who would I recommend NixOS to

There are very few people I'd recommend NixOS to, but _maybe_ you are one of them.

You need:

1. to be a Linux user.
1. to be comfortable with Linux and how it works.
1. to like configuring your operating system.
1. to have programming experience to understand Nix.
1. to feel like declarative configuration is missing from your life.

That's limiting criteria, but I was such a person.

## How to get started with NixOS

Give yourself time. This transition can be difficult. There's a _lot_ to learn. This is more complicated than Arch Linux in many ways. It took me about 2 weeks to configure NixOS. You might be faster. I'm 40, I have a family, and I don't get a lot of time to play.

First, watch this video where Dorian explains what NixOS is: [https://www.youtube.com/watch?v=oPymb2-IXbg](https://www.youtube.com/watch?v=oPymb2-IXbg).

Next, if you like what you saw, watch this video where Matthias explains how to install NixOS. [https://www.youtube.com/watch?v=AGVXJ-TIv3Y](https://www.youtube.com/watch?v=AGVXJ-TIv3Y). Make sure you watch this one all the way through first before proceeding. I ended up using his flake configuration.

Start configuring your NixOS systems. Have fun. Read other users' configuration files.

## Any plans to return to Arch

At this point, going back to Arch Linux would feel (to me!) like a step backward. Like going from Arch back to Ubuntu. I can't see myself leaving NixOS any time soon. But who knows what the future will bring.

Thanks for reading!
