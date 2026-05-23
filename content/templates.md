---
title: C++ template instantiation is Turing-complete
slug: cpp-templates
date: 2026-05
description: C++ templates are a powerful language.
tag: project
---

A recursive Fibonacci number implementation in C++ is straightforward:

```cpp
int fib(int n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

int main() {
    int n = 10;
    std::cout << "The Fibonacci number at position " << n << " is: " << fib(n) << std::endl;
    return 0;
}
```

C++ **templates** let us write "generic" code, based on some parameters, at compile-time. The C++ compiler then generates code for us based on each type/value instantiation. It turns out a Fibonacci number implementation in C++ templates is also possible:

```cpp
template <int N>
struct Fib {
  static constexpr int value =
    Fib<N-1>::value + Fib<N-2>::value;
};
                                                                            
template <>                                                                  
struct Fib<0> {
  static constexpr int value = 0;
};
                                                                            
template <>                                                                  
struct Fib<1> {
  static constexpr int value = 1;
}; 

int main() {
    constexpr int n = 10;
    std::cout << "The Fib number at position " << n << " is: " << Fib<n>::value << std::endl;
    return 0;
}
```

This generates the same output! In the implementation using `template`s, the only meaningful work done at runtime is printing to `stdout`. All the computation is done at compile-time! The C++ compiler evaluates the recursive function call graph for us. The two explicit template specializations `Fib<0>` and `Fib<1>` handle the base case.

The `static constexpr` keywords indicate that values can be evaluated at compile-time. Specifically, the compiler generates (in this case) 11 unique class definitions `Fib<0>, ..., Fib<10>`.

Finally, as `n` approaches a configurable but generally small limit (namely `-ftemplate-depth`), compilation will fail with something like `fatal error: recursive template instantiation exceeded maximum depth`.
