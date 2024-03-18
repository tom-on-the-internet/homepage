---
title: I've Been a Developer for One Year
date: "2018-07-05"
display_toc: true
---

## Getting started

A year ago, at the age of 35, I got my first job as a software developer. It was a long road. I sacrificed a few years of evenings and weekends to get to the point where I was hireable, always longing for the day when I would be paid to write software.

It came as a surprise to me when the eminently quotable [Gordon Zhu](https://twitter.com/gordon_zhu), the closest person I had to a mentor, told me that "getting a job _isn't_ a great goal." He went on to explain that he had met many "professional" software developers who weren't very good at their jobs. Getting a job is only the beginning, the first step. A better goal is to strive to be an excellent developer.

It's actually quite common for developers to be let go from their first job for one reason or another. A year's experience has given me a few insights into why that might be. I present to you the mistakes I made and challenges I faced. If you're just starting a new job, or hoping to become a developer, I hope you find this helpful.

## Precision matters

I learned to code by myself in my apartment. I'd been coding for over two years by the time I felt confident enough to apply for a job.
My job interview was the first time I had an in person conversation with other developers, and I quickly realized I didn't know the right terms for many of the things that developers interact with every day.

HTML **elements** and HTML **tags** aren't the same thing. Those _properties_ on HTML elements? They're called **attributes**, not properties. JavaScript objects have **properties** though, which are made up of **keys** and **values**. CSS _selects_ elements using... **selectors**, not "that... the part before the curly brace."

Getting the terms right avoids a whole set of communication issues. It's not a great feeling when you ask a question to an experienced developer and they don't understand what you are talking about.

Precision matters. It matters in git commit messages, documentation, tests, bug reports, code comments, etc.

Take the time to learn the terms. Flashcards help for this, so long as you make your own.

## Spending time planning saves time

In my first months on the job, I wanted to make sure I looked productive. Given a problem to tackle, I'd dive in and start writing code. When I ran into an issue, I'd code around it. Head down, fingers busy. Developers get paid to write code. They don't get paid to write notes or gaze into the distance, _right_?

But as more experienced developers joined our team, I saw that when they were presented with problems, writing code was _never_ the first thing they did. Some times they sketched out Entity Relationship Diagrams (ERDs), sometimes they wrote tests, and some times they set up meetings with stakeholders. They asked questions and challenged assumptions.

Then they started writing code that was informed and precise. They knew the problem they were solving. They didn't run into as many issues because they had planned for them. Most importantly, the code they wrote was extendable. It didn't need to be thrown out with the next refactor.

Take time upfront to ask questions and get input from other developers. It's better to find mistakes in your strategy before you write the code.

## New developers are slow. Really, really slow

At the end of every sprint (a two week period), we'd recap what had been accomplished. One developer had redone the auth system, another had implemented notifications across email and Slack, and a third had reworked a flow that would save our customer support team 10 hours a week.

What did I get done? I got a _pretty_ complicated form working. Er, mostly working.

Experienced developers aren't marginally faster than inexperienced developers. They are orders of magnitude faster and deliver better quality results. They've seen the problems before. This isn't the first time they've written an auth system. They were in charge of notifications at their last job. They built a CSV importer for another part of the system last year, so this time they just had to extend it.

Experienced developers also don't expect inexperienced developers to be very quick. Not right away. But it can be hard being the slowest person on the team and you _will_ be slow at first. But slowly... you'll get faster.

## You don't know enough to argue about the best technologies

Motivated to learn the 'right' skills, I wanted to know what the best tools were. What's the best _language_? What's the best _front-end framework_? What's the best _editor_, _back end_, _database_, _css frame work_, _web server_, _code formatter_, etc. I found hundreds of articles arguing the merits of one technology or another and I spent time committing this information to memory.

(FWIW, the internet told me that the best tools were JavaScript, React, VSCode, Node, MongoDB, Bootstrap, Ngnix and Prettier.)

When I was hired, I was surprised to find out that our team had chosen very few of the technologies that I believed were best. Our back end was Laravel PHP, we used MySQL, and the team preferred Angular over React. What's more, the developers on the team generally didn't agree about which tools were best. Some preferred PHP to Ruby, some preferred git GUIs to the command line, and some preferred IDEs to text editors. The only consensus seemed to be that no one really liked JavaScript.

It's obvious to me now how ridiculous it was for me, a new developer, to have strong opinions on technologies I barely understood. It takes time to learn (really learn) a technology and be able to weigh it against its peers.

I've come to really enjoy Laravel and I didn't end up liking Node/Express very much. MySQL? Pretty great. And Angular is an excellent batteries included front-end framework.

## Learn your tools

In my day job I use Laravel and Angular. I'm comfortable with them now. However, there are times I catch myself worrying that I should really learn React if I want to stay hireable. Oh, and I should probably learn Phoenix and Elixir, too, as they're the _future_ of web development. So, I'll start a React Native tutorial, read a few Elm blog posts, and subscribe to a handful of GraphQL podcasts.

And then, in my day job, I'll be asked to do something new using Angular or Laravel and realize I'm not sure how to do it. I read the docs and realize there's a bunch of features that I've never learned.

It takes a long time to get really good with your tools, but the pay off is extraordinary. I'm easily twice as fast as I was a year ago, and I have deeper knowledge of what I'm actually doing.

It's a waste of time trying to learn React, Vue, and Angular all at once. Learn one really well (ideally the one used at your company). Use it for your personal projects, too. In the end, most frameworks are more similar than they are different. They're all trying to solve the same problems. Learning one deeply is more useful than learning a little bit of each one. If you ever need to learn another tool, it'll be easy enough.

## You can only learn so much on the job

Before I was employed full time, I was rarely able to code for more than a couple hours at a time. Once hired, I expected that coding full-time would make me a _much_ better developer, and it did.

But there were still a lot of things I wasn't learning. Most teams don't task the junior developer with writing the auth system, for example, or configuring the vagrant box. These are things that if I wanted to learn I would need to do **on my own time**. In the end, every developer is responsible for their own education.

And so I did. I would create toy apps and play with them. The things I learned building toy apps helped me better understand the complicated systems I use at work.

I've tried many different learning resources. Here are the good ones:

If you want to get better at JavaScript, Gordon Zhu's [Watch and Code](https://watchandcode.com/) is fantastic. Gordon walks you through the basics of JavaScript and then gets you reading and interacting with actual code bases. Gordon isn't happy with a surface-level understanding of JavaScript, either. You go pretty deep and are better for it.

If you want to get better at **Laravel**, two resources stand out:

- Jeffrey Way's [Laracasts](https://www.laracasts.com) is awesome. Jeffrey covers Laravel, obviously, but also has a lot of material on writing better code. As an example of the breadth of material, Jeffrey taught me the SOLID principles, how to use PHP's PDO, and how to use PHPStorm.
- Matt Stauffer's [Laravel: Up and Running](https://mattstauffer.com/laravel-up-and-running/) feels like an expanded and enriched version of the official documentation. Matt makes all topics approachable and offers guidance on when to use certain features, and when to avoid them.

If you want to get better at **Angular**, I recommend [this course](https://www.udemy.com/the-complete-guide-to-angular-2/?couponCode=ACAD_M) by Maximilian Schwarzmüller. Max is a great teacher and his enthusiasm never wains.

## You haven't made it yet

There isn't a lot of demand for junior developers, but there's a ton of demand for experienced developers. So, when companies hire a junior developer, they're making a gamble. The company hopes it will work out, the junior developer hopes it will work out, but it won't work out without a lot of effort.

Your first year on the job can be a real challenge, but pushing through it will make you a better developer. You'll find yourself able to contribute more, take on bigger challenges and offer useful input in meetings.

Good luck!
