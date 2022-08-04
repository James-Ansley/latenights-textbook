---
sidebar_position: 500
draft: true
---

# Comprehension

Comprehension in Python provides a concise way to generate collections such
as `sets`, `lists`, or `dicts` using similar notation to set builder notation.

For example, let's say we wanted to generate the squares of the natural
numbers up to $n$ inclusive that are not divisible by 3.
In set builder notation, this would be:

$$
\left\{
x^2 \mid x \in \mathbb{N} \wedge x \le n
\wedge x \bmod 3 \neq 0
\right\}
$$

In Python using _set comprehension_, this would be:

```python
{x ** 2 for x in range(1, n + 1) if x % 3 != 0}
```

While there are a few differences in the notation, the overall idea is the same.
Take some expression and apply it over some range of values with one or more
conditions.

This section will explain the syntax of comprehensions and the types of
problems comprehensions are good at solving.

## Comprehension Syntax

Comprehension involves specifying some expression that is used to map the 
values of an iterable and an optional condition that is used to filter values.

The syntax for list, set, and dictionary comprehension are similar; however 
they will all be described separately in the following sections.

### List Comprehension

### Set Comprehension

### Dict Comprehension

## Nested Comprehension

## Comprehension FAQs

### What About Tuple Comprehension?
