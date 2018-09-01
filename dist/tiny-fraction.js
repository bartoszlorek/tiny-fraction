'use strict';

function gcd(num, den) {
    return den ? gcd(den, num % den) : num;
}

function isFraction(value) {
    return value && value.__fraction === true;
}

function baseFraction(a, b) {
    return isFraction(a) ? a : parseFraction(a, b);
}

function parseFraction(a, b) {
    var num = 0,
        den = 1,
        sign = 1;

    if (a == null || isNaN(a)) {
        num = den = NaN;
    } else if (b !== undefined) {
        num = Math.abs(a);
        den = Math.abs(b);
        if (den === 0) {
            throw new Error('division by zero');
        }
        sign = a * b;
    } else {
        if (a < 0) {
            sign = a;
            a = -a;
        }
        if (a % 1 === 0) {
            num = a;
        } else {
            num = a.toString().replace(/\d+[.]/, '');
            den = Math.pow(10, num.length);

            if (a > 1) {
                num = +num + Math.floor(a) * den;
            }
            var scale = gcd(num, den);
            num /= scale;
            den /= scale;
        }
    }
    return {
        n: num,
        d: den,
        s: sign < 0 ? -1 : 1
    };
}

var proto = {
    __fraction: true,
    valueOf: function valueOf() {
        return this.s * this.n / this.d;
    },
    add: function add(value) {
        var data = baseFraction(value);
        return createFraction(this.s * this.n * data.d + data.s * data.n * this.d, this.d * data.d);
    },
    subtract: function subtract(value) {
        var data = baseFraction(value);
        return createFraction(this.s * this.n * data.d - data.s * data.n * this.d, this.d * data.d);
    },
    multiply: function multiply(value) {
        var data = baseFraction(value);
        return createFraction(this.s * data.s * this.n * data.n, this.d * data.d);
    },
    divide: function divide(value) {
        var data = baseFraction(value);
        return createFraction(this.s * data.s * this.n * data.d, this.d * data.n);
    }
};

function createFraction(num, den) {
    var data = baseFraction(num, den),
        self = Object.create(proto);
    self.n = data.n;
    self.d = data.d;
    self.s = data.s;
    return self;
}

module.exports = createFraction;
