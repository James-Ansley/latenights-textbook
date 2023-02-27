---
sidebar_position: 500
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
  ```text
  [expression for variable in iterable]
  # or
  [expression for variable in iterable if condition]
  ```
- **Set Comprehension**:
  ```text
  {expression for variable in iterable}
  # or
  {expression for variable in iterable if condition}
  ```
- **Dictionary Comprehension**:
  ```text
  {expression1: expression2 for variable in iterable}
  # or
  {expression1: expression2 for variable in iterable if condition}
  ```

Note that in all of these cases, the `if condition` is optional.
Here, the `condition` is just some expression that can be evaluated as
`True` or `False`.

:::info But what about Tuple Comprehension?
You may have noticed no examples have been given for "tuple comprehension".
If you use round brackets `()` for a comprehension, you would create what
is called a _generator expression_ and not a tuple.

These are described in the
[Generator Expressions section](#generator-expressions) below.
:::

## How Does it Work?

Comprehensions consist of two or three parts.

1. An expression – what goes into the resulting list/dictionary/set/generator
2. Some data that is being looped over – with a target variable
3. An optional condition that determines whether data will be added to the
   result

Python comprehensions can seem a bit strange at first as the parts seem out of
order.
Below is an example of list comprehension that loops over the values in an
iterable called `data` and adds the even values to the result list multiplied
by two:

$$
\bigl[
\quad
\underbrace{\text{x * 2}}
_{\mathclap{\text{what goes in the list}}}
\quad
\overbrace{\text{for x in data}}
^{\mathclap{\text{the data being looped over}}}
\quad
\underbrace{\text{if x \% 2 == 0}}
_{\mathclap{\text{(optional) condition for adding values}}}
\quad
\bigr]
$$

In the above example – values from `data` are looped over with
each value being assigned to the variable name `x` (that's the `for x in
data` part).
This means the variable `x` can be used in the expression on the left, and
the condition on the right.

Each value of `x` is checked against the condition (the `if x % 2 == 0` part).

If the condition evaluates to `True`, then the expression `x * 2` gets added
to the resulting list. Otherwise, that particular value of `x` is ignored.

## Examples

### Mapping Values in a List

Let's say we are given a list of floats, and we want to map all the negative
values to `0.0` (i.e. left-clamp the values at `0.0`).
We can solve this problem using list comprehension:

```python
values = [0.3, -1.5 , 12.4, 1.0, -0.2, -0.3, 1.4]

values = [max(0.0, x) for x in values]
print(values)  # [0.3, 0.0, 12.4, 1.0, 0.0, 0.0, 1.4]
```

Here, the expression `max(0.0, x)` is evaluated for every item in the values
list.
This code is equivalent to the following for loop:

```python
values = [0.3, -1.5 , 12.4, 1.0, -0.2, -0.3, 1.4]

new_values = []
for x in values:
    x = max(0.0, x)
    new_values.append(x)
values = new_values

print(values)  # [0.3, 0.0, 12.4, 1.0, 0.0, 0.0, 1.4]
```

### Filtering Values in a Dictionary

Let's say we are given a dictionary mapping strings to lists of integers,
and we want to remove all the key-value pairs whose values are empty.
We can solve this problem using dictionary comprehension:

```python
values = {"str1": [1, 2, 3], "str2": [], "str3": [1], "str4": []}

values = {k: v for k, v in values.items() if len(v) != 0}
print(values)  # {'str1': [1, 2, 3], 'str3': [1]}
```

Note that we aren't changing the key or value expressions and are instead just
adding them to a new dictionary as is.

This dictionary comprehension is equivalent to the following loop-based code:

```python
values = {"str1": [1, 2, 3], "str2": [], "str3": [1], "str4": []}

new_values = {}
for k, v in values.items():
    if len(v) != 0:
        new_values[k] = v
values = new_values

print(values)  # {'str1': [1, 2, 3], 'str3': [1]}
```

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
print(values)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

In general, each component of comprehensions can appear on its own line.
But, make sure each line is indented and aligned to improve readability.

## Generator Expressions

After seeing the syntax for list and set comprehensions, it is reasonable to
assume that tuples could be generated using the following syntax:

```text
(expression for expression in iterable if condition)
```

However, this syntax is instead for _generator expressions_ and creates
_iterators_ that allow us to loop over their values at most once.

For example taking the [mapping example from before](#mapping-values-in-a-list),
if we were to use a generator expression instead, we might get some strange
results:

```python
values = [0.3, -1.5 , 12.4, 1.0, -0.2, -0.3, 1.4]

values = (max(0.0, x) for x in values)  # round brackets
print(values)  # <generator object <genexpr> at ...>
```

Here we can see `values` is a `generator object` and not a tuple.

Generators are objects that allow us to loop over their values at most once – 
you can't do much else with them.
Generators in Python are _Iterators_ – not Sequences or Iterables.

In the following example, a `values` generator is being constructed, and it 
is being looped over two times.
The second for loop doesn't run at all because the generator has been 
_consumed_ by the first for loop and has no more values.

```python
values = [0.3, -1.5 , 12.4, 1.0, -0.2, -0.3, 1.4]

values = (max(0.0, x) for x in values)

print("First Iteration:")
for value in values:
    print(value, end=" ")  # 0.3 0.0 12.4 1.0 0.0 0.0 1.4 

print("\nSecond Iteration:")
for value in values:  # Second loop does not run as values has been consumed
    print(value, end=" ")  # No output
```
