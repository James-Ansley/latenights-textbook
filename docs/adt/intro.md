# Introduction to ADTs

As strange as it may initially sound, as programmers manipulating data, we often
want to know as little as possible about _how_ certain operations are performed
and instead are only interested in _what_ operations are available and what
the _effect_ of performing a certain operation is.

For example, when appending a value to a list calling `.append`, we don't want
to know _how_ that operation is performed -- what memory structures are being
changed, what lines of code "in the background" are being run, etc. -- we just
want to know that lists have a method called `.append`, and after we invoke it,
our list will have whatever element we passed in to it appended to the back of
the list.
