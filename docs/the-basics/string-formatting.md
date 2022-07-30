# String Formatting

When converting values to strings, to either print them to stdout or write them
to a file, we often want to control how those values appear in the string, or
their _format_.
_String formatting_ allows us to insert values into strings and control how
those values appear in the string.

There are two main ways strings can be formatted in Python:

- [_Formatted string literals_][f-strings] (also referred to as _f-strings_):
  ```python
  pi = 3.141
  print(f"Pi to two decimal places is: {pi:.2f}")
  ```
- The [`str.format()`][str.format] method[^1]:
  ```python
  pi = 3.141
  print("Pi to two decimal places is: {:.2f}".format(pi))
  ```

In both cases, the above code blocks would print:
`Pi to two decimal places is: 3.14`

This section will explain the syntax of string formatting and ways string
formatting can change how values are displayed in strings.

## String Formatting Syntax

Both f-strings and format strings contain one or more _replacement fields_ that
are indicated with curly braces `{}`.
When the string is formatted, the replacement fields are "filled-in" with the
values that are passed to the string.

<!--
The main difference between f-strings and format strings is that in f-strings
values are put in the replacement fields directly, and in format strings the
replacement fields are left blank and the values are passed as arguments
to `str.format()`.
-->

We configure the replacement fields to change how values appear in strings by
including an optional _format specifier_.
We indicate the start of the format specifier with a colon `:` and then include
any formatting configuration.
For example, in the above example printing $\pi$ to two decimal places the
format specifier is `.2f` which specifies we want whatever number that fills in
that replacement field to have two decimal places.
The syntax for format specifiers in f-strings and format strings is the same and
is described in the [Format Specifiers section below](#format-string-syntax).

### f-string Syntax

We indicate a string is an f-string by prefixing an `f` to a string literal:
`f"..."`[^2].
We can then put replacement fields inside the string:

```python
name = "James"
age = 24
print(f"My name is {name}, and I am {age} years old.")
# My name is James, and I am 24 years old.
```

We aren't limited to just using variable names in the replacement fields in
f-strings.
With a few restrictions[^3], we can use any _expression_ instead.
For example, if we had a variable `x` the expression `2 * x` can be directly
used in a replacement field:

```python
x = 4
print(f"x is {x}. 2x is {2 * x}.")  # x is 4. 2x is 8.
```

The general form of the replacement field syntax in f-strings is:

```text
{expression:format-specifier}
```

Where the `:format-specifier` is optional.

### Format String Syntax

With f-strings, expressions are put directly into the replacement fields.
However, with format strings using the `str.format()` method, we pass the values
in as positional or keyword arguments and in the replacement fields we can
optionally reference them by _field names_ which are argument positions or
keyword names.
For example:

```python
name = "Bob"
age = 7
message = "The cat's name is {1}, they are {0} years old!"
print(message.format(age, name))
# The cat's name is Bob, they are 7 years old!
```

Here, we reference the values passed into format by their argument index.
The field names for the two replacement fields are `1` and `0` respectively.

We can also reference values by their keyword if we pass them into `format` as
keyword arguments:

```python
message = """The cat's name is {cat}, they are {years} years old!
{cat} is a good cat!"""
print(message.format(cat=name, years=age))
# The cat's name is Bob, they are 7 years old!
# Bob is a good cat!
```

Here, the field names are the keywords `cat` and `years`.
Both positional and keyword field names can be reused several times in the
format string.

If no field names are given in the replacement fields, the replacement fields
will each be filled with an argument in order.
In other words, `"{} {}".format(a, b)` is equivalent to
`"{0} {1}".format(a, b)`.

## Format Specifiers

### Formatting Numbers

### Aligning Values

## String Formatting FAQs

### How do I put a curly brace inside a format string?

To put curly braces `{` or `}` into a format string or f-string, you simply need
to double them up in the string:

```python
pi = 3.141
print(f"{{math.pi}} == {pi:.2f}")
# {math.pi} == 3.14
```

[^1]: Confusingly, the strings used in the `str.format()` method are called
"format strings" which are different to "f-strings" even though the terms are
similar.

[^2]: You can also prefix an uppercase f: `F"..."`. Although, this is less
common.

[^3]:

    The main restriction on expressions inside replacement fields in f-strings 
    is the same type of quote mark used to create the f-string cannot also be 
    used in the expression. For example, the following is **NOT** a valid 
    replacement field expression:
    
    ```python
    values = ["a", "b", "c"]
    print(f"The values are {", ".join(values)}")
    ```
    
    Running this will raise a `SyntaxError` because, to Python, it just looks
    like there are two strings separated by a comma: `f"The values are {"`
    and `".join(values)}"`.
    The first being an f-string with an unmatched curly bracket `{` which is
    invalid f-string syntax.
    
    To get around this, you can use different quote marks to those used to 
    create the f-string:
    
    ```python
    print(f"The values are {', '.join(values)}")
    ```
    
    Alternatively, you can extract the expression in the replacement field as a
    variable which may be easier to read.

    More restrictions are listed in the
    [Python docs][formatted-string-literals].

[f-strings]: https://docs.python.org/3/tutorial/inputoutput.html#tut-f-strings

[str.format]: https://docs.python.org/3/library/stdtypes.html#str.format

[formatted-string-literals]: https://docs.python.org/3/reference/lexical_analysis.html#formatted-string-literals