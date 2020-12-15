---
title: Types are about automation
permalink: '/types-automation'
date: '2020-12-18T22:12:03.284Z'
description: 'Types allow us to focus in our logic instead of our objects shape'
published: false
langKey: en
---

Let's face it as human beings we are bad focusing our attention in several things at the same time, even when we would love to do it our brains cannot perform several activities at once as good as we would do only one.

If you think it well software engineering could be considered the most effective way we have got to allow people focus in less activities at once, an accountant for instance might perform those calculations by hand which it's both error prone and slow but this is automate by a computer and the applications specifically built for these purposes, giving to accountants more time and menthal energy to make more creative and analytical work like analyze the numbers they have in front of them.

How in software engineering itself we get the same beneficies? well, we have many of those repetitive activities as well as tools to automate them, tools such as

- Linters
- Code generators
- Tests
- CI/CD pipelines
- Code autocomplete tools

These are tools which free us from take a look at several things like code style, code functional integrity and repetitive code, there is where types importance comes from, several times over the last few years I have seen discussions in the Javascript community about why work with Typescript is important, what benefits bring us and why we should use it in almost any project since give us more readable and organized code, more safety about our work, etc.

However, I believe that those benefits stay unfinished because can be replaced by other techniques, for example a more readable and organize code could be got by applying the good practices we get from software engineering principles those doesn't come exclusively from Typescript so we can get a mess with Typescript as well. Safety about our code is got from Typescript thanks to its compiler but tests and CI / CD pipelines can give us those safety nets and even better (of course these two combined are beautiful).

Where other techniques are not so good it's giving us an **instant feedback about how we are structuring our data**, there Typescript shine and it's a big deal, how many times you have to see to a function's signature to make sure what you have to pass it in? or how many times a runtime error warns you about one error that could have been catched by a type system? those benefits are incredible, with a type system you don't need to worry about them since your code editor and the compiler will take care of them for you, giving you more mental energy to use your abilities where are more worth it, modeling and executing business rules in your code.

Automate this feedback it's of an enormous value as well as automate any task which it's repetitive, tedious and error prone also we can use this combined in a CI/CD pipeline and add anothe quality layer in our projects putting pipelines, Typescripts compilers, linters and tests work for us.

Typescript as well as any type system our quality tool are investment which really pays off for any project in the long term, not only increasing the quality but making you more productive and happy as developer.