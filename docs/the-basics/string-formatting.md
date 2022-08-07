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

We configure the replacement fields to change how values appear in strings by
including an optional _format specifier_.
We indicate the start of the format specifier with a colon `:` and then include
any formatting configuration.
In the above example printing $\pi$ to two decimal places, the format specifier
is `.2f` which specifies we want whatever number that fills in that replacement
field to have two decimal places.
The syntax for format specifiers in f-strings and format strings is the same and
is described in the [Format Specifiers section below](#format-string-syntax).

### f-string Syntax

We indicate a string is an f-string by prefixing an `f` to a string literal:
`f"..."`[^2].
We can then put replacement fields inside the string:

```python
name = "Sue"
age = 36
print(f"My name is {name}, and I am {age} years old.")
# My name is Sue, and I am 36 years old.
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
{expression[:format-specifier]}
```

Where square brackets indicate optional fields.

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
print("The cat's name is {1}, they are {0} years old!".format(age, name))
# The cat's name is Bob, they are 7 years old!
```

Here, we reference the values passed into format by their argument index.
The field names for the two replacement fields are `1` and `0` respectively.

We can also reference values by their keyword if we pass them into `format` as
keyword arguments:

```python
name, age = "Bob", 7

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

The general form of the replacement field syntax in format strings is:

```text
{[field-name][:format-specifier]}
```

Where square brackets indicate optional fields.

## Format Specifiers

Format specifiers are used to indicate how values are presented in replacement
fields.
Format specifiers allow us to do things like round numbers, specify the width
and alignment of values, and add signs and separators to numbers.

Format specifiers are defined by the _format specification mini-language_.
A more complete list of formatting options can be found in
the [Python docs][format-string-mini-language].

The general form of format specifiers that are discussed here is:

```text
[[fill]align][sign][0][width][grouping_option][.precision][type]
```

Where square brackets indicate optional fields.
Note that the order these appear must be kept.

### Aligning Values

Values can be aligned by specifying a width and an optional alignment: left
(default), right, or center.
By specifying a width, Python will pad out the value with a fill character (by
default a space `" "`) until it meets the width specified.

For example, a value could be specified to be at least 20 characters
wide:

```python
word = "Python"
print(f"~{word:20}~")  # ~Python              ~
```

A value can also be aligned within a given width by including an alignment
character:

- `<` to left align (default)
- `>` to right align
- `^` to center align

For example:

```python
print(f"'{'left':<20}'")    # 'left                '
print(f"'{'right':>20}'")   # '               right'
print(f"'{'center':^20}'")  # '       center       '
```

By default, Python will pad strings with spaces to make them fill the specified
width.
However, this can be changed by including a fill character before the alignment.
In the following examples, an astrix (`*`) is used:

```python
print(f"'{'left':*<20}'")    # 'left****************'
print(f"'{'right':*>20}'")   # '***************right'
print(f"'{'center':*^20}'")  # '*******center*******'
```

If a value is wider than any specified width, the value will simply overflow and
no fill characters will be used:

```python
value = "A really really really long string"
print(f"'{value:>20}'")  # 'A really really really long string'
```

The general form for specifying alignment is:

```text
[[fill]align][width]
```

Note that you can only specify a fill character if you also provide an
alignment[^4].

### Formatting Numbers

String formatting also allows us to control the _precision_ and notation of
numbers.

#### Rounding

To round numbers two things need to be included in the format specifier:

- A _presentation type_ to specify that the replacement field is for float types
- A _precision_ that indicates how many decimal places should be displayed[^5]

Consider the following example from before:

```python
pi = 3.141
print(f"Pi to two decimal places is: {pi:.2f}")
```

Here, the format specifier is `.2f`.
The `f` is a presentation type used for floating point numbers[^6].
And the `.2` specifies a precision of two decimal places.

By specifying a precision, numbers are padded with extra 0s if they do not have
enough decimal places or are integers:

```python
x = 5
print(f"{x:.5f}")  # 5.00000
```

#### Alternate Notation

String formatting can also be used to display numbers in scientific notation,
include explicit signs, or use thousands separators among other things.

##### Scientific Notation

To display numbers in scientific notation, the "e" presentation type can
be used[^7]:

```python
speed_of_light_m_s = 299792458
print(f"{speed_of_light_m_s:e}")  # 2.997925e+08
```

The precision can also be specified to indicate how many digits appear after
the decimal point:

```python
speed_of_light_m_s = 299792458
print(f"{speed_of_light_m_s:.2e}")  # 3.00e+08
```

##### Number Signs

By default, numbers will only display their sign (`+/-`) if they are negative.
This can be changed by including a sign in the format specifier:

```python
x = -123
y = 321
print(f"{x:+}")  # -123
print(f"{y:+}")  # +321
```

The sign characters that can be used are:

- `+` to indicate the sign should be included on both positive and negative
  numbers
- `-` (default) to indicate the sign should only be included for negative
  numbers
- "&nbsp;" (the space character) to indicate a leading space should be used on
  positive numbers and a minus should be used on negative numbers.
  This is useful for aligning numbers.
  ```python
  x, y = -123, 321
  print(f"'{x: }'")  # '-123'
  print(f"'{y: }'")  # ' 321'
  ```

##### Thousands Separator

Numbers can be displayed with thousands separators by including a _grouping
character_:

```python
x = 1234567890
print(f"{x:,}")  # 1,234,567,890
```

Here the comma (`,`) indicates commas should be used to group every 
thousands block in the number.

## String Formatting FAQs

### How do I put a curly brace inside a format string?

To put curly braces `{` or `}` into a format string or f-string, you simply need
to double them up in the string:

```python
pi = 3.141
print(f"{{math.pi}} == {pi:.2f}")  # {math.pi} == 3.14
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

[^4]:

    There is one exception to this. You can optionally prepend a `0` to the
    width value, which will pad the string with 0s.
    This can be useful for formatting numbers to always be the same number of
    digits:

    ```python
    x = 123.45
    y = 3.14
    print(f"{x:06.2f}")  # 123.45
    print(f"{y:06.2f}")  # 003.14
    ```
    
    Here the `06` indicates we want the string to be at least 6 characters wide
    (including the decimal point), with 0s as the padding character.

[^5]: This is generally only true for the fixed-point presentation type "f".
See the [Python docs][format-string-mini-language] for more on how precision is
used for other presentation types

[^6]: There are several presentation types for floats.
"f" or the _fixed point_ precision type is the most common for floats and
simplest to use.
See the [Python docs][format-string-mini-language] for the full list and
descriptions of presentation types.

[^7]: An uppercase "E" can also be used.
This just displays the separator character as "E" instead of "e".

[f-strings]: https://docs.python.org/3/tutorial/inputoutput.html#tut-f-strings

[str.format]: https://docs.python.org/3/library/stdtypes.html#str.format

[formatted-string-literals]: https://docs.python.org/3/reference/lexical_analysis.html#formatted-string-literals

[format-string-mini-language]: https://docs.python.org/3/library/string.html#format-specification-mini-language
