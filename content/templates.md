---
title: C++ template instantiation is Turing-complete
slug: cpp-templates
date: 2026-05
description: C++ templates are a powerful language.
tag: project
---

A recursive Fibonacci number implementation in C++ is straightforward:

```cpp
long long fib(int n) {
  if (n == 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

int main() {
    int n = 10;
    std::cout << "The Fibonacci number at position " << n << " is: " << fib(n) << std::endl;
    return 0;
}
```

But a Fibonacci number implementation in C++ _templates_ is also possible:

```cpp
template <int N>
struct Fib {
  static constexpr long long value =
    Fib<N-1>::value + Fib<N-2>::value;
};
                                                                            
template <>                                                                  
struct Fib<0> {
  static constexpr long long value = 0;
};
                                                                            
template <>                                                                  
struct Fib<1> {
  static constexpr long long value = 1;
}; 

int main() {
    constexpr int n = 10;
    std::cout << "The Fib number at position " << n << " is: " << Fib<n>::value << std::endl;
    return 0;
}
```

This generates the same output -- but all the computation is done at copmile-time!

In the implementation using templates, the only meaningful work done at runtime is printing to `stdout`. Compile-time recursion handles generating the Fibonacci numbers for us.

Two explicit template specializations `Fib<0>` and `Fib<1>` handle the base case for us. These are **explicit** specializations since they force instantiation of the corresponding `struct` (for values `0` and `1`).

Everything is marked for resolution at compile-time thanks to the `constexpr` type. Specifically, the compiler generates (in this case) 10 unique class definitions `Fib<0>, ..., Fib<10>`.

Finally, as `n` approaches a (fairly small) limit, compilation will fail with something like `fatal error: recursive template instantiation exceeded maximum depth`.
