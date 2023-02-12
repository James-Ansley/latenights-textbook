---
sidebar_position: 100
sidebar_label: Intro
pagination_label: Search
draft: true
---

# Search

Searching is the process of checking for the existence of an item in a 
collection, or retrieving an item from a collection if it exists.
There are several ways we can search for items.
For example, we can search for values by:

- _Equality_ – checking if a target value is contained in a collection or 
  where it might be located in a sequence.
- _Key-Value_ – using some _key_ that maps to and checks for the existence of a 
  _value_
- _Predicate_ – finding an occurrence of some value that satisfies some 
  predicate.

You might notice some of these are just special cases of the others.

Much thought goes into how data should be stored such that it can be 
efficiently searched or retrieved when needed.
The following sections will be concerned with searching for values in 
ordered or unordered sequences and iterables that impose no other special 
requirements on the organisation of their data.
There are usually far more efficient ways to organise data than this; 
however, you will have to look into data structures and algorithms for that.