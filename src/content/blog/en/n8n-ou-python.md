---
title: n8n or Python? How I pick the right tool for each automation
description: Not everything needs code, and not everything fits in a visual flow. The rule I use to decide — and why it saves the client money.
date: 2026-11-20
tags: Automation, n8n, Python
---

When someone asks me for an automation, my first question isn't "which technology?". It's: **who is going to touch this later?**

The answer almost always decides between two tools I use every day: **n8n** and **Python**.

## When I go with n8n

n8n is a visual workflow builder. You connect blocks — "an email arrived", "save to the spreadsheet", "send on WhatsApp" — and the flow runs on its own.

I use it when:

- The process is a clear sequence of steps between systems that already exist
- The team itself will want to tweak a rule without depending on a developer
- I need to ship fast to validate the idea

## When I go with Python

Python comes in when the logic gets serious: rules with lots of exceptions, heavy data processing, Machine Learning, or an AI agent that has to decide on its own which tool to use.

I use it when:

- The business rule is too complex to fit in blocks
- It needs automated tests to make sure nothing breaks
- The data volume is large or performance matters

## The best of both

In practice, they work together. n8n orchestrates the flow — receives, routes, notifies — and calls a Python API when it needs real intelligence. Everything packaged in **Docker**, so it runs the same on my machine and on the client's server.

## Why this matters for your wallet

Picking the wrong tool costs you twice: when it's built and, above all, when it's maintained. A simple flow written in code turns into developer dependency. A complex rule squeezed into a visual flow becomes a web nobody understands.

> Want to know which path makes sense for your process? Take the [free assessment](/#diagnostico) — it takes two minutes.
