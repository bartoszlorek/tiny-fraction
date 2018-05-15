# tiny-fraction

Tiny and simple means few basic methods for fast and clean calculation in imprecise doubles numbers world. For more complex needs use other alternatives like [Fraction.js](https://github.com/infusion/Fraction.js) or [mathjs](http://mathjs.org/).

```javascript
import f from 'tiny-fraction'
let a = f(0.1).add(0.2) // 0.3
let b = f(0.7).add(a)   // 1
```

## constructor
```javascript
f(0.3)   // 3/10
f(3, 10) // 3/10

// cloning
let a = f(0.3) // 3/10
let b = f(a)   // 3/10
```

## methods
Arithmetic operations that return new instance of calculated fraction. `n` stands for `Number` of `Fraction` instance.
```javascript
.add(n)
.subtract(n)
.multiply(n)
.divide(n)
```
Utility that returns a decimal representation of the fraction.
```javascript
.valueOf()  
```
