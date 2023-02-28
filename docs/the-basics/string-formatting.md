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

When formatting numbers, a _presentation type_ can be provided that changes
the way the number is displayed.
Python has several ways to format integers and floats, and while it is not
common to use all of these presentation types all the time, they are useful
to know about.
An overview of several presentation types is below (note the letters at the
end of the replacement fields).

There are various presentation types for integers:

```python
number = 123_456

print(f"No Format: {number}") # 123456

print(f"  Decimal: {number:d}")  # 123456  (this is optional/default)
print(f"   Binary: {number:b}")  # 11110001001000000
print(f"    Octal: {number:o}")  # 361100
print(f"      Hex: {number:x}")  # 1e240
print(f"Upper Hex: {number:X}")  # 1E240
```

And, for floats (note – a precision can be specified for floats, here its
3dp/sf):

```python
small = 0.0123456
big = 123_456.789

print(f"  No Format: {small:>9.3} / {big:.3}")  # 0.0123 / 1.23e+05

print(f"    General: {small:>9.3g} / {big:.3g}")  #    0.0123 / 1.23e+05
print(f"  Upper Gen: {small:>9.3G} / {big:.3G}")  #    0.0123 / 1.23E+05
print(f"Fixed Point: {small:>9.3f} / {big:.3f}")  #     0.012 / 123456.789
print(f"Upper Fixed: {small:>9.3F} / {big:.3F}")  #     0.012 / 123456.789
print(f" Scientific: {small:>9.3e} / {big:.3e}")  # 1.235e-02 / 1.235e+05
print(f"  Upper Sci: {small:>9.3E} / {big:.3E}")  # 1.235E-02 / 1.235E+05
print(f"    Percent: {small:>9.3%} / {big:.3%}")  #    1.235% / 12345678.900%
```

Note: `ints` can be formatted with `float` presentation types, but not the
other way around. e.g. you can format an integer as: `{10:.3e}` but you
can't format a float as: `{3.14:b}`.

The presentation type that is used most often is the fixed point presentation
type (`f`) which allows numbers to be rounded to a specified number of
decimal places.
For complete descriptions of the presentation types [see the python format
specification docs](https://docs.python.org/3/library/string.html#formatspec).

#### Rounding

When rounding values there are two things to be aware of:

- A _presentation type_ to specify that the replacement field is for float types
- A _precision_ that indicates either the number of significant figures or
  decimal places that should be presented depending on the display type.

Different presentation types will treat the precision differently.

##### Rounding Decimal Places

Most common is to round a value to a given number of decimal places.
To round to a given number of decimal places, the _fixed point_ presentation
type (`f` or `F`) can be used.

Consider the following example from before:

```python
pi = 3.141
print(f"Pi to two decimal places is: {pi:.2f}")
```

Here, the format specifier is `.2f`.
The `f` is a presentation type used for fixed point numbers – i.e.
displaying numbers to a fixed number of decimal places.
And the `.2` specifies a precision of two decimal places.

By specifying a precision, numbers are padded with extra 0s at the end if
they do not have enough decimal places:

```python
x = 5
print(f"{x:.5f}")  # 5.00000
```

#### Alternate Notation

String formatting can also be used to display numbers in scientific notation,
include explicit signs, or use thousands separators among other things.

##### Scientific Notation

To display numbers in scientific notation, the "e" presentation type can
be used:

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
thousand's block in the number.

##### Padding With 0's

In the [rounding decimal places](#rounding-decimal-places) section, it was
shown that you can pad a number with extra decimal point 0's.
It is possible to pad the left side of a number with 0s too to fit a certain
width.

To do this, a `0` needs to be inserted before a width specifier.
For example:

```python
print(f"{123:06}")  # 000123
```

Prefixing the width number with a `0` character produces _sign aware_ padding.
This means if a sign is present, the leftmost `0` is replaced with the sign:

```python
print(f"{123:+06}")   # +00123
print(f"{-123:+06}")  # -00123
print(f"{123:-06}")   # 000123
print(f"{-123:-06}")  # -00123
print(f"{123: 06}")   #  00123
print(f"{-123: 06}")  # -00123
```

Fixed point values can also be left-padded with 0's.
The width parameter will need to account for any decimal points, fractional
digits, and signs. For example, lets format a float to have four decimal
points, the space sign specifier, and 12 whole digits. And, just for fun, a
comma thousands separator:

```python
number = 123_456_789.123
print(f"{number: 021,.4f}")   #  000,123,456,789.1230
print(f"{-number: 021,.4f}")  # -000,123,456,789.1230
```

Check the [format specifier](#format-specifiers) section to see why the
comma is placed between the width and precision.

To calculate the width it is `+1` for the sign, `+1` for the decimal point,
`+3` for the thousand's separators, `+4` for the fractional part, `+12` for
the whole digits.
Coming to a total of $1 + 1 + 3 + 4 + 12 = 21$

### Using Variables in Format Specifiers

So far, we have been using variables in the _expression_ (left side)
component of replacement fields.
But, we've been hard-coding values in the _format specifier_ (right side).

Let's see what happens if we try to use a variable in a format specifier to
set the width of a replacement field:

```python
cat = "Spoons"

print(f"My cat is called: {cat:*^20}!")  # no variables
# My cat is called: *******Spoons*******!

width = 20
print(f"My cat is called: {cat:*^width}!")  # using a variable?
# ValueError: Invalid format specifier
```

The first format string using hard coded values works, but for the second
string we get a`ValueError` telling us there is something wrong with our format
specifier!

Since format specifiers are so finicky with their syntax, Python can't
automatically tell whether something in the format specifier is a variable
or one of the many format options.
To indicate that a value in a format specifier is a variable, it needs to be
wrapped in curly brackets (`{variable}`).
For example:

```python
cat = "Spoons"
width = 20

print(f"My cat is called: {cat:*^{width}}!")  # using a variable
# My cat is called: *******Spoons*******!
```

Now our string displays correctly!

## String Formatting FAQs

### How do I put a curly brace inside a format string?

To put curly braces `{` or `}` into a format string or f-string, you simply need
to double them up in the string:

```python
message = "in a format string"
print(f"Look! }} a curly bracket {message}! {{ And another one!")
# My cat is called: *******Spoons*******!
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
    values = ["a", "b", "c"]
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

[f-strings]: https://docs.python.org/3/tutorial/inputoutput.html#tut-f-strings

[str.format]: https://docs.python.org/3/library/stdtypes.html#str.format

[formatted-string-literals]: https://docs.python.org/3/reference/lexical_analysis.html#formatted-string-literals

[format-string-mini-language]: https://docs.python.org/3/library/string.html#format-specification-mini-language
