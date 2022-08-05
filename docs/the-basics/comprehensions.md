---
sidebar_position: 500
draft: true
---

# Comprehension

Two common patterns in programming are looping over the values of some
collection and performing an out-of-place _mapping_ or _filtering_.
For example, let's say we had a set of values, `values`, and we wanted to
generate a new set containing the squares of each value that is not divisible
by 3.

Using a simple for loop this would look like:

```python
values = {1, 2, 3, 4, 5, 6}

new_values = set()
for value in values:
    if value % 3 != 0:
        new_values.add(value ** 2)
        
print(new_values)  # {1, 4, 16, 25}
```

This is quite a lot of code to something very simple.
Thankfully, Python has a concise notation for performing such out of place
mapping and filtering operations called _comprehension_.
Comprehension in Python provides a concise way to map and filter the values in
collections to create new `sets`, `lists`, or `dicts`.

To solve the above problem using _set comprehension_, we would do:

```python
values = {1, 2, 3, 4, 5, 6}

new_values = {value ** 2 for value in values if value % 3 != 0}
print(new_values)  # {1, 4, 16, 25}
```

This section will explain the syntax of comprehensions and the types of
problems comprehensions are good at solving.

## Comprehension Syntax

Comprehension involves specifying some expression that is used to map the
values of an iterable and an optional condition that is used to filter values.

In the above example _set comprehension_ was used to generate a new set;
however, comprehension can also be used to create lists and dictionaries.
The general form of comprehensions in Python for each of these collections is:

- **List Comprehension**:
  ```python
  [expression for variable in iterable]
  # or
  [expression for variable in iterable if condition]
  ```
- **Set Comprehension**:
  ```python
  {expression for variable in iterable}
  # or
  {expression for variable in iterable if condition}
  ```
- **Dictionary Comprehension**:
  ```python
  {expression1: expression2 for variable in iterable}
  # or
  {expression1: expression2 for variable in iterable if condition}
  ```

Note that in all of these cases, the `if condition` is optional.
Here, the `condition` is just some expression that can be evaluated to
`True` or `False`.

:::info But what about Tuple Comprehension?
You may have noticed no examples have been given for "tuple comprehension".
If you use round brackets `()` for a comprehension, you would create what
is called a _generator expression_ and not a tuple.

These are described in the
[Generator Expressions section](#generator-expressions) below.
:::

### Examples

#### Mapping Values in a List

Let's say we are given a list of floats, and we want to map all the negative
values to `0.0`.
We can solve this problem using list comprehension:

```python
values = [0.3, -1.5 , 12.4, 1.0, -0.2, -0.3, 1.4]

values = [max(0.0, x) for x in values]
print(values)  # [0.3, 0.0, 12.4, 1.0, 0.0, 0.0, 1.4]
```

#### Filtering Values in a Dictionary

Let's say we are given a dictionary mapping strings to lists of integers,
and we want to remove all the key-value pairs whose values are empty lists.
We can solve this problem using dictionary comprehension:

```python
values = {"str1": [1, 2, 3], "str2": [], "str3": [1], "str4": []}

values = {k: v for k, v in values.items() if len(v) != 0}
print(values)  # {'str1': [1, 2, 3], 'str3': [1]}
```

Note that we aren't changing the key or the value.

## Nested Comprehension

:::caution Beware
It is very easy to write confusing and ugly code with nested comprehensions.
:::

In the same way for-loops can be nested, the "for-loop component" of
comprehensions can be nested as well.

For example, let's say we wanted to _flatten_ a nested list of lists.
This could be done using a nested for-loop:

```python
values = [[1, 2, 3], [4, 5], [6], [7, 8, 9]]

new_values = []
for sublist in values:
    for value in sublist:
        new_values.append(value)

print(new_values)  #  [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

To rewrite this with list comprehension we can nest the loops:

```python
values = [[1, 2, 3], [4, 5], [6], [7, 8, 9]]

values = [value for sublist in values for value in sublist]
print(values)  #  [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

While this is definitely shorter than the nested for-loops example, it can
definitely be confusing to comprehend.

It might be best to put the components of complex comprehensions like this
on separate lines to make it easier to read and comprehend:

```python
values = [[1, 2, 3], [4, 5], [6], [7, 8, 9]]

values = [
    value
    for sublist in values
    for value in sublist
]
print(values)  #  [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

In general, each component of comprehensions can appear on its own line.
But, make sure each line is indented and aligned to improve readability.

## Generator Expressions

...
