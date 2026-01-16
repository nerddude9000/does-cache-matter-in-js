# Cache in high level languages

These are a few small tests to prove that knowing about cache (and other 'low-level' concepts) helps ALL developers, even those using slower or high level languages like JavaScript.

The test functions basically all loop through a matrix, multiplying each element with a scalar, and in general are three categories:

- 'stupid' functions: they loop in the wrong order; the outer goes through columns, and the inner loop the rows. this almost always causes a cache miss.
- correct functions: they loop in the correct order; the outer goes through rows, and the inner loop the columns. this makes cache hits much much more likely.
- correct and go through four at a time: same as correct ones, but they go throught four elements each iteration instead of one. these generally make cache hits a little more common.

The tests might not be perfect, but they still show how knowledge about C really helps even if you don't program in it.

## What's cache? why does it matter?

Cache is memory that lives very close to the CPU, and is significantly faster than RAM.

When your computer runs your program, it tries to put as much information into the cache because it's faster, but the cache is very small, so it keeps replacing the data inside it with fresh data.

When you loop through a 2d array, and you access `arr[y][x]` for example, most languages would put this element AND adjacent ones in the cache if it can (`arr[y][x + 1]`... etc). So, in the next iteration, your cpu is much more likely to find the elements it needs ready in the cache. This is a cache-hit.

But, if you go through this by columns THEN rows: the cpu would search for the elements and doesn't find them, then it will throw away those useless adjacent elements it loaded, put the next row's elements on the cache... and do the same thing again and again. so your loop almost never gets to use the fast cache.
