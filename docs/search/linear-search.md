---
sidebar_position: 200
draft: true
---

# Linear Search

Perhaps the simplest searching algorithm: _Iterate over all items, stopping 
if the target value is found._
Iterating over all items gives us immense flexibility; our data does not 
need to be in any particular order, and we just need to ensure we can 
iterate over each item.

## Implementation

### The Hard Way

```python
from collections.abc import Iterable
from typing import TypeVar

T = TypeVar("T")


def linear_search(data: Iterable[T], value: T) -> bool:
    for item in data:
        if item == value:
            return True
    return False
    
    
print(linear_search([3, 1, 2], 2))
print(linear_search([3, 1, 2], -1))
```

### The Slightly Less Hard Way

### Using Builtins

```python
data = [3, 1, 2]

print(2 in data)
print(-1 in data)
```

## Complexity


